import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { v4 as uuidv4 } from "uuid";
import {
  comparePasswords,
  generateOtp,
  hashPassword,
} from "~/app/utils/common";

export const authRouter = createTRPCRouter({
  signup: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
        password: z.string().min(5),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const exists = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (exists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User already exists",
        });
      }
      const token = uuidv4();

      const hashedPassword = await hashPassword(input.password);

      const otp = generateOtp();

      return ctx.db.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashedPassword,
          token,
          otp,
        },
      });
    }),

  signin: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(5) }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User does not exist",
        });
      }

      const passwordMatch = await comparePasswords(
        input.password,
        user.password,
      );

      if (!passwordMatch) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Incorrect password",
        });
      }

      return user;
    }),

  verifyOtp: publicProcedure
    .input(z.object({ token: z.string(), otp: z.string() }))
    .mutation(async ({ ctx, input }) => {
      console.log(input)
      const user = await ctx.db.user.findUnique({
        where: { token: input.token },
      });
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid Token",
        });
      }
      // incase email service doesnt work testing can be continued using 00000000 as otp
      if (input.otp === "00000000" || user.otp === input.otp) {
        await ctx.db.user.update({
          where: { token: input.token },
          data: {
            isVerified: true,
          },
        });
        return {
          name: user.name,
          products: await ctx.db.product.findMany(),
          email: user.email,
          id: user.id,
        };
      } else {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Incorrect OTP",
        });
      }
    }),

    getUserInfo: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      console.log(input.id)
      const user = await ctx.db.user.findUnique({
        where: { id: input.id },
      });
      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Invalid Token",
        });
      }
      return {
        name: user.name,
        products: await ctx.db.product.findMany(),
        email: user.email,
        id: user.id,
      };;
    }),
});
