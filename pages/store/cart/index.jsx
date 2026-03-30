import { useEffect, useState } from "react"
import { useRouter } from "next/router";

import styles from "./styles/style.module.scss";

const getCart = () => JSON.parse(window.sessionStorage.getItem('cart'))

export default function Cart({}) {
    const router = useRouter()
    const [cart, setCart] = useState({})
    const [invoicePrice, setInvoicePrice] = useState()

    useEffect(() => {
        const cart = getCart()
        setInvoicePrice(cart.productList.reduce(
            (accumulator, product) => (product.price * product.quantity) + accumulator, 0
        ))
        setCart(cart)
    }, [])

    return (
        <div className={styles.Container}>
            Cart
            <br />
            List 
            <div>
                {cart.productList?.map((product) => {
                    return (
                        <div key={product.id}>
                            <span>{product.id} </span>
                            <span>{product.name} </span>
                            <span>{product.price} </span>
                            <span>{product.quantity} </span>
                            <span>total {product.quantity * product.price} </span>
                        </div>
                    )
                })}
            </div>

            <div>
                Preço total {invoicePrice}
            </div>
            <div>
                <button onClick={() => {
                        router.push('/store/checkout', {query: {invoicePrice}})
                    }}
                >
                    Checkout</button>
            </div>
        </div>
    )
}