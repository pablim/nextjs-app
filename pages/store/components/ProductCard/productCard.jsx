import { useRouter } from "next/router";

import styles from "./styles/style.module.scss";
import { useState } from "react";

const ProductCard = ({
    product,
    addToCart = () => {}
}) => {
    const router = useRouter()
    const [quantity, setQuantity] = useState(1)

    const buy = () => {
        router.push('store/cart', {query: {product: product.id}})
    }

    return (
        <div className={styles.Container}>
            <div>{product?.name}</div>
            <div>Images</div>
            <div>{product?.price}</div>
            <div>
                Qtde: <input 
                    onChange={
                        (e) => setQuantity(e.target.value > 0 ? e.target.value : 1)
                    } 
                    type="number" 
                    value={quantity}
                />
            </div> 
            <div>
                <button onClick={() => buy(product)}>Comprar</button>
                <button onClick={() => addToCart(product, quantity)}>
                    Adicinar ao carrinho
                </button>
            </div>
        </div>
    )
}

export default ProductCard