import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import PeriodsFilter from "./PeriodsFilter";
import useTransactionsStore from "../stores/useTransactionsStore";

function Filters() {
  const { setIgnoreLowValues } = useTransactionsStore();

  const handleIgnoreLowValues = (e) => {
    setIgnoreLowValues(e.target.checked);
  };

  return (
    <Grid container sx={{ ml: 2 }}>
      <Grid item md={2}>
        <PeriodsFilter />
      </Grid>
      <Grid item>
        <FormControlLabel
          value="hidelowvalues"
          control={<Switch color="default" defaultChecked />}
          label="Hide ints."
          labelPlacement="start"
          onChange={handleIgnoreLowValues}
        />
        <FormControlLabel
          value="hideinvestments"
          control={<Switch color="default" defaultChecked />}
          label="Hide invs."
          labelPlacement="start"
        />
      </Grid>
    </Grid>
  );
}

export default Filters;
