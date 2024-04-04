import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect } from "react";
import { convertToCurrency } from "../utils";
import { formatDate } from "../utils";
import useTransactionsStore from "../stores/useTransactionsStore";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import FunctionsIcon from "@mui/icons-material/Functions";

export default function TransactionsTable({ type, rowColor }) {
  const theme = useTheme();
  const transactions = useTransactionsStore((state) => state.transactions);
  const periods = useTransactionsStore((state) => state.periods);
  const isLargestScreen = useMediaQuery("(min-width:1441px)");
  const { fetchData } = useTransactionsStore();

  useEffect(() => {
    if (periods.length > 0) {
      fetchData(type, periods[0]?.id);
    }
  }, [periods]);

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={5}
        sx={{
          maxHeight: 500,
          overflow: "auto",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
      >
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions[type].txs.map((tx) => (
              <TableRow
                key={tx.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell scope="row">{formatDate(tx.date)}</TableCell>
                <TableCell component="th" scope="row">
                  {isLargestScreen
                    ? tx.description
                    : `${tx.description.substring(0, 17)}...`}
                </TableCell>
                <TableCell align="right" sx={{ color: rowColor }}>
                  {convertToCurrency(tx.value)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper} elevation={5}>
        <Table size="small">
          <TableBody>
            <TableRow sx={{ "& > *": { borderTop: 2 } }}>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell
                align="right"
                width={180}
                style={{
                  position: "sticky",
                  bottom: 0,
                  backgroundColor: "#fff",
                }}
              >
                <Typography variant="p" color={rowColor} fontSize={16}>
                  <FunctionsIcon
                    fontSize="small"
                    style={{ position: "relative", top: 4 }}
                  />
                  {convertToCurrency(transactions[type].total)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
