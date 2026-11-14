
export const deliveryOptions = [{
  id: '1',
  deliveryDate: 7,
  pricecents: 0
}, {
  id: '2',
  deliveryDate: 3,
  pricecents: 499
}, {
  id: '3',
  deliveryDate: 1,
  pricecents: 999
}];

export function getDeliveryOptionById(deliveryOptionId) {
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}
