import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);

  const handleIncrement = () => {
    setCount((count) => count + 1);
  };

  useEffect(() => {
    setLoaded(false);
    async function getUser() {
      const userRes = await fetch("https://randomuser.me/api");
      const userJSON = await userRes.json();
      setUser(userJSON);
      setLoaded(true);
    }
    if (user) {
      getUser();
    }
  }, []);

  return (
    <div className="App">
      <button onClick={handleIncrement}>Increment Count</button>
      <p>{count}</p>

      {loaded && (
        <div>
          <p>
            {user.results[0].name.first} {user.results[0].name.last}
          </p>{" "}
          <img src={user.results[0].picture.large} alt="selfie" />{" "}
        </div>
      )}
    </div>
  );
}

export default App;
