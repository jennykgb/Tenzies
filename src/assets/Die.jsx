import { useState } from 'react'

function Die(props) {
  

  return (
    <div className={props.isHeld?'die held':'die'} onClick={props.hold}>
        {props.roll}
    </div>
  )
}

export default Die
