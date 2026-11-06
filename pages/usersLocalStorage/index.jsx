import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { Table } from "../../components";
import { AppLayout } from "../../layouts";
import SideLinks from "../../components/LocalStorageComponents/SideLinks";

export default function List() {
    const router = useRouter();
	const [userList, setUserList] = useState([])
	
    useEffect(() => { getUsers() }, [])

	const getUsers = () => {
		const users = []
		const keys = Object.keys(sessionStorage).reverse()
		keys.forEach(key => {
			users.push({id: key, ...JSON.parse(sessionStorage.getItem(key))})
		})
		setUserList(users);
	}

	const handleDeleteAll = () => {
		sessionStorage.clear()
		setUserList([])
	}

	const handleDelete = (id) => sessionStorage.removeItem(id) 

	return (
		<AppLayout 
			pageTitle={'List users'}
			sideBarContent={<SideLinks />}
			mainContent={
				<Table items={userList} 
					globalActions={[
						{
							label: 'Excluir todos',
							icon: '',
							action: handleDeleteAll
						}, 
						{
							label: 'Add',
							icon: '',
							action: (items) => 
								router.push('/usersLocalStorage/add')
						},
						{
							label: 'Exportar',
							icon: '',
							action: (items) => {}
						}
					]} 
					actions={[
						{
							label: 'Editar',
							icon: '',
							action: (e, item, row) => {
								e.stopPropagation()
								router.push(`/usersLocalStorage/${item.id}`)
							}
						},
						{
							label: 'Remover',
							icon: '',
							action: (e, item, row) => {
								handleDelete(item.id)
								getUsers()
							}
						}
					]}
				/>
			
			}
		/>
	)
}