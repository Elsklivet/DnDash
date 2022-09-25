import dlogo from './d.svg';
import './App.scss';
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

function MonsterCard() {

  function AddMonsterCard() {
    return (
      <div className='AddMonsterCard'>
        <div style={{'grid-area': 'name'}}>
          <label>Name: </label>
          <input type='text' style={{'width': '85%'}}></input>
        </div>
        <div style={{'grid-area': 'hp'}}>
          <label>HP: </label>
          <input type='text'></input>
        </div>
        <div style={{'grid-area': 'xp'}}>
          <label>XP: </label>
          <input type='text'></input>
        </div>
        <div style={{'grid-area': 'ac'}}>
          <label>AC: </label>
          <input type='text'></input>
        </div>
        <div style={{'grid-area': 'init'}}>
          <label>Init: </label>
          <input type='text'></input>
        </div>
        <div style={{'grid-area': 'stag'}}>
          <label>Stagger: </label>
          <input type='text'></input>
          <input type='text' style={{'max-width': '60px', 'margin-left':'5px'}}></input>
        </div>
        <div style={{'grid-area': 'spell'}}>
          <label>Spell Slots: </label>
          <input type='text' style={{'width':'70%'}}></input>
        </div>
        <div style={{'grid-area': 'status'}}>
          <label>Status: </label>
          <input type='text' style={{'width':'90%'}}></input>
        </div>
        <div style={{'grid-area': 'url'}}>
          <label>Details URL: </label>
          <input type='text' style={{'width':'84%'}}></input>
        </div>
        <div style={{'grid-area': 'btn'}}>
          <button className='Button' style={{'width':'50%'}}>Add</button>
          <button className='Button' style={{'width':'50%'}}>Cancel</button>
        </div>
      </div>
    )
  }
  
  return (
    <div className='MonsterCard'>
      <h3>Monster Card</h3>
      <AddMonsterCard></AddMonsterCard>
    </div>
  )
}

function LootCard() {

  function AddLootCard() {
    return (
      <div className='AddLootCard'>
        <div style={{'grid-area': 'name'}}>
          <label>Name: </label>
          <input type='text' style={{'width': '90%'}}></input>
        </div>
        <div style={{'grid-area': 'url'}}>
          <label>Details URL: </label>
          <input type='text' style={{'width':'84%'}}></input>
        </div>
        <div style={{'grid-area': 'gp'}}>
          <label>GP: </label>
          <input type='text' style={{'width':'85%'}}></input>
        </div>
        <div style={{'grid-area': 'class'}}>
          <label>Class: </label>
          <input type='text' style={{'width':'85%'}}></input>
        </div>
        <div style={{'grid-area': 'desc'}}>
          <label>Description: </label>
          <input type='text' style={{'width':'84%'}}></input>
        </div>
        <div style={{'grid-area': 'btn'}}>
          <button className='Button' style={{'width':'50%'}}>Add</button>
          <button className='Button' style={{'width':'50%'}}>Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div className='LootCard'>
      <h3>Loot Card</h3>
      <AddLootCard></AddLootCard>
    </div>
  )
}

function TurnListCard() {

  function AddTurnCard() {
    return (
      <div className='AddTurnCard'>
        <div style={{'grid-area': 'name'}}>
          <label>Name: </label>
          <input type='text' style={{'width': '90%'}}></input>
        </div>
        <div style={{'grid-area': 'init'}}>
          <label >Init: </label>
          <input type='text' style={{'width': '93.3%'}}></input>
        </div>
        <div style={{'grid-area': 'btn'}}>
          <button className='Button' style={{'width':'50%'}}>Add</button>
          <button className='Button' style={{'width':'50%'}}>Cancel</button>
        </div>
      </div>
    )
  }
  
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
