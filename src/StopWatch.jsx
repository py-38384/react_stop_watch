import { useEffect, useRef, useState } from 'react'

const StopWatch = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [isStoped, setIsStoped] = useState(undefined)
  const [startBTNText, setStartBTNText] = useState('Start')
  const [stopBTNText, setStopBTNText] = useState('Stop')
  const [elepsedTime, setElepsedTime] = useState(0)
  const intervalIdRef = useRef(null)
  const startTimeRef = useRef(0)

  useEffect(()=>{
    if(isRunning){
      intervalIdRef.current = setInterval(()=>{
        setElepsedTime(Date.now() - startTimeRef.current)
      }, 10)
    }
    return () => {
      clearInterval(intervalIdRef.current)
    }
  },[isRunning])

  const start = () => {
    setIsRunning(true)
    setIsStoped(false)
    setStartBTNText('Running')
    setStopBTNText('Stop')
    startTimeRef.current = Date.now() - elepsedTime
  }
  const stop = () => {
    if(isStoped !== undefined){
      setIsRunning(false)
      setIsStoped(true)
      setStartBTNText('Resume')
      setStopBTNText('Stopped')
    }
  }
  const reset = () => {
    setElepsedTime(0)
    setIsRunning(false)
    setIsStoped(undefined)
    setStartBTNText('Start')
    setStopBTNText('Stop')
  }
  const formatTime = () => {
    let hours = Math.floor(elepsedTime / (1000 * 60 * 60))
    let minutes = Math.floor(elepsedTime / (1000 * 60) % 60)
    let secends = Math.floor(elepsedTime / (1000) % 60)
    let milliseconds = Math.floor((elepsedTime % 1000) / 10)
    return hours < 1? `${padZero(minutes)}:${padZero(secends)}:${padZero(milliseconds)}`: `${padZero(hours)}:${padZero(minutes)}:${padZero(secends)}:${padZero(milliseconds)}`
  }

  const padZero = (number) => {
    return number < 10? `0${number}`:number
  }

  return (
    <div className='stopwatch'>
      <div className="display">
        {formatTime()}
      </div>
      <div className="controls">
        <button onClick={start} style={isRunning?{
          background: 'white',
          color:'rgb(25, 29, 51)'
          }:{}} className='start-button'>{startBTNText}</button>
        <button onClick={stop} style={isStoped==false || isStoped==undefined?{}:{
          background: 'white',
          color:'rgb(25, 29, 51)'
        }} className='stop-button'>{stopBTNText}</button>
        <button onClick={reset} className='reset-button'>Reset</button>
      </div>
    </div>
  )
}

export default StopWatch