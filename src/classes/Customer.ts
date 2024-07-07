import IPaymentMethod from '../interfaces/IPaymentMethod';
import Cart from './Cart';
import Item from './Item';
import Cashier from './Cashier';

export default class Customer {
	#name: string;
	#paymentMethod: IPaymentMethod;
	#cart: Cart;
	constructor(name: string, cart: Cart, paymentMethod: IPaymentMethod) {
		this.#name = name;
		this.#cart = cart;
		this.#paymentMethod = paymentMethod;
	}

	get name() {
		return this.#name;
	}

	get cart() {
		return this.#cart;
	}

	addToCart = (...items: Item[]) => {
		this.#cart.add(...items);
	};

	removeFromCart = (...items: Item[]) => {
		this.#cart.remove(...items);
	};

	orderCheckout = (cashier: Cashier) => {
		return cashier.processCheckout(this.#cart.items, this.#paymentMethod);
	};
}
