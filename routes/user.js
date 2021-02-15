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
    console.log("req body", req.body);
    const ActivityId = req.body.activity._id;
    console.log(ActivityId);
    const Completed = req.body.completed;
    if (req.file) {
      req.body.profileImage = req.file.path;
    }
    User.findByIdAndUpdate(
      req.session.currentUser,
      {
        $push: { userActivities: [{ _id: ActivityId, completed: Completed }] },
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
// router.patch(
//   "/me",
//   requireAuth,
//   uploader.single("profileImage"),
//   (req, res, next) => {
//     // If no file is sent, req.file is undefined, leading to an error when trying to
//     // acces req.file.path (undefined.path) => Cannot read property path of undefined.
//     if (req.file) {
//       req.body.profileImage = req.file.path;
//     }
//     User.findByIdAndUpdate(req.session.currentUser, req.body, { new: true })
//       .then((items) => {
//         res.status(201).send(items);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// );
module.exports = router;
