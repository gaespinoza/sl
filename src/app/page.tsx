"use client";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { Center, Title, Group, Button } from "@mantine/core";
import ProductView from "@/components/product/productView";
import Link from "next/link";

export default function Home() {
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product);

  console.log(product);

  return (
    <main className="relative items-center top-10">
      {product ? (
        <div className=" flex w-full h-full">
          <ProductView />
        </div>
      ) : (
        <div className="w-full h-full">
          <Center>
            <Title order={1}>No Product Selected.</Title>
          </Center>
          <Center>
            <Title order={5}>Please Select a Product to View Data.</Title>
          </Center>
          <Center>
            <Group>
              <Button>
                <Link href={"/products"}>Select Product</Link>
              </Button>
            </Group>
          </Center>
        </div>
      )}
    </main>
  );
}
