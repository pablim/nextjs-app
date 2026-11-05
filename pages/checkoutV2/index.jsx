import { useEffect, useState } from 'react'
import { initMercadoPago, Payment, CardPayment } from "@mercadopago/sdk-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

import { BackToHome } from "../../components";
import { Loader } from "@pablo/react-components-lib";
import { useMercadoPago } from "../../hooks/useMercadoPago";
import { checkout } from "../../api/services/Checkout";
import { totalValue } from "../../utils/checkout";
import { urlOrder, urlPayment } from "../../utils/urls";
import styles from './style2.module.scss'

const publicKey = process.env.NEXT_PUBLIC_MERCADO_PAGO_API_KEY;

const AmountInput = ({ amountInputValue, setAmountInputValue, router }) => {
    return (
        <div className={styles.amountInputContainer}>
            <div>
                <label>Valor:</label> 
                <div className={styles.inputContainer}>
                    R$
                    <input value={amountInputValue}
                        onInput={(e) => setAmountInputValue(e.target.value)}/>
                </div>
                <div className={styles.buttonContainer}>
                    <button 
                        onClick={
                            () => router.replace(`?amount=${amountInputValue}`)
                        }
                    >
                        Pagar
                    </button>
                </div>
            </div>
        </div>
    )
}

const SummaryTable = ({ order, amount}) => {

    const tableData = order?.items?.map(
        (item, idx) => (
            <tr key={idx}>
                <td> {item.name} </td>
                <td> {item.quantity} </td>
                <td> 
                    R$ {item.price * item.quantity} 
                </td>
            </tr>
        )
    )

    return (
         <table className={styles.resumeTable}>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                </tr>
            </thead>
            <tbody>
                {tableData}
            </tbody>
        </table>
    )
}

const Summary = ({ order, amount }) => (
    <div className={styles.summaryContainer}>
        <div className={styles.summaryHeader}>
            <div> Resumo da compra </div>
            <div>Número do pedido: #{order?.id}</div>
        </div>

        {!amount ? 
            <>
                <SummaryTable order={order} amount={amount}/>

                <div className={styles.total}>
                    Valor total: {order?.amount}
                </div>
            </>
            : (
                <div className={styles.directAmountContainer}>
                    <div>
                        <span className={styles.currency}>R$</span>
                        <span className={styles.amount}>
                            {order?.amount}
                        </span>
                    </div>
                </div>
            )
        }
    </div>
)

const PaymentArea = ({ order, onSubmit }) => (
    <div className={styles.paymentContainer}>
        <div className={styles.summaryHeader}>
            <div>Pagameto</div>
        </div>

        {order?.amount && (    
            <CardPayment
                initialization={{ amount: order?.amount }}
                onSubmit={onSubmit}
                onReady={() => { console.log("Brick carregado") }}
                onError={(error) => { console.error(error) }}
            />
        )}
    </div>
)

const ScreenLoader = () => (
    <div className={styles.loaderArea}>
        <div><Loader /></div>
    </div>
)

export default function Checkout () {

    const router = useRouter();
    const { orderId, amount } = router.query;

    const [order, setOrder] = useState();
    const [payment, setPayment] = useState();
    const [loading, setLoading] = useState(false)
    const [amountInputValue, setAmountInputValue] = useState(0)

    useEffect(() => { initMercadoPago(publicKey, { locale: 'pt-BR' }) }, [])
    useEffect(() => {
        if (orderId) getOrder()
        if (amount) createOrder()
    }, [orderId, amount])

    /**
     * consulta ao backend para obter detalhes do pedido (valor, itens, 
     * etc.) e exibir na tela de checkout
     */
    const getOrder = () => {
        setLoading(true)
        
        fetch(`${urlOrder}?orderId=${orderId}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" }
        })
        .then((response) => response.json())
        .then((response) => {
            if (!response?.error) {        
                const amount = totalValue(response.data)

                setOrder({
                    id: response.data[0].order_id,
                    amount,
                    items: response.data
                });
            }
        })
        .catch((error) => {})
        .finally(() => setLoading(false))
    }

    const createOrder = () => {
        setLoading(true)

        fetch(`${urlOrder}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ customerId: 1 })
        })
        .then((response) => response.json())
        .then((response) => {
            if (!response?.error) {
                setOrder({
                    id: response?.data?.id,
                    amount,
                });
            }
        })
        .catch((error) => {})
        .finally(() => setLoading(false))
    }

    const onSubmit = (formData, additionalData) => {
        setLoading(true)

        // O Brick devolve o token e os dados mínimos do pagamento
        fetch(`${urlPayment}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderId: order.id,
                amount, // Direct amount
                paymentData: {
                    type: "online",
                    ...formData
                }
            })
        })
        .then((response) => response.json())
        .then((response) => {
            if (!response?.error) {
                setPayment(response.data)

                const c = new URLSearchParams(response.data)
                router.push(`/checkoutV2/status?payment=${JSON.stringify(response.data)}`)
            }
        })
        // lidar com a resposta de erro ao tentar criar o pagamento 
        .catch((error) => {})
        .finally(() => setLoading(false))
    }

    return (
        <div className={styles.Container}>
            {loading && <ScreenLoader />}
            {!amount && !order ?
                <AmountInput 
                    amountInputValue={amountInputValue} 
                    setAmountInputValue={setAmountInputValue}
                    router={router}
                />
            : 
                <div className={styles.main}>
                    <Summary order={order} amount={amount} />
                    <PaymentArea order={order} onSubmit={onSubmit}/>
                </div>
            }
        </div>
    )
}