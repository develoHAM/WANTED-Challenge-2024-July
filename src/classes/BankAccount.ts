export default class BankAccount {
	#balance: number = 0;
	constructor(balance?: number) {
		if (balance) this.#balance = balance;
	}

	get balance() {
		return this.#balance;
	}

	deposit = (amount: number) => {
		this.#balance += amount;
	};

	widthdraw = (amount: number) => {
		this.#balance -= amount;
	};
}
