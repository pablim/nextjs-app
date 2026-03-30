import Link from "next/link";

const Logout = () => {

    const logout = () => {
        window.localStorage.removeItem('token')
    }

    return (
        <>
            <Link href={'/login'} onClick={logout}>Sair</Link>
        </>
    )
}

export default Logout