import DiscountPolicy from './DiscountPolicy';
import Item from './Item';

export default class DiscountApplier {
	static applyMaxDiscount = (item: Item, discountPolicies: Set<DiscountPolicy>) => {
		return Array.from(discountPolicies).reduce((prev, cur) =>
			prev.getDiscountedPrice(item) > cur.getDiscountedPrice(item) ? cur : prev
		);
	};
}
