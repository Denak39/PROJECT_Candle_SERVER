const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema(
  {
    categories: {
      pleinAir: {
        type: String,
        enum: [
          "Jardin",
          "Bricolage",
          "Marche",
          "Activité de groupe",
          "Chat",
          "Chien",
        ],
      },
      Cosy: {
        type: String,
        enum: [
          "Petits plaisirs",
          "COnfort",
          "Ambiance",
          "Ecriture",
          "Organisation",
        ],
      },
      DIY: {
        type: String,
        enum: [
          "Dessin",
          "Bricolage",
          "Peinture",
          "Art du papier",
          "Modelage",
          "Mercerie",
          "Décoration",
          "Chat",
          "Chien",
        ],
      },
    },
    title: String,
    image: {
      type: String,
      default:
        "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
    },
    duration: {
      type: String,
      enum: ["15", "30", "45", "60", "90", "120"],
    },
    difficulty: {
      type: String,
      enum: ["Facile", "Moyen", "Difficile"],
    },
    description: String,
    material: [String],
    steps: [
      {
        type: Object,
        title: String,
        content: String,
        stepImages: [
          {
            type: String,
            default:
              "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
          },
        ],
      },
    ],
    animals: {
      type: String,
      enum: ["Chat", "Chien", "Rongeur", "Autres", "Aucun"],
    },
    id_user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    highlight: Boolean,
    grades: [{ type: String, enum: ["1", "2", "3", "4"] }],
    feeling: [
      {
        type: Object,
        feelingName: {
          type: String,
          enum: ["Relaxé(e)", "Boosté(e)", "Inspiré(e)", "Frustré(e)"],
        },
        count: Number,
      },
    ],
  },

  { timestamps: { createdAt: "created_at" } }
);

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
