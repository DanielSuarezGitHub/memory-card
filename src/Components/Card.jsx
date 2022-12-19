import React from 'react'

export default function Card (props) {
  return (
    <div id={props.index} onClick={props.handleClick} className='Card'>
        <img id={props.index} src={props.source} alt=''/>
    </div>
  )
}
