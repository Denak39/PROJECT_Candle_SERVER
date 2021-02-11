const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");
const User = require("../models/User");
const uploader = require("../config/cloudinary");
const requireAuth = require("../middlewares/requireAuth"); // Route protection middleware : )
const protectAdminRoute = require("../middlewares/protectAdminRoute");

//lists all activities inside a category
router.get("/", requireAuth, (req, res, next) => {
  Activity.find({})
    .populate() // Gives us the author's id (id_user) object document instead of just the id : )
    .then((itemDocuments) => {
      res.status(200).json(itemDocuments);
    })
    .catch(next); // cf app.js error handling middleware
  // same as below
  //.catch(error => next(error))
});

//create an activity
router.post(
  "/create",
  protectAdminRoute,
  uploader.single("image"),
  (req, res, next) => {
    const updateValues = { ...req.body };
    console.log(req.session.currentUser);
    //   updateValues.trainerId = req.session.currentUser; // Retrieve the authors id from the session.
    if (req.file) {
      updateValues.image = req.file.path;
    }

    Activity.create(updateValues)
      .then((itemDocument) => {
        itemDocument
          .populate()
          .execPopulate()
          .then((activity) => {
            console.log("here");
            res.status(201).json(activity); // send the populated document.
          })
          .catch(next);
      })
      .catch(next);
  }
);

router.get("/:id", requireAuth, (req, res, next) => {
  Activity.findById(req.params.id).then((activityDocument) => {
    res.status(200).json(activityDocument);
  });
});

// router.patch(
//   "/:id",
//   // protectAdminRoute,
//   uploader.single("image"),
//   (req, res, next) => {
//     const activity = { ...req.body };

//     Activity.findById(req.params.id)
//       .then((itemDocument) => {
//         if (!itemDocument)
//           return res.status(404).json({ message: "Item not found" });
//         if (itemDocument.id_user.toString() !== req.session.currentUser) {
//           return res
//             .status(403)
//             .json({ message: "You are not allowed to update this document" });
//         }

//         if (req.file) {
//           activity.image = req.file.secure_url;
//         }

//         Activity.findByIdAndUpdate(req.params.id, activity, { new: true })
//           .populate()
//           .then((updatedDocument) => {
//             return res.status(200).json(updatedDocument);
//           })
//           .catch(next);
//       })
//       .catch(next);
//   }
// );

router.patch(
  "/:id",
  // protectAdminRoute,
  uploader.single("image"),
  (req, res, next) => {
    const activity = { ...req.body };
    const { grades, feeling } = req.body;

    Activity.findById(req.params.id)
      .then((itemDocument) => {
        if (!itemDocument)
          return res.status(404).json({ message: "Item not found" });
        if (itemDocument.id_user.toString() !== req.session.currentUser._id) {
          return res
            .status(403)
            .json({ message: "You are not allowed to update this document" });
        }

        if (req.file) {
          activity.image = req.file.secure_url;
        }

        Activity.findByIdAndUpdate(
          req.params.id,
          { $push: { grades: grades, feeling: feeling } },
          { new: true }
        )

          .populate()
          .then((updatedDocument) => {
            return res.status(200).json(updatedDocument);
          })
          .catch(next);
      })
      .catch(next);
  }
);

router.delete("/:id", protectAdminRoute, (req, res, next) => {
  Activity.findById(req.params.id)
    .then((itemDocument) => {
      if (!itemDocument) {
        return res.status(404).json({ message: "Activity not found" });
      }
      if (itemDocument.id_user.toString() !== req.session.currentUser) {
        return res
          .status(403)
          .json({ message: "You can't delete this Activity" });
      }

      Activity.findByIdAndDelete(req.params.id)
        .then(() => {
          return res.sendStatus(204);
        })
        .catch(next);
    })
    .catch(next);
});
module.exports = router;
