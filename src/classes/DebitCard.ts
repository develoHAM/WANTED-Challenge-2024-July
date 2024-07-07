import BankAccount from './BankAccount';
import IPaymentMethod from '../interfaces/IPaymentMethod';

export default class DebitCard implements IPaymentMethod {
	#bankAccount: BankAccount;
	constructor(bankAccount: BankAccount) {
		this.#bankAccount = bankAccount;
	}
	pay = (amount: number) => {
		if (amount > this.#bankAccount.balance) {
			throw new Error('체크카드: 예금이 부족합니다');
		}
		this.#bankAccount.widthdraw(amount);
	};

	get bankAccount() {
		return this.#bankAccount;
	}
}
