const express = require("express");
const router = express.Router();
const Inspiration = require("../models/Inspiration");
const User = require("../models/User");
const uploader = require("../config/cloudinary");
const requireAuth = require("../middlewares/requireAuth"); // Route protection middleware : )
const protectAdminRoute = require("../middlewares/protectAdminRoute");

//lists all inspirations
router.get("/", requireAuth, (req, res, next) => {
  Inspiration.find({})
    .populate()
    .then((itemDocuments) => {
      res.status(200).json(itemDocuments);
    })
    .catch(next); // cf app.js error handling middleware
  // same as below
  //.catch(error => next(error))
});

//create an inspiration
router.post(
  "/create",
  protectAdminRoute,
  uploader.single("image"),
  (req, res, next) => {
    const updateValues = { ...req.body };

    //   updateValues.trainerId = req.session.currentUser; // Retrieve the authors id from the session.
    if (req.file) {
      updateValues.image = req.file.path;
    }

    Inspiration.create(updateValues)
      .then((itemDocument) => {
        itemDocument
          .populate()
          .execPopulate()
          .then((inspiration) => {
            console.log("here");
            res.status(201).json(inspiration); // send the populated document.
          })
          .catch(next);
      })
      .catch(next);
  }
);

// find one inspiration
router.get("/:id", requireAuth, (req, res, next) => {
  Inspiration.findById(req.params.id).then((inspirationDocument) => {
    res.status(200).json(inspirationDocument);
  });
});

// update one inspiration
router.patch(
  "/:id",
  protectAdminRoute,
  uploader.single("image"),
  (req, res, next) => {
    const inspiration = { ...req.body };

    Inspiration.findById(req.params.id)
      .then((itemDocument) => {
        if (!itemDocument)
          return res.status(404).json({ message: "Item not found" });
        // if (itemDocument.id_user.toString() !== req.session.currentUser) {
        //   return res
        //     .status(403)
        //     .json({ message: "You are not allowed to update this document" });
        // }

        if (req.file) {
          inspiration.image = req.file.secure_url;
        }

        Inspiration.findByIdAndUpdate(req.params.id, inspiration, { new: true })
          .populate()
          .then((updatedDocument) => {
            return res.status(200).json(updatedDocument);
          })
          .catch(next);
      })
      .catch(next);
  }
);

// delete one inspiration
router.delete("/:id", protectAdminRoute, (req, res, next) => {
  Inspiration.findById(req.params.id)
    .then((itemDocument) => {
      if (!itemDocument) {
        return res.status(404).json({ message: "Inspiration not found" });
      }
      // if (itemDocument.id_user.toString() !== req.session.currentUser) {
      //   return res
      //     .status(403)
      //     .json({ message: "You can't delete this inspiration" });
      // }

      Inspiration.findByIdAndDelete(req.params.id)
        .then(() => {
          return res.sendStatus(204);
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
