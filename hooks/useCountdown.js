import { useEffect, useState, useRef } from "react";

export const Countdown = ({start, time, timeInterval, onClick}) => {
    const [countdown, setCountdown] = useState(time);
    const timerUpdate = useRef(time);
    const intervalId = useRef();
  
    useEffect(() => {   
        if (!intervalId.current && start) init()
        if (countdown === 0) onClick()
    }, [start, countdown])
  
    const init = () => {
        intervalId.current = setInterval(() => timer(), timeInterval)
    }
  
    const timer = () => {
        if (timerUpdate.current === 0) {
          clearInterval(intervalId.current)
          intervalId.current = 0
        } else {
            timerUpdate.current = timerUpdate.current - 1
            setCountdown(timerUpdate.current)
        }
    }
  
    return [countdown]
}
