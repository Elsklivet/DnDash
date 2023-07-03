import './App.scss';
import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

export default function Monster(props) {
    const [monsterData, setMonsterData] = useState({
        name: props.mData.name,
        hp: props.mData.hp,
        maxHp: props.mData.hp,
        xp: props.mData.xp,
        ac: props.mData.ac,
        init: props.mData.init,
        stag: 0,
        staggered: false,
        stagPoint: props.mData.stag,
        stagDrop: props.mData.stagDrop,
        spell: props.mData.spell,
        stat: props.mData.stat,
        mUrl: props.mData.mUrl
    });

    const [modifierData, setModifierData] = useState({
        hpAdd: '',
        statusAdd: ''
    });

    function handleDeleteClick() {
        props.deleteHandler(props.mData.key);
    }

    function handleTickClick() {
        const newStag = monsterData.stag - monsterData.stagDrop;
        let statuses = monsterData.stat;
        let statusList = statuses.split(",");
        if (statuses.length == 0) {
            statusList = [];
        }
        statusList.map((st) => st.trim());

        if (newStag > 0) {
            setMonsterData({
                ...monsterData,
                stag: newStag
            });
        } else {
            statusList = statusList.filter((status) => status.toLowerCase().trim() !== "staggered");
            statuses = statusList.join(', ');
            setMonsterData({
                ...monsterData,
                staggered: false,
                stag: 0,
                stat: statuses
            });
        }
    }

    function handleTextChange(event) {
        setModifierData({
          ...modifierData,
          [event.target.name]: event.target.value
        });
    }

    function handleHpAddClick() {
        let amount = parseInt(modifierData.hpAdd);
        if (isNaN(amount)) {
            return;
        } else {
            // Defer staggered change to next tick
            let toSetStaggered = monsterData.staggered;
            let newStag = monsterData.stag;
            let statuses = monsterData.stat;
            let statusList = statuses.split(",");
            if (statuses.length == 0) {
                statusList = [];
            }
            statusList.map((st) => st.trim());

            // Stagger can only go up
            if (amount < 0) {
                if (newStag - amount >= monsterData.stagPoint) {
                    newStag = monsterData.stagPoint;
                    toSetStaggered = true;
                    statusList.push("Staggered");
                    statuses = statusList.join(', ');
                } else {
                    newStag -= amount;
                }
            }

            // Apply stagger to damage
            if (monsterData.staggered && amount < 0) {
                amount *= 1.5;
            }

            // Set HP and set stagger
            let newHp = parseInt(monsterData.hp) + amount;

            if (newHp < 0) {
                newHp = 0;
            } else if (newHp > monsterData.maxHp) {
                newHp = monsterData.maxHp;
            }

            setMonsterData({
                ...monsterData,
                hp: newHp,
                stag: newStag,
                staggered: toSetStaggered,
                stat: statuses
            })
        }
    }

    function handleSpellMinClick() {
        // Make spell slots go down
        let newSpellSlots = parseInt(monsterData.spell);
        if ((newSpellSlots - 1) < 0) {
            newSpellSlots = 0;
        } else {
            newSpellSlots -= 1;
        }

        setMonsterData({
            ...monsterData,
            spell: newSpellSlots
        });
    }

    function handleSpellPlusClick() {
        // Make spell slots go up
        let newSpellSlots = parseInt(monsterData.spell) + 1;

        setMonsterData({
            ...monsterData,
            spell: newSpellSlots
        });
    }

    function handleStatusAddClick() {
        // This one is funky, because a '-' before the status actually means
        // "remove this status", and "clear" means to clear all statuses.
        let removing = false;
        let statuses = monsterData.stat;
        let statusList = statuses.split(",");
        if (statuses.length == 0) {
            statusList = [];
        }
        statusList.map((st) => st.trim());
        let newStatus = modifierData.statusAdd.trim();

        // Actually removing or clearing
        if (newStatus.startsWith("-") && newStatus.length > 1) {
            removing = true;
            newStatus = newStatus.substring(1);
        } else if (newStatus.toLowerCase() === 'clear') {
            statuses = '';
            setMonsterData({
                ...monsterData,
                stat: statuses
            });
            return;
        }

        if (removing) {
            // Filter out deletion status
            statusList = statusList.filter((status) => status.toLowerCase().trim() !== newStatus.toLowerCase().trim());
            statuses = statusList.join(', ');
        } else {
            statusList = [...statusList, `${newStatus.trim()}`]
            statuses = statusList.join(', ');
        }

        setMonsterData({
            ...monsterData,
            stat: statuses
        });
    }

    function handleClearClick() {
        // Clear input boxes
        setModifierData({
            hpAdd: '',
            statusAdd: ''
        });
    }

    function handleResetClick() {
        // Fully reset the monster
        setMonsterData({
            name: props.mData.name,
            hp: props.mData.hp,
            maxHp: props.mData.hp,
            xp: props.mData.xp,
            ac: props.mData.ac,
            init: props.mData.init,
            stag: 0,
            staggered: false,
            stagPoint: props.mData.stag,
            stagDrop: props.mData.stagDrop,
            spell: props.mData.spell,
            stat: props.mData.stat,
            mUrl: props.mData.mUrl
        });
    }

    function calculateHpPercent() {
        return (monsterData.hp / monsterData.maxHp) * 100;
    }

    function calculateStagPercent() {
        return (monsterData.stag / monsterData.stagPoint) * 100;
    }

    return (
        <div className='Monster'>
            <div style={{'gridArea': 'name'}}>
                <label name='name' style={{'width': '85%', 'textDecoration': 'underline'}}>{monsterData.name}</label>
            </div>
            <div style={{'gridArea': 'del'}}>
                <button className='Button' style={{'width':'100%'}} onClick={handleDeleteClick}>X</button>
            </div>
            <div style={{'gridArea': 'xp'}}>
                <label>XP: </label>
                <label name='xp'>{monsterData.xp}</label>
            </div>
            <div style={{'gridArea': 'ac'}}>
                <label>AC: </label>
                <label name='ac'>{monsterData.ac}</label>
            </div>
            <div style={{'gridArea': 'init'}}>
                <label>Init: </label>
                <label name='init'>{monsterData.init}</label>
            </div>
            <div style={{'gridArea': 'hp'}}>
                <div className='HpBarWrapper'>HP: {monsterData.hp}/{monsterData.maxHp}
                    <div className='HpBar' style={{'width':`${calculateHpPercent()}%`}}></div>
                </div>
            </div>
            <div style={{'gridArea': 'hpadd'}}>
                <input name='hpAdd' type='text' value={modifierData.hpAdd} onChange={handleTextChange} style={{'width': '95%'}}></input>
            </div>
            <div style={{'gridArea': 'hpplus'}}>
                <button className='Button' style={{'width':'100%'}} onClick={handleHpAddClick}>+</button>
            </div>
            <div style={{'gridArea': 'stag'}}>
                <div className='StaggerBarWrapper'>ST: {monsterData.stag}/{monsterData.stagPoint}
                    <div className='StaggerBar' style={{'width':`${calculateStagPercent()}%`}}></div>
                </div>
            </div>
            <div style={{'gridArea': 'tick'}}>
                <button className='Button' style={{'width':'100%'}} onClick={handleTickClick}>Tick</button>
            </div>
            <div style={{'gridArea': 'spell'}}>
                <label>Spell Slots: </label>
                <label name='spell' style={{'width':'30%'}}>{monsterData.spell}</label>
            </div>
            <div style={{'gridArea': 'spellmin'}}>
                <button className='Button' style={{'width':'100%'}} onClick={handleSpellMinClick}>-</button>
            </div>
            <div style={{'gridArea': 'spellplus'}}>
                <button className='Button' style={{'width':'100%'}} onClick={handleSpellPlusClick}>+</button>
            </div>
            <div style={{'gridArea': 'statuslabel'}}>
                <label>Status: </label>
            </div>
            <div style={{'gridArea': 'statusadd'}}>
                <input name='statusAdd' type='text' value={modifierData.statusAdd} onChange={handleTextChange} style={{'width': '95%'}}></input>
            </div>
            <div style={{'gridArea': 'statusplus'}}>
                <button className='Button' style={{'width':'100%'}} onClick={handleStatusAddClick}>+</button>
            </div>
            <div style={{'gridArea': 'status'}}>
                <label>Statuses: </label>
                <label name='stat' style={{'width':'90%'}}>{monsterData.stat}</label>
            </div>
            <div style={{'gridArea': 'url'}}>
                <label>Details: </label>
                <label name='mUrl' style={{'width':'75%'}}>{monsterData.mUrl}</label>
            </div>
            <div style={{'gridArea': 'clear'}}>
                <button className='Button' style={{'width':'100%'}} onClick={handleClearClick}>Clear</button>
            </div>
            <div style={{'gridArea': 'reset'}}>
                <button className='Button' style={{'width':'100%'}} onClick={handleResetClick}>Reset</button>
            </div>
        </div>
    );
}

