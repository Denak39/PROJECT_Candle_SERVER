const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    genre: { type: String, required: true, enum: ["female", "male"] },
    // secretquestion: { type: String, required: true },
    // secretresponse: { type: String, required: true },
    admin: { type: Boolean, default: false },
    // habits: [],
    // needs: [],
    interest: {
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
      },
      { timestamps: { createdAt: "created_at" } },
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
        grade: {
          type: String,
          enum: ["1", "2", "3", "4"],
        },
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
