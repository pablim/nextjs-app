import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

const mutation = gql`
	mutation createFakeUsers($qtde: Int) {
		createFakeUsers(qtde: $qtde) { 
			name
		}
	}
`


const CREATE_USER_MUTATION = gql`
	mutation createUser($name: String!, $email: String!, $file: [Upload]) {
		createUser(name: $name, email: $email, file: $file) { 
			name
		}
	}
`

const MUTATION = gql`
  mutation ($files: [Upload!]!) {
    uploadFiles(files: $files) {
      success
    }
  }
`;


const query = gql`
	{
		users { 
			name
		}
	}
`
export default function InsertByGraphql() {
	const [qtde, setQtde] = useState(3)
	const [name, setName] = useState("tewste")
	const [email, setEmail] = useState("teste@")
	const [file, setFile] = useState([])

	const [ saveUsers, { error, data } ] = useMutation(mutation, {
		variables: { qtde },
		//refetchQueries: [query], // recarrega a query de usuários
		update: (cache, { data: { createFakeUsers } }) => {
			let dataNow = cache.readQuery({ query: query})
			cache.writeQuery({
				query, 
				data: { users: [...dataNow.users, ...createFakeUsers] } 
			})
		}
	});

	const [ saveUser, { error2, data2 } ] = useMutation(CREATE_USER_MUTATION, 
		{
			variables: { name, email, file }
		}
	);

	return (
		<>
			Add fake users <button onClick={() => saveUsers()}>Add</button><br /><br/>

			Add User
			send file: 
			<input
				type="file"
				multiple
				required
				onChange={({ target: { validity, files } }) => {
					debugger
					if (validity.valid) setFile(files)
				}}
				/>
			<br/>
			<button onClick={() => saveUser()}>Add</button>
		</>
	)
}