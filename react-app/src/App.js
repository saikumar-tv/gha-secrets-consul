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
          SECRET_ONE: {process.env.REACT_APP_SECRET_ONE}
        </p>
        <p>
          SECRET_TWO: {process.env.REACT_APP_SECRET_TWO}
        </p>
      </header>
    </div>
  );
}

export default App;