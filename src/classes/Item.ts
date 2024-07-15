import DiscountApplier from './DiscountApplier';
import DiscountPolicy from './DiscountPolicy';
import NoDiscountPolicy from './NoDiscountPolicy';

export default class Item {
	#name: string;
	#originalPrice: number;
	#expiryDate: Date | null = null;
	#discountPolicies: Set<DiscountPolicy> = new Set([new NoDiscountPolicy()]);

	constructor(name: string, originalPrice: number, expiryDate: Date, ...discountPolicies: DiscountPolicy[]) {
		if (!name) {
			throw new Error('상품 이름이 유효하지 않습니다.');
		}
		this.#name = name;

		if (originalPrice <= 0) {
			throw new Error(`상품 금액이 유효하지 않습니다.`);
		}
		this.#originalPrice = originalPrice;

		if (expiryDate) {
			if (expiryDate <= new Date()) {
				throw new Error(`유통기한이 지난 상품은 등록이 불가합니다.`);
			} else {
				this.#expiryDate = expiryDate;
			}
		}

		discountPolicies.forEach((policy) => this.#discountPolicies.add(policy));
	}

	get name() {
		return this.#name;
	}

	get originalPrice() {
		return this.#originalPrice;
	}

	get expiryDate() {
		return this.#expiryDate;
	}

	get price() {
		const appliedPolicy = DiscountApplier.applyMaxDiscount(this, this.#discountPolicies);
		return appliedPolicy.getDiscountedPrice(this);
	}

	get appliedDiscountPolicy() {
		return DiscountApplier.applyMaxDiscount(this, this.#discountPolicies);
	}

	addDiscountPolicy = (...policies: DiscountPolicy[]) => {
		policies.forEach((policy) => this.#discountPolicies.add(policy));
	};

	deleteDiscountPolicy = (...policies: DiscountPolicy[]) => {
		policies.forEach((policy) => this.#discountPolicies.delete(policy));
	};
}
