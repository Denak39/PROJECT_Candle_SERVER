const express = require("express");
const router = express.Router();
const User = require("../models/User");
const uploader = require("../config/cloudinary");
const requireAuth = require("../middlewares/requireAuth"); // Route protection middleware : )

router.get("/me", (req, res, next) => {
  User.findById(req.session.currentUser).then((items) => {
    res.status(200).json(items);
  });
});

//get me avec populate pour les favorites
router.get("/me2", (req, res, next) => {
  User.findById(req.session.currentUser)
    .populate("favoritesActivities")
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

router.post("/favorite/:favoriteId", requireAuth, (req, res, next) => {
  User.findByIdAndUpdate(
    req.session.currentUser,
    { $addToSet: { favoritesActivities: req.params.favoriteId } },
    { new: true }
  )
    .then((response) => {
      console.log("here", response.favoriteId);
      res.status(200).json(response);
    })
    .catch((err) => res.status(500).json(err));
});

router.post("/no-favorite/:favoriteId", requireAuth, (req, res, next) => {
  User.findByIdAndUpdate(
    req.session.currentUser,
    { $pull: { favoritesActivities: req.params.favoriteId } },
    { new: true }
  )
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => res.status(500).json(err));
});
module.exports = router;
