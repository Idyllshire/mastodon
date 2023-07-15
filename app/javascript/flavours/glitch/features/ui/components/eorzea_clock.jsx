import { useEffect, useState } from 'react'

export function EorzeaClock(props) {
  const [lt, setLT] = useState('--:--')
  const [st, setST] = useState('--:--')
  const [et, setET] = useState('--:--')

  const formatTimestamp = (timestamp = Date.now()) => {
    const time = (timestamp / 60 / 1000) % 1440
    const h = Math.floor(time / 60).toFixed(0).padStart(2, '0')
    const m = Math.floor(time % 60).toFixed(0).padStart(2, '0')
    return h + ':' + m
  }
  const getLocalTime = () => {
    const ts = Date.now() - (new Date().getTimezoneOffset() * 60 * 1000)
    return formatTimestamp(ts)
  }
  const getServerTime = () => {
    return formatTimestamp()
  }
  const getEorzeaTime = () => {
    return formatTimestamp(Date.now() * 3600 / 175)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setLT(getLocalTime())
      setST(getServerTime())
      setET(getEorzeaTime())
    }, 1000 / 12)
    
    return () => clearInterval(timer)
  }, [])
  
  return (
    <span>
      <strong class="ffxiv-icon" aria-label="Local Time">&#xe0d0;</strong> {lt}
      　
      <strong class="ffxiv-icon" aria-label="Server Time">&#xe0d1;</strong> {st}
      　
      <strong class="ffxiv-icon" aria-label="Eorzea Time">&#xe0d2;</strong> {et}
    </span>
  );
}
