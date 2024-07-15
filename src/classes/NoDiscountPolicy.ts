import DiscountPolicy from './DiscountPolicy';
import Item from './Item';

export default class NoDiscountPolicy extends DiscountPolicy {
	static #instance: NoDiscountPolicy;
	name: string = 'No Discount';
	discountRate: number = 0;
	constructor() {
		super();
		if (!NoDiscountPolicy.#instance) {
			NoDiscountPolicy.#instance = this;
		}
		return NoDiscountPolicy.#instance;
	}
	getDiscountedPrice(item: Item): number {
		return item.originalPrice;
	}
}
