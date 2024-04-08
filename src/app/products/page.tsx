"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Center,
  Box,
  Pagination,
  Text,
  Card,
  Image,
  Group,
  Button,
} from "@mantine/core";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { setProduct } from "@/lib/store/features/product/productSlice";
import { Product as basicProduct, chunk } from "@/components/product/utils";
import { Product as fullProduct } from "@/components/input/requestType";
import { Prisma } from "@prisma/client";

export default function Products() {
  const [load, setLoad] = useState<boolean>(true);
  const [redirect, setRedirect] = useState<string>("");
  const [activePage, setPage] = useState<number>(1);
  const [data, setData] = useState<basicProduct[][]>([]);
  const [items, setItems] = useState<JSX.Element[]>([]);

  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product);

  //   const setProductState = (data: fullProduct) => {
  //     dispatch(setProduct(data));
  //   };

  useEffect(() => {
    const updateProductState = (id: string) => {
      if (!product || product.id != id) {
        setRedirect(id);
        return;
      }
    };

    async function collectAll() {
      return await fetch("/api/products", { method: "GET" });
    }

    async function collectOne() {
      try {
        fetch("/api/products", {
          method: "POST",
          body: redirect,
        }).then((response) => {
          response.json().then((data: Prisma.ProductWhereUniqueInput) => {
            if (data) {
              dispatch(setProduct(data as fullProduct));
              //   setProductState(data as fullProduct);
            }
          });
        });
      } catch (error) {
        console.error(error);
      }
    }

    if (redirect) {
      collectOne().then(() => {
        setRedirect("");
      });
    }

    if (load) {
      setLoad(false);
      collectAll().then((response: Response) => {
        if (response.status == 200) {
          response.json().then((res) => {
            const resProducts: basicProduct[] = res;
            if (resProducts.length) {
              chunk(
                resProducts.map((p, index) => ({
                  index: index,
                  title: p.title,
                  image: p.image,
                  subtitle: p.subtitle,
                  id: p.id,
                })),
                5,
              ).then((retData) => {
                setData(retData);
                if (retData.length) {
                  setItems(
                    retData[activePage - 1].map((item) => (
                      <Card
                        key={item.title}
                        shadow="sm"
                        padding="lg"
                        radius="md"
                        withBorder
                        mah={275}
                        maw={275}
                        className="items-center align-middle justify-center"
                      >
                        <Card.Section mah={75} maw={75}>
                          <Image src={item.image} height={2} alt={item.title} />
                        </Card.Section>
                        <Group justify="space-between center" mt="md" mb="xs">
                          <Text fw={500}>{item.title}</Text>
                        </Group>

                        <Text size="xs" c="dimmed">
                          {item.subtitle}
                        </Text>
                        <Link
                          href="\"
                          onClick={() => updateProductState(item.id)}
                        >
                          <Button color="blue" fullWidth mt="md" radius="md">
                            View Item
                          </Button>
                        </Link>
                      </Card>
                    )),
                  );
                }
              });
            }
          });
        }
      });
    }
  }, [
    activePage,
    load,
    setLoad,
    items,
    setItems,
    redirect,
    setRedirect,
    dispatch,
    product,
  ]);

  return (
    <>
      <Center h={100} className="">
        <Box>Select Product to View</Box>
      </Center>
      <Center>{items}</Center>
      <Center>
        {data ? (
          <Pagination
            className="items-center align-middle justify-center"
            total={data.length}
            value={activePage}
            onChange={setPage}
            mt="sm"
          />
        ) : null}
      </Center>
    </>
  );
}
