import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { AppLayout } from "../../layouts";
import SideLinks from "../../components/LocalStorageComponents/SideLinks";
import Form from "../../components/LocalStorageComponents/Form";

export default function Add() {
	const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
	const [fields, setFields] = useState({
		name: '',
		email: ''
	})
		
	const { id } = router.query

	useEffect(() => { if (id) { getUser() } }, [id])

	const getUser = () => {
		setIsLoading(true)

		const userData = {id , ...JSON.parse(sessionStorage.getItem(id))};

		setFields(userData)
		setIsLoading(false)
	}

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
			sideBarContent={ <SideLinks /> }
			mainContent={
				<Form 
					fields={fields} 
					setFields={setFields} 
					onSubmit={onSubmit} />
			}
		/>
		
	)
}