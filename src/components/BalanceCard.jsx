import { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { convertToCurrency } from "../utils";
import useTransactionsStore from "../stores/useTransactionsStore";

export default function BalanceCard() {
  const balance = useTransactionsStore((state) => state.balance);
  const period = useTransactionsStore((state) => state.currentPeriod);
  const { fetchBalance } = useTransactionsStore();

  useEffect(() => {
    if (period && period.id) {
      fetchBalance(period.id);
    }
  }, [period]);

  return (
    <Card sx={{ minWidth: 275, boxShadow: 3 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Financial Summary
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" component="div">
            Total Incomes
          </Typography>
          <Typography
            variant="h6"
            component="div"
            color="green"
            fontWeight="normal"
          >
            {convertToCurrency(balance.balance_in)}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" component="div">
            Total Outcomes
          </Typography>
          <Typography
            variant="h6"
            component="div"
            color="red"
            fontWeight="normal"
          >
            {convertToCurrency(balance.balance_out)}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          my={2}
          bgcolor="rgba(0, 0, 255, 0.1)"
          p={1}
        >
          <Typography
            variant="h6"
            component="div"
            fontWeight="fontWeightMedium"
          >
            Balance
          </Typography>
          <Typography
            variant="h6"
            component="div"
            color="green"
            fontWeight="normal"
          >
            {convertToCurrency(balance.io_balance)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
