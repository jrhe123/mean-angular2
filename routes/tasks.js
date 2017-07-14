var express = require('express');
var router = express.Router();

// Connect to mlab with MongoDB URI, collections created
var mongojs = require('mongojs');
var db = mongojs('mongodb://admin:123456@ds157682.mlab.com:57682/mytasklist', ['tasks']);

// Get All Tasks
router.get('/tasks', function(req, res, next){

	db.tasks.find(function(err, tasks){
		if(err){
			res.send(err);
		}
		res.json(tasks);
	});
});

// Get Single Task
router.get('/task/:id', function(req, res, next){

	db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, task){
		if(err){
			res.send(err);
		}
		res.json(task);
	});
});

// Add Task
router.post('/task', function(req, res, next){

	var task = req.body;
	if(!task.title || !(task.isDone + '')){
		res.status(400);
		res.json({
			"error" : "Bad Data"
		});
	} else {
		db.tasks.save(task, function(err, task){
			if(err){
				res.send(err);
			}
			res.json(task);
		})
	}
});

// Delete Task
router.delete('/task/:id', function(req, res, next){

	db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(err, task){
		if(err){
			res.send(err);
		}
		res.json(task);
	});
});

// Update Task
router.put('/task/:id', function(req, res, next){

	var task = req.body;
	var updTask = {};

	if(task.title){
		updTask.title = task.title;
	}
	if(task.isDone){
		updTask.isDone = task.isDone;
	}
	if(!updTask){
		res.status(400);
		res.json({
			"error" : "Bad Data"
		});
	} else {

		db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, function(err, task){
			if(err){
				res.send(err);
			}
			res.json(task);
		});
	}	
});

module.exports = router;