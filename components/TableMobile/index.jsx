import { useEffect, useState, useRef } from "react";

import { Modal } from "..";

import styles from "./styles/style.module.scss";

const Table = ({
    items, 
    rowHeight = 40,
    style,
    labelsExtraStyle,
    valuesExtraStyle,
}) => {    
    const [show, setShow] = useState({item: ''})
    const tableRef = useRef()
    if (!items || items.length == 0) return;

    const itemQtde = items.length
    const labels = Object.keys(items[0])
    const height = labels.length * rowHeight + 40

    return (
        <div className={styles.container}>
            <div>{itemQtde}</div>
            <div className={`${styles['scrolled-table']}`}
                style={{...style, height}}
            >
                <div>
                    <div>#</div>
                    {labels.map((label, idx) => (
                        <div key={idx} 
                            style={{height: rowHeight}}
                        >
                            {label}
                        </div>
                    ))}
                </div>
                <div style={{...valuesExtraStyle, height}} ref={tableRef}>
                    {items.map((item, itemIdx) => {
                        return (
                            <div key={itemIdx} >
                                <div style={{height: rowHeight}} >{itemIdx + 1}</div>
                                {labels.map((label, labelIdx) => 
                                    <div key={labelIdx} style={{height: rowHeight}} 
                                        title={item[label]}
                                    >
                                        {
                                            typeof item[label] !== "object" ? 
                                                item[label] : 
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
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>
                <button onClick={(e) => {
                    tableRef.current.scrollTop -= height}}
                >    
                    Up
                </button>
                <button onClick={(e) => {
                    
                    tableRef.current.scrollTop += height}}
                >    
                    Down
                </button>
            </div>
        </div>
    )
}

export default Table