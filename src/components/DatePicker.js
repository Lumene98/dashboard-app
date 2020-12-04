import "date-fns";
import React from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Checkbox from "@material-ui/core/Checkbox";
import { InputLabel } from "@material-ui/core";

const DatePicker = props => {
  const {
    startDate,
    setStartDate,
    finishDate,
    setFinishDate,
    active,
    setActive,
  } = props;

  const handleDateChange = date => {
    setStartDate(date);
  };
  const handleDateChangeFinish = date => {
    setFinishDate(date);
  };

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item>
          <InputLabel> Filter by Date: </InputLabel>
          <Checkbox onChange={() => setActive(!active)} />
        </Grid>
        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                id="date-picker-dialog"
                label={<span style={{ opacity: 0.6 }}>Start Date</span>}
                format="MM/dd/yyyy"
                value={startDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                disabled={!active}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                id="date-picker-dialog-finish"
                label={<span style={{ opacity: 0.6 }}>Finish Date</span>}
                format="MM/dd/yyyy"
                value={finishDate}
                onChange={handleDateChangeFinish}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                disabled={!active}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
    </div>
  );
};

export default DatePicker;
