import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const PeriodsFilter = () => {
  return (
    <FormControl variant='standard' sx={{ ml: 5, minWidth: 120 }} size='small'>
      <InputLabel id='demo-select-small-label'>Period</InputLabel>
      <Select
        labelId='demo-select-small-label'
        id='demo-select-small'
        value={1}
        label='Period'
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  );
};

export default PeriodsFilter;
