
import { getProductById } from '../../data/products.js';
import { getDeliveryOptionById } from '../../data/deliveryOptions.js';
import { formatcurrency } from '../utils/money.js';
import { cart } from '../../data/cart-oop.js';

export function renderpaymentSummary() {

  let productpricecents = 0;
  let deliveryoptionprice = 0;
  let totalItems = 0;

  cart.cartItem.forEach((cartitem) => {

    const product = getProductById(cartitem.productId);

    productpricecents += product.priceCents * cartitem.quantity;

    totalItems += cartitem.quantity;

    const deliveryOption = getDeliveryOptionById(
      cartitem.deliveryOptionId
    );
deliveryoptionprice += deliveryOption.pricecents;

  });

  const totalBeforeTaxCents =
    productpricecents + deliveryoptionprice;

  const taxCents = totalBeforeTaxCents * 0.1;

  const orderTotalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${totalItems}):</div>
      <div class="payment-summary-money">
        $${formatcurrency(productpricecents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">
        $${formatcurrency(deliveryoptionprice)}
      </div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">
        $${formatcurrency(totalBeforeTaxCents)}
      </div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">
        $${formatcurrency(taxCents)}
      </div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">
        $${formatcurrency(orderTotalCents)}
      </div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

  document.querySelector('.js-payment-summary')
    .innerHTML = paymentSummaryHTML;
}
