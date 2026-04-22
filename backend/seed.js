import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/User.js";
import Book from "./models/Book.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Book.deleteMany({});

    // Create test shopkeeper
    const shopkeeper = await User.create({
      name: "BookStore Owner",
      email: "owner@test.com",
      password: "password123",
      role: "owner",
      shopName: "ReadNest Bookstore",
      shopDetails: {
        address: "123 Main Street",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        phone: "9876543210",
      },
    });

    // Create sample books
    const booksData = [
      {
        title: "The Midnight Library",
        author: "Matt Haig",
        category: "Fiction",
        price: 499,
        stock: 45,
        rating: 4.7,
        cover: "https://covers.openlibrary.org/b/isbn/9781786892737-L.jpg",
        isbn: "9781786892737",
        publisher: "Canongate",
        pages: 288,
        description: "A dazzling novel about all the choices that go into a life well lived.",
        isFeatured: true,
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        category: "Self Growth",
        price: 399,
        stock: 12,
        rating: 4.9,
        cover: "https://covers.openlibrary.org/b/isbn/9781847941831-L.jpg",
        isbn: "9781847941831",
        publisher: "Avery",
        pages: 320,
        description: "Transform your life with tiny changes that deliver remarkable results.",
        isFeatured: true,
      },
      {
        title: "Ikigai",
        author: "Hector Garcia",
        category: "Lifestyle",
        price: 299,
        stock: 0,
        rating: 4.6,
        cover: "https://covers.openlibrary.org/b/isbn/9781786330895-L.jpg",
        isbn: "9781786330895",
        publisher: "Hutchinson",
        pages: 368,
        description: "The Japanese secret to a long and happy life.",
        isFeatured: false,
      },
      {
        title: "Rich Dad Poor Dad",
        author: "Robert T. Kiyosaki",
        category: "Finance",
        price: 349,
        stock: 89,
        rating: 4.5,
        cover: "https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg",
        isbn: "9781612680194",
        publisher: "Plata Publishing",
        pages: 336,
        description: "What the rich teach their kids about money.",
        isFeatured: true,
      },
      {
        title: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling",
        category: "Fantasy",
        price: 459,
        stock: 67,
        rating: 4.9,
        cover: "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg",
        isbn: "9780590353427",
        publisher: "Bloomsbury",
        pages: 309,
        description: "The beginning of a magical journey at Hogwarts.",
        isFeatured: true,
      },
      {
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Adventure",
        price: 279,
        stock: 54,
        rating: 4.8,
        cover: "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg",
        isbn: "9780061122415",
        publisher: "HarperCollins",
        pages: 224,
        description: "A philosophical fable about following your dreams.",
        isFeatured: false,
      },
      {
        title: "Deep Work",
        author: "Cal Newport",
        category: "Productivity",
        price: 429,
        stock: 33,
        rating: 4.4,
        cover: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg",
        isbn: "9781455586691",
        publisher: "Grand Central Publishing",
        pages: 296,
        description: "Rules for focused success in a distracted world.",
        isFeatured: false,
      },
      {
        title: "Wings of Fire",
        author: "A.P.J. Abdul Kalam",
        category: "Biography",
        price: 320,
        stock: 78,
        rating: 4.8,
        cover: "https://covers.openlibrary.org/b/isbn/9788173711466-L.jpg",
        isbn: "9788173711466",
        publisher: "Universities Press",
        pages: 384,
        description: "An inspiring autobiography of India's Missile Man.",
        isFeatured: true,
      },
      {
        title: "1984",
        author: "George Orwell",
        category: "Fiction",
        price: 299,
        stock: 45,
        rating: 4.7,
        cover: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
        isbn: "9780451524935",
        publisher: "Signet Classics",
        pages: 328,
        description: "A dystopian novel about totalitarianism.",
        isFeatured: false,
      },
      {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        category: "Fiction",
        price: 349,
        stock: 56,
        rating: 4.9,
        cover: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
        isbn: "9780061120084",
        publisher: "HarperCollins",
        pages: 324,
        description: "A classic about racial injustice in the American South.",
        isFeatured: true,
      },
    ];

    const books = await Book.insertMany(
      booksData.map((book) => ({
        ...book,
        shopkeeper: shopkeeper._id,
      }))
    );

    // Create test reader
    const reader = await User.create({
      name: "Test Reader",
      email: "reader@test.com",
      password: "password123",
      role: "reader",
    });

    console.log(`✅ Database seeded successfully!`);
    console.log(`📚 Created ${books.length} books`);
    console.log(`👤 Created shopkeeper: ${shopkeeper.email}`);
    console.log(`👥 Created reader: ${reader.email}`);
    console.log("\nTest credentials:");
    console.log(`  Shopkeeper: owner@test.com / password123`);
    console.log(`  Reader: reader@test.com / password123`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error.message);
    process.exit(1);
  }
};

seedDatabase();
