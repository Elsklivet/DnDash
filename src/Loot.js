import './App.scss';
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

export function Loot(props) {
    const [lootData, setLootData] = useState({
        name: props.lData.name,
        gp: props.lData.gp,
        url: props.lData.url,
        class: props.lData.class,
        desc: props.lData.desc,
        key: props.lData.key,
    });

    function handleDeleteClick() {
        props.deleteHandler(props.lData.key);
    }

    return (
        <div className='Loot'>
            <div style={{'gridArea': 'name'}}>
                <label name='name' style={{'width': '85%', 'textDecoration': 'underline'}}>{lootData.name}</label>
            </div>
            <div style={{'gridArea': 'del'}}>
                <button className='Button' style={{'width':'100%'}} onClick={handleDeleteClick}>X</button>
            </div>
            <div style={{'gridArea': 'url'}}>
                <label>Details: </label>
                {lootData.url === '' ?
                    <label name='lUrl' style={{'width':'75%'}}>None</label>
                    :
                    <a name='lUrl' href={lootData.url}>Link</a>
                }
            </div>
            <div style={{'gridArea': 'gp'}}>
                <label>GP: </label>
                <label name='gp'>{lootData.gp}</label>
            </div>
            <div style={{'gridArea': 'desc'}}>
                <label>Description: </label><br></br>
                <textarea name='desc' readOnly='readonly' 
                style={{'width': '98%', 'resize': 'none', 'backgroundColor': 'var(--card-background)', 'color':'#ffffff', 'border':'none'}} value={lootData.desc}></textarea>
            </div>
        </div>
    );
}

export function AddLootCard(props) {
    const [lootData, setLootData] = useState({
        name: '',
        url: '',
        gp: '',
        class: '',
        desc: ''
    });

    function handleTextChange(event) {
        setLootData({
          ...lootData,
          [event.target.name]: event.target.value
        });
      }
    
    function handleAddClick() {
        props.addHandler(lootData);
        setLootData({
            name: '',
            url: '',
            gp: '',
            class: '',
            desc: ''
        });
        props.cancelHandler();
    }
    
    function handleCancelClick() {
        setLootData({
            name: '',
            url: '',
            gp: '',
            class: '',
            desc: ''
        });
  
        props.cancelHandler();
    }

    return (
      <div className='AddLootCard'>
        <div style={{'gridArea': 'name'}}>
          <label>Name: </label>
          <input name='name' type='text' style={{'width': '90%'}} value={lootData.name} onChange={handleTextChange}></input>
        </div>
        <div style={{'gridArea': 'url'}}>
          <label>Details URL: </label>
          <input name='url' type='text' style={{'width':'84%'}} value={lootData.url} onChange={handleTextChange}></input>
        </div>
        <div style={{'gridArea': 'gp'}}>
          <label>GP: </label>
          <input name='gp' type='text' style={{'width':'85%'}} value={lootData.gp} onChange={handleTextChange}></input>
        </div>
        <div style={{'gridArea': 'class'}}>
          <label>Class: </label>
          <input name='class' type='text' style={{'width':'85%'}} value={lootData.class} onChange={handleTextChange}></input>
        </div>
        <div style={{'gridArea': 'desc'}}>
          <label>Description: </label>
          <input name='desc' type='text' style={{'width':'84%'}} value={lootData.desc} onChange={handleTextChange}></input>
        </div>
        <div style={{'gridArea': 'btn'}}>
          <button className='Button' style={{'width':'50%'}} onClick={handleAddClick}>Add</button>
          <button className='Button' style={{'width':'50%'}} onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
    )
  }
  
export default function LootCard() {
    const [loots, setLoots] = useState(JSON.parse(localStorage.getItem('dndashLoot')) ? JSON.parse(localStorage.getItem('dndashLoot')) : []);
    const [numLoots, setNumLoots] = useState(loots && loots.length > 0 ? loots[loots.length-1].key : 0);
    const [addingLoot, setAddingLoot] = useState(false);

    // Save loots
    useEffect(() => {
        localStorage.setItem('dndashLoot', JSON.stringify(loots));
    }, [loots]);
  
    function handleAddLoot(lootValues) {
        const lootId = numLoots;
        setNumLoots(numLoots + 1);
        setLoots([
            ...loots,
            {...lootValues, key: lootId}
        ]);
    }

    function handleDeleteLoot(lootKey) {
        setNumLoots(numLoots - 1);
        setLoots(loots.filter(loot => loot.key !== lootKey));
    }

    function handleCancelClick() {
        setAddingLoot(false);
    }

    function handleAddingClick() {
        setAddingLoot(true);
    }

    return (
      <div className='LootCard'>
        <h3>Loot Card</h3>
        {loots.map(
            loot => <Loot lData={loot} deleteHandler={handleDeleteLoot} key={loot.key}></Loot>
        )}
        {addingLoot ? 
        <AddLootCard addHandler={handleAddLoot} cancelHandler={handleCancelClick}></AddLootCard> 
        : <button className='Button' style={{'width':'100%'}} onClick={handleAddingClick}>+</button>}
      </div>
    )
}