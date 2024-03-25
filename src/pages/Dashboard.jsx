import { useEffect } from "react"
import { useState } from "react"

function Dashboard() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/transactions', {
      method: 'GET',
      credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
      setTransactions(data.txs);
    }).catch(error => {
      alert('There was an error!', error);
    })
  }, [])

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {transactions.map(transaction => (
          <li key={transaction.id}>{transaction.description} - {transaction.value}</li>
        ))}
      </ul>
    </div>
  )
}

export default Dashboard