import { useEffect, useState } from "react";

import { Modal } from "..";

import styles from "./styles/style.module.scss";

/**
 * Actions and Global Actions object:
 * 
 * actitions: 
 * [
 *      {
 *          label: 'Editar',
 *          icon: '',
 *          action: (item, row) => {
 *              alert('')
 *          }
 *      }
 * ]
 * 
 * globalActions
 * [
 *      {
 *          label: 'Editar',
 *          icon: '',
 *          action: (items) => {
 *              alert('teste')
 *          }
 *      }
 * ]
 * 
 */

const Table = ({
    items, 
    style,
    labelsExtraStyle,
    valuesExtraStyle,
    actions,
    hasFilter = true,
    globalActions = [],
    globalActionsPosition = 'top',
    globalActionsSide = 'right',
    hideColumns = [],
    handleColumns,
    columnLabels = {},
    height = '400px',
    handleItems = () => true
}) => {    
    const [show, setShow] = useState(false)
    const [showItem, setShowItem] = useState(null)
    const [filteredItems, setFilteredItems] = useState([])

    useEffect(() => { setFilteredItems(items) }, [items])

    const itemQtde = items.length
    const labels = Object.keys(items.length > 0 ? items[0] : {} )

    const handleFilter = (e) => {
        if (e.target.value != '') {
            const value = e.target.value;
            const filtered = items.filter(
                u => u.name.includes(value) || u.email.includes(value)
            )
            setFilteredItems(filtered)
        } else setFilteredItems(items)
	}
    
    const onClickRow = (item) => {
        setShowItem(item)
        setShow(true)
    }

    const ContentCell = ({item, label, labelIdx}) => (
        <td key={labelIdx} 
            title={`${typeof item[label] !== "object" ? item[label] : ''}`}
        >
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
                    </>
            }
        </td>
    )

    const ActionCell = ({ item, actions }) => (
        <td className={styles.actionsColumn}
            onClick={(e) => e.stopPropagation()}
        >
            <div className={styles.actionContainer}>
                {actions.map((action, idx) =>  (
                    <div className={styles.action} key={idx} 
                        onClick={
                            (e) => action.action(e, item, 
                                e.target.parentElement.parentElement
                                    .parentElement)
                        }
                    >
                        {action.label}
                    </div>
                ))}
            </div>
        </td>
    )

    const actionsPosition = () => ({
        flexDirection: globalActionsPosition === 'top' ? 'column' : 'column-reverse'
    })

    const actionsSide = () => ({
        flexDirection: globalActionsSide === 'right' ? 'row-reverse' : 'row'
    })

    return (
        <div className={styles.main} style={actionsPosition()} >
            {!items || items.length > 0 ? ( <>
                <div className={styles.actionsContainer} style={actionsSide()}>

                    {globalActions.map((action, idx) => 
                        <div key={idx} className={styles.action}
                            onClick={(e) => action.action(items)}
                        >
                            {action.label}
                        </div>
                    )}

                    {hasFilter &&
                        <div>
                            <label htmlFor="inputFilter">Filtrar:</label>
                            <input id="inputFilter" className={styles.inputSearch}
                                onInput={handleFilter}/>
                        </div>
                    }

                    <div className={styles.total}>Total: {itemQtde}</div>
                </div>

                <div className={styles.container} style={{ height }}>
                    <table>
                        <thead>
                            <tr>
                                {labels.map((label, idx) => (
                                    !hideColumns.includes(label) && 
                                        <th key={idx}>
                                            {
                                                columnLabels[label] 
                                                ? columnLabels[label] 
                                                : label
                                            }
                                        </th>
                                ))}

                                {actions && 
                                    <th className={styles.actionsColumn}>
                                        actions
                                    </th>
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems?.map((item, itemIdx) => (

                                handleItems(item) &&
                                <tr key={itemIdx} onClick={() => onClickRow(item)}>

                                    {labels.map((label, labelIdx) => 
                                        !hideColumns.includes(label) &&
                                            <ContentCell 
                                                key={labelIdx} 
                                                item={item} 
                                                label={label} 
                                                labelIdx={labelIdx} 
                                            />
                                    )}

                                    {actions && 
                                        <ActionCell item={item} actions={actions} />
                                    }
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <Modal 
                        className={styles.modalView} 
                        show={show} 
                        setShow={setShow} 
                    >
                        {showItem && Object.keys(showItem).map((key) => (
                            <div key={key}>
                                <strong>{key}:</strong> {showItem[key]}
                            </div>
                        ))}
                    </Modal>
                </div>
            </>
            ) : (
                <>No Data</>
            )}
        </div>

    )
}

export default Table