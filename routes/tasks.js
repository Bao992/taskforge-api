const express = require("express");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs").promises;
const path = require("path");

const router = express.Router();

const tasksFile = path.join(
    __dirname,
    "../data/tasks.json"
);

async function readTasks() {
    const data = await fs.readFile(
        tasksFile,
        "utf8"
    );

    return JSON.parse(data);
}

async function writeTasks(tasks) {
    await fs.writeFile(
        tasksFile,
        JSON.stringify(tasks, null, 2)
    );
}

function verifyTask(task) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (!task.title) {
                reject(new Error("Task is missing a title"));
            }

            resolve({
                verified: true,
                taskId: task.id,
            });
        }, 2000);
    });
}

// GET all tasks
router.get("/", async (req, res, next) => {
    try {
        const tasks = await readTasks();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
});

// GET single task
router.get("/:id", async (req, res, next) => {
    try {
        const tasks = await readTasks();

        const task = tasks.find(
            (task) => task.id === req.params.id
        );

        if (!task) {
            const error = new Error("Task not found");
            error.status = 404;
            return next(error);
        }

        res.json(task);

    } catch (error) {
        next(error);
    }
});

// VERIFY task
router.get("/:id/verify", async (req, res, next) => {
    try {
        const tasks = await readTasks();

        const task = tasks.find(
            (task) => task.id === req.params.id
        );

        if (!task) {
            const error = new Error("Task not found");
            error.status = 404;
            return next(error);
        }

        const result = await verifyTask(task);

        res.json(result);

    } catch (error) {
        next(error);
    }
});

// CREATE task
router.post("/", async (req, res, next) => {
    try {
        const tasks = await readTasks();

        const { title } = req.body;

        if (!title) {
            const error = new Error("Title is required");
            error.status = 400;
            return next(error);
        }

        const newTask = {
            id: uuidv4(),
            title,
            completed: false,
            createdAt: new Date().toISOString(),
        };

        tasks.push(newTask);

        await writeTasks(tasks);

        res.status(201).json(newTask);

    } catch (error) {
        next(error);
    }
});

// UPDATE task
router.put("/:id", async (req, res, next) => {
    try {
        const tasks = await readTasks();

        const task = tasks.find(
            (task) => task.id === req.params.id
        );

        if (!task) {
            const error = new Error("Task not found");
            error.status = 404;
            return next(error);
        }

        task.title = req.body.title || task.title;

        if (req.body.completed !== undefined) {
            task.completed = req.body.completed;
        }

        await writeTasks(tasks);

        res.json(task);

    } catch (error) {
        next(error);
    }
});

// DELETE task
router.delete("/:id", async (req, res, next) => {
    try {
        const tasks = await readTasks();

        const index = tasks.findIndex(
            (task) => task.id === req.params.id
        );

        if (index === -1) {
            const error = new Error("Task not found");
            error.status = 404;
            return next(error);
        }

        tasks.splice(index, 1);

        await writeTasks(tasks);

        res.status(204).send();

    } catch (error) {
        next(error);
    }
});

module.exports = router;