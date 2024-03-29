import TransactionsTable from "../components/TransactionsTable";
import BalanceCard from "../components/BalanceCard";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import useTransactionsStore from "../stores/useTransactionsStore";

export default function Dashboard() {
  const transactions = useTransactionsStore((state) => state.transactions);

  return (
    <Box>
      <Grid container spacing={2} justifyContent="center">
        {Object.keys(transactions).map((type) => (
          <Grid item xs={12} lg={4} key={type}>
            <TransactionsTable type={type} rowColor={type === "1" ? "red" : "green"} />
          </Grid>
        ))}
        <Grid item xs={6} lg={4}>
          <BalanceCard />
        </Grid>
      </Grid>
    </Box>
  );
}
