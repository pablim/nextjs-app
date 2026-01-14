
import { useState, useEffect } from "react";

export const useMatchMedia = (mediaString) => {
    const [match, setMatch] = useState({})
    
    useEffect(() => {
        
        if (window.matchMedia(`(${mediaString})`).matches) {
            // max-width: 700px
            // Viewport is less or equal to 700 pixels wide
            setMatch(true)
          } else {
            // Viewport is greater than 700 pixels wide
            setMatch(false)
          }
        
    }, [])

    return [ match ]
}


