const express = require("express");
const router = express.Router();
const User = require("../models/User");
const uploader = require("../config/cloudinary");
const requireAuth = require("../middlewares/requireAuth"); // Route protection middleware : )

router.get("/me", (req, res, next) => {
  User.findById(req.session.currentUser)
    .populate()
    .then((items) => {
      res.status(200).json(items);
    });
});

router.patch(
  "/me",
  requireAuth,
  uploader.single("profileImage"),
  (req, res, next) => {
    const ActivityId = req.body.activity._id;
    const Completed = req.body.completed;
    if (req.file) {
      req.body.profileImage = req.file.path;
    }
    User.findByIdAndUpdate(
      req.session.currentUser,
      {
        $push: {
          userActivities: [{ _id: ActivityId, completed: Completed }],
        },
      },
      { new: true }
    )
      .then((items) => {
        res.status(201).send(items);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
router.patch(
  "/me2",
  requireAuth,
  uploader.single("profileImage"),
  (req, res, next) => {
    const Mood = req.body[0].mood;
    const MoodDate = req.body[0].date;
    if (req.file) {
      req.body.profileImage = req.file.path;
    }
    User.findByIdAndUpdate(
      req.session.currentUser,
      {
        $push: {
          mood: [{ mood: Mood, date: MoodDate }],
        },
      },
      { new: true }
    )
      .then((items) => {
        res.status(201).send(items);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
module.exports = router;
