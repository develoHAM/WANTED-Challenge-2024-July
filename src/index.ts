import BankAccount from './classes/BankAccount';
import Cashier from './classes/Cashier';
import CreditCard from './classes/CreditCard';
import Customer from './classes/Customer';
import DebitCard from './classes/DebitCard';
import Item from './classes/Item';
import POS from './classes/POS';
import Receipt from './classes/Receipt';
import Cart from './classes/Cart';
import ExpiryDateDiscountPolicy from './classes/ExpiryDateDiscountPolicy';
import MidnightDiscountPolicy from './classes/MidnightDiscountPolicy';
import { createExpiryDate } from './utilities/createExpiryDate';

const customer = new Customer('김대원', new Cart(), new CreditCard('Dae Won Kim', new BankAccount(1000), 100));

const cashier = new Cashier();

const apple1 = new Item(
	'apple',
	10,
	createExpiryDate(new Date(), 1),
	new ExpiryDateDiscountPolicy(),
	new MidnightDiscountPolicy()
);

const apple2 = new Item(
	'apple',
	10,
	createExpiryDate(new Date(), 2),
	new ExpiryDateDiscountPolicy(),
	new MidnightDiscountPolicy()
);

const watermelon1 = new Item(
	'watermelon',
	50,
	createExpiryDate(new Date(), 1),
	new ExpiryDateDiscountPolicy(),
	new MidnightDiscountPolicy()
);

const watermelon2 = new Item(
	'watermelon',
	50,
	createExpiryDate(new Date(), 2),
	new ExpiryDateDiscountPolicy(),
	new MidnightDiscountPolicy()
);

customer.addToCart(apple1, apple2, apple1, apple1, watermelon1, watermelon2);

customer.checkLimit();
const receipt = customer.orderCheckout(cashier);
receipt.print();
customer.checkLimit();
