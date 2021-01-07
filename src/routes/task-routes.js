const express = require('express');

const router = express.Router();

const Tasks = require('../models/task-models');

//Routes
router.get('/', async (req, res) => {
    
    const tasks = await Tasks.find();
    res.json(tasks);

});

router.get('/:id', async (req, res) => {

    const task = await Tasks.findById(req.params.id);
    res.json({
        status: 202,
        desc: "Task found",
        task: task
    });
})

router.post('/', async (req, res) => {
    
    const {title, description, date} = req.body;
    const task = new Tasks({title, description, date});

    console.log(task);

    await task.save();

    res.json({
        status: 201,
        desc: "Task created"
    })
});

router.put('/:id', async (req, res) => {

    const {title, description, date} = req.body;
    const taskUpdated = {title, description, date};
    
    await Tasks.findByIdAndUpdate(req.params.id, taskUpdated);

    res.json({
        status: 201,
        desc: "Task updated"
    })
})

router.delete('/:id', async (req, res) => {

    await Tasks.findByIdAndDelete(req.params.id);

    res.json({
        status: 200,
        desc: "Task deleted"
    });
})

module.exports = router;