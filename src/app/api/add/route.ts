import prisma from "@/lib/prisma";
import { Prisma, Product as P } from "@prisma/client";
import { Product, Review, Sale, Tag } from "@/components/input/requestType";

async function handler(req: Request) {
  try {
    const requestData: Product[] = await req.json();
    requestData.forEach((product) => {
      processProduct(product).then(() => {
        console.log("processed");
      });
    });

    return Response.json({ status: 200 });
  } catch (error) {
    return Response.json(error, { status: 500 });
  }
}

async function processProduct(product: Product) {
  const retailer = await processRetailer(product.retailer);
  const brand = await processBrand(product.brand);
  const returnProduct = await prisma.product.upsert({
    where: {
      id: product.id,
    },
    update: {
      title: product.title,
      image: product.image,
      subtitle: product.subtitle,
      details: JSON.stringify(product.details),
    },
    create: {
      id: product.id,
      title: product.title,
      image: product.image,
      subtitle: product.subtitle,
      details: JSON.stringify(product.details),
      retailer: {
        connect: retailer,
      },
      brand: {
        connect: brand,
      },
    },
  });
  product.reviews?.forEach((review) => {
    processReview(review, returnProduct).then(() =>
      console.log(
        `Linked ${review.customer}'s review with ${returnProduct.id}`,
      ),
    );
  });
  product.tags?.forEach((tag) => {
    processTag(tag, returnProduct).then(() =>
      console.log(`Linked Tag ${tag} with Product ${returnProduct.id}`),
    );
  });
  product.sales?.forEach((sale) => {
    processSale(sale, returnProduct).then(() =>
      console.log(`Sale Inserted for Product: ${returnProduct.id}`),
    );
  });
  console.log(returnProduct);
}

async function processRetailer(retailer: string) {
  return await prisma.retailer.upsert({
    where: {
      name: retailer,
    },
    update: {},
    create: {
      name: retailer,
    },
  });
}

async function processBrand(brand: string) {
  return await prisma.brand.upsert({
    where: {
      name: brand,
    },
    update: {},
    create: {
      name: brand,
    },
  });
}

async function processReview(
  review: Review,
  p: Prisma.ProductWhereUniqueInput,
) {
  if (p.id) {
    return await prisma.review.upsert({
      where: {
        reviewId: {
          customer: review.customer,
          productId: p.id,
        },
      },
      update: {
        review: review.review,
        score: review.score,
      },
      create: {
        customer: review.customer,
        review: review.review,
        score: review.score,
        product: {
          connect: {
            id: p.id,
          },
        },
      },
    });
  }
}

async function processTag(tag: Tag, p: Prisma.ProductWhereUniqueInput) {
  return await prisma.tag.upsert({
    where: {
      name: tag.name,
    },
    update: {
      products: {
        connect: {
          id: p.id,
        },
      },
    },
    create: {
      name: tag.name,
      products: {
        connect: {
          id: p.id,
        },
      },
    },
  });
}

async function processSale(sale: Sale, p: Prisma.ProductWhereUniqueInput) {
  if (p.id) {
    const date: Date = new Date(sale.weekEnding);
    return await prisma.sale.upsert({
      where: {
        saleId: {
          weekEnding: date,
          productId: p.id,
        },
      },
      update: {
        retailSales: sale.retailSales,
        wholesaleSales: sale.wholesaleSales,
        unitsSold: sale.wholesaleSales,
        retailerMargin: sale.retailerMargin,
      },
      create: {
        weekEnding: date,
        retailSales: sale.retailSales,
        wholesaleSales: sale.wholesaleSales,
        unitsSold: sale.wholesaleSales,
        retailerMargin: sale.retailerMargin,
        product: {
          connect: {
            id: p.id,
          },
        },
      },
    });
  }
}

export { handler as POST };
