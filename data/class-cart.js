class Cart {
    cartItems;



    localStorageKey;


    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.loadFromStorage();
    }


    loadFromStorage() {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
        if (!this.cartItems) {
            this.cartItems = [{
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
    saveToStorage() {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems))
    }
    getCartItem(productId) {
        return this.cartItems.find(cartItem => cartItem.productId === productId);
    }
    addToCart(productId) {
        const selectedProduct = document.querySelector(`.js-quantity-selector-${productId}`);
        if (!selectedProduct) {
            console.error(`Product selector for ${productId} not found.`);
            return;
        }

        const selectedQuantity = Number(selectedProduct.value) || 0;
        const matchingItem = this.getCartItem(productId);

        if (matchingItem) {
            matchingItem.quantity += selectedQuantity;
        } else {
            this.cartItems.push({
                productId,
                quantity: selectedQuantity,
                deliveryOptionId: '1'
            });
        }

        this.saveToStorage();
    }
    removeFromCart(productId) {
        const newCart = [];


        this.cartItems.forEach((cartItem) => {
            if (cartItem.productId !== productId) {
                newCart.push(cartItem);
            }
        })
        this.cartItems = newCart;
        this.saveToStorage();
    }
    updateQuantity(productId, newQuantity) {

        let matchingQuantity;

        this.cartItems.forEach((cartItem) => {
            if (productId == cartItem.productId) {
                matchingQuantity = cartItem;
            };
        });
        matchingQuantity.quantity = newQuantity;
        this.saveToStorage();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if (productId === cartItem.productId) {
                matchingItem = cartItem;
            }
        })
        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorage();

    }
}
const cart = new Cart('cart-oop')
const businessCart = new Cart('business-cart')



console.log(cart);
console.log(businessCart);