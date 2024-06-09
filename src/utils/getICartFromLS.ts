export const getCartFromLS = () => {
    const data = localStorage.getItem('cart')
    if (data) {
        const cartData = JSON.parse(data)
        const items = JSON.parse(cartData.items)
        const totalPrice = Number(cartData.totalPrice)

        return {
            items,
            totalPrice
        }
    }

    return {
        items: [],
        totalPrice: 0
    }
}