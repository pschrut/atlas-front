import { Link } from "react-router-dom"
import TransactionsTable from "../components/TransactionsTable"

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard <Link to="/logout">Logout</Link></h1>
      <TransactionsTable />
    </div>
  )
}

export default Dashboard