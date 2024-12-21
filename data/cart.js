export const cart = [];

export function addToCart(productId) {
    const selectedProduct = document.querySelector(`.js-quantity-selector-${productId}`)

    const selectedquantity = Number(selectedProduct.value)


    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    })
    if (matchingItem) {
        matchingItem.quantity += selectedquantity;
    } else {
        cart.push({
            productId,
            quantity: selectedquantity
        })
    }
}