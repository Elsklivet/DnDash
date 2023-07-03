import dlogo from './d.svg';
import './App.scss';
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { Monster, MonsterCard, AddMonsterCard } from './Monster';

function AddLootCard() {
  return (
    <div className='AddLootCard'>
      <div style={{'gridArea': 'name'}}>
        <label>Name: </label>
        <input type='text' style={{'width': '90%'}}></input>
      </div>
      <div style={{'gridArea': 'url'}}>
        <label>Details URL: </label>
        <input type='text' style={{'width':'84%'}}></input>
      </div>
      <div style={{'gridArea': 'gp'}}>
        <label>GP: </label>
        <input type='text' style={{'width':'85%'}}></input>
      </div>
      <div style={{'gridArea': 'class'}}>
        <label>Class: </label>
        <input type='text' style={{'width':'85%'}}></input>
      </div>
      <div style={{'gridArea': 'desc'}}>
        <label>Description: </label>
        <input type='text' style={{'width':'84%'}}></input>
      </div>
      <div style={{'gridArea': 'btn'}}>
        <button className='Button' style={{'width':'50%'}}>Add</button>
        <button className='Button' style={{'width':'50%'}}>Cancel</button>
      </div>
    </div>
  )
}

function LootCard() {
  return (
    <div className='LootCard'>
      <h3>Loot Card</h3>
      <AddLootCard></AddLootCard>
    </div>
  )
}

function AddTurnCard() {
  return (
    <div className='AddTurnCard'>
      <div style={{'gridArea': 'name'}}>
        <label>Name: </label>
        <input type='text' style={{'width': '90%'}}></input>
      </div>
      <div style={{'gridArea': 'init'}}>
        <label >Init: </label>
        <input type='text' style={{'width': '93.3%'}}></input>
      </div>
      <div style={{'gridArea': 'btn'}}>
        <button className='Button' style={{'width':'50%'}}>Add</button>
        <button className='Button' style={{'width':'50%'}}>Cancel</button>
      </div>
    </div>
  )
}

function TurnListCard() {
  return (
    <div className='TurnListCard'>
      <h3>Turn List Card</h3>
      <AddTurnCard></AddTurnCard>
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
