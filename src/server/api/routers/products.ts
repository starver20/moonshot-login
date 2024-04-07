import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { faker } from "@faker-js/faker";
import { z } from "zod";

export const productRouter = createTRPCRouter({
  seedDb: publicProcedure.mutation(async ({ ctx }) => {
    for (let i = 0; i < 100; i++) {
      await ctx.db.product.create({
        data: {
          name: faker.commerce.product(),
        },
      });
    }
  }),

  getProducts: publicProcedure.input(z.object({ limit: z.number(), skip: z.number().default(0) })).query(({ ctx, input }) => {
    return ctx.db.product.findMany({
        take: input.limit,
        skip: input.skip
    });
  }),

});
