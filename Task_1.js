/*
Создать сущности Dog, Cat, Woodpecker, которые являются наследниками сущности Animal. 
Animal содержит свойства age, name, sound, region и метод say. 
Dog, Cat, Woodpecker не содержит явно данных свойств, но наследует их у Animal. 
Также они содержат метод goAway. 

Задание должно быть реализовано каждым из следующих способов: 
1 - прототипное наследование через функции-конструкторы 
2 - наследование через конструкцию Object.create()

Вызвать метод say на каждой из сущностей.
*/

console.log('===== Prototype inherits =====');
// construct the object Animal and say method
function Animal(name, age, sound, region) {
	this.name = name || 'No Name';
	this.age = age || 0;
	this.sound = sound || 'No Sound';
	this.region = region || 'No Region';
	this.say = function () {
	  return ('Hi my name is ' + this.name + '. I live in '+ this.region+' region.');
	};
}

// define a Dog object and goAway method
function Dog(name, age, sound, region) {
	// functions invoke Animal passing this and name and age
	Animal.call(this, name, age, sound, region);
};
// inherits properties and methods from Animal
Dog.prototype = new Animal();    
Dog.prototype.goAway = function () {
	return ('Go away dog!');
};
Dog.prototype.dogType = 'This is a dog';

// define a Cat object and goAway method
function Cat(name, age, sound, region) {
	// functions invoke Animal passing this and name and age
	Animal.call(this, name, age, sound, region);
};
// inherits properties and methods from Animal
Cat.prototype = new Animal();    
Cat.prototype.goAway = function () {
		return ('Go away cat!');
};
Cat.prototype.catType = 'This is a cat';

// define a Woodpecker object and goAway method
function Woodpecker(name, age, sound, region) {
	// functions invoke Animal passing this and name and age
	Animal.call(this, name, age, sound, region);
};
// inherits properties and methods from Animal
Woodpecker.prototype = new Animal();    
Woodpecker.prototype.goAway = function () {
		return ('Go away woodpecker!');
};
Woodpecker.prototype.woodpeckerType = 'This is a woodpecker';


// set its prototype to be a new instance of Animal and Dog, Cat, Woodpecker
var animal = new Animal('Animal', 25, 'Sound', 'Region');
var dog = new Dog('Rex', 3, 'Wof wof', 'Germany');
var cat = new Cat('Mary', 3, 'Miay', 'Japan');
var wood = new Woodpecker('Wooddy', 3, 'Trrrr', 'USA');

console.log(animal.say());
console.log(dog.say());
console.log(dog.goAway());
console.log(cat.say());
console.log(cat.goAway());
console.log(wood.say());
console.log(wood.goAway());

console.log('===== Object.create() =====');
// define the Animal object
var Animal_2 = {
	init: function (name, age, sound, region) {
		this.name = name || 'No Name';
		this.age = age || 0;
		this.sound = sound || 'No Sound';
		this.region = region || 'No Region';
		this.say = function () {
			return ('Hi my name is ' + this.name + '. I live in '+ this.region+' region.');
		};
		return this;
	}
};

// inherits from Animal 
var Dog_2 = Object.create(Animal_2);
var Cat_2 = Object.create(Animal_2);
var Woodpecker_2 = Object.create(Animal_2);

var animal_2 = new Animal_2.init('Animal', 55, 'Sound', 'Region');
var dog_2 = new Dog_2.init('Zhuchka', 5, 'Gav gav', 'Ukraine');
var cat_2 = new Cat_2.init('Murzik', 5, 'Miay miay', 'Poland');
var wood_2 = new Woodpecker_2.init('Sanitar', 5, 'Stuk Stuk', 'India');

dog_2.goAway = function () {
	return ('Go away dog 2!');
};
dog_2.dogType = 'This is a dog';
cat_2.goAway = function () {
	return ('Go away cat 2!');
};
cat_2.catType = 'This is a cat';
wood_2.goAway = function () {
	return ('Go away wood 2!');
};
wood_2.woodpeckerType = 'This is a woodpecker';

console.log(animal_2.say());
console.log(dog_2.say());
console.log(dog_2.goAway());
console.log(cat_2.say());
console.log(cat_2.goAway());
console.log(wood_2.say());
console.log(wood_2.goAway());


/*Реализовать функции getType(), которая принимает один из объектов Dog, Cat, Woodpecker и возвращает его
тип не используя оператор instanceof, а проверяя наличие свойств/методов объектов.
*/
console.log('===== Create function getType(obj) =====');

function getType(obj) {
	// check down the object's prototype chain or direct property of object 
	// and type of object property
	if ((obj.name) && (obj.age) && (obj.sound) && (obj.region) && (obj.say)) {
		if (obj.goAway) {
			if (obj.dogType){
				return "Dog";
			} else if (obj.catType){
				return "Cat";
			} else if (obj.woodpeckerType){
				return "Woodpecker";
			} else {
				return undefined;
			}
		} else {
			return "Animal";
		}
	} else {
		return undefined;
	}
}

console.log('Test: animal = ' + getType(animal));
console.log('Test: dog = ' + getType(dog));
console.log('Test: cat = ' + getType(cat));
console.log('Test: woodpecker = ' + getType(wood));
console.log('Test: animal_2 = ' + getType(animal_2));
console.log('Test: dog_2 = ' + getType(dog_2));
console.log('Test: cat_2 = ' + getType(cat_2));
console.log('Test: woodpecker_2 = ' + getType(wood_2));



/*Модифицировать функцию так, что она не принимает объект, а оперирует с объектом this. 
Функция объявляется вне контекста, но вызывается на определенном объекте при помощи call/apply/bind.
*/
console.log('===== Create function getTypeModify() =====');

function getTypeModify() {
	if ((this.name) && (this.age) && (this.sound) && (this.region) && (this.say)) {
		if (this.goAway) {
			if (this.dogType){
				return "Dog";
			} else if (this.catType){
				return "Cat";
			} else if (this.woodpeckerType){
				return "Woodpecker";
			} else {
				return undefined;
			}
		} else {
			return "Animal";
		}
	} else {
		return undefined;
	}
}

console.log('Test modify: animal = ' + getTypeModify.call(animal));
console.log('Test modify: dog = ' + getTypeModify.call(dog));
console.log('Test modify: cat = ' + getTypeModify.call(cat));
console.log('Test modify: woodpecker = ' + getTypeModify.call(wood));
console.log('Test modify: animal_2 = ' + getTypeModify.call(animal_2));
console.log('Test modify: dog_2 = ' + getTypeModify.call(dog_2));
console.log('Test modify: cat_2 = ' + getTypeModify.call(cat_2));
console.log('Test modify: woodpecker_2 = ' + getTypeModify.call(wood_2));