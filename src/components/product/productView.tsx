"use client";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { useDisclosure } from "@mantine/hooks";
import {
  Drawer,
  Button,
  Center,
  Image,
  Title,
  Text,
  List,
  Badge,
  Blockquote,
  Spoiler,
} from "@mantine/core";
import ChartView from "./chartView";
import { useEffect, useState } from "react";

export default function ProductView() {
  const [opened, { open, close }] = useDisclosure(false);
  const [details, setDetails] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product);

  useEffect(() => {
    if (product && product.details && !details) {
      const data: string[] = JSON.parse(product.details);
      setDetails(data);
    }
  }, [product, details, setDetails]);

  return (
    <>
      {product ? (
        <>
          <Drawer opened={opened} onClose={close} title={"Details"}>
            <Center>
              <Image
                mah={200}
                maw={200}
                src={product?.image}
                alt={product.title}
              ></Image>
            </Center>
            <Center>
              <Title order={3}>{product?.title}</Title>
            </Center>

            <Text
              className="items-center align-middle justify-center"
              c="dimmed"
            >
              {product?.subtitle}
            </Text>

            <List type="unordered" size="xs">
              {details
                ? details.map((detail: string, index: number) => (
                    <List.Item key={index}>{detail}</List.Item>
                  ))
                : null}
            </List>

            {product.tags?.map((tag, index) => (
              <Badge key={index}>{tag.name}</Badge>
            ))}

            {product.reviews?.map((review, index) => (
              <Blockquote
                key={index}
                color="blue"
                cite={`- ${review.customer}`}
                mt="md"
              >
                {review.score}
                <Spoiler
                  key={index}
                  maxHeight={30}
                  showLabel="show more"
                  hideLabel="hide"
                >
                  {review.review}
                </Spoiler>
              </Blockquote>
            ))}
          </Drawer>
          <div className="w-full">
            <div className="w-full">
              <Center mah={1}>
                <div className="grid grid-cols-1">
                  <Title order={1}>{product?.title}</Title>
                  <Button onClick={open}>More Details...</Button>
                </div>
              </Center>
            </div>
            <div className="p-10">
              <div className="">
                <ChartView />
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}
