import { useState } from "react";

/**
 * 
 * {
 *  "id": {"type": "number"},
 *  "name": {"type": "string", "maxLength": 255, "minLength": 3},
 *  "age": {"type": "number"},
 *  "profession": {"type": "string", "maxLength": 255, "minLength": 3, "default": "Other"},
 * }
 * 
 * 
 * 
 * @returns 
 */

const ClassGenerator = () => {
    const [output, setOutput] = useState('');

    const downloadFile = () => {
        const content = "Meu arquivo gerado pelo React";
        const blob = new Blob([output], { type: "text/plain" });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "arquivo.java";
        a.click();

        URL.revokeObjectURL(url);
    };

    const gerarClasse = () => {
        const jsonInput = document.getElementById('jsonInput').value
        const json = JSON.parse(jsonInput)

        
        console.log(json);
        const toLanguage = 'java';
        let output = '';
        
        output += `private class Teste {\n`
        Object.keys(json).map(k => {
            const type = typeof json[k]
            console.log(k);

            if (toLanguage === 'java') {
                const props = json[k];                    
                console.log(props);

                output += `\tprivate ${k} ${props.type}\n`
            }
        })

        output += `}\n`
        setOutput(output)
    }

    return (
        <>
            <h1>Gerador de classes</h1>

            <div style={{display: "flex", flexDirection: "column"}}>

                <label htmlFor="jsonInput">Insira o objeto JSON</label>
                <textarea style={{border: '1px solid', width: '500px'}}
                    name="jsonInput" id="jsonInput" cols="30" rows="10" />
            </div>
            <button onClick={gerarClasse} >Gerar</button>

            <div >
                <h3>Java</h3>
                <div id="output">
                    <pre style={{border: '1px solid', width: '500px'}}>{output}</pre>

                    <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                        <button style={{border: '1px solid', backgroundColor: 'silver'}} onClick={downloadFile}>Download</button> 
                        <button style={{border: '1px solid', backgroundColor: 'silver'}} onClick={() => navigator.clipboard.writeText(output)}>Copy</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClassGenerator