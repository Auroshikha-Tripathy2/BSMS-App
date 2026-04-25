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
    const baseBooks = [
      { title: "The Midnight Library", author: "Matt Haig", category: "Fiction", price: 499, cover: "https://covers.openlibrary.org/b/isbn/9781786892737-L.jpg", isbn: "9781786892737" },
      { title: "Atomic Habits", author: "James Clear", category: "Self Growth", price: 399, cover: "https://covers.openlibrary.org/b/isbn/9781847941831-L.jpg", isbn: "9781847941831" },
      { title: "Ikigai", author: "Hector Garcia", category: "Lifestyle", price: 299, cover: "https://covers.openlibrary.org/b/isbn/9781786330895-L.jpg", isbn: "9781786330895" },
      { title: "Rich Dad Poor Dad", author: "Robert T. Kiyosaki", category: "Finance", price: 349, cover: "https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg", isbn: "9781612680194" },
      { title: "Harry Potter", author: "J.K. Rowling", category: "Fantasy", price: 459, cover: "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg", isbn: "9780590353427" },
      { title: "The Alchemist", author: "Paulo Coelho", category: "Adventure", price: 279, cover: "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg", isbn: "9780061122415" },
      { title: "Deep Work", author: "Cal Newport", category: "Productivity", price: 429, cover: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg", isbn: "9781455586691" },
      { title: "Wings of Fire", author: "A.P.J. Abdul Kalam", category: "Biography", price: 320, cover: "https://covers.openlibrary.org/b/isbn/9788173711466-L.jpg", isbn: "9788173711466" },
      { title: "1984", author: "George Orwell", category: "Fiction", price: 299, cover: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg", isbn: "9780451524935" },
      { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", price: 349, cover: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg", isbn: "9780061120084" },
    ];

    const booksData = [];
    for (let i = 0; i < 50; i++) {
      const base = baseBooks[i % baseBooks.length];
      booksData.push({
        title: `${base.title} ${i > 9 ? `Vol. ${Math.floor(i / 10) + 1}` : ""}`.trim(),
        author: base.author,
        category: base.category,
        price: base.price + (i * 10),
        stock: Math.floor(Math.random() * 100),
        rating: Number((4 + Math.random()).toFixed(1)),
        cover: base.cover,
        isbn: `${base.isbn.slice(0, -2)}${String(i).padStart(2, '0')}`,
        publisher: "ReadNest Publishing",
        pages: 200 + (i * 5),
        description: `This is a generated description for ${base.title}.`,
        isFeatured: Math.random() > 0.8,
      });
    }

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
