import { ProductCard } from "./components";

const addToCart = (product, quantity) => {
    const cart = JSON.parse(
        window.sessionStorage.getItem('cart')
    ) || {productList: []}

    const hasInserted = cart.productList.some(
        (productInList) => productInList.id === product.id
    )

    if (!hasInserted) {
        cart.productList.push({...product, quantity})
        window.sessionStorage.setItem('cart', JSON.stringify(cart))
    }
}

export default function Home({}) {

    return (
        <>
            <div>Home</div>
            <div>Banners</div>
            <div>Listas de produtos</div>
            <div>Ofertas</div>
            <br /><br /><br />

            <ProductCard 
                product={{id: 1, name: 'My product', price: '50.00', quantity: 0}}
                addToCart={addToCart}
            />

            <ProductCard 
                product={{id: 2, name: 'My product', price: '180.00', quantity: 0}}
                addToCart={addToCart}

            />
        </>
    )
}