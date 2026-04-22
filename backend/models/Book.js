import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a book title"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Please provide an author name"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: ["Fiction", "Non-Fiction", "Self Growth", "Biography", "Fantasy", "Adventure", "Productivity", "Finance", "Lifestyle", "Other"],
      default: "Other",
    },
    price: {
      type: Number,
      required: [true, "Please provide a price"],
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: null,
    },
    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    stock: {
      type: Number,
      required: [true, "Please provide stock quantity"],
      default: 0,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviews: {
      type: Number,
      default: 0,
    },
    cover: {
      type: String,
      default: "",
    },
    isbn: {
      type: String,
      unique: true,
      sparse: true,
    },
    publisher: {
      type: String,
      default: "",
    },
    publishedDate: {
      type: Date,
      default: null,
    },
    pages: {
      type: Number,
      default: 0,
    },
    language: {
      type: String,
      default: "English",
    },
    tags: [String],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    shopkeeper: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Index for searching
bookSchema.index({ title: "text", author: "text", category: 1 });

export default mongoose.model("Book", bookSchema);
