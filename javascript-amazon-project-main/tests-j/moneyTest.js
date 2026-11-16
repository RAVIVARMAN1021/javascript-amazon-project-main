import {formatcurrency} from '../scripts/utils/money.js';
 
describe('test suite:formatcurrency', () => {
    it('convert cents to dollars', () => {
        expect(formatcurrency(1010)).toEqual('10.10'); 
    });
    it('works for 0 cents', () => {
        expect(formatcurrency(0)).toEqual('0.00'); 
    });
    it('rounds up to nearest cent', () => {
        expect(formatcurrency(1000.5)).toEqual('10.01'); 
    });
});