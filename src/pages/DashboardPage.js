import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ChartRenderer from "../components/ChartRenderer";
import Dashboard from "../components/Dashboard";
import DashboardItem from "../components/DashboardItem";
import EntityIdPickerRenderer from "../components/EntityIdPickerRenderer";
import DatePicker from "../components/DatePicker";
import Toolbar from "../components/Toolbar";
import Map from "../components/Map";

const DashboardPage = () => {
  const [entityIdFilter, setEntityIdFilter] = React.useState("");
  const [startDate, setStartDate] = React.useState(
    new Date("2019-01-01T00:00:00")
  );
  const [finishDate, setFinishDate] = React.useState(
    new Date("2022-01-01T00:00:00")
  );
  const [filterDateActive, setFilterDateActive] = React.useState(false);

  const entityIdVizState = {
    query: {
      measures: [],
      timeDimensions: [],
      order: {},
      filters: [],
      dimensions: ["AirQualityObserved.entityId"],
    },
  };

  const entityIdFilterQuery = {
    dimension: "AirQualityObserved.entityId",
    operator: "equals",
    values: [entityIdFilter],
  };

  const filters = entityIdFilter === "" ? [] : [entityIdFilterQuery];

  const dateFilterDimension = filterDateActive
    ? {
        granularity: "day",
        dateRange: [startDate, finishDate],
      }
    : {};

  const DashboardItems = [
    {
      id: 0,
      name: "Average SO2",
      vizState: {
        query: {
          measures: ["AirQualityObserved.avgSO2"],
          timeDimensions: [
            {
              dimension: "AirQualityObserved.dateobserved",
              ...dateFilterDimension,
            },
          ],
          order: {},
          filters: filters,
        },
        chartType: "number",
      },
    },
    {
      id: 1,
      name: "Average NO2",
      vizState: {
        query: {
          measures: ["AirQualityObserved.avgNO2"],
          timeDimensions: [
            {
              dimension: "AirQualityObserved.dateobserved",
              granularity: "hour",
              ...dateFilterDimension,
            },
          ],
          order: {},
          filters: filters,
        },
        chartType: "number",
      },
    },
    {
      id: 2,
      name: "Average SO2 per sensor",
      vizState: {
        query: {
          measures: ["AirQualityObserved.avgSO2"],
          timeDimensions: [
            {
              dimension: "AirQualityObserved.dateobserved",
              granularity: "hour",
              ...dateFilterDimension,
            },
          ],
          order: {
            "AirQualityObserved.avgSO2": "desc",
          },
          dimensions: ["AirQualityObserved.entityId"],
          filters: filters,
        },
        chartType: "line",
      },
    },
    {
      id: 3,
      name: "Average NO2 per sensor",
      vizState: {
        query: {
          measures: ["AirQualityObserved.avgNO2"],
          timeDimensions: [
            {
              dimension: "AirQualityObserved.dateobserved",
              granularity: "hour",
              ...dateFilterDimension,
            },
          ],
          order: {
            "AirQualityObserved.avgNO2": "desc",
          },
          dimensions: ["AirQualityObserved.entityId"],
          filters: filters,
        },
        chartType: "line",
      },
    },
  ];

  const dashboardItem = item => (
    <Grid item xs={12} lg={6} key={item.id}>
      <DashboardItem title={item.name}>
        <ChartRenderer vizState={item.vizState} />
      </DashboardItem>
    </Grid>
  );

  const Empty = () => (
    <div
      style={{
        textAlign: "center",
        padding: 12,
      }}
    >
      <Typography variant="h5" color="inherit">
        There are no charts on this dashboard. Use Playground Build to add one.
      </Typography>
    </div>
  );

  return DashboardItems.length ? (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Toolbar>
        <EntityIdPickerRenderer
          entityIdFilter={entityIdFilter}
          setEntityIdFilter={setEntityIdFilter}
          vizState={entityIdVizState}
        />
        <DatePicker
          active={filterDateActive}
          setActive={setFilterDateActive}
          startDate={startDate}
          setStartDate={setStartDate}
          finishDate={finishDate}
          setFinishDate={setFinishDate}
        />
      </Toolbar>
      <Dashboard>{DashboardItems.map(dashboardItem)}</Dashboard>
      <Map setEntityIdFilter={setEntityIdFilter}></Map>
    </div>
  ) : (
    <Empty />
  );
};

export default DashboardPage;
