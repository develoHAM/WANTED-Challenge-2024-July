import IItems from '../interfaces/IItems';
import Receipt from './Receipt';
import IPaymentMethod from '../interfaces/IPaymentMethod';

export default class POS {
	calculateTotal = (items: IItems) => {
		return Object.keys(items).reduce(
			(acc, currItemName) => (acc += items[currItemName].price * items[currItemName].quantity),
			0
		);
	};

	processPayment = (items: IItems, paymentMethod: IPaymentMethod) => {
		const total = this.calculateTotal(items);
		paymentMethod.pay(total);
		return new Receipt(items, total);
	};
}
