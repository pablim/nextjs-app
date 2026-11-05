import Link from 'next/link'

const SideLinks = () => {
    return (
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
    )
}

export default SideLinks