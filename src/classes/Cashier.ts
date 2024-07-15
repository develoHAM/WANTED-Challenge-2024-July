import IPaymentMethod from '../interfaces/IPaymentMethod';
import Cart from './Cart';
import POS from './POS';

export default class Cashier {
	#pos = new POS();

	getTotal = (cart: Cart) => {
		return this.#pos.calculateTotal(cart);
	};

	processPayment = (total: number, paymentMethod: IPaymentMethod) => {
		this.#pos.processPayment(total, paymentMethod);
	};

	createReceipt = (cart: Cart, total: number, paymentMethod: IPaymentMethod) => {
		return this.#pos.createReceipt(cart, total, paymentMethod);
	};

	processCheckout = (cart: Cart, paymentMethod: IPaymentMethod) => {
		const total = this.getTotal(cart);
		this.processPayment(total, paymentMethod);
		return this.createReceipt(cart, total, paymentMethod);
	};
}
