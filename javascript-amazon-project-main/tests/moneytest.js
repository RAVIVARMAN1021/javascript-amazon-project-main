import {formatcurrency} from '../scripts/utils/money.js';
console.log('test suite:formatcurrency');
console.log('convert 1010 cents to dollars: ' + formatcurrency(1010));
if(formatcurrency(1010) === '10.10') {
    console.log('Test passed');
} else {
    console.log('Test failed');
}
console.log('convert 0 cents to dollars: ' + formatcurrency(0));
if (formatcurrency(0) === '0.00') {
    console.log('Test passed');
} else {
    console.log('Test failed');
}
console.log('convert 1000.5 cents to dollars: ' + formatcurrency(1000.5));
if (formatcurrency(1000.5) === '10.01') {
    console.log('Test passed');
}   else {
    console.log('Test failed');
} 