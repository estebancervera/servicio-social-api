/* Imports AWS Image Functions */

const { deleteS3 } = require('../config/aws');

/*  Models */

const Project = require('../models/projects');

async function getAllProjects(req, res) {
	try {
		//console.log(req.body);
		const projects = await Project.find({});

		res.status(200).json(projects);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: 'ERROR' });
	}
}

async function getProject(req, res) {
	try {
		if (!req.params.id) {
			throw new Error('No id was provided');
		}
		const project = await Project.findById(req.params.id);

		res.status(200).json(project);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: error });
	}
}

async function createProject(req, res) {
	try {
		if (!req.file) {
			throw new Error('No image was provided. Images are required');
		}
		const project = await new Project(req.body);
		project.image = req.file.key;
		project
			.save()
			.then(result => {
				res.status(201).json({ error: false, msg: 'Project created', data: result });
			})
			.catch(error => {
				//console.error(error);
				res.status(500).json({ error: true, msg: 'ERROR SAVE' });
			});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: 'ERROR' });
	}
}

async function updateProject(req, res) {
	try {
		const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });

		//console.log(req);
		//console.log(req.file);
		if (req.file) {
			await deleteS3(updatedProject.image);
			updatedProject.image = req.file.key;
			updatedProject.save();
		}
		//console.log(updatedProject);
		res.status(200).json({ error: false, msg: 'Project updated', data: updatedProject });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: 'ERROR' });
	}
}

async function deleteProject(req, res) {
	try {
		if (!req.params.id) {
			throw new Error('No id was provided');
		}
		const deletedProject = await Project.findByIdAndDelete(req.params.id);

		await deleteS3(deletedProject.image);

		res.status(200).json({ error: false, msg: 'Project Deleted' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: true, msg: 'ERROR' });
	}
}

module.exports = {
	getAllProjects,
	getProject,
	createProject,
	updateProject,
	deleteProject
};
