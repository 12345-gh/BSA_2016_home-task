"use strict";

class Fighter {
	constructor(name = 'Default', power = 10, health = 2000) {
		this.name = name;
		this.power = power;
		this.health = health;
	}
	
	setDamage(damage) {
		this.health=this.health-damage;
		console.log(`${this.name} resive damage ${damage} and his health: ${this.health}`);
		if (this.health <= 0) {
			console.warn(`${this.name} loose!`);
		}
	}
	
	hit(enemy, point = 0){
		let damage = point * this.power;       
		enemy.setDamage(damage);
	}
}

class ImprovedFighter extends Fighter{
	constructor(name = 'DefaultIF', power = 20, health = 1000) {
		super(name, power, health);
	}

	doubleHit(enemy, point) {
		super.hit(enemy, point*2);
	}
	
	hit(enemy, point = 0) {
		this.doubleHit(enemy, point);
	}
}   

class WeakFighter extends ImprovedFighter{
	constructor(name = 'DefaultWF', power = 20, health = 1500) {
		super(name, power, health);
	}
	
	protect(point) {
		return point / 2;
	}
	
	hit(enemy, point = 0) {
		super.hit(enemy, this.protect(point))
	}
}   

let fighter = new Fighter('Fighter', 8);
let impFighter = new ImprovedFighter('ImpFighter');
let weakFighter = new WeakFighter('WeakFighter', 15, 1400);

let membersArray = new Array(fighter, impFighter, weakFighter);

console.log(
`-name- ${fighter.name}
-power- ${fighter.power}
-health- ${fighter.health}`);
console.log(
`-name- ${impFighter.name}
-power- ${impFighter.power}
-health- ${impFighter.health}`);
console.log(
`-name- ${weakFighter.name}
-power- ${weakFighter.power}
-health- ${weakFighter.health}`);

let getRandomMember = (callMember, membersCount) => {
	let id = 0;
	do {
	   id = Math.floor(Math.random() * (membersCount/*+ 1*/));  
	} while (id == callMember);
	return id;
}

const fight = (membersArr, ...point) => {
	if (membersArr.length > 1) {
		var members = membersArr.slice();
	} else {
		console.error(`Error with count of fighter!`);
	}
	
	let enterPoints = point;
	
	while (members.length !== 1) {
		while ((members.length > 1) && (enterPoints.length > 0)) {
			let usePoints = enterPoints.shift();
			
			for (let indexMemebers=0; indexMemebers < members.length; indexMemebers++) {  
				let fightWithMember = members[getRandomMember(indexMemebers,members.length)];
				if ((members[indexMemebers].health > 0) && (fightWithMember.health > 0)) {					
					console.log(`- ${members[indexMemebers].name} fight with ${fightWithMember.name}`);
					members[indexMemebers].hit(fightWithMember,usePoints);
				}
				
				if (members[indexMemebers].health <= 0) {
					members.splice(indexMemebers, 1);
					break;
				} 
			}
		}
		
		if (members.length > 1) {
			for (let indexMemebers=0; indexMemebers < members.length; indexMemebers++) {  
				let fightWithMember = members[getRandomMember(indexMemebers,members.length)];
				if ((members[indexMemebers].health > 0) && (fightWithMember.health > 0)) {
					console.log(`- ${members[indexMemebers].name} hit ${fightWithMember.name}`);
					members[indexMemebers].hit(fightWithMember, 1);
				}
				
				if (members[indexMemebers].health <= 0) {
					members.splice(indexMemebers, 1);
					break;
				} 
			}
		}
	}
	
	console.log(`${members[0].name} WIN!`);
}

fight(membersArray, 16, 5, 20, 3, 12);