// we used named export
import {
    cart,
    removeFromCart,
    updateQuantity,
    updateDeliveryOption,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
// we use dthe default export here
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {
    deliveryOptions,
    getDeliveryOption,
    calculateDeliveryDate
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";

export function renderOrderSummary() {

    let cartSummaryHTML = '';
    cart.forEach((cartItem) => {
        const productId = cartItem.productId

        // takes a product and find the matching product
        const matchingProduct = getProduct(productId);
        // created a logic for the checkout page to display the date
        const deliveryOptionId = cartItem.deliveryOptionId

        const deliveryOption = getDeliveryOption(deliveryOptionId);

        // generate thr date using the dayjs liabary

        const dateString = calculateDeliveryDate(deliveryOption);

        cartSummaryHTML +=
            `  <div class="cart-item-container
            js-cart-item-container
            js-delete-${matchingProduct.id}">
                    <div class="delivery-date">
                    Delivery date: ${dateString}
                    </div>

                    <div class="cart-item-details-grid">
                        <img class="product-image" src="${matchingProduct.image}">

                        <div class="cart-item-details">
                            <div class="product-name">
                                ${matchingProduct.name}
                            </div>
                            <div class="product-price">
                                ${matchingProduct.getPrice()}
                            </div>
                            <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                                <span>
                    Quantity: <span class="quantity-label js-quantity-label${matchingProduct.id}">${cartItem.quantity}</span>
                                </span>
                                <span class="update-quantity-link link-primary js-update-link" data-product-id = "${matchingProduct.id}">
                    Update
                  </span>
                  <input class= "quantity-input js-quantity-input-${matchingProduct.id}">
                  <span class = "save-quantity-link link-primary js-save-link" data-product-id = "${matchingProduct.id}">Save</span>
                                <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id = "${matchingProduct.id}">
                    Delete
                  </span>
                            </div>
                        </div>

                        <div class="delivery-options">
                            <div class="delivery-options-title">
                                Choose a delivery option:
                            </div>
                            ${deliveryOptionsHTML(matchingProduct, cartItem)}
                        </div>
                    </div>
                </div>
`;
    });
    // creating a function to generate the deliveryoptions page through js
    function deliveryOptionsHTML(matchingProduct, cartItem) {
        let html = '';
        deliveryOptions.forEach((deliveryOption) => {


            // generate thr date using the dayjs liabary
            const dateString = calculateDeliveryDate(deliveryOption);

            // generated the price and used the tenary operation
            const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} - `;

            //to check if the delivery option id are the same 
            const isChecked = deliveryOption.id ===
                cartItem.deliveryOptionId;


            html += ` <div class="delivery-option js-delivery-option" data-product-id = "${matchingProduct.id}" data-delivery-option-id = "${deliveryOption.id}">
                                <input type="radio" 
                                ${isChecked ? 'checked' : ''}
                                class="delivery-option-input" name="delivery-option-${matchingProduct.id}">
                                <div>
                                    <div class="delivery-option-date">
                                        ${dateString}
                                    </div>
                                    <div class="delivery-option-price">
                                        ${priceString} Shipping
                                    </div>
                                </div>
                            </div>`
        })
        return html;
    }

    document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;



    document.querySelectorAll('.js-delete-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const { productId: matchingProductId } = link.dataset;
                removeFromCart(matchingProductId);
                renderCheckoutHeader();
                renderOrderSummary();
                renderPaymentSummary();
                updateCheckoutQuantity();

            })
        })

    function updateCheckoutQuantity() {
        let cartQuantity = 0;
        cart.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        })
    }
    updateCheckoutQuantity();

    document.querySelectorAll('.js-update-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const { productId: matchingProductId } = link.dataset

                const container = document.querySelector(`.js-delete-${matchingProductId}`);
                container.classList.add('is-editing-quantity');
            })
        })


    document.querySelectorAll('.js-save-link')
        .forEach((link) => {
            link.addEventListener('click', () => {
                const { productId: matchingProductId } = link.dataset

                const container = document.querySelector(`.js-delete-${matchingProductId}`);
                container.classList.remove('is-editing-quantity');


                const quantityInput = document.querySelector(`.js-quantity-input-${matchingProductId}`);
                // const newQuantity = (Number(quantityInput.value));
                // updateQuantity(matchingProductId, newQuantity)
                const newQuantity = Number(quantityInput.value);
                if (isNaN(newQuantity) || newQuantity <= 0) {
                    alert('Please enter a valid quantity.');
                    return;
                }
                updateQuantity(matchingProductId, newQuantity);

                renderCheckoutHeader();
                renderOrderSummary();
                renderPaymentSummary();

                // We can delete the code below (from the original solution)
                // because instead of using the DOM to update the page directly
                // we can use MVC and re-render everything. This will make sure
                // the page always matches the data.

                // to update the quanity after choosing before checking out
                // const quantityLabel = document.querySelector(`.js-quantity-label${matchingProductId}`);

                // quantityLabel.innerHTML = newQuantity;

                // updateCheckoutQuantity();
            });
        });


    document.querySelectorAll('.js-delivery-option')
        .forEach((element) => {
            element.addEventListener('click', () => {
                const {
                    productId,
                    deliveryOptionId


                } = element.dataset
                updateDeliveryOption(productId, deliveryOptionId);
                renderOrderSummary();
                renderPaymentSummary();
            });
        });

};