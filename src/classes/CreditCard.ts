import IPaymentMethod from '../interfaces/IPaymentMethod';
import BankAccount from './BankAccount';

export default class CreditCard implements IPaymentMethod {
	#limit: number;
	#bankAccount: BankAccount;
	constructor(bankAccount: BankAccount, limit: number) {
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
}
