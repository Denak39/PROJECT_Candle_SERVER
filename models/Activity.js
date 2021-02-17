const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const activitySchema = new Schema(
  {
    categories: { type: String, enum: ["DIY", "Cosy", "Plein Air"] },
    subcategories: {
      type: String,
      enum: [
        {
          name: "Jardinage",
          image:
            "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
        },
        {
          name: "Bricolage",
          image:
            "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Homer_Simpson.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
        },
        {
          name: "Marche",
          image:
            "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
        },
        {
          name: "Activité de groupe",
          image:
            "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
        },
        {
          name: "Petits plaisirs",
          image:
            "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
        },
        {
          name: "Confort",
          image:
            "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
        },
        {
          name: "Ambiance",
          image:
            "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
        },
        {
          name: "Ecriture",
          image:
            "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
        },
        {
          name: "Organisation",
          image:
            "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
        },
        {
          name: "Dessin",
          image:
            "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
        },
        {
          name: "Peinture",
          image:
            "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
        },
        {
          name: "Art du papier",
          image:
            "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
        },
        {
          name: "Modelage",
          image:
            "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
        },
        {
          name: "Mercerie",
          image:
            "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
        },
        {
          name: "Décoration",
          image:
            "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
        },
        {
          name: "Chat",
          image:
            "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
        },
        {
          name: "Chien",
          image:
            "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
        },
      ],
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
