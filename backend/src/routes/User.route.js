// const express = require("express");
// const UserController = require("../controllers/User.controller");
// const AuthMiddleware = require("../middlewares/auth.middleware");

// const router = express.Router();
// const userController = new UserController();
// const authMiddleware = new AuthMiddleware();

// router.post("/signup", userController.signUp);
// router.post('/signin', userController.signIn);
// router.use(authMiddleware.authenticateToken);
// router.put('/update/:id', userController.updateUser);
// router.delete('/delete/:id', userController.deleteUser);

// module.exports = router;

const express = require("express");
const UserController = require("../controllers/User.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();
const userController = new UserController();
const authMiddleware = new AuthMiddleware();

router.post("/signup", userController.signUp);
router.post("/signin", userController.signIn);

router.use(authMiddleware.authenticateToken);

router.put("/user", userController.updateUser);

router.delete("/user", userController.deleteUser);

router.get("/user/tasks", userController.getAllTasks);
router.get("/user/tasks/:taskId", userController.getTask);

router.post("/user/tasks", userController.addTask);

router.put("/user/tasks/:taskId", userController.updateTask);

router.delete("/user/tasks/:taskId", userController.removeTask);

module.exports = router;
