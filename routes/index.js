var express = require("express");
var router = express.Router();
const {
    signupInitialChecks,
    loginInitialChecks,
} = require("../middleware/checks");
const { logIn, logOut, signUp } = require("../controllers/auth");
const loginRequired = require("../middleware/authenticateToken");
const {
    addToDo,
    getAllTodos,
    getTodo,
    updateTodo,
    deleteTodo,
} = require("../controllers/todos");

/* GET home page. */
router.get("/", function (req, res) {
    res.render("index", { title: "TODO APP" });
});

// authentication
router.post("/signup", signupInitialChecks, signUp);
router.post("/login", loginInitialChecks, logIn);
router.get("/logout", loginRequired, logOut);

// todos
router.get("/todos", loginRequired, getAllTodos);
router.post("/addtodo", loginRequired, addToDo);

router.get("/todo/:id", loginRequired, getTodo);
router.put("/todo/:id", loginRequired, updateTodo);
router.delete("/todo/:id", loginRequired, deleteTodo);

module.exports = router;
