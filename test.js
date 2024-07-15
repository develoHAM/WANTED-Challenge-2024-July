function Person(name) {
	this.name = name;
}

Person.prototype.getName = function () {
	return this.name;
};

var me = new Person('Lee');
console.log(me);
console.log(me.getName());
// Lee
// 우선 프로토타입에서 name프로퍼티를 찾는다. 없으니 체이닝에 의해 me 객체에서 찾아서 반환

Person.prototype.name = 'Kim';
console.log(Person.prototype.getName());
// Kim
// 우선 프로토타입에서 name프로퍼티를 찾는다. 찾았으니 반환.
