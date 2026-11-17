
class Cart {
  cartItem;

  constructor() {
    this.cartItem = localStorage.getItem('cart-oop')
      ? JSON.parse(localStorage.getItem('cart-oop'))
      : null;

    if (!this.cartItem) {
      this.cartItem = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: '2'
        }
      ];
    }
  }

  savetostorage() {
    localStorage.setItem('cart-oop', JSON.stringify(this.cartItem));
  }

  addTocart(productId, quantity) {
    let matchingItem;

    this.cartItem.forEach((cartitem) => {
      if (cartitem.productId === productId) {
        matchingItem = cartitem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItem.push({
        productId: productId,
        quantity: quantity,
        deliveryOptionId: '1'
      });
    }

    this.savetostorage();
  }

  removeFromCart(productId) {
    const newCart = [];

    this.cartItem.forEach((cartitem) => {
      if (cartitem.productId !== productId) {
        newCart.push(cartitem);
      }
    });

    this.cartItem.splice(0, this.cartItem.length);

    newCart.forEach((cartitem) => {
      this.cartItem.push(cartitem);
    });

    this.savetostorage();
  }

  updatedDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItem.forEach((cartitem) => {
      if (cartitem.productId === productId) {
        matchingItem = cartitem;
      }
    });

    if (matchingItem) {
      matchingItem.deliveryOptionId = deliveryOptionId;
      this.savetostorage();
    }
  }
}

export const cart = new Cart();

