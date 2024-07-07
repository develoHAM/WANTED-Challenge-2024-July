import BankAccount from './classes/BankAccount';
import Cart from './classes/Cart';
import Cashier from './classes/Cashier';
import CreditCard from './classes/CreditCard';
import Customer from './classes/Customer';
import DebitCard from './classes/DebitCard';
import Item from './classes/Item';
import POS from './classes/POS';
import Receipt from './classes/Receipt';

const apple = new Item('apple', 10, new Date());
console.log(apple.expireDate.toLocaleString('ko'));
const customer = new Customer('DaeWon', new Cart(), new CreditCard(new BankAccount(1000), 100));

const cashier = new Cashier(new POS());

customer.addToCart(apple, apple);
const myTotal = cashier.getTotal(customer.cart.items);
console.log('myTotal', myTotal);

const receipt = customer.orderCheckout(cashier);
receipt.print();
