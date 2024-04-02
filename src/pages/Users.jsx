import { useEffect, useState } from "react";
import axiosInstance from "../../axiosConfig";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosInstance.get("users").then((data) => {
        setUsers(data.data.users)
    })
  }, []);

  return <div>
    {users.map(user => {
        return <div key={user.id}>{user.username}</div>
    })}
  </div>;
}
