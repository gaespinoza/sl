import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { Product as BasicProduct } from "@/components/product/utils";

async function handler(req: Request) {
  try {
    if (req.body) {
      const data = await req.text();
      const product = await prisma.product.findUnique({
        where: {
          id: data,
        },
        include: {
          reviews: true,
          sales: true,
          tags: true,
        },
      });
      if (product) {
        return Response.json(product, { status: 200 });
      }
      return Response.json("Not Found", { status: 404 });
    }
    const allProducts: BasicProduct[] | [] = await prisma.product.findMany({
      where: {},
      select: {
        title: true,
        image: true,
        subtitle: true,
        id: true,
      },
    });
    return Response.json(allProducts, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(error, { status: 500 });
  }
}

export { handler as GET, handler as POST };
