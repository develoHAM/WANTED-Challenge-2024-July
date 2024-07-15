import Item from './Item';

export default abstract class DiscountPolicy {
	abstract name: string;
	abstract discountRate: number;
	abstract getDiscountedPrice(item: Item): number;
}
