import React from 'react'

import { Message } from "../../components";

import styles from './layout.module.scss'

const MainLayout = ({children, pageTitle, msgs, isLoading}) => {

    return (
        <div className={styles.mainLayout}>
			<header className={styles.pageHeader}>
				<h3>{pageTitle}</h3>
			</header>
			<Message msgs={msgs} />
			{!isLoading ? <> {children} </> : <>Wait...</>}
		</div>
    )
}

export default MainLayout