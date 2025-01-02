import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";




describe('testsuite: renderOrderSummary', () => {
    beforeEach(() => {
        // spyOn(localStorage, 'setItem'); 
        document.querySelector('.js-test-container').innerHTML = `<div class = "js-order-summary"><div>
 <div class = "js-payment-summary"><div>`;

        // Mock localStorage
        spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([{
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
        }]));
        spyOn(localStorage, 'setItem');

        // Add a mock DOM element
        const mockInput = document.createElement('input');
        mockInput.className = 'js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        mockInput.value = 1; // Set a mock quantity
        document.body.appendChild(mockInput);

        // Load cart and test
        loadFromStorage();

        renderOrderSummary();
    })
    it('displays the cart', () => {
        document.querySelector('.js-test-container').innerHTML = '<div class = "js-order-summary"><div>';

        // Mock localStorage
        spyOn(localStorage, 'getItem').and.callFake(() => JSON.stringify([{
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
        }]));
        spyOn(localStorage, 'setItem');

        // Add a mock DOM element
        const mockInput = document.createElement('input');
        mockInput.className = 'js-quantity-selector-e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        mockInput.value = 1; // Set a mock quantity
        document.body.appendChild(mockInput);

        // Load cart and test
        loadFromStorage();
        renderOrderSummary();

        expect(
            document.querySelectorAll('.js-cart-item-container').length).toEqual(3)
        expect
            (document.querySelector(`.js-product-quantity-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}`).innerText).toContain('Quantity: 1')


        document.querySelector('.js-test-container').innerHTML = '';
    });


    it('removes a product', () => {
        document.querySelector(`.js-delete-link-${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}`).click();
        expect(
            document.querySelectorAll('.js-cart-item-container').length).toEqual(3)
        expect
            (document.querySelector(`.js-cart-item-container${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}`).innerText).toEqual(null)
        expect
            (document.querySelector(`.js-cart-item-container  -${'e43638ce-6aa0-4b85-b27f-e1d07eb678c6'}`).innerText).not.toEqual(null)
        expect(cart.length).toEqual(1)
        expect(cart[0].productId).toEqual(productId)

        document.querySelector('.js-test-container').innerHTML = '';
    })
})