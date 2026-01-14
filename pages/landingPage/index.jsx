import styles from "./styles/styles.module.scss";

const Navbar = ({}) => {
    return (
        <div className={styles.navbar}>
            <div>
                <span>Sobre mim</span>
                <span>Serviços</span>
                <span>Preços</span>
                <span>Depoimentos</span>

            </div>
            <div>
                <div>Instagram</div>
                <div>Facebook</div>
            </div>
        </div>
    )
}

export default function LandingPage({}) {
    return (
        <div className={styles.container}>
            <Navbar />
            <section>
                <div>
                    <div className={styles.mainImage}></div>
                    <div>
                        <div className={styles.title}>Title</div>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error consequatur assumenda repellendus! Corrupti dolores numquam fuga illo mollitia pariatur! Amet quae doloribus repellat impedit debitis id voluptatum facilis aliquam aut.
                        Minima repudiandae numquam cupiditate perspiciatis eaque consequatur quas esse est quod aliquid rerum suscipit qui at facilis ea dolores, quasi recusandae corporis voluptas unde a.
                    </div>
                </div>
                <div>right side</div>
            </section>
            <section></section>
            <section></section>
            <section></section>
        </div>
    )
}