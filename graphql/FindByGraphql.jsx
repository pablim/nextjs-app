import { gql, useQuery, useSubscription } from '@apollo/client';

import { Table } from "../components";

const query = gql`
	{
		users { 
			name
		}
	}
`
const subscriptionUserCreated = gql`
	subscription {
		userCreated {
			name
			email
		}
	}
`;

const subscriptionUsersCreated = gql`
	subscription  {
		usersCreated {
			name
			email
		}
	}
`;

export default function FindByGraphql({ cache }) {

	const { 
		loading, 
		error, 
		data, 
		refetch, 

		/**
		 * https://www.apollographql.com/docs/react/data/queries#startpolling
		 */
		stopPolling, // usado para parar o polling
		startPolling, // usado para parar iniciar o polling

		/**
		 * usado para buscar uma nova página de dados
		 * https://www.apollographql.com/docs/react/pagination/core-api#the-fetchmore-function
		 */
		fetchMore
	} = useQuery(query, {	
		/**
		 * Faz com que os dados sejam buscados novamente a cada intervalo de 
		 * tempo definido em milisegundos. Sempre uma nova requisição é enviada
		 */
		//pollInterval: 500, 
		fetchPolicy: "cache-and-network"
	});

	function LatestUser() {
  		const { data, loading } = useSubscription(subscriptionUserCreated);
  		return <h4>
			New user: {!loading && (data.userCreated.name + " - " + data.userCreated.email)}
		</h4>;
	}
	function LatestUsers() {
		const { data, loading } = useSubscription(subscriptionUsersCreated);
		return <h4>
			New users: {!loading && (data.usersCreated.map(user => (
				<>{user.name}<br/></>
			)))}
	  </h4>;
  }

	return (		
		loading ? 'Carregando...' : (
			<>
				<Table items={data.users}></Table>
				<LatestUser />
				<LatestUsers />
				<br />

				{/* 
					Dados do cache podem ser usados na exibição
				 */}
				{console.log('query', cache.readQuery({query}))}

				{/* 
					Também podemos escrever dados no cache diretamente
				 */}
				{/* {cache.writeQuery({query, data: {users: [{name: 'Pablo Query'}]}})} */}

				{/* executa novamente a busca */}
				<button onClick={() => refetch()}>Refetch Users</button>
				<br />
				<button onClick={() => stopPolling()}>Stop polling</button>
				<br />
				<button onClick={() => startPolling(500)}>Star again polling</button>
			</>

		)
	)
}