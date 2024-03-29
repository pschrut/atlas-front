import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axiosInstance from "../../axiosConfig";
import { convertToCurrency } from "../utils";

export default function BalanceCard() {
  const [balance, setBalance] = useState({});

  useEffect(() => {
    axiosInstance.get("balance").then((response) => {
      setBalance(response.data);
    });
  }, []);

  return (
    <Card elevation={5}>
      <CardContent>
        <Typography variant="h5" component="div">
          Balance
        </Typography>
        <Box display="flex" gap={3}>
          <Typography variant="h6" component="div">
            Incomes
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {convertToCurrency(balance.balance_in)}
          </Typography>
        </Box>
        <Box display="flex" gap={3}>
          <Typography variant="h6" component="div">
            Outcomes
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {convertToCurrency(balance.balance_out)}
          </Typography>
        </Box>
        <Box display="flex" gap={3}>
          <Typography variant="h6" component="div">
            Balance
          </Typography>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {convertToCurrency(balance.io_balance)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
