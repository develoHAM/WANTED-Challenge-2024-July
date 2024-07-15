import DiscountPolicy from './DiscountPolicy';
import Item from './Item';

export default class MidnightDiscountPolicy extends DiscountPolicy {
	static #instance: MidnightDiscountPolicy;
	name: string = 'Midnight Discount';
	discountRate: number = 0.3;

	constructor() {
		super();
		if (!MidnightDiscountPolicy.#instance) {
			MidnightDiscountPolicy.#instance = this;
		}
		return MidnightDiscountPolicy.#instance;
	}
	getDiscountedPrice(item: Item): number {
		const baseHours = new Date().getHours();
		if (baseHours >= 2 && baseHours < 5) {
			return +(item.originalPrice * (1 - this.discountRate)).toFixed(2);
		}
		return item.originalPrice;
	}
}
