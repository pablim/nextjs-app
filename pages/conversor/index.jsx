import { useState } from "react";
import styled from "styled-components";

const Input = styled.input`
    border: 1px solid #ccc;
    height: 30px;
`;

const lengths = {
    "mm": {name: "milímetro", mult: -1000}, 
    "cm": {name: "centímetro", mult: -100}, 
    "dm": {name: "decímetro", mult: -10}, 
    "m": {name: "metro", mult: 1}, 
    "dam": {name: "decâmetro", mult: 10}, 
    "hm": {name: "hectômetro", mult: 100}, 
    "km": {name: "quilômetro", mult: 1000}
}

const LengthOptions = ({id, name, onChange}) => {
    const l = Object.keys(lengths)
    console.log(l);

    return (
        <select name="" id="" onChange={onChange}>
            {l.map((m, k) => 
                <option key={k} value={m} > 
                    {lengths[m].name} ({m})
                </option>
            )}
        </select>
    )
}

const Conversor = () => {

    const [length, setLength] = useState()
    const [lengthMensurement, setLengthMensurement] = useState(Object.keys(lengths)[0])

    const [lengthResult, setLengthResult] = useState()
    const [lengthMensurementResult, setLengthMensurementResult] = useState(Object.keys(lengths)[0])

    const handleChange = (e) => {
        debugger
        //const v = e.target.value
        const v = e
        
        const scale = Object.keys(lengths)
        const lengthMensurementIndex = scale.indexOf(lengthMensurement)
        const lengthMensurementResultIndex = scale.indexOf(lengthMensurementResult)
        
        const mult = lengthMensurementResultIndex - lengthMensurementIndex

        if (mult < 0) setLengthResult(v * (10 ** Math.abs(mult)))
        else if (mult > 0) setLengthResult(v / (10 ** Math.abs(mult)))
        else setLengthResult(v)

        setLength(v)
    }
    
    return <div 
            style={{
                display: 'flex',
                height: '100vh',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px'
            }}
    >
        <div>
            <div>comprimento</div>
            <div>
                <Input value={length} onChange={(e) => handleChange(e.target.value)}/>
                <LengthOptions 
                    onChange={(e) => setLengthMensurement(e.target.selectedOptions[0].value)} />
                
                to

                <Input id="output" value={lengthResult} />
                <LengthOptions id="outputLengthMensures" 
                    onChange={(e) => {
                        setLengthMensurementResult(e.target.selectedOptions[0].value); 
                        handleChange(length);
                    }}/>
            </div>
        </div>
    </div>
}

export default Conversor