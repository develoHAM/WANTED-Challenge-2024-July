import IPaymentMethod from '../interfaces/IPaymentMethod';
import Cart from './Cart';
import Item from './Item';
import NoDiscountPolicy from './NoDiscountPolicy';

export default class Receipt {
	#items: { item: Item; quantity: number }[];
	#total: number;
	#paymentMethod: IPaymentMethod;
	constructor(cart: Cart, total: number, paymentMethod: IPaymentMethod) {
		this.#items = cart.items;
		this.#total = total;
		this.#paymentMethod = paymentMethod;
	}

	get total() {
		return this.#total;
	}

	get items() {
		return this.#items;
	}

	print = () => {
		const items = this.#items
			.map(
				(val) =>
					`상품명:${val.item.name} 정가:${val.item.originalPrice} ${
						val.item.appliedDiscountPolicy instanceof NoDiscountPolicy
							? ''
							: `할인:${val.item.appliedDiscountPolicy.discountRate * 100}% (${
									val.item.appliedDiscountPolicy.name
							  })`
					} 수량:${val.quantity} 합:${val.item.price * val.quantity}`
			)
			.join('\n');
		const total = `Total: ${this.#total}`;
		const paymentDetails = total + '\n' + `${new Date().toLocaleString('ko')}` + '\n' + this.#paymentMethod.owner;
		console.log(items + `\n` + paymentDetails);
	};
}
