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

  function roll(numDice, diceMax, mod) {
    function randInt(max) {
      return Math.floor(Math.random() * max) + 1;
    }

    let total = 0;
    let inds = [];
    for (let r = 0; r < numDice; r++) {
      let res = randInt(diceMax);
      total += res;
      inds.push(`${res}`);
    }
    total += mod;
    inds.push(`${mod}`);

    let individuals = inds.join(' + ');

    return `${total} = ${individuals}`;
  }

  function handleCommandRun() {

    let commandIn = commandData.commandInput;
    let commandOut = 'Not a valid command';

    if (commandIn.startsWith("r ") || commandIn.startsWith("roll ")) {
      // Roll command
      let rollString = commandIn.split(' ')[1];
      // Get with regex
      let regexp = /(\d+)d(\d+)(\+(\d+))?/g;
      let matches = regexp.exec(rollString);
      let numDice = 0;
      let diceMax = 0;
      let mod = 0;

      if (matches.length === 5) {
        numDice = parseInt(matches[1]);
        diceMax = parseInt(matches[2]);
        if (mod !== undefined)
          mod = parseInt(matches[4]);
        commandOut = `Result: ${roll(numDice, diceMax, mod)}`;
      }  else {
        commandOut = 'Incorrect roll format. Must be #d#+# where # are numbers.';
      }
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
