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

router.patch(
  "/me",
  requireAuth,
  uploader.single("profileImage"),
  (req, res, next) => {
    const ActivityId = req.body._id;
    console.log("route log>>", req.params._id);
    if (req.file) {
      req.body.profileImage = req.file.path;
    }
    User.findByIdAndUpdate(
      req.session.currentUser,
      { $push: { userActivities: ActivityId } },
      { new: true }
    )
      .then((user) => {
        res.status(201).send(user);
        console.log("log2", user.userActivities);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

module.exports = router;
