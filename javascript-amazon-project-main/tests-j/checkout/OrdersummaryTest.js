
import { renderOrderSummary } from '../../scripts/checkout/ordersummary.js';
import { cart } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';

describe('test suite: renderOrderSummary', () => {

  beforeEach(() => {
    cart.splice(0, cart.length);

    cart.push({
      productId: products[0].id,
      quantity: 2,
      deliveryOptionId: deliveryOptions[0].id
    });

    const container = document.createElement('div');
    container.className = 'js-order-summary';
    document.body.appendChild(container);

    const paymentContainer = document.createElement('div');
    paymentContainer.className = 'js-payment-summary';
    document.body.appendChild(paymentContainer);
  });

  afterEach(() => {
    document.querySelector('.js-order-summary')?.remove();
    document.querySelector('.js-payment-summary')?.remove();
  });

  it('displays the cart', () => {
    renderOrderSummary();

    expect(
      document.querySelectorAll('.cart-item-container').length
    ).toEqual(1);
  });

  it('displays the product name', () => {
    renderOrderSummary();

    expect(
      document.querySelector('.product-name').innerText
    ).toEqual(products[0].name);
  });

  it('displays the product quantity', () => {
    renderOrderSummary();

    expect(
      document.querySelector('.quantity-label').innerText
    ).toEqual('2');
  });

  it('displays the delivery options', () => {
    renderOrderSummary();

    expect(
      document.querySelectorAll('.js-delivery-option').length
    ).toEqual(deliveryOptions.length);
  });

});
