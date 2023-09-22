import { useRouter } from "next/router";

export default function Permissions() {
    const router = useRouter()

    const {id} = router.query

    return <div>Permissions for user: {id}</div>
}