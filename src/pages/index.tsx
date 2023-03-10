import React, { useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import axios from "axios";
import { Inter } from '@next/font/google'
// import styles from '@/styles/Home.module.css'
import { CardImage } from '@/components/Card'
import { Button } from '@/components/Button'
import makeSpin from '@/pages/api/make-spin'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(10);
  const [isActive, setIsActive] = useState(false);
  const [guess, setGuess] = useState(null)
  const fetchData = async () => {
    axios.post(`http://localhost:3000/api/make-spin`, {
      guess: guess
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        alert(res.data?.isCorrect == true ? "you are correct" : "wrong guess")
        setCount(10)
      })
  };

  const onGuess = (guess: any) => {
    setGuess(guess)
  }
  const onStartClick = () => {
    setIsActive(!isActive);
    if (!isActive) {
      const intervalId = setInterval(() => {
        setCount(count => {
          if (count === 0) {
            clearInterval(intervalId);
            return count;
          }
          return count - 1;
        });
      }, 1000);
    }
  };

  console.log(count, "countcount")

  useEffect(() => {
    if (count === 0) {
      setIsActive(!isActive);
      if(guess){
        fetchData()
      }
    }
  }, [count]);

  console.log(isActive, "Asdfasd")
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className='flex items-center justify-center h-[100vh] w-full'>
          <div className='bg-black w-[818px] h-[627px] rounded-md relative'>
            {
              isActive ? (
               <div className="absolute">
                 <h1 className="text-slate-100 pt-4 pl-4 text-lg">
                  Lock you guess in {count} seconds
                </h1>
                <h1 className="text-slate-100 pt-4 pl-4 text-lg">Guessed : {guess}</h1>
                </div>
              ) : ("")
            }
            <div className='w-full flex justify-center space-x-4 py-10 my-10'>
              <div>
                <CardImage src='/card-title.png' />
              </div>
              <div>
                <CardImage src='/card-2.png' />
              </div>
              <div >
                <CardImage src='/card-A.png' />
              </div>
            </div>
            <div className='flex justify-center space-x-4'>
              <div className='w-[330px] h-[76px] bg-[#1B2233] p-2 border  rounded-[7px] flex flex-col justify-between'>
                <div className='flex justify-between'>
                  <div className='flex items-center w-[40px] h-[25px] bg-[#283343] rounded-[7px] justify-center'>
                    <span className=" text-[#55657E] text-center text-[12px] font-[600]">Min</span>
                  </div>
                  <div className='flex space-x-3 items-center'>
                    <Image
                      className="w-full h-full"
                      src={"/t-icon.png"}
                      alt="card"
                      width={16}
                      height={16}

                    />
                    <h2 className='font-[700] text-[18px] text-[#FFFFFF]'>0.91999970</h2>
                  </div>
                  <div className='flex items-center w-[40px] h-[25px] bg-[#283343] rounded-[7px] justify-center'>
                    <span className=" text-[#55657E] text-center text-[12px] font-[600]">1/2</span>
                  </div>

                </div>
                <div className='flex justify-between'>
                  <div className='flex items-center w-[40px] h-[25px] bg-[#283343] rounded-[7px] justify-center'>
                    <span className=" text-[#55657E] text-center text-[12px] font-[600]">Max</span>
                  </div>
                  <span className='flex items-center'>
                    <h2 className='font-[600] text-[14px] text-center text-[#55657E] ml-2'>$0.9199997</h2>
                  </span>
                  <div className='flex items-center w-[40px] h-[25px] bg-[#283343] rounded-[7px] justify-center'>
                    <span className=" text-[#55657E] text-center text-[12px] font-[600]">2x</span>
                  </div>

                </div>
              </div>
              <Button isDisabled={false} classname='w-[330px] h-[76px] bg-[#1B2233] text-[#FE0000] border border-[#FE0000] rounded-[7px] uppercase font-semibold text-[18px] text-center ' title='Red' onBtnClick={() => {
                onGuess("red")
              }} />
            </div>
            <div className='flex justify-center space-x-4 py-3'>
              <Button isDisabled={isActive} onBtnClick={() => {
                onStartClick()
              }} classname={`w-[330px] h-[76px]  text-[#FFFF] border border-[#4B5B74] rounded-[7px]  uppercase font-semibold text-[18px] text-center ${isActive === true ? "bg-[#92c3ff]" : "bg-[#2283F6]"}`} title='start' />
              <Button isDisabled={false} onBtnClick={() => {
                onGuess("black")
              }} classname="w-[330px] h-[76px] bg-[#1B2233] text-[#297FE5] border border-[#4B5B74] rounded-[7px] uppercase font-semibold text-[18px] text-center" title='Black' />
            </div>
          </div>

        </div>
      </main>
    </>
  )
}
