import dlogo from './d.svg';
import './App.scss';
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

function MonsterCard() {
  return (
    <div className='MonsterCard'>
      Monster Card
    </div>
  )
}

function LootCard() {
  return (
    <div className='LootCard'>
      Loot Card
    </div>
  )
}

function TurnListCard() {
  return (
    <div className='TurnListCard'>
      Turn List Card
    </div>
  )
}


function App() {

  return (
    <div className='App'>
      <header className='App-header'>
        <img className='App-header-logo' src={dlogo} width={55} height={55} alt='Site logo'></img>
        <a href='https://github.com/Elsklivet/DnDash'>
          DnDash
        </a>
      </header>
      <div className='Toolbar'>
          <input type='text' className='TextInput' id='CommandInput'></input>
          <button className='ToolbarButton'>Run</button>
          <textarea className='CommandOutput' readOnly='readonly'></textarea>
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