export function AddMonsterCard(props) {
    const [monsterData, setMonsterData] = useState({
      name: '',
      hp: '',
      xp: '',
      ac: '',
      init: '',
      stag: '',
      stagDrop: '',
      spell: '',
      stat: '',
      mUrl: ''
    });
  
    function handleTextChange(event) {
      setMonsterData({
        ...monsterData,
        [event.target.name]: event.target.value
      });
    }
  
    function handleAddClick() {
        props.addHandler(monsterData);
    }
  
    function handleClearClick() {
      setMonsterData({
        name: '',
        hp: '',
        xp: '',
        ac: '',
        init: '',
        stag: '',
        stagDrop: '',
        spell: '',
        stat: '',
        mUrl: ''
      });
    }
  
    return (
      <div className='AddMonsterCard'>
        <div style={{'gridArea': 'name'}}>
          <label>Name: </label>
          <input name='name' type='text' value={monsterData.name} onChange={handleTextChange} style={{'width': '85%'}}></input>
        </div>
        <div style={{'gridArea': 'hp'}}>
          <label>HP: </label>
          <input name='hp' type='text' value={monsterData.hp} onChange={handleTextChange}></input>
        </div>
        <div style={{'gridArea': 'xp'}}>
          <label>XP: </label>
          <input name='xp' type='text' value={monsterData.xp} onChange={handleTextChange}></input>
        </div>
        <div style={{'gridArea': 'ac'}}>
          <label>AC: </label>
          <input name='ac' type='text' value={monsterData.ac} onChange={handleTextChange}></input>
        </div>
        <div style={{'gridArea': 'init'}}>
          <label>Init: </label>
          <input name='init' type='text' value={monsterData.init} onChange={handleTextChange}></input>
        </div>
        <div style={{'gridArea': 'stag'}}>
          <label>Stagger: </label>
          <input name='stag' type='text' value={monsterData.stag} onChange={handleTextChange}></input>
          <input name='stagDrop' type='text' value={monsterData.stagDrop} onChange={handleTextChange} style={{'maxWidth': '60px', 'marginLeft':'5px'}}></input>
        </div>
        <div style={{'gridArea': 'spell'}}>
          <label>Spell Slots: </label>
          <input name='spell' type='text' value={monsterData.spell} onChange={handleTextChange} style={{'width':'70%'}}></input>
        </div>
        <div style={{'gridArea': 'status'}}>
          <label>Status: </label>
          <input name='stat' type='text' value={monsterData.stat} onChange={handleTextChange} style={{'width':'90%'}}></input>
        </div>
        <div style={{'gridArea': 'url'}}>
          <label>Details URL: </label>
          <input name='mUrl' type='text' value={monsterData.mUrl} onChange={handleTextChange} style={{'width':'84%'}}></input>
        </div>
        <div style={{'gridArea': 'btn'}}>
          <button className='Button' style={{'width':'50%'}} onClick={handleAddClick}>Add</button>
          <button className='Button' style={{'width':'50%'}} onClick={handleClearClick}>Clear</button>
        </div>
      </div>
    )
}
  
export function MonsterCard() {
    const [monsters, setMonsters] = useState([]);
    const [numMonsters, setNumMonsters] = useState(0);
  
    function handleAddMonster(monsterValues) {
        const monsterId = numMonsters;
        setNumMonsters(numMonsters + 1);
        setMonsters([
            ...monsters,
            {...monsterValues, key: monsterId}
        ]);
    }

    function handleDeleteMonster(monsterKey) {
        setNumMonsters(numMonsters - 1);
        setMonsters(monsters.filter(monster => monster.key != monsterKey));
    }
  
    return (
      <div className='MonsterCard'>
        <h3>Monsters</h3>
        {monsters.map(
            monster => <Monster mData={monster} deleteHandler={handleDeleteMonster} key={monster.key}></Monster>
        )}
        <AddMonsterCard addHandler={handleAddMonster}></AddMonsterCard>
      </div>
    )
}

