// 마트 계산 시스템을 구성하는 협력을 설계해보세요!

// 마트 계산 시스템

// 마트 계산 프로세스
// 고객이 상품을 카트에 담는다.
// 마트오너는 계산하기 전 지불 정보를 만든다.
// 고객은 지불 정보를 바탕으로 결제한다.(결제 수단은 오직 카드뿐이다.)

// 가이드
// 마트 계산 시스템을 구성하는 메세지는 무엇일까?
// 마트 계산 시스템에는 어떤 객체가 필요하고, 각 객체는 어떤 책임을 가져야할까?(Hint. 고객, 상품, 카트, 마트오너 + etc)
// 어떻게 협력해야할까?

// 고객, 카트, 상품, 결제수단(역할) [체크카드, 신용카드], 은행계좌, 캐셔, 포스기, 영수증

// 각 객체의 책임들 (아는것, 하는것)

// 고객
// 1. 캐셔가 무엇을 하는지 아는것
// 2. 캐셔가 할줄 아는것을 시키는것
// 3. 카트가 무엇을 하는지 아는것
// 4. 카트가 할줄 아는것을 시키는것
// 5. 결제수단이 무엇을 하는지 아는것
// 6. 결제수단이 할줄 아는것을 시키는것

class Customer {
	#name: string;
	#paymentMethod: IPaymentMethod;
	#cart: Cart;
	constructor(name: string, cart: Cart, paymentMethod: IPaymentMethod) {
		this.#name = name;
		this.#cart = cart;
		this.#paymentMethod = paymentMethod;
	}

	get name() {
		return this.#name;
	}

	get cart() {
		return this.#cart;
	}

	addToCart = (...items: Item[]) => {
		this.#cart.add(...items);
	};

	removeFromCart = (...items: Item[]) => {
		this.#cart.remove(...items);
	};

	orderCheckout = (cashier: Cashier) => {
		return cashier.processCheckout(this.#cart.items, this.#paymentMethod);
	};
}

// 카트
// 1. 상품들을 저장하는것
// 2. 상품들의 수량을 관리하는것
// 3. 상품들을 반환하는것

interface IItems {
	[key: string]: { price: number; quantity: number };
}

class Cart {
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

// 상품
// 1. 자신의 이름을 아는것
// 2. 자신의 가격을 아는것
// 3. 자신의 이름을 반환하는것
// 4. 자신의 가격을 반환하는것

class Item {
	#name: string;
	#price: number;
	constructor(name: string, price: number) {
		this.#name = name;
		this.#price = price;
	}

	get name() {
		return this.#name;
	}

	get price() {
		return this.#price;
	}
}

// 결제수단
// 1. 은행계좌가 무엇을 하는지 아는것
// 2. 은행계좌가 할줄 아는것을 시키는것
// 3. 자신의 한도를 아는것

interface IPaymentMethod {
	limit?: number;
	bankAccount: BankAccount;
	pay: (amount: number) => void | number | this;
}

class DebitCard implements IPaymentMethod {
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

class CreditCard implements IPaymentMethod {
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

// 은행계좌
// 1. 자신의 예금을 아는것
// 2. 자신의 예금을 반환하는것
// 3. 자신의 예금을 증가/감소 시키는것

class BankAccount {
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

// 캐셔
// 1. 포스기가 무엇을 하는지 아는것
// 2. 포스기가 할줄 아는것을 시키는것

class Cashier {
	#pos: POS;
	constructor(pos: POS) {
		this.#pos = pos;
	}

	get pos() {
		return this.#pos;
	}

	getTotal = (items: IItems) => {
		return Object.keys(items).reduce((acc, currItemName) => {
			return (acc += items[currItemName].price * items[currItemName].quantity);
		}, 0);
	};

	processCheckout = (items: IItems, paymentMethod: IPaymentMethod) => {
		const total = this.getTotal(items);
		return this.#pos.processPayment(items, paymentMethod);
	};
}

// 포스기
// 1. 상품들의 총합을 계산하는것
// 2. 영수증이 할줄 아는것을 시키는것
// 3. 영수증을 생성하는고 반환하는것
// 4. 결제수단이 무엇을 하는지 아는것
// 5. 결제수단이 할줄 아는것을 시키는것

class POS {
	calculateTotal = (items: IItems) => {
		return Object.keys(items).reduce(
			(acc, currItemName) => (acc += items[currItemName].price * items[currItemName].quantity),
			0
		);
	};

	createReceipt = (items: IItems, total: number) => {
		return new Receipt(items, total);
	};

	processPayment = (items: IItems, paymentMethod: IPaymentMethod) => {
		const total = this.calculateTotal(items);
		paymentMethod.pay(total);
		return this.createReceipt(items, total);
	};
}

// 영수증
// 1. 자신의 정보를 아는것
// 2. 자신의 정보를 콜솔에 찍는것

class Receipt {
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

const apple1 = new Item('apple', 10);
const apple2 = new Item('apple', 10);
const orange1 = new Item('orange', 20);
const watermelon1 = new Item('watermelon', 50);

const myCart = new Cart();
const myBankAccount = new BankAccount(100);
const myCard = new CreditCard(myBankAccount, 10000);
const customer = new Customer('대원', myCart, myCard);

const pos = new POS();
const cashier = new Cashier(pos);

customer.addToCart(apple1, apple2, watermelon1, orange1);
customer.removeFromCart(apple1);

customer.orderCheckout(cashier).print();
console.log(myCard.limit);
