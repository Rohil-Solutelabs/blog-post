const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      totalLikes: {
        type: Number,
        default: 0,
      },
      likedBy: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    dislikes: {
      totalDislikes: {
        type: Number,
        default: 0,
      },
      disLikedBy: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    comments: [
      {
        description: {
          type: String,
          required: true,
        },
        createdBy: {
          type: String,
          required: true,
        },
        author: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        likes: {
          totalLikes: {
            type: Number,
            default: 0,
          },
          likedBy: [
            {
              type: Schema.Types.ObjectId,
              ref: "User",
            },
          ],
        },
        dislikes: {
          totalDislikes: {
            type: Number,
            default: 0,
          },
          disLikedBy: [
            {
              type: Schema.Types.ObjectId,
              ref: "User",
            },
          ],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

// postSchema.virtual("isVisible").get(function () {
//   return this.dislikes.totalDislikes < 2;
// });

module.exports = mongoose.model("Post", postSchema);
