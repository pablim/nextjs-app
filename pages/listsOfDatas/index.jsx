import { useState } from "react";

const ListsOfDatas = () => {
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

   

    return (
        <>
            <h1>Listas de dados</h1>
            <br />
            <ul>
                <li>países</li>
                <li>bandeiras países</li>
                <li>estados do brasil</li>
                <li>cidades do brasil</li>
                <li>marcas de carros</li>
                <li>moedas brasileiras</li>
                <li>presidentes do brasil</li>
            </ul>


            <div>importar dados (será somente para administradoes)</div>
            {/* 
                terá banco de dados especifico
                o admin irá importar um arquivo .csv ou .json com os dados e o nome da tabela e colunas
                
            */}
            <input type="file" />
        </>
    )
}

export default ListsOfDatas