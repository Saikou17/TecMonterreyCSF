import * as React from "react";
import { useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Link } from "@mui/material";
import { useGetList } from "react-admin";
import { startOfMonth, format } from "date-fns";
import { ResponsiveBar } from "@nivo/bar";

import { Deal } from "./types";

const multiplier = {
  opportunity: 0.2,
  "proposal-sent": 0.5,
  "in-negociation": 0.8,
  delayed: 0.3,
};

export const GraficaTickets = () => {
  const { data, isLoading } = useGetList<Deal>("deals", {
    pagination: { perPage: 100, page: 1 },
    sort: {
      field: "start_at",
      order: "ASC",
    },
  });

  const months = useMemo(() => {
    if (!data) return [];
    const dealsByMonth = data.reduce((acc, deal) => {
      const month = startOfMonth(
        deal.start_at ? new Date(deal.start_at) : new Date()
      ).toISOString();
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(deal);
      return acc;
    }, {} as any);

    const amountByMonth = Object.keys(dealsByMonth).map((month) => {
      return {
        date: format(new Date(month), "MMM"),
        resuelto: dealsByMonth[month]
          .filter((deal: Deal) => deal.stage === "resuelto")
          .reduce((acc: number, deal: Deal) => {
            acc += deal.amount;
            return acc;
          }, 0),
        por_resolver: dealsByMonth[month]
          .filter((deal: Deal) => deal.stage === "por resolver")
          .reduce((acc: number, deal: Deal) => {
            acc -= deal.amount;
            return acc;
          }, 0),
      };
    });

    return amountByMonth;
  }, [data]);

  if (isLoading) return null; // FIXME return skeleton instead

  const range = months.reduce(
    (acc, month) => {
      acc.min = Math.min(acc.min, month.por_resolver);
      acc.max = Math.max(acc.max, month.resuelto);
      return acc;
    },
    { min: 0, max: 0 }
  );

  return (
    <>
      <Box display="flex" alignItems="center">
        <Box ml={2} mr={2} display="flex"></Box>
        <Link
          underline="none"
          variant="h5"
          color="textSecondary"
          component={RouterLink}
          to="/deals"
        >
          Tickets Resueltos y No Resueltos
        </Link>
      </Box>
      <Box height={500}>
        <ResponsiveBar
          data={months}
          indexBy="date"
          keys={["resuelto", "por resolver"]}
          colors={["#61cdbb", "#97e3d5", "#e25c3b"]}
          margin={{ top: 50, right: 50, bottom: 50, left: 0 }}
          padding={0.3}
          valueScale={{
            type: "linear",
            min: range.min * 1.2,
            max: range.max * 1.2,
          }}
          indexScale={{ type: "band", round: true }}
          enableGridX={true}
          enableGridY={false}
          enableLabel={false}
          axisTop={{
            tickSize: 0,
            tickPadding: 12,
          }}
          axisBottom={{
            legendPosition: "middle",
            legendOffset: 50,
            tickSize: 0,
            tickPadding: 12,
          }}
          axisLeft={null}
          axisRight={{
            format: (v: any) => `${Math.abs(v / 1000)}k`,
            tickValues: 8,
          }}
          markers={
            [
              {
                axis: "y",
                value: 0,
                lineStyle: { strokeOpacity: 0 },
                textStyle: { fill: "#2ebca6" },
                legend: "Resueltos",
                legendPosition: "top-left",
                legendOrientation: "vertical",
              },
              {
                axis: "y",
                value: 0,
                lineStyle: {
                  stroke: "#f47560",
                  strokeWidth: 1,
                },
                textStyle: { fill: "#e25c3b" },
                legend: "Por Resolver",
                legendPosition: "bottom-left",
                legendOrientation: "vertical",
              },
            ] as any
          }
        />
      </Box>
    </>
  );
};
