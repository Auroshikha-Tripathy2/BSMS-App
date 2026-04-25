import React, { useState, useEffect } from "react";
import { ChartSpline, BookOpen, CheckCircle, Plus, X } from "lucide-react";
import "../styles/pages.css";

const defaultData = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    progress: 75,
    currentPage: 150,
    totalPages: 200,
    status: "reading",
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    progress: 100,
    currentPage: 324,
    totalPages: 324,
    status: "completed",
  },
  {
    id: 3,
    title: "1984",
    author: "George Orwell",
    progress: 45,
    currentPage: 180,
    totalPages: 400,
    status: "reading",
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    progress: 0,
    currentPage: 0,
    totalPages: 350,
    status: "toread",
  },
];

function ReadingStatus() {
  const [readingData, setReadingData] = useState(() => {
    const saved = localStorage.getItem("readingData");
    return saved ? JSON.parse(saved) : defaultData;
  });

  const [showModal, setShowModal] = useState(false);
  const [newBook, setNewBook] = useState({ title: "", author: "", totalPages: "" });

  const handleAddBook = (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.totalPages) return;
    
    const newId = Math.max(0, ...readingData.map(b => b.id)) + 1;
    const book = {
      id: newId,
      title: newBook.title,
      author: newBook.author,
      progress: 0,
      currentPage: 0,
      totalPages: parseInt(newBook.totalPages),
      status: "toread"
    };
    
    setReadingData([book, ...readingData]);
    setShowModal(false);
    setNewBook({ title: "", author: "", totalPages: "" });
  };

  useEffect(() => {
    localStorage.setItem("readingData", JSON.stringify(readingData));
  }, [readingData]);

  const updateProgress = (id, newPage) => {
    setReadingData(prevData => prevData.map(book => {
      if (book.id === id) {
        const pages = Math.min(Math.max(0, newPage), book.totalPages);
        const progress = Math.round((pages / book.totalPages) * 100);
        return {
          ...book,
          currentPage: pages,
          progress: progress,
          status: progress === 100 ? "completed" : "reading"
        };
      }
      return book;
    }));
  };

  const startReading = (id) => {
    setReadingData(prevData => prevData.map(book => {
      if (book.id === id) {
        return { ...book, status: "reading" };
      }
      return book;
    }));
  };

  const stats = {
    reading: readingData.filter(b => b.status === "reading").length,
    completed: readingData.filter(b => b.status === "completed").length,
    toread: readingData.filter(b => b.status === "toread").length,
    avgProgress: readingData.length ? Math.round(readingData.reduce((acc, curr) => acc + curr.progress, 0) / readingData.length) : 0
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "reading":
        return <span className="badge bg-info">Currently Reading</span>;
      case "completed":
        return <span className="badge bg-success">Completed</span>;
      case "toread":
        return <span className="badge bg-secondary">To Read</span>;
      default:
        return null;
    }
  };

  return (
    <div className="page-shell">
      <section className="section-block">
        <div className="section-header mb-4">
          <div>
            <h1 className="d-flex align-items-center">
              <ChartSpline size={30} className="me-2" /> Reading Status
            </h1>
            <p className="text-muted">Track your reading progress</p>
          </div>
        </div>

        <div className="row g-3">
          {/* Stats Cards */}
          <div className="col-md-3">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <BookOpen size={32} className="text-info mb-2" />
                <p className="text-muted small mb-1">Currently Reading</p>
                <h3>{stats.reading}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <CheckCircle size={32} className="text-success mb-2" />
                <p className="text-muted small mb-1">Completed</p>
                <h3>{stats.completed}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <BookOpen size={32} className="text-warning mb-2" />
                <p className="text-muted small mb-1">To Read</p>
                <h3>{stats.toread}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <ChartSpline size={32} className="text-primary mb-2" />
                <p className="text-muted small mb-1">Avg Progress</p>
                <h3>{stats.avgProgress}%</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Books List */}
        <div className="mt-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">My Books</h4>
            <button className="btn btn-theme-solid btn-sm" onClick={() => setShowModal(true)}>
              <Plus size={16} className="me-1" /> New Book
            </button>
          </div>
          {readingData.map((book) => (
            <div key={book.id} className="card shadow-sm mb-3">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <h5 className="mb-1">{book.title}</h5>
                    <p className="text-muted mb-0">{book.author}</p>
                  </div>
                  {getStatusBadge(book.status)}
                </div>

                {book.status !== "toread" ? (
                  <div>
                    <div className="mb-2">
                      <div className="progress" style={{ height: "8px" }}>
                        <div
                          className="progress-bar bg-warning"
                          style={{ width: `${book.progress}%` }}
                        />
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        {book.currentPage} / {book.totalPages} pages ({book.progress}%)
                      </small>
                      {book.status === "reading" && (
                        <div className="d-flex gap-2">
                          <button 
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => updateProgress(book.id, book.currentPage + 10)}
                          >
                            +10 Pages
                          </button>
                          <button 
                            className="btn btn-sm btn-outline-success"
                            onClick={() => updateProgress(book.id, book.totalPages)}
                          >
                            Finish
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div>
                    <button 
                      className="btn btn-sm btn-primary"
                      onClick={() => startReading(book.id)}
                    >
                      Start Reading
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add Book Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.6)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg" style={{ borderRadius: '16px' }}>
              <div className="modal-header border-bottom-0 pb-0 d-flex justify-content-between align-items-center w-100">
                <h5 className="modal-title fw-bold mb-0">Add New Book</h5>
                <button type="button" className="btn btn-link text-muted p-0 border-0 ms-auto" onClick={() => setShowModal(false)}>
                  <X size={24} />
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleAddBook}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Title</label>
                    <input 
                      type="text" 
                      className="form-control bg-light border-0 px-3 py-2" 
                      value={newBook.title}
                      onChange={(e) => setNewBook({...newBook, title: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Author</label>
                    <input 
                      type="text" 
                      className="form-control bg-light border-0 px-3 py-2" 
                      value={newBook.author}
                      onChange={(e) => setNewBook({...newBook, author: e.target.value})}
                      required 
                    />
                  </div>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Total Pages</label>
                    <input 
                      type="number" 
                      className="form-control bg-light border-0 px-3 py-2" 
                      min="1"
                      value={newBook.totalPages}
                      onChange={(e) => setNewBook({...newBook, totalPages: e.target.value})}
                      required 
                    />
                  </div>
                  <button type="submit" className="btn btn-theme-solid w-100 py-2" style={{ borderRadius: '12px' }}>
                    Add Book
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReadingStatus;
