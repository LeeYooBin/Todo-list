const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserService = require("../services/User.service");

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  signUp = async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email.match(emailFormat)) return res.status(400).json({ message: "Invalid email format" });

      const user = await this.userService.createUser(username, email, password);

      const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "12h" });

      return res.status(201).json({ token });
    } 
    catch (error) {
      return res.status(500).json({ message: error.message || "Error signing up" });
    }
  }

  signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await this.userService.getUserByEmail(email);

      if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ message: "Invalid credentials" });
    
      const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "12h" });

      return res.status(200).json({ token });
    } 
    catch (error) {
      return res.status(500).json({ message: "Error signing in" });
    }
  }

  updateUser = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const newData = req.body;

    try {
      const updatedUser = await this.userService.updateUser(id, newData);

      return res.status(200).json(updatedUser);
    } 
    catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return res.status(400).json({ message: "Invalid user ID" });
      } 
      else if (error.message.includes("Email already exists")) {
        return res.status(409).json({ message: "Email already in use by another user" });
      } 
      else if (error.message.includes("User not found")) {
        return res.status(404).json({ message: "User not found" });
      } 
      else {
        return res.status(500).json({ message: error.message || "Error updating user" });
      }
    }
  }

  deleteUser = async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id);

    try {
      const deletedUser = await this.userService.deleteUser(id);

      return res.status(204).json(deletedUser);
    } 
    catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        return res.status(400).json({ message: "Invalid user ID" });
      } 
      else if (error.message.includes("User not found")) {
        return res.status(404).json({ message: "User not found" });
      } 
      else {
        return res.status(500).json({ message: error.message || "Error deleting user" });
      }
    }
  }

  addTask = async (req, res) => {
    const token = req.headers.authorization;
    const taskData = req.body;

    try {
      const addedTask = await this.userService.addTask(token, taskData);
      return res.status(201).json(addedTask);
    } 
    catch (error) {
      return res.status(500).json({ message: error.message || "Error adding task" });
    }
  };

  updateTask = async (req, res) => {
    const token = req.headers.authorization;
    const taskId = new mongoose.Types.ObjectId(req.params.taskId);
    const taskData = req.body;

    try {
      const updatedTask = await this.userService.updateTask(token, taskId, taskData);
      return res.status(200).json(updatedTask);
    } 
    catch (error) {
      return res.status(500).json({ message: error.message || "Error updating task" });
    }
  };

  removeTask = async (req, res) => {
    const token = req.headers.authorization;
    const taskId = new mongoose.Types.ObjectId(req.params.taskId);

    try {
      const removedTaskId = await this.userService.removeTask(token, taskId);
      return res.status(200).json({ taskId: removedTaskId });
    } 
    catch (error) {
      return res.status(500).json({ message: error.message || "Error removing task" });
    }
  };

  getAllTasks = async (req, res) => {
    const token = req.headers.authorization;

    try {
      const allTasks = await this.userService.getAllTasks(token);
      return res.status(200).json(allTasks);
    } 
    catch (error) {
      return res.status(500).json({ message: error.message || "Error getting all tasks" });
    }
  };

  getTask = async (req, res) => {
    const token = req.headers.authorization;
    const taskId = new mongoose.Types.ObjectId(req.params.taskId);

    try {
      const task = await this.userService.getTask(token, taskId);
      return res.status(200).json(task);
    } 
    catch (error) {
      return res.status(500).json({ message: error.message || "Error getting task" });
    }
  };
}

module.exports = UserController;