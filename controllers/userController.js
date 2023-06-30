// const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

const amountOfUsers = async () => {
  // Your code here
  const numberOfUsers = await User.aggregate().count("userCount");
  return numberOfUsers;
};

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      const userObj = {
        users,
        userCount: await amountOfUsers(),
      };
      return res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User
        .findOne({ _id: req.params.userId })
        .select("-__v")
        .lean();

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const { username, email, thoughts, friends } = req.body;

      const update = {};
      if (username) update.username = username;
      if (email) update.email = email;
      if (thoughts) update.thoughts = thoughts;
      if (friends) update.friends = friends;

      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        update,
        { new: true } // Return the updated student document
      );

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json(updatedUser);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({
        _id: req.params.userId,
      });

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      const thoughts = await Thought.deleteMany({
        username: req.params.userId,
      });

      if (thoughts.deletedCount === 0) {
        return res.status(404).json({
          message: "User deleted, but no thoughts found",
        });
      }

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      console.log("You are adding a friend");
      console.log(req.body);
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }

      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res
          .status(404)
          .json({ message: "No friend found with that ID :(" });
      }

      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
