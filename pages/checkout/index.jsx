import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { BackToHome } from "../../components";

import { useMercadoPago } from "../../hooks/useMercadoPago";
import { checkout } from "../../api/services/Checkout";
//import {TextInput, Overlay, Loader} from "@pablovaz/reactjs-components";

import styles from './style.module.scss'

const publicKey = process.env.NEXT_PUBLIC_MERCADO_PAGO_API_KEY;

/**
 * 
 * TODO: melhorar a aprovação dos pagamentos
 * https://www.mercadopago.com.br/developers/pt/docs/checkout-api/integration-configuration/card/integrate-via-core-methods
 * 
 * TODO: implementar opção renderização methodo brick
 * https://www.mercadopago.com.br/developers/pt/docs/checkout-bricks/card-payment-brick/default-rendering#editor_2
 */

export default function Checkout () {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [tokenIsReady, setTokenIsReady] = useState(false)
    const [isFormLoaded, setIsFormLoaded] = useState(false)
    const [cardData, setCardData] = useState([])
    const [fieldValidation, setFieldValidation] = useState({
        'form-checkout__cardholderName': '',
        'form-checkout__issuer': '',
        'form-checkout__installments': '',
        'form-checkout__identificationType': '',
        'form-checkout__identificationNumber': '',
        'form-checkout__email': '',
        'token': '',
        'paymentMethodId': '',
        'description': '',
    })
    const [createCardToken] = useMercadoPago(
        publicKey, 
        'coreMethods', 
        isFormLoaded, 
        setIsLoading, 
        setTokenIsReady
    );

    const { amount } = router.query

    useEffect(() => {
        setIsFormLoaded(true)
    }, [])

    const send = (data) => {
        setIsLoading(true)
        checkout(data).then((response) => {
            console.log('response', response); // checar resposta undefined
            router.push('/confirmation?transactionId='+response.data.id+'&status='+response.data.status+'&statusDetail='+response.data.status_detail)
            setIsLoading(false)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await createCardToken(e)
        const formData = new FormData(document.getElementById('form-checkout'))
        send(formData)
    }

    const checkInInput = (e, validations=[]) => {
        const f = fieldValidation
        
        validations.map(validation => {
            const result = validation(e)
            if (result) 
            f[e.id] = result
        })

        setFieldValidation(f)
    }

    const isBlank = (e) => {
        if (e.value === "") return 'blank'
    }

    const check = () => {
        
    }

    return (
        <div className={styles.Container}>
            <BackToHome />
            Pagamento
            {/* {isLoading && */}
                {/* <Overlay 
                    visible={true} 
                    onClick={()=>(console.log('aqui'))}
                    contentPosition={'bottom'}> */}
                    {/* <Loader /> */}
                {/* </Overlay>  */}
            {/* } */}

            {/* <TextInput label={'Name teste: '} extraStyles={{border: '1px solid red'}}/> */}
            <br />
            
            {//!isLoading && 
                <form id="form-checkout" 
                    className={styles.formCheckout} 
                    onSubmit={handleSubmit}
                    style={{display: `${isLoading ? 'none' : 'flex'}`}}
                >
                    <input 
                        id="transactionAmount" 
                        name="transactionAmount" 
                        placeholder="Valor" 
                        value={amount ? amount : null}
                        pattern='[0-9]*|[0-9]*,[0-9]{2}'
                    />

                    <hr />

                    <div id="form-checkout__cardNumber" 
                        className={styles.container}></div>
                    <div id="form-checkout__expirationDate" 
                        className={styles.container}></div>
                    <div id="form-checkout__securityCode" 
                        className={styles.container}></div>

                    <input id="form-checkout__cardholderName" type="text" 
                        placeholder="Titular do cartão" pattern='[a-zA-z\s]*' 
                        onInput={check} />

                    <select id="form-checkout__issuer" name="issuer" 
                        style={{display: 'none'}}
                    >
                        <option value="" disabled selected>Banco emissor</option>
                    </select>

                    <select id="form-checkout__installments" name="installments">
                        <option value="" disabled selected>Parcelas</option>
                    </select>

                    <div style={{display: 'flex', gap: '4px'}}>

                        <select id="form-checkout__identificationType" 
                            name="identificationType"
                        >
                            <option value="" disabled selected>Tipo de documento</option>
                        </select>

                        <input type="text" id="form-checkout__identificationNumber" 
                            name="identificationNumber" 
                            placeholder="Número do documento"
                            pattern='[0-9]{11}' 
                        />
                    </div>

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
                        {!isLoading ? 'Pagar' : 'Processando. Aguarde...'}
                    </button>
                </form>
            }
        </div>
    )
}