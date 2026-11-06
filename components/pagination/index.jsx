import { React, useEffect, useState } from 'react'
import './css/style.css'

const Pagination = (props) => {

    const {
        pagesToView,
        resultsPerPage,
        fetchUrl,
        containerIdToRetrieve,
        templateRow, // Template de uma linha para adicionar no container
        fieldNames, // nomes dos campos do objeto recuperado para exibir
    } = props

    // States
    const [currentPage, setCurrentPage] = useState(1)

    const pages = Array.from({length: pagesToView}, (v, k) => k+1);

    const onClick = (index) => {
        console.log(`link to page ${index}`)
        setCurrentPage(index)
        retrieve(index)
    }

    const retrieve = (page) => {
        var headers = new Headers()
        var init = {
            method: 'GET',
            headers,
            mode: 'cors',
            cache: 'default'
        }

        let queryString = "?page="+page+"&resultsPerPage="+resultsPerPage

        fetch(fetchUrl+queryString, init)
            .then((response) => {
                if (response.ok) 
                    return response.json() 
                else console.log("erro in request")
            })
            .then((data) => {
                handleResponse(data)
            })
    }

    const handleResponse = (data) => {
        let container = document.getElementById(containerIdToRetrieve)
        container.innerHTML=""

        data.map((item)=>{
            console.log(item[fieldNames[0]])
            console.log(item[fieldNames[1]])
            let div = document.createElement("div")
            div.append(item.name)
            container.appendChild(div)
        })
    }

    useEffect(()=>{
        retrieve(1)
    })

    return (
        <div>
            <ul className="pages-container">
                <li key="ini" className="page-number">
                    <a href="#" className="page-link" 
                            onClick={()=>{onClick("first")}}>
                        Início
                    </a>
                </li>
                <li key="ant" className="page-number">
                    <a href="#" className="page-link" 
                            onClick={()=>{onClick("prev")}}>
                        Anterior
                    </a>
                </li>
                {pages.map((index)=> {
                    return <li key={index} className="page-number">
                        <a href="#" className="page-link" 
                                onClick={()=>{onClick(index)}}>
                            {index}
                        </a>
                    </li>
                })}
                <li key="prox" className="page-number">
                    <a href="#" className="page-link" 
                            onClick={()=>{onClick("next")}}>
                        Próximo
                    </a>
                </li>
                <li key="fim" className="page-number">
                    <a href="#" className="page-link" 
                            onClick={()=>{onClick("last")}}>
                        Fim
                    </a>
                </li>
            </ul>
        </div>
    )
}

Pagination.defaultProps = {
    pagesToView: 5,
    resultsPerPage: 10,
    fieldNames: ["id", "name"]
  };

export default Pagination