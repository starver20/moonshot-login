import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const userProductRouter = createTRPCRouter({

getProductsByUserId: publicProcedure.input(z.object({ userId: z.number() })).query(({ ctx, input }) => {
    return ctx.db.userProduct.findMany({
        where: {
            userId: input.userId
        },
        select: {
            productId: true
        }  
    }) ;

}),

addProductsToUser: publicProcedure.input(z.object({ userId: z.number(), productId: z.number() })).mutation(({ ctx, input }) => {
    return ctx.db.userProduct.create({
        data: {
            userId: input.userId,
            productId: input.productId
        }
    });
}),

removeProductsFromUser: publicProcedure.input(z.object({ userId: z.number(), productId: z.number() })).mutation(({ ctx, input }) => {
    return ctx.db.userProduct.deleteMany({
        where: {
            userId: input.userId,
            productId: input.productId,
          },
    });
}),

});
