import dlogo from './d.svg';
import './App.css';
import React from 'react';
import settings from './settings.json';

class Card extends React.Component {
  render() {
    return <div className='Card'>
      <span className='CardTitle' id={`Card${this.props.title}`}>{this.props.title}</span>
      <br></br>
      <span>Hey there!</span>
    </div>;
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="App-header-logo" src={dlogo} width={55} height={55} alt="Site logo"></img>
        <a href="https://github.com/Elsklivet/DnDash">
          DnDash
        </a>
      </header>
      <div className="Toolbar">
        <button class="ToolbarButton">Button1</button>
        <button class="ToolbarButton">Button2</button>
        <button class="ToolbarButton">Button3</button>
        <button class="ToolbarButton">Button4</button>
        <button class="ToolbarButton">Button5</button>
      </div>
      <div className="Content">
        <Card title="Monsters"></Card>
        <Card title="Loot"></Card>
      </div>
    </div>
  );
}

export default App;
