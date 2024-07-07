import IItems from '../interfaces/IItems';
import Item from './Item';
export default class Cart {
	#items: IItems = {};

	add(...items: Item[]) {
		items.forEach((item) => {
			if (!this.#items[item.name]) {
				this.#items[item.name] = { price: item.price, quantity: 1 };
			} else {
				this.#items[item.name].quantity++;
			}
		});
	}

	remove(...items: Item[]) {
		items.forEach((item) => {
			if (!this.#items[item.name]) throw new Error(`${item.name}은 카트에 존재하지 않습니다.`);

			if (this.#items[item.name].quantity === 1) {
				delete this.#items[item.name];
			} else {
				this.#items[item.name].quantity--;
			}
		});
	}

	get items() {
		return this.#items;
	}
}
