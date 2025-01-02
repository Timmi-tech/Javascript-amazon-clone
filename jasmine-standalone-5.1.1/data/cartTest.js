import { addToCart, cart, loadFromStorage } from "../../data/cart.js";

describe('Test suite: addToCart', () => {
    it('adds an existing product to the cart', () => {
            // Mock localStorage
            spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1,
                deliveryOptionId: 1,
            }]));
            spyOn(localStorage, 'setItem');

            // Add a mock DOM element
            const mockInput = document.createElement('input');
            mockInput.className = 'js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
            mockInput.value = 1; // Set a mock quantity
            document.body.appendChild(mockInput);

            // Load cart and test
            loadFromStorage();

            addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
            expect(cart.length).toEqual(1);
            expect(localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
            expect(cart[0].quantity).toEqual(2);

            // Clean up mock DOM element
            document.body.removeChild(mockInput);

        }),
        it('adds new product to the cart', () => {
            // Mock localStorage
            spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([]));
            spyOn(localStorage, 'setItem');

            // Add a mock DOM element
            const mockInput = document.createElement('input');
            mockInput.className = 'js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
            mockInput.value = 1; // Set a mock quantity
            document.body.appendChild(mockInput);

            // Load cart and test
            loadFromStorage();


            addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
            expect(cart.length).toEqual(1);
            expect(localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
            expect(cart[0].quantity).toEqual(1);

            // Clean up mock DOM element
            document.body.removeChild(mockInput);
        });

});