import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="bg-primaryGreen text-white min-h-screen flex items-center justify-center">
      <header className="bg-white text-darkGreen p-8 rounded-lg shadow-lg text-center">
        <img src={logo} className="App-logo mb-4" alt="logo" />
        <p className="text-xl font-semibold">
          Edit <code className="bg-lightGreen px-1 py-0.5 rounded">src/App.js</code> and save to reload.
        </p>
        <a
          className="text-primaryGreen hover:text-darkGreen mt-4 inline-block"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
