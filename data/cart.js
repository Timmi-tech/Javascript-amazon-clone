export let cart;
loadFromStorage();

export function loadFromStorage() {
    cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
        cart = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
        }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2'
        }, {
            productId: '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
            quantity: 1,
            deliveryOptionId: '3'
        }];
    }

}

function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart))
}

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
            quantity: selectedquantity,
            deliveryOptionId: '1'
        })
    }
    saveToStorage();
}

export function removeFromCart(productId) {
    const newCart = [];


    cart.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    })
    cart = newCart;
    saveToStorage();
}

export function updateQuantity(productId, newQuantity) {

    let matchingQuantity;

    cart.forEach((cartItem) => {
        if (productId == cartItem.productId) {
            matchingQuantity = cartItem;
        };
    });
    matchingQuantity.quantity = newQuantity;
    saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    cart.forEach((cartItem) => {
        if (productId === cartItem.productId) {
            matchingItem = cartItem;
        }
    })
    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage();

}

export function loadCart(fun) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {

        console.log(xhr.response)
        fun();
    });
    xhr.open('GET', 'https://supersimplebackend.dev/cart');
    xhr.send();

}