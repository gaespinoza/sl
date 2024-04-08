import Joi, { ObjectSchema, ArraySchema } from "joi";

export interface Review {
  customer: string;
  review: string;
  score: number;
}

export interface Sale {
  weekEnding: string;
  retailSales: number;
  wholesaleSales: number;
  unitsSold: number;
  retailerMargin: number;
}

export interface Tag {
  name: string;
}

export interface Retailer {
  name: string;
}

export interface Brand {
  name: string;
}

export interface Product {
  id: string;
  title: string;
  image: string;
  subtitle: string;
  brand: string;
  reviews?: Review[];
  retailer: string;
  details?: string;
  tags?: Tag[];
  sales?: Sale[];
}

const reviewSchema: ObjectSchema = Joi.object({
  customer: Joi.string().required(),
  review: Joi.string().required(),
  score: Joi.number().required(),
});

const salesSchema: ObjectSchema = Joi.object({
  weekEnding: Joi.string().required(),
  retailSales: Joi.number().required(),
  wholesaleSales: Joi.number().required(),
  unitsSold: Joi.number().required(),
  retailerMargin: Joi.number().required(),
});

const productSchema: ObjectSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().required(),
  image: Joi.string().required(),
  subtitle: Joi.string().required(),
  brand: Joi.string().required(),
  reviews: Joi.array().items(reviewSchema),
  retailer: Joi.string().required(),
  details: Joi.array().items(Joi.string()).required(),
  tags: Joi.array().items(Joi.string()),
  sales: Joi.array().items(salesSchema),
});

export const requestSchema: ArraySchema = Joi.array().items(productSchema);

export const validInputExample: String = `[
    {
        "id": String,
        "title": String,
        "image": String,
        "subtitle": String,
        "brand": String,
        "reviews": [
            {
                "customer": String,
                "review": String,
                "score": Integer
            }
        ],
        "retailer": String,
        "details": [
            String
        ],
        "tags": [
            String
        ],
        "sales": [
            {
                "weekEnding": String,
                "retailSales": Integer,
                "wholesaleSales": Integer,
                "unitsSold": Integer,
                "retailerMargin": Integer
            }
        ]
    }
]`;
