const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    genre: { type: String, enum: ["Femme", "Homme"] },
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
          "Décoration",
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
    animals: [
      {
        type: String,
        enum: ["Chat", "Chien", "Rongeur", "Autres", "Aucun"],
      },
    ],
    mood: [
      {
        mood: {
          type: String,
          enum: [
            "Stressé(e)",
            "Fatigué(e)",
            "Ennuyé(e)",
            "Joyeux(se)",
            "Motivé(e)",
          ],
        },
        date: Date,
      },
      // { timestamps: { createdAt: "created_at" } },
    ],
    favoritesActivities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Activity",
      },
      { timestamps: { createdAt: "created_at" } },
    ],
    favoritesInspirations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Activity",
      },
      { timestamps: { createdAt: "created_at" } },
    ],
    userActivities: [
      {
        activityId: { type: Schema.Types.ObjectId, ref: "Activity" },
        completed: { type: Boolean, default: false },
        images: [String],
        dateCompleted: { type: Date },
      },
    ],
  },
  { timestamps: { createdAt: "created_at" } }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
