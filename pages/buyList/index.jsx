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
            <h1>Listas de compras</h1>
            <br />
            
        </>
    )
}

export default ListsOfDatas