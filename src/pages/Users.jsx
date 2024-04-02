import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import Delete from "@mui/icons-material/Delete"
import Edit from "@mui/icons-material/Edit"
import Grid from "@mui/material/Grid"

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosInstance.get("users").then((data) => {
      setUsers(data.data.users);
    });
  }, []);

  return (
    <Grid container>
        <Grid item md="6">
            <TableContainer component={Paper} elevation={5}>
            <Table size="small">
                <TableHead>
                <TableRow>
                    <TableCell component="th">ID</TableCell>
                    <TableCell component="th">User Name</TableCell>
                    <TableCell component="th">Email</TableCell>
                    <TableCell component="th">Actions</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {users.map((user) => {
                    return (
                    <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell><Edit /> <Delete /></TableCell>
                    </TableRow>
                    );
                })}
                </TableBody>
            </Table>
            </TableContainer>
        </Grid>
        <Grid item md="6">
        </Grid>
    </Grid>
  );
}
