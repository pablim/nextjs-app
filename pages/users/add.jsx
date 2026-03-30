import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { addUser } from "../../api/services/Users";
import bcrypt from "bcryptjs";

import { PageLayout, MainLayout } from "../../layouts";

export default function Add() {
	const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msgs, setMsgs] = useState([])

	const onSubmit = (e) => {
		setIsLoading(true)
		e.preventDefault();

		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(password, salt);
		//var comp = bcrypt.compareSync(password, hash); // true
		
		addUser({name, email, hash}).then((response) => {
			debugger
			console.log('addUser', response);
			setName('')
			setEmail('')
			setPassword('')
			setIsLoading(false)

			if (response?.data?.userId) {
				setMsgs([{text: 'Success', type: "success"}])
			}
		}).catch((error) => {
			debugger
			// error.response.data.msgs
			// error.response.status
			// error.response.statusText
			// error.message
			setMsgs(error.response.data.msgs)
			setIsLoading(false)
		})
	}

	return (
		<PageLayout>
			<MainLayout msgs={msgs} pageTitle={'Add user'} isLoading={isLoading}>
				<form onSubmit={onSubmit}>
					<input type='text' onChange={(e) => setName(e.target.value)} 
						value={name} placeholder='name'/>
					<br />
					<input type='text' onChange={(e) => setEmail(e.target.value)} 
						value={email} placeholder='email'/>
					<br />
					<input type='text' onChange={(e) => setPassword(e.target.value)} 
						value={password} placeholder='senha'/>
					<br />
					<input type='submit'  value="Salvar"/>
				</form>
			</MainLayout>
		</PageLayout>
	)
}

// Add.getLayout = function getLayout(page) {
// 	return (
// 		<PageLayout pageTitle={'Add user'}>
// 			<MainLayout>{page}</MainLayout>
// 		</PageLayout>
// 	)
// }