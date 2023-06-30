const connection = require("../config/connection");
const { User, Thought } = require("../models");
// const { getRandomName, getRandomAssignments } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  // Delete the collections if they exist
  let usersCheck = await connection.db.listCollections
    .listCollections({ name: "users" })
    .toArray();

  let thoughtsCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();

  // Add students to the collection and await the results
  await Student.collection.insertMany(students);

  const stormsThoughts = [
    {
      thoughtText: "Boy o boy howdy, technology is cool!",
      createdAt: Date,
      username: "Storm",
      reactions: [
        {
          reactionBody: "Am true.",
          username: "Reign",
          createdAt: Date,
        },
        {
          reactionBody: "Is correct.",
          username: "Corn",
          createdAt: Date,
        },
        {
          reactionBody: "Way with words.",
          username: "Slimy Jim",
          createdAt: Date,
        },
        {
          reactionBody: "Why are you guys talking like this?",
          username: "Fitzgerald",
          createdAt: Date,
        },
      ],
    },
    {
      thoughtText: "Good stuff that techo stuffies...",
      createdAt: Date,
      username: "Storm",
      reactions: [
        {
          reactionBody: "Am true.",
          username: "Reign",
          createdAt: Date,
        },
        {
          reactionBody: "Is correct.",
          username: "Corn",
          createdAt: Date,
        },
        {
          reactionBody: "Way with words.",
          username: "Slimy Jim",
          createdAt: Date,
        },
        {
          reactionBody:
            "What's going on?  Why did you respond in the exact same way?",
          username: "Fitzgerald",
          createdAt: Date,
        },
      ],
    },
    {
      thoughtText: "Technologies confirm-e-ded",
      createdAt: Date,
      username: "Storm",
      reactions: [
        {
          reactionBody: "Am true.",
          username: "Reign",
          createdAt: Date,
        },
        {
          reactionBody: "Is correct.",
          username: "Corn",
          createdAt: Date,
        },
        {
          reactionBody: "Way with words.",
          username: "Slimy Jim",
          createdAt: Date,
        },
        {
          reactionBody:
            "It's like this is some kind of simulation, what's going on?",
          username: "Fitzgerald",
          createdAt: Date,
        },
      ],
    },
  ];

    const reignsThoughts = [
      {
        thoughtText: "Technamologies, me thinks.",
        createdAt: Date,
        username: "Reign",
        reactions: [
          {
            reactionBody: "Am true.",
            username: "Storm",
            createdAt: Date,
          },
          {
            reactionBody: "Is correct.",
            username: "Corn",
            createdAt: Date,
          },
          {
            reactionBody: "Way with words.",
            username: "Slimy Jim",
            createdAt: Date,
          },
          {
            reactionBody: "This is freaking me out!  Just act normal, please!",
            username: "Fitzgerald",
            createdAt: Date,
          },
        ],
      },
      {
        thoughtText: "Mmmmmm, technologies...",
        createdAt: Date,
        username: "Reign",
        reactions: [
          {
            reactionBody: "Am true.",
            username: "Storm",
            createdAt: Date,
          },
          {
            reactionBody: "Is correct.",
            username: "Corn",
            createdAt: Date,
          },
          {
            reactionBody: "Way with words.",
            username: "Slimy Jim",
            createdAt: Date,
          },
          {
            reactionBody:
              "That's it, you guys have successfully convinced me to get off permanently.",
            username: "Fitzgerald",
            createdAt: Date,
          },
        ],
      },
      {
        thoughtText: "Technobob, a friend",
        createdAt: Date,
        username: "Reign",
        reactions: [
          {
            reactionBody: "Am true.",
            username: "Storm",
            createdAt: Date,
          },
          {
            reactionBody: "Is correct.",
            username: "Corn",
            createdAt: Date,
          },
          {
            reactionBody: "Way with words.",
            username: "Slimy Jim",
            createdAt: Date,
          },
          {
            reactionBody:
              "Wait, why isn't my computer letting me log off?",
            username: "Fitzgerald",
            createdAt: Date,
          },
        ],
      },
    ];

  // Add courses to the collection and await the results
  await User.collection.insertMany([
    {
      username: "Storm",
      email: "howdy@rowdy.com",
      thoughts: [...stormsThoughts],
      friends: [],
    },
    {
      username: "Reign",
      email: "nope@nada.com",
      thoughts: [],
      friends: [],
    },
    {
      username: "Corn",
      email: "maize@ears.com",
      thoughts: [],
      friends: [],
    },
    {
      username: "Fitzgerald",
      email: "fred@lump.com",
      thoughts: [],
      friends: [],
    },
    {
      username: "Slimy Jim",
      email: "kitten@kaboodle.com",
      thoughts: [],
      friends: [],
    },
  ]);

    await Thoughts.collection.insertMany([
      {
        username: "Storm",
        email: "howdy@rowdy.com",
        thoughts: [],
        friends: [],
      },
      {
        username: "Reign",
        email: "nope@nada.com",
        thoughts: [],
        friends: [],
      },
      {
        username: "Corn",
        email: "maize@ears.com",
        thoughts: [],
        friends: [],
      },
      {
        username: "Fitzgerald",
        email: "fred@lump.com",
        thoughts: [],
        friends: [],
      },
      {
        username: "Slimy Jim",
        email: "kitten@kaboodle.com",
        thoughts: [],
        friends: [],
      },
    ]);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
