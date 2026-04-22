import React from "react";
import { ChartSpline, BookOpen, CheckCircle } from "lucide-react";
import "../styles/pages.css";

function ReadingStatus() {
  const readingData = [
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
      status: "toread",
    },
  ];

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
                <h3>2</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <CheckCircle size={32} className="text-success mb-2" />
                <p className="text-muted small mb-1">Completed</p>
                <h3>1</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <BookOpen size={32} className="text-warning mb-2" />
                <p className="text-muted small mb-1">To Read</p>
                <h3>1</h3>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <ChartSpline size={32} className="text-primary mb-2" />
                <p className="text-muted small mb-1">Avg Progress</p>
                <h3>40%</h3>
              </div>
            </div>
          </div>
        </div>

        {/* Books List */}
        <div className="mt-4">
          <h4>My Books</h4>
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

                {book.status !== "toread" && (
                  <div>
                    <div className="mb-2">
                      <div className="progress" style={{ height: "8px" }}>
                        <div
                          className="progress-bar bg-warning"
                          style={{ width: `${book.progress}%` }}
                        />
                      </div>
                    </div>
                    <small className="text-muted">
                      {book.currentPage} / {book.totalPages} pages ({book.progress}%)
                    </small>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ReadingStatus;
