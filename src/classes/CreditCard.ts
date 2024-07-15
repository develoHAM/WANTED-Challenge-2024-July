import IPaymentMethod from '../interfaces/IPaymentMethod';
import BankAccount from './BankAccount';

export default class CreditCard implements IPaymentMethod {
	#owner: string;
	#limit: number;
	#bankAccount: BankAccount;
	constructor(owner: string, bankAccount: BankAccount, limit: number) {
		this.#owner = owner;
		this.#bankAccount = bankAccount;
		this.#limit = limit;
	}
	pay = (amount: number) => {
		if (amount > this.#limit) {
			throw new Error('신용카드: 결제 한도 초과');
		}
		this.#limit -= amount;
	};
	get limit() {
		return this.#limit;
	}
	get bankAccount() {
		return this.#bankAccount;
	}
	get owner() {
		return this.#owner;
	}
}
