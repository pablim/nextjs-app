import { useCallback, useState, useRef, useEffect } from "react";

const HooksTests = () => {
    const [count, setCount] = useState(0);
    const previousFn = useRef();

    const fn = useCallback(() => {}, []);

    useEffect(() => {
        console.log(previousFn.current === fn);
        previousFn.current = fn;
    });

    return (
        <button onClick={() => setCount(count + 1)}>
        {count}
        </button>
    );
}

export default HooksTests