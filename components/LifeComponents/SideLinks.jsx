import Link from 'next/link'

const SideLinks = () => {
    return (
        <ul>
            <li>
                <Link href="/">Home</Link>
            </li>
            <li>
                <Link href="/usersLocalStorage">Users</Link>
            </li>
            <li>
                <Link href="/usersLocalStorage/add">User add</Link>
            </li>
        </ul>
    )
}

export default SideLinks