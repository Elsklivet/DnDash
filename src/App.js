import dlogo from './d.svg';
import './App.css';
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import settings from './settings.json';

var key = 0;

function AddMonsterCard(props) {
  return (
    <div className="AddMonsterCard">
      Here is where you add a monster card
    </div>
  );
}

function AddLootCard(props) {
  return (
    <div className="AddLootCard">
      Here is where you add a loot card
    </div>
  );
}

function MonsterCard(props) {
  return (
    <div className="MonsterCard">
      <span>A monster named {props.obj.name} with hp {props.obj.hp} goes here</span>
    </div>
  );
}

function LootCard(props) {
  return (
    <div className="LootCard">
      <span>A loot item named {props.obj.name} worth {props.obj.value} goes here</span>
    </div>
  );
}

const Card = forwardRef((props, ref) => {
  let [subcards, setSubcards] = useState(Array())
  let [adderVisible, setAdderVisible] = useState(false)

  useEffect(() => {
    // Do I need this?
  }, [adderVisible])

  useImperativeHandle(ref, () => ({
    tick
  }))

  function tick() {
    console.log(`Card${props.title}AddButton was ticked`)
  }

  function addSubCard() {
    console.log(`Card${props.title}AddButton was clicked`)
    // document.getElementById(`Card${props.title}AddButton`).innerText = `bingus`;
    switch (props.title) {
      case "Monsters":
        // Monster card
        // Here we should actually unhide a component that is used to gather all the information for a monster, then 
        // when an "add" or "submit" button is pressed there, it will add a new subcard with
        // that info then set its properties to be hidden (https://www.geeksforgeeks.org/how-to-set-parent-state-from-children-component-in-reactjs/)
        setAdderVisible(true)
        // setSubcards(prevSubcards => prevSubcards.concat({"key": key, "name": "bingus", "hp": 180}))
        key++;
        break;
      case "Loot":
        // Loot card
        setAdderVisible(true)
        // setSubcards(prevSubcards => prevSubcards.concat({"key": key, "name": "bingus' claws", "value": "280 GP"}))
        key++;
        break;

      default:
        // Unknown card type, always an error.
        break;
    }
  }

  function renderSubCard(subcard) {
    switch (props.title) {
      case "Monsters":
        // Monster card
        return <MonsterCard obj={subcard} key={subcard.key}></MonsterCard>

      case "Loot":
        // Loot card
        return <LootCard obj={subcard} key={subcard.key}></LootCard>
        
      default:
        // Unknown card type, always an error.
        break;
    }
  }

  return (
    <>
    <div className='Card'>
      <span className='CardTitle' id={`Card${props.title}`}>{props.title}</span>
      <div className="CardToolbar">
        <button className="ToolbarButton" onClick={() => tick()}>TICK</button>
      </div>
      {subcards !== undefined && subcards.length > 0 && subcards.map(subcard => {
        return renderSubCard(subcard)
      })}
      { props.title === "Monsters" && adderVisible && <AddMonsterCard id={`AddMonsterCard`}></AddMonsterCard> }
      { props.title === "Loot" && adderVisible && <AddLootCard id={`AddLootCard`}></AddLootCard> }
      <button className='AddButton' id={`Card${props.title}AddButton`} onClick={() => addSubCard()}>+</button>
    </div>
    </>
  );
})

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <img className="App-header-logo" src={dlogo} width={55} height={55} alt="Site logo"></img>
        <a href="https://github.com/Elsklivet/DnDash">
          DnDash
        </a>
      </header>
      <div className='Toolbar'>
          <button className='ToolbarButton'>Bingus</button>
      </div>
      <div className="Content">
        <Card title="Monsters" ></Card>
        <Card title="Loot" ></Card>
        <button className='AddCardButton'>+</button>
      </div>
    </div>
  );
}

export default App;
