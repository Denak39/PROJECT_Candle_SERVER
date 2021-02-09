const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: String,
    genre: { type: String, enum: ["female", "male"] },
    profileImage: {
      type: String,
      default:
        "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
    },
    // secretquestion: { type: String, required: true },
    // secretresponse: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    // habits: [],
    // needs: [],
    interest: [
      {
        type: String,
        enum: [
          "Decoration",
          "Art du papier",
          "Bricolage",
          "Peinture",
          "Petits plaisirs",
          "Activité en plein air",
          "Mercerie",
          "Jardinage",
          "Modelage",
          "Activité de groupe",
        ],
      },
    ],
    animals: {
      type: String,
      enum: ["Chat", "Chien", "Rongeur", "Autres", "Aucun"],
    },
    mood: [
      {
        type: Object,
        enum: [
          "Stressé(e)",
          "Fatigué(e)",
          "Ennuyé(e)",
          "Joyeux(se)",
          "Motivé(e)",
        ],
        date: Date,
      },
      // { timestamps: { createdAt: "created_at" } },
    ],
    favoritesActivities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Activities",
      },
      { timestamps: { createdAt: "created_at" } },
    ],
    favoritesInspirations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Activities",
      },
      { timestamps: { createdAt: "created_at" } },
    ],
    userActivities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Activities",
        completed: { type: Boolean, default: false },
        // grade: {
        //   type: String,
        //   enum: ["1", "2", "3", "4"],
        // },
        feeling: {
          type: String,
          enum: ["Relaxé(e)", "Boosté(e)", "Inspiré(e)", "Frustré(e)"],
        },
        images: [String],
        dateCompleted: { type: Date },
      },
    ],
  },
  { timestamps: { createdAt: "created_at" } }
);

const User = mongoose.model("User", userSchema);

module.exports = User;