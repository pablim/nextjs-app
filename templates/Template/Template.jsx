
import { BackToHome, BackButton } from "../../components";

import styles from './styles/style.module.scss'

const Template = ({ topContent, content }) => {
    return (
        <div className={styles.container} >
            <div className={styles.fieldsContainer}>
                <div className={styles.pageActions}>
                    <BackToHome />
                    <BackButton />
                </div>

                <div className={styles.topContent}>
                    {topContent}
                </div>
            </div>
            
            <div className={styles.listContainer}> 
                {content}
            </div>

        </div>
    )
}

export default Template