import { cart, addToCart } from "../data/cart.js";
import { products, loadProducts } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";


loadProducts(renderProductGrid);


function renderProductGrid() {
    let productHTML = '';

    products.forEach((product) => {

        productHTML +=
            `<div class="product-container">
                <div class="product-image-container">
                    <img class="product-image" src="${product.image}">
                </div>

                <div class="product-name limit-text-to-2-lines">
                    ${product.name}
                </div>

                <div class="product-rating-container">
                    <img class="product-rating-stars" src="${product.getStarsUrl()}">
                    <div class="product-rating-count link-primary">
                        ${product.rating.count}
                    </div>
                </div>

                <div class="product-price">
                    ${product.getPrice()}
                </div>

                <div class="product-quantity-container">
                    <select class = "js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
                </div>
                
                ${product.extraInfoHTML()}

                <div class="product-spacer"></div>

                <div class="added-to-cart js-added-selector-${product.id}">
                    <img src="images/icons/checkmark.png"> Added
                </div>

                <button class="add-to-cart-button button-primary  js-add-to-cart" data-store-id = "${product.id}" >
            Add to Cart
          </button>
            </div>`;
    })
    document.querySelector('.js-products-grid').innerHTML = productHTML;

    function updateCartQuantity() {
        let cartQuantity = 0;
        cart.forEach((cartItem) => {
            cartQuantity += cartItem.quantity;
        })
        document.querySelector('.js-cart-quantity')
            .innerHTML = cartQuantity
    }
    updateCartQuantity();

    function messageForCart(productId) {
        let timeoutId;
        const addedSelector = document.querySelector(`.js-added-selector-${productId}`)
        addedSelector.classList.add('hidden')
        clearTimeout(timeoutId)

        timeoutId = setTimeout(() => {
            addedSelector.classList.remove('hidden')
        }, 2000)
        const addedSelected = addedSelector.textContent.trim();
        // or i can use .innerHTML

    }

    document.querySelectorAll('.js-add-to-cart')
        .forEach((button) => {
            button.addEventListener('click', () => {
                const { storeId: productId } = button.dataset;
                addToCart(productId);
                updateCartQuantity();
                messageForCart(productId);

            })
        })
};