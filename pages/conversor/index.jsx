
import styled from "styled-components";

const Input = styled.input`
    border: 1px solid #ccc;
    height: 30px;
`;

const Conversor = () => {


    const handleChange = (e) => {
        output.value = e.target.value / 100
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
        <label>cm</label>
        <Input onChange={handleChange}/>
        to
        <Input id="output" value={''} onChange={()=>{}}/>
        <label>meters</label>
    
    </div>
}

export default Conversor