import { useState } from "react";

/**
 *
 * {
 *  "id": {"type": "number"},
 *  "name": {"type": "string", "maxLength": 255, "minLength": 3},
 *  "age": {"type": "number"},
 *  "profession": {"type": "string", "maxLength": 255, "minLength": 3, "default": "Other"},
 * }
 */
const exampleJson = `
{
 "id": {"type": "number"},
 "name": {
    "type": "string",
    "maxLength": 255,
    "minLength": 3
 },
 "age": {"type": "number"},
 "profession": {
    "type": "string",
    "maxLength": 255,
    "minLength": 3,
    "default": "Other"
 }
}
`

const ClassGenerator = () => {
    const [output, setOutput] = useState('');
    const [outputDatabase, setOutputDatabase] = useState('');

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

    /**
     *
     * CREATE TABLE usuarios (
     *  id SERIAL PRIMARY KEY,
     *  nome VARCHAR(100) NOT NULL,
     *  email VARCHAR(150) UNIQUE NOT NULL
     * )
     */
    const gerarDatabase = () => {
        const jsonInput = document.getElementById('jsonInput').value
        const json = JSON.parse(jsonInput)

        const toLanguage = 'java';
        let output = '';

        output += `CREATE TABLE Teste (\n`
        Object.keys(json).map(k => {
            const type = typeof json[k];

            if (toLanguage === 'java') {
                const props = json[k];
                console.log(props);

                output += `${k} ${props.type}\n`
            }
        })

        output += `)\n`
        setOutputDatabase(output)
    }


    return (
        <>
            <h1>Gerador de classes</h1>

            <div style={{display: 'flex',
                width: '100%',
                gap: '20px',
                justifyContent: 'center',
                alignItems: 'flex-start',
            }}
            >

                <div >
                    <span>exemplo:</span>
                    <div style={{width: '700px',
                        height: '500px',
                        overflow: 'auto',
                        border: '1px solid'
                    }}
                    >
                        <pre><code>{exampleJson}</code></pre>
                    </div>
                </div>
                <div>

                    <div style={{display: "flex", flexDirection: "column"}}>
                        <label htmlFor="jsonInput">Insira o objeto JSON</label>
                        <textarea style={{border: '1px solid', width: '500px'}}
                            name="jsonInput" id="jsonInput" cols="30" rows="10" />
                    </div>
                    <button onClick={() => { gerarClasse(); gerarDatabase(); }} >Gerar</button>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'center',  gap: '8px'}}>

                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '8px'}}>
                    <h3>Java</h3><br />

                    <div id="output" >
                        <pre style={{border: '1px solid',
                            width: '900px',
                            height: '500px',
                            overflow: 'auto'
                        }}
                        >
                            {output}
                        </pre>

                        <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                            <button style={{border: '1px solid', backgroundColor: 'silver'}} onClick={downloadFile}>Download</button>
                            <button style={{border: '1px solid', backgroundColor: 'silver'}} onClick={() => navigator.clipboard.writeText(output)}>Copy</button>
                        </div>
                    </div>
                </div>

                <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '8px'}}>
                <h3>Postgres</h3><br />

                    <div id="outputDatabase" >
                        <pre style={{border: '1px solid',
                            width: '900px',
                            height: '500px',
                            overflow: 'auto'
                        }}
                        >
                            {outputDatabase}
                        </pre>

                        <div style={{display: "flex", flexDirection: "row", gap: "10px"}}>
                            <button style={{border: '1px solid', backgroundColor: 'silver'}} onClick={downloadFile}>Download</button>
                            <button style={{border: '1px solid', backgroundColor: 'silver'}} onClick={() => navigator.clipboard.writeText(output)}>Copy</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ClassGenerator