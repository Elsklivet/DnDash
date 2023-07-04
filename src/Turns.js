import './App.scss';
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

export function Turn(props) {
    const [turnData, setTurnData] = useState({
        name: props.tData.name,
        init: props.tData.init,
        key: props.tData.key,
    });

    function handleDeleteClick() {
        props.deleteHandler(props.tData.key);
    }

    return (
        <div className='Turn'>
            <div style={{'gridArea': 'name'}}>
                <label name='name' style={{'width': '85%', 'textDecoration': 'underline'}}>{turnData.name}</label>
            </div>
            <div style={{'gridArea': 'init'}}>
                <label>Init: </label>
                <label name='init' style={{'width': '85%'}}>{turnData.init}</label>
            </div>
            <div style={{'gridArea': 'del'}}>
                <button className='Button' style={{'width':'100%'}} onClick={handleDeleteClick}>X</button>
            </div>
        </div>
    );
}

export function AddTurnCard(props) {
    const [turnData, setTurnData] = useState({
        name: '',
        init: ''
    });

    function handleTextChange(event) {
        setTurnData({
          ...turnData,
          [event.target.name]: event.target.value
        });
      }
    
    function handleAddClick() {
        props.addHandler(turnData);
        setTurnData({
            name: '',
            init: ''
        });
        props.cancelHandler();
    }
    
    function handleCancelClick() {
        setTurnData({
            name: '',
            init: ''
        });
  
        props.cancelHandler();
    }

    return (
      <div className='AddTurnCard'>
        <div style={{'gridArea': 'name'}}>
          <label>Name: </label>
          <input name='name' type='text' style={{'width': '90%'}} value={turnData.name} onChange={handleTextChange}></input>
        </div>
        <div style={{'gridArea': 'init'}}>
          <label >Init: </label>
          <input name='init' type='text' style={{'width': '93.3%'}} value={turnData.init} onChange={handleTextChange}></input>
        </div>
        <div style={{'gridArea': 'btn'}}>
          <button className='Button' style={{'width':'50%'}} onClick={handleAddClick}>Add</button>
          <button className='Button' style={{'width':'50%'}} onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
    )
  }
  
export default function TurnListCard() {
    const [turns, setTurns] = useState(JSON.parse(localStorage.getItem('dndashTurns')) ? JSON.parse(localStorage.getItem('dndashTurns')) : []);
    const [numTurns, setNumTurns] = useState(turns && turns.length > 0 ? turns[turns.length - 1].key : 0);
    const [addingTurn, setAddingTurn] = useState(false);

    // Save turns
    useEffect(() => {
        localStorage.setItem('dndashTurns', JSON.stringify(turns));
    }, [turns]);
  
    function handleAddTurn(turnValues) {
        const turnId = numTurns;
        let newTurns = [...turns, {...turnValues, key: turnId}];
        newTurns = newTurns.sort((turnA, turnB) => turnB.init - turnA.init);
        setNumTurns(numTurns + 1);
        setTurns(newTurns);
    }

    function handleDeleteTurn(turnKey) {
        setNumTurns(numTurns - 1);
        setTurns(turns.filter(turn => turn.key !== turnKey));
    }

    function handleCancelClick() {
        setAddingTurn(false);
    }

    function handleAddingClick() {
        setAddingTurn(true);
    }

    return (
      <div className='TurnListCard'>
        <h3>Turn List Card</h3>
        {turns.map(
            turn => <Turn tData={turn} deleteHandler={handleDeleteTurn} key={turn.key}></Turn>
        )}
        {addingTurn ? 
            <AddTurnCard addHandler={handleAddTurn} cancelHandler={handleCancelClick}></AddTurnCard> 
            : <button className='Button' style={{'width':'100%'}} onClick={handleAddingClick}>+</button>}
      </div>
    )
}