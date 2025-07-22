import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Secrets from Postman will be displayed below:
        </p>
        <p>
          DB Username: {process.env.REACT_APP_DB_USERNAME}
        </p>
        <p>
          DB Password: {process.env.REACT_APP_DB_PASSWORD}
        </p>
        <p>
          DB Port: {process.env.REACT_APP_DB_PORT}
        </p>
      </header>
    </div>
  );
}

export default App;