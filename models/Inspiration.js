const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inspirationSchema = new Schema(
  {
    title: String,
    content: String,
    image: {
      type: String,
      default:
        "https://vignette.wikia.nocookie.net/simpsons/images/1/14/Ralph_Wiggum.png/revision/latest/top-crop/width/360/height/360?cb=20100704163100",
    },
    id_user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: { createdAt: "created_at" } }
);

const Inspiration = mongoose.model("Inspiration", inspirationSchema);

module.exports = Inspiration;
