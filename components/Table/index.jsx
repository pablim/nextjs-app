import { useEffect, useState, useRef } from "react";

import { Modal } from "..";

import styles from "./styles/style.module.scss";

// actions = [
//     {
//         label: 'Editar',
//         icon: '',
//         action: (item, row) => {
//             alert('')
//         }
//     }
// ]

const Table = ({
    items, 
    style,
    labelsExtraStyle,
    valuesExtraStyle,
    actions,
    hideColumns = [],
    handleColumns,
    columnLabels = {},
    handleItems = () => true
}) => {    
    const [show, setShow] = useState({item: ''})
    if (!items || items.length == 0) return;

    const itemQtde = items.length
    const labels = Object.keys(items[0])
    
    return (
        <div className={styles.container}>
            <table>
                <thead>
                    <tr style={{
                            position: 'sticky',
                            top: '0',
                            zIndex: 3
                        }} 
                    >
                        {labels.map((label, idx) => (
                            !hideColumns.includes(label) && 
                                <th key={idx} >
                                    {columnLabels[label] ? 
                                        columnLabels[label] : 
                                        label
                                    }
                                </th>
                        ))}
                        {actions && 
                            <th style={{
                                    position: 'sticky',
                                    borderLeft: '1px solid red',
                                    right: '0vw',
                                }}
                            >
                                actions
                            </th>
                        }
                    </tr>
                </thead>
                <tbody>
                    {items?.map((item, itemIdx) => (
                        handleItems(item) &&
                        <tr key={itemIdx} 
                            style={{
                                position: 'relative',
                                zIndex: 1
                            }}
                        >
                            {labels.map((label, labelIdx) => 
                                !hideColumns.includes(label) &&
                                    <td key={labelIdx} title={`${typeof item[label] !== "object" ? item[label] : ''}`}>
                                        {
                                            typeof item[label] !== "object" ? 
                                                handleColumns &&  
                                                    handleColumns[label] ?
                                                        handleColumns[label](item[label]) :
                                                        item[label] 
                                                : 
                                                <>
                                                    <button 
                                                        onClick={
                                                            (e) => {
                                                                e.stopPropagation();
                                                                setShow({item: `${itemIdx} - ${labelIdx}`})
                                                            }}
                                                    > 
                                                        Show Info
                                                    </button>
                                                    <Modal show={`${itemIdx} - ${labelIdx}` === show.item} 
                                                        setShow={setShow}
                                                    >
                                                        <Table items={[item[label]]} />
                                                    </Modal>
                                                </>
                                        }
                                    </td>
                            )}
                            {actions && 
                                <td style={{
                                    position: 'sticky',
                                    borderTop: '1px solid red',
                                    right: '0vw',
                                    backgroundColor: 'green',
                                    minWidth: '80px',
                                    maxWidth: '300px',
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        gap: '8px'
                                    }}>
                                        {actions.map((action, idx) => {
                                            return (
                                                <div key={idx} 
                                                    style={{  
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={(e) => action.action(item, e.target.parentElement.parentElement.parentElement)}>
                                                    {action.label}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table