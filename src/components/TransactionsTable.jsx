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

export default function TransactionsTable({ type }) {
  const transactions = useTransactionsStore(
    (state) => state.transactions[type]
  );
  const { fetchData } = useTransactionsStore();

  useEffect(() => {
    fetchData(type);
  }, []);

  return (
    <TableContainer component={Paper} elevation={5}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx) => (
            <TableRow
              key={tx.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell scope="row">{formatDate(tx.date)}</TableCell>
              <TableCell component="th" scope="row">
                {tx.description}
              </TableCell>
              {tx.type === "1" ? (
                <TableCell align="right" sx={{ color: "red" }}>
                  {convertToCurrency(tx.value)}
                </TableCell>
              ) : (
                <TableCell align="right" sx={{ color: "green" }}>
                  {convertToCurrency(tx.value)}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
