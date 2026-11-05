import { useState } from 'react';
import { useRouter } from 'next/router';
import bcrypt from "bcryptjs";

import { addUser } from "../../api/services/Users";
import { AppLayout } from "../../layouts";
import SideLinks from '../../components/components/SideLinks';
import Form from "../../components/components/Form";

export default function Add() {
	const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [fields, setFields] = useState({})
	const [msgs, setMsgs] = useState([])

	const onSubmit = (e) => {
		setIsLoading(true)
		e.preventDefault();

		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(password, salt);
		//var comp = bcrypt.compareSync(password, hash); // true
		
		addUser({name, email, hash}).then((response) => {
			
			console.log('addUser', response);
			setName('')
			setEmail('')
			setPassword('')
			setIsLoading(false)

			if (response?.data?.userId) {
				setMsgs([{text: 'Success', type: "success"}])
			}
		}).catch((error) => {
			
			// error.response.data.msgs
			// error.response.status
			// error.response.statusText
			// error.message
			setMsgs(error.response.data.msgs)
			setIsLoading(false)
		})
	}

	return (
		<AppLayout 
			sideBarContent={<SideLinks />}
			mainContent={
				<Form 
					fields={fields} 
					setFields={setFields} 
					onSubmit={onSubmit}/>
			}
		/>
	)
}