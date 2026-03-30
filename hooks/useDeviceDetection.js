import { useState, useEffect } from "react";

export const useDeviceDetection = () => {
    const [device, setDevice] = useState({})
    
    useEffect(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const device = /iPhone|iPad|iPod/i.test(navigator.userAgent) ? 'ios' : 
            /Android/i.test(navigator.userAgent) ? 'android' : 'no detected'

        setDevice({
            isMobile,
            device
        })
    }, [])

    return [ device ]
}