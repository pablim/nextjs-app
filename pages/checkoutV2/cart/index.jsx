import { useEffect, useState } from 'react'
import { initMercadoPago, Payment, CardPayment } from "@mercadopago/sdk-react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";

import { BackToHome } from "../../../components";
import { Loader } from "@pablovaz/reactjs-components-lib";
import { useMercadoPago } from "../../../hooks/useMercadoPago";
import { checkout } from "../../../api/services/Checkout";
import { totalValue } from "../../../utils/checkout";
import { urlOrder, urlCatalog } from "../../../utils/urls";

import styles from './style.module.scss'

const publicKey = process.env.NEXT_PUBLIC_MERCADO_PAGO_API_KEY;

const CartTable = ({ cart, handleQuantity }) => {
    const tableData = cart?.items?.map(
        (item, idx) => (
            <tr key={idx}>
                <td> {item.name} </td>
                <td> 
                    <input 
                        onInput={(e) => handleQuantity(e, idx)}
                        value={item.quantity}
                        type='number' /> 
                </td>
                <td> R$ {item.price} </td>
                <td> R$ {(item.price * (item.quantity)).toFixed(2)} </td>
                <td> 
                    <button 
                        onClick={
                            () => handleRemoveItem(idx)
                        }
                    >
                        Remover
                    </button>
                </td>
            </tr>
        )
    )

    return (
        <table className={styles.resumeTable}>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Qtde</th>
                    <th>Preço</th>
                    <th>Preço Total</th>
                </tr>
            </thead>
            <tbody>{tableData}</tbody>
        </table>
    )
}

export default function Cart() {
    const router = useRouter();
    const { isReady } = router;
    const { payment } = router.query;
    
    const [paymentDetails, setPaymentDetails] = useState({})
    const [cart, setCart] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => { getCatalog() }, [])

    const getCatalog = () => {
        setLoading(true)
        const filtro = JSON.stringify({ items: [1, 2] });

        fetch(`${urlCatalog}?filtro=${filtro}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((response) => response.json())
        .then((response) => {
            const amount = response.data.reduce((acc, cur) => {
                return acc + cur.price
            }, 0)

            setCart({
                items: response.data.map(i => ({...i, quantity: 1})),
                amount
            })
        })
        .catch((error) => {})
        .finally(() => setLoading(false))
    }

    const handleQuantity = (e, productIdx) => {
        cart.items[productIdx].quantity = e.target.value
        const amount = totalValue(cart.items)
        setCart({...cart, amount})
    }

    const handleRemoveItem = (productIdx) => {
        cart.items.splice(productIdx, 1)
        const amount = totalValue(cart.items)
        setCart({...cart, amount})
    }
    
    const onSubmitOrder = (productList) => {
        setLoading(true)

        fetch(`${urlOrder}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                customerId: 1,
                items: cart.items
            })
        })
        .then((response) => response.json())
        .then((response) => {
            if (!response?.error) {
                router.push(`/checkoutV2?orderId=${response.data.id}`)
            }
        })
        .catch((error) => {})
        .finally(() => setLoading(false))

    }

    return ( cart && 
        <div className={styles.Container}>
            <CartTable cart={cart} handleQuantity={handleQuantity}/>
            <div className={styles.total}>Valor total: {cart.amount}</div>

            <div className={styles.buttonContainer} >
                <button onClick={onSubmitOrder}>
                    Finalizar compra
                </button>
            </div>
        </div>
    )
}