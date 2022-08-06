import logo from './logo.svg';
import dlogo from './d.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="App-header-logo" src={dlogo} width={55} height={55} alt="Site logo"></img>
        <a>
          DnDash
        </a>
      </header>
      <div className="Content">
        Main content goes here
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        Hey there!
      </div>
    </div>
  );
}

export default App;
