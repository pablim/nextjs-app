import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUserById } from "../../api/services/Users";

import { PageLayout, MainLayout } from "../../layouts";

export default function Show() {
	const router = useRouter();
	const { id } = router.query;
	const [user, setUser] = useState({})

	useEffect(() => {
		if (id) {
			getUserById({id}).then((response) => {
				if (response) {
					setUser(response.data)
				}
			}).catch((err) => {
				console.log(err);
			})
		}
	}, [id])

	return (
		<PageLayout>
			<MainLayout pageTitle={'Show user'} >
				<div>Id: {user.id}</div>
				<div>Nome: {user.name}</div>
				<div>E-mail: {user.email}</div>
			</MainLayout>
		</PageLayout>
	)
}

// Show.getLayout = function getLayout(page) {
// 	return (
// 		<PageLayout pageTitle={'List user'}>
// 			{page}
// 		</PageLayout>
// 	)
// }