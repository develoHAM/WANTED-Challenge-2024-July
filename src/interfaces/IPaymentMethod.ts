import BankAccount from '../classes/BankAccount';

export default interface IPaymentMethod {
	owner: string;
	limit?: number;
	bankAccount: BankAccount;
	pay: (amount: number) => void | number | this;
}
