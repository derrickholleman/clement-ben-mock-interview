import { useState, useEffect } from "react";
import "./App.css";
import { getUsers } from "./utils/api";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(0);

  const handleIncrement = () => {
    setCount((count) => count + 1);
  };

  const handleAddUser = async () => {
    try {
      const fetchedUser = await getUsers(page);
      setUser(fetchedUser.results[0]);

      if (loaded) {
        setUsers((users) => [...users, user]);
        setPage((page) => page + 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setLoaded(false);
    handleAddUser();
    setLoaded(true);
  }, []);

  return (
    <div className="App">
      <button onClick={handleIncrement}>Increment Count</button>
      <p>{count}</p>
      <button onClick={handleAddUser}>Display another User</button>
      {loaded &&
        users.map((user) => (
          <div key={user.login.uuid}>
            <p>
              {user.name.first} {user.name.last}
            </p>
            <img src={user.picture.large} alt="selfie" />
          </div>
        ))}
    </div>
  );
}

export default App;
