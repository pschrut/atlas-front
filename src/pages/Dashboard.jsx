import TransactionsTable from "../components/TransactionsTable"
import BalanceCard from "../components/BalanceCard"
import { Box, Container, Grid } from "@mui/material"
import Header from "../components/Header"

const Dashboard = () => {
  return (
    <Box>
    <Grid container spacing={2} justifyContent="center">
        <Grid item xs={11.4}>
          <Header />
        </Grid>
        <Grid item xs={4.7}>
          <TransactionsTable type={2} />
        </Grid>
        <Grid item xs={4.7}>
          <TransactionsTable type={1} />
        </Grid>
        <Grid item xs={2}>
          <BalanceCard />
        </Grid>
      </Grid>
    </Box>
  )
}

export default Dashboard