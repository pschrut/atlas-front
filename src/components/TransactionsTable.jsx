import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import { useEffect, useState } from "react"

function TransactionsTable() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
      fetch("http://localhost:5000/transactions", { method: "GET", credentials: "include" })
        .then(response => response.json())
        .then(data => {
          setTransactions(data.txs)
        }).catch(error => {
          console.log("There was an error!", error)
        })
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table sx={{ maxWidth: 650 }} size="small" aria-label="a dense table">
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
              <TableCell scope="row">{tx.date}</TableCell>
              <TableCell component="th" scope="row">{tx.description}</TableCell>
              {
                tx.type === "1" ? <TableCell align="right" sx={{color: "red"}}>{tx.value}</TableCell> : <TableCell align="right" sx={{color: "green"}}>{tx.value}</TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionsTable
