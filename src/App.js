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

  const handleAddUser = () => {
    if (loaded) {
      // add fetched user on button click
      setUsers((users) => [...users, user]);
      setPage((page) => page + 1);
    }
  };

  useEffect(async () => {
    // fetch a user on page load, with the updated page number
    const fetchedUser = await getUsers(page);
    setUser(fetchedUser.results[0]);
    setLoaded(true);

    return () => setLoaded(false);
  }, [users, page]);

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
