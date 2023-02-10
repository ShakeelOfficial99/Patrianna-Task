import React from 'react';

type CardProps = {
  classname: string,
  title: string
  onBtnClick : any
  isDisabled: boolean
}

export const Button = ({ classname, title, onBtnClick,isDisabled }: CardProps) => {
  return (
   <button className={classname} onClick={onBtnClick} disabled={isDisabled}>{title}</button>
  )
}