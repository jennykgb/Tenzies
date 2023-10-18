import { useState, useEffect } from 'react'
import Die from "./assets/Die.jsx"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

function App() {
  
  const [rolls, setRolls] = useState(allNewDice)
  const [tenzies, setTenzies] = useState(false)
  const [rollCounter, setRollCounter] = useState(0)
  
  useEffect(() => {
      const winArray=[false, false]
      winArray[0]= rolls.every((die, i, arr)=>{
        if(i==0){
          return true
        } else {
          return (die.value === arr[i-1].value)
        }}
      )

      winArray[1] = rolls.every((die)=> {
        return (die.isHeld)
      })

      const win = winArray.every((condition)=> {return condition})
      if(win){
        setTenzies(true)
      }
    }
  , [rolls])

  function allNewDice(){
    const newDice = []
    for(let i=0; i<10; i++){
      let currentDie={value: Math.floor(Math.random()*6)+1, isHeld:false, id: nanoid()}
      newDice.push(currentDie)
    }
    return newDice
  }


  function reroll(){
    
    if(!tenzies){
      setRollCounter(count => count+1)
      setRolls(roll => roll.map(die=>{
        return !die.isHeld? 
        {...die, value: Math.floor(Math.random()*6)+1} : 
        die
    }))}else{
      setTenzies(false)
      setRolls(allNewDice)
      setRollCounter(0)

    }
  }

  function hold(id){
    setRolls(roll=> roll.map(die =>{
      return die.id === id ? 
        {...die, isHeld: !die.isHeld} :
        die
    }))

  }


  const dice = rolls.map((data)=>{
    return (
      <Die isHeld={data.isHeld} roll={data.value} key={data.id} hold={()=>hold(data.id)} />
    )
  })
    
  

  return (
    <main>
      {tenzies && <Confetti />}
      <div className='game-title'>
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className="dice-elements">
        {dice}
      </div>
      <button onClick={reroll}>{tenzies? "New Game":"Roll"}</button>
      <h4>Roll Counter: {rollCounter}</h4>
    </main>
  )
}

export default App
