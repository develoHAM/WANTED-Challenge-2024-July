import Item from './Item';
export default class Cart {
	#items: Map<string, { item: Item; quantity: number }>;

	constructor() {
		this.#items = new Map();
	}

	#createCartKey(item: Item) {
		if (item.expiryDate) {
			return `${item.name}-${item.expiryDate.toISOString()}`;
		} else {
			return `${item.name}`;
		}
	}

	add = (...items: Item[]) => {
		items.forEach((item: Item) => {
			const key = this.#createCartKey(item);
			const existingEntry = this.#items.get(key);
			if (existingEntry) {
				this.#items.set(key, { item: item, quantity: existingEntry.quantity + 1 });
			} else {
				this.#items.set(key, { item: item, quantity: 1 });
			}
		});
	};

	remove = (...items: Item[]) => {
		items.forEach((item: Item) => {
			const key = this.#createCartKey(item);
			const existingEntry = this.#items.get(key);
			if (existingEntry) {
				if (existingEntry.quantity <= 1) {
					this.#items.delete(key);
				} else {
					this.#items.set(key, { item: item, quantity: existingEntry.quantity - 1 });
				}
			}
		});
	};

	getTotalPrice = () => {
		return Array.from(this.#items).reduce((acc, [key, value]) => {
			return (acc += value.item.price * value.quantity);
		}, 0);
	};

	get items(): { item: Item; quantity: number }[] {
		return Array.from(this.#items)
			.map(([key, { item, quantity }]) => ({ item, quantity }))
			.sort((a, b) => a.item.name.localeCompare(b.item.name));
	}
}
