import dlogo from './d.svg';
import './App.scss';
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import MonsterCard from './Monster';
import TurnListCard from './Turns';
import LootCard from './Loot';

function App() {
  const [commandData, setCommandData] = useState({'commandInput': '', 'commandOutput': ''});

  function handleCommandChange(event) {
    setCommandData({
      ...commandData,
      [event.target.name]: event.target.value
    })
  }

  function handleCommandRun() {

    let commandIn = commandData.commandInput;
    let commandOut = 'Not a valid command';

    if (commandIn.startsWith("r ") || commandIn.startsWith("roll ")) {
      // Roll command
      commandOut = 'Rolling';
    } else if (commandIn.startsWith("clear cache")) {
      // Clear cache
      localStorage.removeItem('dndashMonsters');
      localStorage.removeItem('dndashLoot');
      localStorage.removeItem('dndashTurns');
      commandOut = 'Cache cleared.';
    }
    
    // Clear input
    setCommandData({
      ...commandData,
      commandInput: '',
      commandOutput: commandOut
    });
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <img className='App-header-logo' src={dlogo} width={55} height={55} alt='Site logo'></img>
        <a href='https://github.com/Elsklivet/DnDash'>
          DnDash
        </a>
      </header>
      <div className='Toolbar'>
          <input name='commandInput' type='text' className='TextInput' id='CommandInput' value={commandData.commandInput} onChange={handleCommandChange}></input>
          <button className='ToolbarButton' onClick={handleCommandRun}>Run</button>
          <textarea name='commandOutput' className='CommandOutput' readOnly='readonly' value={commandData.commandOutput}></textarea>
      </div>
      <div className='Content'>
        <MonsterCard></MonsterCard>
        <LootCard></LootCard>
        <TurnListCard></TurnListCard>
      </div>
    </div>
  );
}

export default App;
