import React, { useEffect, useState } from "react";

function App() {
  const [backendData, setBackendData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getData() {
    try {
      const response = await fetch("/api"); 
      if (!response.ok) {
        throw new Error("Network response was not ok!");
      }
      const data = await response.json();
      setBackendData(data.users);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <div>
          {backendData.length === 0 ? (
            <p>No data available.</p>
          ) : (
            <ul>
              {backendData.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
