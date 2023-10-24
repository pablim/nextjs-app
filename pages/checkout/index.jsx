import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { BackToHome } from "../../components";

import { useMercadoPago } from "../../hooks/useMercadoPago";
import { checkout } from "../../api/services/Checkout";
//import {TextInput, Overlay, Loader} from "@pablovaz/reactjs-components";

import styles from './style.module.scss'

const publicKey = process.env.NEXT_PUBLIC_MERCADO_PAGO_API_KEY;

export default function Checkout () {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [isFormLoaded, setIsFormLoaded] = useState(false)
    const [cardData, setCardData] = useState([])
    const [mp, createCardToken] = useMercadoPago(publicKey, 'coreMethods', isFormLoaded);

    const { amount } = router.query

    useEffect(() => {
        setIsFormLoaded(true)
    }, [])

    const send = (data) => {
        setLoading(true)
        checkout(data).then((response) => {
            console.log('response', response); // checar resposta undefined
            router.push('/confirmation?transactionId='+response.data.id+'&status='+response.data.status+'&statusDetail='+response.data.status_detail)
            setLoading(false)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createCardToken(e)
        const formData = new FormData(document.getElementById('form-checkout'))
        send(formData)
    }

    return (
        <div className={styles.Container}>
            <BackToHome />
            Pagamento
            {/* {loading && */}
                {/* <Overlay 
                    visible={true} 
                    onClick={()=>(console.log('aqui'))}
                    contentPosition={'bottom'}> */}
                    {/* <Loader /> */}
                {/* </Overlay>  */}
            {/* } */}

            {/* <TextInput label={'Name teste: '} extraStyles={{border: '1px solid red'}}/> */}
            <br />
            
            <form id="form-checkout" 
                className={styles.formCheckout} 
                onSubmit={handleSubmit}
            >
                <input 
                    id="transactionAmount" 
                    name="transactionAmount" 
                    placeholder="Valor" 
                    value={amount ? amount : null}
                />

                <hr />

                <div id="form-checkout__cardNumber" 
                    className={styles.container}></div>
                <div id="form-checkout__expirationDate" 
                    className={styles.container}></div>
                <div id="form-checkout__securityCode" 
                    className={styles.container}></div>

                <input id="form-checkout__cardholderName" type="text" 
                    placeholder="Titular do cartão" />

                <select id="form-checkout__issuer" name="issuer">
                    <option value="" disabled selected>Banco emissor</option>
                </select>

                <select id="form-checkout__installments" name="installments">
                    <option value="" disabled selected>Parcelas</option>
                </select>

                <select id="form-checkout__identificationType" 
                    name="identificationType"
                >
                    <option value="" disabled selected>Tipo de documento</option>
                </select>

                <input type="text" id="form-checkout__identificationNumber" 
                    name="identificationNumber" 
                    placeholder="Número do documento" 
                />

                <div>
                    <input type="email" id="form-checkout__email" name="email" 
                        placeholder="E-mail" />
                    <div>*Diferente do utilizado na conta do mercado pago</div>
                </div>

                <input id="token" name="token" type="hidden" />
                <input id="paymentMethodId" name="paymentMethodId" 
                    type="hidden" />
                <input id="description" name="description" type="hidden" 
                    value="Nome do Produto"/>

                <div>
                    Salvar dados do cartão <input type='checkbox' name='save-card'/> 
                </div>

                <button type="submit" id="form-checkout__submit">
                    {!loading ? 'Pagar' : 'Processando. Aguarde...'}
                </button>
            </form>
        </div>
    )
}