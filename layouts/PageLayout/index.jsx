import React from 'react'
import Link from 'next/link'

import styles from './layout.module.scss'

const Layout = ({children, pageTitle}) => {
    return (
        <div className={styles.layout}>
            <nav className={styles.navbar}>nav bar</nav>
            <div className={styles.sidebarContainer}>
                <div id="sidebar" className={styles.sidebar}>
                    <ul>
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/users">Users</Link>
                        </li>
                        <li>
                            <Link href="/users/add">User add</Link>
                        </li>
                    </ul>
                </div>
                <div className={styles.mainContentContainer}>
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}

export default Layout