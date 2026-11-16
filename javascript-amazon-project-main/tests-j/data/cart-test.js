
import { addTocart, cart } from "../../data/cart.js";

describe('test suite:addTocart', () => {

    beforeEach(() => {
        cart.splice(0, cart.length);
    });

    it('add an existing product to cart', () => {

    });

    it('add a new product to cart', () => {

        addTocart("54e0eccd-8f36-462b-b68a-8182611d9add", 1);

        expect(cart.length).toEqual(1);

    });

});
