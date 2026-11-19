import { renderOrderSummary } from './checkout/ordersummary.js';
import { renderpaymentSummary } from './checkout/paymentsummary.js';
import { cart } from '../data/cart-oop.js';

console.log(cart);

//import '../data/backend-practice.js';

renderOrderSummary();
renderpaymentSummary();