import React from "react";
import { InputLabel } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import { useCubeQuery } from "@cubejs-client/react";

const EntityIdPicker = props => {
  const entityIds = props.resultSet
    ? [...props.resultSet.chartPivot().map(item => item.x), ""]
    : [];
  const { setEntityIdFilter, entityIdFilter } = props;
  const defaultIds = [];

  const handleClose = entityId => {
    setEntityIdFilter(entityId);
  };
  return (
    <Grid style={{ display: "flex", alignItems: "center" }}>
      <InputLabel id="label">entityId</InputLabel>
      <Select label="entityId" onChange={() => handleClose(entityIdFilter)}>
        {entityIds
          ? entityIds.map(entityId =>
              entityId === "" ? (
                <MenuItem key={"none"} onClick={() => handleClose(entityId)}>
                  {"none"}
                </MenuItem>
              ) : (
                <MenuItem key={entityId} onClick={() => handleClose(entityId)}>
                  {entityId}
                </MenuItem>
              )
            )
          : defaultIds.map(entityId => (
              <MenuItem key={entityId} onClick={() => handleClose(entityId)}>
                {entityId}
              </MenuItem>
            ))}
      </Select>
    </Grid>
  );
};

const EntityIdPickerRenderer = ({
  vizState,
  setEntityIdFilter,
  entityIdFilter,
}) => {
  const { query, chartType, ...options } = vizState;
  const renderProps = useCubeQuery(query);
  return EntityIdPicker({
    setEntityIdFilter,
    entityIdFilter,
    ...options,
    ...renderProps,
  });
};

export default EntityIdPickerRenderer;
