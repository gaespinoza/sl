"use client";
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks";
import { useDisclosure } from "@mantine/hooks";
import { LineChart } from "@mantine/charts";
import { Paper, Text, Table, TableData, Card } from "@mantine/core";
import { Sale } from "../input/requestType";
import { useEffect, useState } from "react";

export default function ChartView() {
  const [process, setProcess] = useState(true);
  const [sales, setSales] = useState<Sale[]>([]);
  const [tableData, setTableData] = useState<TableData>();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.product);

  interface ChartTooltipProps {
    label: string;
    payload: Record<string, any>[] | undefined;
  }

  function ChartTooltip({ label, payload }: ChartTooltipProps) {
    if (!payload) return null;

    return (
      <Paper px="md" py="sm" withBorder shadow="md" radius="md">
        <Text fw={500} mb={5}>
          {label}
        </Text>
        {payload.map((item: any) => (
          <Text key={item.name} c={item.color} fz="sm">
            {item.name}: {item.value}
          </Text>
        ))}
      </Paper>
    );
  }

  useEffect(() => {
    const sortByDate = (a: Sale, b: Sale) => {
      const aTime = new Date(a.weekEnding);
      const bTime = new Date(b.weekEnding);

      return aTime.getTime() - bTime.getTime();
    };
    if (product && product.sales && process) {
      setProcess(false);
      const s = [...product.sales];
      var t: number[][] = [];
      s.sort(sortByDate);
      s.map((sale) => {
        const date = new Date(sale.weekEnding);
        t = [
          ...t,
          [
            sale.retailSales,
            sale.retailerMargin,
            sale.unitsSold,
            sale.wholesaleSales,
            date.getTime(),
          ],
        ];
      });
      setSales(s);
      setTableData({
        caption: `Sales for ${product.title}`,
        head: [
          "Retail Sales",
          "Retailer Margin",
          "Units SolD",
          "Wholesale Sales",
          "Date",
        ],
        body: t,
      });
    }
  }, [product, process, setProcess, sales, setSales, setTableData]);

  return (
    <>
      {sales ? (
        <>
          <LineChart
            h={200}
            data={sales}
            dataKey="weekEnding"
            valueFormatter={(value) => `${Math.floor(value / 1000)}K`}
            withXAxis={false}
            tooltipProps={{
              content: ({ label, payload }) => (
                <ChartTooltip label={label} payload={payload} />
              ),
            }}
            series={[
              { name: "retailSales", color: "cyan" },
              { name: "wholesaleSales", color: "indigo" },
              { name: "unitsSold", color: "teal" },
              { name: "retailerMargin", color: "grape" },
            ]}
          ></LineChart>
          <div className="p-10">
            <Table.ScrollContainer minWidth={300}>
              <Table
                striped
                highlightOnHover
                stickyHeader
                data={tableData}
                draggable
              />
            </Table.ScrollContainer>
          </div>
        </>
      ) : (
        <Card>No Sales Recorded</Card>
      )}
    </>
  );
}
