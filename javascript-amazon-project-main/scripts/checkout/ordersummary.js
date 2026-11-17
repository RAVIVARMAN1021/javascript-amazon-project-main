
import { cart } from '../../data/cart-oop.js';
import { products, getProductById } from '../../data/products.js';
import { formatcurrency } from '../utils/money.js';
import { deliveryOptions, getDeliveryOptionById } from '../../data/deliveryOptions.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { renderpaymentSummary } from './paymentsummary.js';

export function renderOrderSummary() {
  let cartsummaryhtml = '';

  console.log('OOP Cart:', cart.cartItem);

  cart.cartItem.forEach((cartitem) => {

    console.log(
      'Product ID:',
      cartitem.productId,
      'Product:',
      getProductById(cartitem.productId)
    );

    const productId = cartitem.productId;
    const quantity = cartitem.quantity;

    const matchingProduct = getProductById(productId);

    const deliveroptionId = cartitem.deliveryOptionId;

    const deliveryOption = getDeliveryOptionById(deliveroptionId);

    const today = dayjs();

    const deliveryDate = today.add(deliveryOption.deliveryDate, 'days');

    const dateString = deliveryDate.format('dddd, MMMM D');

    cartsummaryhtml += `
      <div class="cart-item-container">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>

            <div class="product-price">
              $${formatcurrency(matchingProduct.priceCents)}
            </div>

            <div class="product-quantity">
              <span>
                Quantity:
                <span class="quantity-label">${quantity}</span>
              </span>

              <span class="update-quantity-link link-primary">
                Update
              </span>

              <span class="delete-quantity-link link-primary js-delete-link"
                data-product-id="${matchingProduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>

            ${deliveryOptionsHTML(matchingProduct, cartitem)}
          </div>
        </div>
      </div>`;
  });

  function deliveryOptionsHTML(matchingProduct, cartitem) {
    let deliveryOptionsHTML = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();

      const deliveryDate = today.add(deliveryOption.deliveryDate, 'days');

      const dateString = deliveryDate.format('dddd, MMMM D');

      const priceString = deliveryOption.pricecents === 0
        ? 'FREE'
        : `$${formatcurrency(deliveryOption.pricecents)}`;

      const isChecked = deliveryOption.id === cartitem.deliveryOptionId;

      deliveryOptionsHTML += `
        <div class="delivery-option js-delivery-option"
          data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${deliveryOption.id}">

          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">

          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>

            <div class="delivery-option-price">
              ${priceString} Shipping
            </div>
          </div>
        </div>
      `;
    });

    return deliveryOptionsHTML;
  }

  document.querySelector('.js-order-summary').innerHTML = cartsummaryhtml;

  // Delete product
  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;

      cart.removeFromCart(productId);

      renderOrderSummary();
      renderpaymentSummary();
    });
  });

  // Update delivery option
  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;

      cart.updatedDeliveryOption(productId, deliveryOptionId);

      renderOrderSummary();
      renderpaymentSummary();
    });
  });
}
