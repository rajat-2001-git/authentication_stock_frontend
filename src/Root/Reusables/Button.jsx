import React from 'react'

const Button = ({style, onClick, text}) => {
  return (
    <button className={`${style} font-bold rounded-lg px-2 py-1`} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button