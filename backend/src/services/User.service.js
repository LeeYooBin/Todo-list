const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService {
  createUser = async (username, email, password) => {
    try {
      const existingUser = await User.findOne({ email });

      if (existingUser) throw new Error("Email already exists");

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();

      return user;
    } 
    catch (error) {
      throw new Error(error.message || "Error creating user");
    }
  }

  getUserByEmail = async (email) => {
    try {
      const user = await User.findOne({ email });
      return user;
    } 
    catch (error) {
      throw new Error("Error getting user by email");
    }
  }

  getUserById = async (userId) => {
    try {
      const user = await User.findById(userId);

      if (!user) throw new Error("User not found");

      return user;
    } 
    catch (error) {
      throw new Error("Error getting user by ID");
    }
  }

  updateUser = async (token, userId, newData) => {
    try {
      this.verifyToken(userId, token);

      const user = await this.getUserById(userId);

      if (newData.email && newData.email !== user.email) {
        const existingUser = await User.findOne({ email: newData.email });

        if (existingUser) throw new Error("Email already exists");
      }

      Object.assign(user, newData);
      await user.save();

      return user;
    } 
    catch (error) {
      throw new Error(error.message || "Error updating user");
    }
  }

  deleteUser = async (token, userId) => {
    try {
      this.verifyToken(userId, token);

      const user = await this.getUserById(userId);
      await user.remove();

      return user;
    } 
    catch (error) {
      throw new Error(error.message || "Error deleting user");
    }
  }

  addTask = async (token, taskData) => {
    try {
      const userId = this.getUserIdFromToken(token);
      const user = await this.getUserById(userId);

      user.tasks.push(taskData);
      await user.save();

      return user.tasks[user.tasks.length - 1];
    } 
    catch (error) {
      throw new Error(error.message || "Error adding task");
    }
  };

  updateTask = async (token, taskId, taskData) => {
    try {
      const userId = this.getUserIdFromToken(token);
      const user = await this.getUserById(userId);

      const task = user.tasks.id(taskId);

      if (!task) throw new Error("Task not found");

      Object.assign(task, taskData);
      await user.save();

      return task;
    } 
    catch (error) {
      throw new Error(error.message || "Error updating task");
    }
  };

  removeTask = async (token, taskId) => {
    try {
      const userId = this.getUserIdFromToken(token);
      const user = await this.getUserById(userId);

      user.tasks.id(taskId).remove();
      await user.save();

      return taskId;
    } 
    catch (error) {
      throw new Error(error.message || "Error removing task");
    }
  };

  getAllTasks = async (token) => {
    try {
      const userId = this.getUserIdFromToken(token);
      const user = await this.getUserById(userId);
      return user.tasks;
    } 
    catch (error) {
      throw new Error(error.message || "Error getting all tasks");
    }
  };

  getTask = async (token, taskId) => {
    try {
      const userId = this.getUserIdFromToken(token);
      const user = await this.getUserById(userId);
      const task = user.tasks.id(taskId);

      if (!task) throw new Error("Task not found");

      return task;
    } 
    catch (error) {
      throw new Error(error.message || "Error getting task");
    }
  };

  getUserIdFromToken = (token) => {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      return decodedToken.userId;
    } 
    catch (error) {
      throw new Error("Invalid token");
    }
  }

  verifyToken = async (userId, token) => {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      if (decodedToken.userId !== userId) throw new Error("Invalid token");
    } 
    catch (error) {
      throw new Error("Invalid token");
    }
  }
}

module.exports = UserService;