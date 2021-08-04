/* Imports AWS Image Functions */

const { deleteS3 } = require('../config/aws');

/*  Models */

const People = require('../models/peoples');
// const Payment = require('../models/payments');
// const FoodBehavior = require('../models/foodInfo');
// const LivingPlace = require('../models/livingInfo');
// const Materials = require('../models/materialsInfo');

async function getAllPeople(req, res) {
	try {
		const peoples = await People.find({ deleted: false });
		//	res.set('Access-Control-Allow-Origin', '*');
		res.status(200).json({ error: false, msg: 'Person returned', data: peoples });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: error.message });
	}
}

async function getAllPeopleList(req, res) {
	try {
		const peoples = await People.find({ $and: [{ deleted: false }, { active: true }] });
		//	res.set('Access-Control-Allow-Origin', '*');
		const peopleList = peoples.map(people => {
			const x = {
				_id: people._id,
				name: people.name,
				first_last_name: people.first_last_name,
				second_last_name: people.second_last_name
			};
			return x;
		});

		res.status(200).json({ error: false, msg: 'Person returned', data: peopleList });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: error.message });
	}
}

async function getPeople(req, res) {
	try {
		if (!req.params.id) {
			throw new Error('No id was provided');
		}
		const people = await People.findById(req.params.id);

		res.status(200).json({ error: false, msg: 'Person returned', data: people });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: error.message });
	}
}

async function createPeople(req, res) {
	try {
		//console.log(req.body);
		if (!req.body.name || !req.body.first_last_name || !req.body.birthday || !req.body.gender) {
			throw new Error('Falto información requerida.');
		}
		var person = {
			//uuid: req.body.uuid,
			name: req.body.name,
			first_last_name: req.body.first_last_name,
			second_last_name: req.body.second_last_name,
			birthday: req.body.birthday,
			gender: req.body.gender,
			active: req.body.active,
			is_married: req.body.is_married,
			address: req.body.address,
			curp: req.body.curp,
			phone: req.body.phone,
			education: req.body.education,
			job: req.body.job,
			number_children: req.body.number_children,
			place_of_work: req.body.place_of_work,
			monthly_income: req.body.monthly_income,
			insurance: req.body.insurance,
			religion: req.body.religion
		};

		if (req.body.food_behavior_weekly) {
			person.food_behavior_weekly = JSON.parse(req.body.food_behavior_weekly);
		}
		if (req.body.living_place) {
			//req.body.living_place.materials = JSON.parse(req.body.living_place.materials);
			person.living_place = JSON.parse(req.body.living_place);
		}
		if (req.body.given) {
			person.given = JSON.parse(req.body.given);
		}
		const people = await new People(person);
		if (req.file) {
			people.image = req.file.key;
		}

		people.save();

		res.status(201).json({ error: false, msg: 'Persona Creada', data: people });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: error.message });
	}
}

async function updatePeople(req, res) {
	try {
		//console.log(req.body);
		if (!req.body.name || !req.body.first_last_name || !req.body.birthday || !req.body.gender) {
			throw new Error('Falto información requerida.');
		}
		var person = {
			//uuid: req.body.uuid,
			name: req.body.name,
			first_last_name: req.body.first_last_name,
			second_last_name: req.body.second_last_name,
			curp: req.body.curp,
			birthday: req.body.birthday,
			gender: req.body.gender,
			active: req.body.active,
			is_married: req.body.is_married,
			address: req.body.address,
			phone: req.body.phone,
			education: req.body.education,
			job: req.body.job,
			number_children: req.body.number_children,
			place_of_work: req.body.place_of_work,
			monthly_income: req.body.monthly_income,
			insurance: req.body.insurance,
			religion: req.body.religion
		};

		if (req.body.food_behavior_weekly) {
			person.food_behavior_weekly = JSON.parse(req.body.food_behavior_weekly);
		}
		if (req.body.living_place) {
			//req.body.living_place.materials = JSON.parse(req.body.living_place.materials);
			person.living_place = JSON.parse(req.body.living_place);
		}
		if (req.body.given) {
			person.given = JSON.parse(req.body.given);
		}
		const updatedPeople = await People.findByIdAndUpdate(req.params.id, person, { new: true });

		//console.log(req);
		//console.log(req.file);
		if (req.file) {
			await deleteS3(updatedPeople.image);
			updatedPeople.image = req.file.key;
			updatedPeople.save();
		}

		//console.log(updatedProject);
		res.status(200).json({ error: false, msg: 'Persona actualizada', data: updatedPeople });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: error.message });
	}
}

async function deletePeople(req, res) {
	try {
		if (!req.params.id) {
			throw new Error('No id was provided');
		}
		const deletedPerson = await People.findById(req.params.id);
		console.log(deletedPerson);
		deletedPerson.deleted = true;
		deletedPerson.save();

		res.status(200).json({ error: false, msg: 'Persona Eliminada' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: error.message });
	}
}

module.exports = {
	getAllPeople,
	getAllPeopleList,
	getPeople,
	createPeople,
	updatePeople,
	deletePeople
};
