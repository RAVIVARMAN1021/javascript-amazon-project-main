 export const cart = [];
 
 export function addTocart(productId, quantity) {
  let matchingItem;

  cart.forEach((cartitem) => {
    if (cartitem.productId === productId) {
      matchingItem = cartitem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity
    });
  }
}
 