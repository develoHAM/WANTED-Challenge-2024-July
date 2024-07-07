export default class Item {
	#name: string;
	#price: number;
	#expireDate: Date;
	constructor(name: string, price: number, expireDate: Date) {
		this.#name = name;
		this.#price = price;
		this.#expireDate = expireDate;
	}

	get name() {
		return this.#name;
	}

	get price() {
		return this.#price;
	}

	get expireDate() {
		return this.#expireDate;
	}
}
