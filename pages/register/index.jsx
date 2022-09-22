
import Layout from '../../components/Layout'

/**
 * Next.js supports CSS Modules using the [name].module.css file naming 
 * convention. CSS Module files can be imported anywhere in your application.
 */

// for sass npm install --save-dev sass
import styles from './register.module.scss'



const Register = () => {
    return (
        <Layout >
            <div className={styles.title}>Register</div>

            {/* 
                Next.js supports Sass variables exported from CSS Module files.
                For example, using the exported primaryColor Sass variable:
            */}
            color: {styles.primaryColor}
        </Layout>
    )
}

export default Register