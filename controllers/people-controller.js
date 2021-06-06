/* Imports AWS Image Functions */

const { deleteS3 } = require('../config/aws');

/*  Models */

const People = require('../models/peoples');

async function getAllPeople(req, res) {
	try {
		const peoples = await People.find({ deleted: false });

		res.status(200).json({ error: false, msg: 'All people returned', data: peoples });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: 'ERROR' });
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
		res.status(500).json({ error: true, msg: error });
	}
}

async function createPeople(req, res) {
	try {
		if (!req.file) {
			throw new Error('No image was provided. Images are required');
		}
		const people = await new People(req.body);
		people.image = req.file.key;
		people.save();

		res.status(201).json({ error: false, msg: 'People Created', data: people });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: 'ERROR' });
	}
}

async function updatePeople(req, res) {
	try {
		const updatedPeople = await People.findByIdAndUpdate(req.params.id, req.body, { new: true });

		//console.log(req);
		//console.log(req.file);
		if (req.file) {
			await deleteS3(updatedPeople.image);
			updatedPeople.image = req.file.key;
			updatedPeople.save();
		}
		//console.log(updatedProject);
		res.status(200).json({ error: false, msg: 'People updated', data: updatedProject });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: 'ERROR' });
	}
}

async function deletePeople(req, res) {
	try {
		if (!req.params.id) {
			throw new Error('No id was provided');
		}
		const deletedPerson = await People.findById(req.params.id);
		deletedPerson.deleted = true;
		deletedPerson.save();

		res.status(200).json({ error: false, msg: 'Person Deleted' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: 'ERROR' });
	}
}

module.exports = {
	getAllPeople,
	getPeople,
	createPeople,
	updatePeople,
	deletePeople
};
