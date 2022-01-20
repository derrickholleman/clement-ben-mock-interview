import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(0);

  const handleIncrement = () => {
    setCount((count) => count + 1);
  };

  useEffect(() => {
    setLoaded(false);
    handleAddUser();
    setLoaded(true);
  }, []);

  const handleAddUser = async () => {
    try {
      const userRes = await fetch(`https://randomuser.me/api/?page=${page}`);
      const userJSON = await userRes.json();
      setUser(userJSON.results[0]);

      if (loaded) {
        setUsers((users) => [...users, user]);
        setPage((page) => page + 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

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
