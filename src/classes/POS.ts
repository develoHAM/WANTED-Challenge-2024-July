import Receipt from './Receipt';
import IPaymentMethod from '../interfaces/IPaymentMethod';
import Cart from './Cart';

export default class POS {
	calculateTotal = (cart: Cart) => {
		return cart.getTotalPrice();
	};

	processPayment = (amount: number, paymentMethod: IPaymentMethod) => {
		paymentMethod.pay(amount);
	};

	createReceipt = (cart: Cart, total: number, paymentMethod: IPaymentMethod) => {
		return new Receipt(cart, total, paymentMethod);
	};
}
