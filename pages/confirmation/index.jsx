import { useRouter } from 'next/router'

import styles from './style.module.scss';

export default function Confirmation() {
    const router = useRouter()
    const {transactionId, status, statusDetail} = router.query;

    const statusMsg = {
        'approved': 'sucesso',
        'rejected': 'Recusado por erro geral',
        'in_process': 'Em processamento'
    }
    
    return (
        <div className={styles.Confirmation}>
            {status === 'approved' ? 
                <h3>Pagamento confirmado</h3>
                :
                <h3>Houve um problema com o pagamento</h3>
            }
            <hr />
            <div>{transactionId}</div>
            <div>{status}</div>
            <div>{statusDetail}</div>
        </div>
    )
}