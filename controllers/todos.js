Todo = require("../models/todo");

exports.addToDo = async (req, res, next) => {
    const { todo, description } = req.body;

    if (!todo) {
        return res
            .status(400)
            .json({ message: "yo! come on, you gotta write something!" });
    }

    const newtodo = new Todo({
        UserId: req.user.id,
        todo: todo,
        description: description,
    });

    const savedTodo = await newtodo.save();

    res.status(201).json({ message: "Todo created Successfully", savedTodo });
};

exports.deleteTodo = async (req, res) => {
    try {
        await Todo.destroy({
            where: {
                id: req.params.id,
                UserId: req.user.id,
            },
        });

        return res.status(200).json({
            message: "todo deleted!",
        });
    } catch {
        return res.status(500).json({
            message: "Todo not found or the todo does not belong to you!",
        });
    }
};

exports.getAllTodos = async (req, res) => {
    const todos = await Todo.findAll({
        where: {
            UserId: req.user.id,
        },
    });

    if (todos.length > 0) {
        return res.status(200).json(
            todos.map((item) => {
                if (item.description) {
                    return {
                        todo: item.todo,
                        description: item.description,
                        id: item.id,
                    };
                } else {
                    return {
                        todo: item.todo,
                        id: item.id,
                    };
                }
            })
        );
    } else {
        return res.status(200).json({
            message:
                "Hey, you haven't got anything to do rn. Hit the 'addtodo' route with a task!",
        });
    }
};

exports.getTodo = async (req, res) => {
    try {
        const todo = await Todo.findOne({
            where: {
                id: req.params.id,
                UserId: req.user.id,
            },
        });
        if (todo) {
            return res.status(200).json({
                todo,
            });
        } else {
            return res.json({
                message: "no such todo exists",
            });
        }
    } catch (err) {
        return res.status(400).json({
            message: "Todo not found or the todo does not belong to you!",
            err,
        });
    }
};

exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    const { description, todo } = req.body;
    try {
        if (
            await Todo.update(
                {
                    todo: todo,
                    description: description,
                },
                { where: { id: id, UserId: req.user.id } }
            )
        ) {
            return res.status(200).json({
                message: "todo updated",
            });
        } else {
            return res.status(404).json({
                message: "invalid request",
            });
        }
    } catch (err) {
        return res.status(404).json({
            message: "Todo not found or the todo does not belong to you!",
            err,
        });
    }
};
