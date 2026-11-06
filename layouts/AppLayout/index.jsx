import styles from './layout.module.scss'
import { Message } from "../../components";

const Header = ({ children }) => (
    <div className={styles.navbar}>{children}</div>
)

const SideBar = ({ children }) => (
    <div id="sidebar" className={styles.sidebar}>
        {children}
    </div>
)

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

const PageLayoutUsersLocalStorage = ({ 
    headerContent = "Header", 
    sideBarContent = "SideBar",
    mainContent = "Main Content",
    pageTitle = "Page Title"
}) => {
    return (
        <div className={styles.layout}>
            <Header>{headerContent}</Header>

            <div className={styles.sidebarContainer}>

                <SideBar>{sideBarContent}</SideBar>

                <div className={styles.mainContentContainer}>
                    
                    <main>
                        <MainLayout pageTitle={pageTitle}>
                            {mainContent}
                        </MainLayout>
                    </main>
                </div>
            </div>
        </div>
    )
}

export default PageLayoutUsersLocalStorage