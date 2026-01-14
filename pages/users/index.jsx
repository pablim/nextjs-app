import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getUser } from "../../api/services/Users";
import { getUsers as query } from "../../api/querys/Users";

import { Table } from "../../components";
import { PageLayout, MainLayout } from "../../layouts";

export default function List() {
    const router = useRouter();
	const [userList, setUserList] = useState([])

    useEffect(() => {
        getUser().then((response) => {
            if (response)
                setUserList(response.data)
        })

		query().then((data) => console.log(data));

    }, [])

	return (
		<PageLayout>
			<MainLayout pageTitle={'List users'}>
				<Table items={userList}></Table>
			</MainLayout>
			
		</PageLayout>
	)
}


// List.getLayout = function getLayout(page) {
// 	return (
// 		<PageLayout pageTitle={'List user'}>
// 			{page}
// 		</PageLayout>
// 	)
// }