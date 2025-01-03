import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";
// import '../data/backend-practice.js'


loadProducts(() => {
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
})