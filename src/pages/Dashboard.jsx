import TransactionsTable from "../components/TransactionsTable"
import BalanceCard from "../components/BalanceCard"
import { Grid } from "@mui/material"

const Dashboard = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <TransactionsTable type={2} />
      </Grid>
      <Grid item xs={4}>
        <TransactionsTable type={1} />
      </Grid>
      <Grid item xs={3}>
        <BalanceCard />
      </Grid>
    </Grid>

  )
}

export default Dashboard