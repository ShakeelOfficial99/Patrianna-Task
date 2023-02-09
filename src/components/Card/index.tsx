import React from 'react';
import Image from 'next/image'

type CardProps = {
  src: string
}

export const CardImage = ({ src }: CardProps) => {
  return (
    <Image
      className=""
      src={src}
      alt="card"
      width={136}
      height={192}

    />
  )
}