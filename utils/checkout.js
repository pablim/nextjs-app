
const totalValue = (items) => {
    const amount = items.reduce((acc, cur) => {
        return acc + (cur.price * (cur.quantity || 1))
    }, 0)

    return amount.toFixed(2)
}

export { totalValue }