import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/backend-practice.js'




async function loadpage() {

    try {
        // throw 'error'
        await loadProductsFetch()
        await new Promise((resolve, reject) => {
            // throw 'error'
            loadCart(() => {
                // reject('error')
                resolve()
            });
        })
    } catch (error) {
        console.log('unexpecte derroe: please try again')
    }
    renderOrderSummary();
    renderPaymentSummary();
    renderCheckoutHeader();
}
loadpage()


// Promise.all([
//     loadProductsFetch(),
//     new Promise((resolve) => {
//         loadCart(() => {
//             resolve()
//         });
//     })
// ]).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//     renderCheckoutHeader();
// });

// new Promise((resolve) => {
//     loadProducts(() => {
//         resolve();
//     });

// }).then(() => {
//     return new Promise((resolve) => {
//         loadCart(() => {
//             resolve()
//         });
//     })

// }).then(() => {
//     renderOrderSummary();
//     renderPaymentSummary();
//     renderCheckoutHeader();
// });

// loadProducts(() => {
//     loadCart(() => {
//         renderOrderSummary();
//         renderPaymentSummary();
//         renderCheckoutHeader();
//     });

// })