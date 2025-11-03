import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Card from './Card';
import SearchBox from './SearchBox';
import ErrorBoundary from './ErrorBoundary';
import reportWebVitals from './reportWebVitals';
import 'tachyons';  // Importing tachyons CSS framework

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        // jsonplaceholder users have 'name' and 'email' fields
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Failed to fetch users');
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const filteredRobots = users.filter(user => {
    return (
      user.name.toLowerCase().includes(searchField.toLowerCase()) ||
      user.email.toLowerCase().includes(searchField.toLowerCase())
    );
  });

  return (
    <div className='container'>
      <header className="header">
        <h1>RoboFriends</h1>
        <SearchBox searchChange={onSearchChange} />
      </header>

      {loading && (
        <div style={{ textAlign: 'center', color: 'white', paddingTop: 40 }}>Loading users...</div>
      )}

      {error && (
        <div style={{ textAlign: 'center', color: '#ffdddd', paddingTop: 20 }}>
          Error loading users: {error}
        </div>
      )}

      {!loading && !error && (
        <div className="card-list">
          {filteredRobots.map((user) => (
            <Card
              key={user.id}
              title={user.name}
              description={user.email}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
