import IItems from '../interfaces/IItems';

export default class Receipt {
	#items: IItems;
	#total: number;

	constructor(items: IItems, total: number) {
		this.#items = items;
		this.#total = total;
	}

	print = () => {
		const printInfo = Object.keys(this.#items)
			.map((item) => {
				return `품목:${item} : 단가:${this.#items[item].price}원 | 수량: ${this.#items[item].quantity}개`;
			})
			.join('\n');
		console.log(
			'---------------\n' + '영수증' + '\n' + printInfo + '\n' + `총합: ${this.#total}원` + '\n---------------'
		);
	};
}
