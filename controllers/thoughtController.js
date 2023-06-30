// when we make a new thought, we only have a username
// since this is a backend only application, we would need to find the user with this same username
//add the newThought id to the USer array of thoughts

// const { ObjectId } = require("mongoose").Types;
const { User, Thought } = require("../models");

const amountOfThoughts = async () => {
  // Your code here
  const numberOfThoughts = await Thought.aggregate().count("thoughtCount");
  return numberOfThoughts;
};

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      const thoughtObj = {
        thoughts,
        thoughtCount: await amountOfThoughts(),
      };
      return res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async getSingleThought(req, res) {
    try {
      const thought = await Thought
        .findOne({ _id: req.params.thoughtId })
        .select("-__v")
        .lean();

      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  async createThought(req, res) {
    try {
      console.log("You are creating a thought");
      console.log(req.body);
      const thought = await Thought.create(req.body);

      const updatedUser = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { runValidators: true, new: true } // Return the updated user document
      );

      if (!updatedUser) {
        return res
          .status(404)
          .json({ message: "Thought created but user not found" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
  try {
    const { thoughtText, createdAt, username, reactions } = req.body;

    const update = {};
        if (thoughtText) update.thoughtText = thoughtText;
        if (createdAt) update.createdAt = createdAt;
        if (username) update.username = username;
        if (reactions) update.reactions = reactions;

    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      update,
      { new: true } // Return the updated student document
    );
    
    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    return res.json(updatedThought);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},


  async deleteThought(req, res) {
    try {
      const thoughtDeleted = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thoughtDeleted) {
        return res.status(404).json({ message: "No such thought exists" });
      }

    const user = await User.findOneAndUpdate(
      { username: thoughtDeleted.username },
      { $pull: { thoughts: req.params.thoughtId } },
      { runValidators: true, new: true }
    );

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with that ID :(" });
      }
      
      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    try {
      console.log("You are adding a reaction");
      console.log(req.body);
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res
          .status(404)
          .json({ message: "No thought found with that ID :(" });
      }

      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res
          .status(404)
          .json({ message: "No reaction found with that ID :(" });
      }

      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};