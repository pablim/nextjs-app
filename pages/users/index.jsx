import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { getUser } from "../../api/services/Users";
import { getUsers as query } from "../../api/querys/Users";
import { Table } from "../../components";
import { AppLayout } from "../../layouts";
import SideLinks from "../../components/components/SideLinks";

export default function List() {
    const router = useRouter();
	const [userList, setUserList] = useState([])

    useEffect(() => {
		try {

			getUser().then((response) => {
				if (response)
					setUserList(response.data)
			})
	
			query().then((data) => console.log(data));
		} catch (e) {
			console.log(e);
		}

    }, [])

	return (
		<AppLayout 
			pageTitle={'List users'}
			sideBarContent={<SideLinks />}
			mainContent={<Table items={userList}></Table>}
		/>
	)
}