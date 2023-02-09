import React from 'react';

type CardProps = {
  classname: string,
  title: string
}

export const Button = ({ classname, title }: CardProps) => {
  return (
   <button className={classname}>{title}</button>
  )
}