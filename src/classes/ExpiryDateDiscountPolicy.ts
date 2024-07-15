import DiscountPolicy from './DiscountPolicy';
import Item from './Item';

export default class ExpiryDateDiscountPolicy extends DiscountPolicy {
	static #instance: ExpiryDateDiscountPolicy;
	name: string = 'Expiry Date Discount';
	discountRate: number = 0.7;
	constructor() {
		super();
		if (!ExpiryDateDiscountPolicy.#instance) {
			ExpiryDateDiscountPolicy.#instance = this;
		}
		return ExpiryDateDiscountPolicy.#instance;
	}

	getDiscountedPrice(item: Item): number {
		if (!item.expiryDate) return item.originalPrice;

		const baseDate = new Date(item.expiryDate);
		baseDate.setDate(baseDate.getDate() - 1);
		if (new Date() > item.expiryDate) throw new Error(`${item.name}상품의 유통기한이 지났습니다.`);
		if (new Date() >= baseDate && new Date() < item.expiryDate) {
			return +(item.originalPrice * (1 - this.discountRate)).toFixed(2);
		} else {
			return item.originalPrice;
		}
	}
}
