import { useState } from 'react';
import { useRouter } from 'next/router';

import { AppLayout } from "../../layouts";
import SideLinks from "../../components/LocalStorageComponents/SideLinks";
import Form from "../../components/LocalStorageComponents/Form";

export default function Add() {
	const router = useRouter();
	 
  	const { id } = router.query

    const [isLoading, setIsLoading] = useState(false);
	const [fields, setFields] = useState({
		name: '',
		email: ''
	})

	const onSubmit = (e) => {
		setIsLoading(true)
		e.preventDefault();
		
		const userData = {name: fields.name, email: fields.email};

		const total = sessionStorage.length

		sessionStorage.setItem(total + 1, JSON.stringify(userData));

		setIsLoading(false)
		setFields({name: '', email: ''})

		router.back()
	}

	return (
		<AppLayout 
			pageTitle={'Add user'} 
			sideBarContent={<SideLinks />}
			mainContent={
				<Form fields={fields} setFields={setFields} onSubmit={onSubmit}/>
			}
		/>
	)
}