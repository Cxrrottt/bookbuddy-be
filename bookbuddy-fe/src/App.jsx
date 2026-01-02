import { useEffect, useMemo, useState } from "react";
import { api, getToken, logout, setToken } from "./api";
import "./App.css";

export default function App() {
    const isLoggedIn = useMemo(() => !!getToken(), []);

    const [books, setBooks] = useState([]);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [msg, setMsg] = useState("");

    // auth
    const [authTab, setAuthTab] = useState("login"); // login | register
    const [email, setEmail] = useState("test@test.com");
    const [password, setPassword] = useState("1234");
    const [name, setName] = useState("Deja");

    // actions
    const [borrowerName, setBorrowerName] = useState("Deja");
    const [newBook, setNewBook] = useState({ title: "", author: "", description: "", isbn: "" });
    const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
    const [loans, setLoans] = useState([]);

    async function loadBooks() {
        try {
            setMsg("");
            const data = await api.getBooks();
            setBooks(data);
        } catch (e) {
            setMsg(String(e.message || e));
        }
    }

    async function loadLoans() {
        try {
            setMsg("");
            const data = await api.getLoans();
            setLoans(data);
        } catch (e) {
            setMsg(String(e.message || e));
        }
    }

    async function loadReviews(bookId) {
        try {
            setMsg("");
            const data = await api.getReviewsForBook(bookId);
            setReviews(data);
        } catch (e) {
            setMsg(String(e.message || e));
        }
    }

    useEffect(() => {
        loadBooks();
        loadLoans();
    }, []);

    useEffect(() => {
        if (selectedBookId) loadReviews(selectedBookId);
    }, [selectedBookId]);

    async function handleRegister(e) {
        e.preventDefault();
        try {
            setMsg("");
            await api.register({ email, password, name });
            const res = await api.login({ email, password });
            setToken(res.access_token);
            window.location.reload();
        } catch (e) {
            setMsg(String(e.message || e));
        }
    }

    async function handleLogin(e) {
        e.preventDefault();
        try {
            setMsg("");
            const res = await api.login({ email, password });
            setToken(res.access_token);
            window.location.reload();
        } catch (e) {
            setMsg(String(e.message || e));
        }
    }

    async function handleLoan(bookId) {
        try {
            setMsg("");
            await api.loanBook({ bookId, borrowerName });
            await loadBooks();
            setMsg("✅ Knjiga izposojena!");
        } catch (e) {
            setMsg(String(e.message || e));
        }
    }

    async function handleReturn(loanId) {
        try {
            setMsg("");
            await api.returnLoan(loanId);
            await loadBooks();
            await loadLoans();
            setMsg("✅ Knjiga vrnjena!");
        } catch (e) {
            setMsg(String(e.message || e));
        }
    }

    async function handleAddBook(e) {
        e.preventDefault();
        try {
            setMsg("");
            await api.addBook(newBook);
            setNewBook({ title: "", author: "", description: "", isbn: "" });
            await loadBooks();
            setMsg("✅ Knjiga dodana!");
        } catch (e) {
            setMsg(String(e.message || e));
        }
    }

    async function handleAddReview(e) {
        e.preventDefault();
        try {
            setMsg("");
            if (!selectedBookId) return;
            await api.addReview({
                bookId: selectedBookId,
                reviewerName: name || "Uporabnik",
                rating: Number(newReview.rating),
                comment: newReview.comment,
            });
            setNewReview({ rating: 5, comment: "" });
            await loadReviews(selectedBookId);
            setMsg("✅ Ocena dodana!");
        } catch (e) {
            setMsg(String(e.message || e));
        }
    }

    function handleLogout() {
        logout();
        window.location.reload();
    }

    return (
        <div className="page">
            <header className="topbar">
                <h1>📚 BookBuddy</h1>
                <div className="topbarRight">
                    {getToken() ? (
                        <button className="btn" onClick={handleLogout}>Odjava</button>
                    ) : (
                        <span className="badge">Gost</span>
                    )}
                </div>
            </header>

            {msg && <div className="msg">{msg}</div>}

            <div className="grid">
                {/* LEFT: Books list */}
                <section className="card">
                    <h2>Knjige</h2>

                    <div className="row">
                        <input
                            className="input"
                            value={borrowerName}
                            onChange={(e) => setBorrowerName(e.target.value)}
                            placeholder="Ime izposojevalca"
                        />
                        <button className="btn" onClick={loadBooks}>Osveži</button>
                    </div>

                    <div className="list">
                        {books.map((b) => (
                            <div
                                key={b.id}
                                className={`item ${selectedBookId === b.id ? "active" : ""}`}
                            >
                                <div className="itemMain" onClick={() => setSelectedBookId(b.id)}>
                                    <div className="title">{b.title}</div>
                                    <div className="muted">{b.author}</div>
                                    <div className="muted small">{b.description}</div>
                                    <div className="muted small">ISBN: {b.isbn}</div>
                                </div>

                                <div className="itemSide">
                  <span className={`pill ${b.available ? "ok" : "no"}`}>
                    {b.available ? "Na voljo" : "Izposojena"}
                  </span>

                                    <button
                                        className="btn primary"
                                        disabled={!b.available}
                                        onClick={() => handleLoan(b.id)}
                                        title={b.available ? "Izposodi knjigo" : "Ni na voljo"}
                                    >
                                        Izposodi
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* RIGHT: Auth + Add book + Reviews */}
                <section className="card">
                    <h2>Uporabnik</h2>


                    <hr />

                    <h2>Izposoje</h2>

                    <button className="btn" onClick={loadLoans}>Osveži izposoje</button>

                    <div className="reviewList">
                        {loans.length === 0 ? (
                            <p className="muted">Ni izposoj.</p>
                        ) : (
                            loans.map((l) => (
                                <div key={l.id} className="review">
                                    <div className="reviewTop">
                                        <strong>Loan #{l.id}</strong>
                                        <span className="pill ok">{l.returnDate ? "Vrnjena" : "Aktivna"}</span>
                                    </div>

                                    <div className="muted small">
                                        Knjiga: {l.book?.title} (ID: {l.book?.id})
                                    </div>
                                    <div className="muted small">Izposodil: {l.borrowerName}</div>

                                    {!l.returnDate && (
                                        <button className="btn primary" onClick={() => handleReturn(l.id)}>
                                            Vrni knjigo
                                        </button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>

                    {!getToken() ? (
                        <>
                            <div className="tabs">
                                <button className={`tab ${authTab === "login" ? "active" : ""}`} onClick={() => setAuthTab("login")}>
                                    Prijava
                                </button>
                                <button className={`tab ${authTab === "register" ? "active" : ""}`} onClick={() => setAuthTab("register")}>
                                    Registracija
                                </button>
                            </div>

                            {authTab === "register" ? (
                                <form className="stack" onSubmit={handleRegister}>
                                    <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ime" />
                                    <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                    <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Geslo" />
                                    <button className="btn primary" type="submit">Registriraj se</button>
                                </form>
                            ) : (
                                <form className="stack" onSubmit={handleLogin}>
                                    <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                    <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Geslo" />
                                    <button className="btn primary" type="submit">Prijava</button>
                                </form>
                            )}
                        </>
                    ) : (
                        <>
                            <div className="success">✅ Prijavljena si (JWT)</div>

                            <h3>Dodaj knjigo</h3>
                            <form className="stack" onSubmit={handleAddBook}>
                                <input className="input" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} placeholder="Naslov" />
                                <input className="input" value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} placeholder="Avtor" />
                                <input className="input" value={newBook.description} onChange={(e) => setNewBook({ ...newBook, description: e.target.value })} placeholder="Opis" />
                                <input className="input" value={newBook.isbn} onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })} placeholder="ISBN" />
                                <button className="btn primary" type="submit">Dodaj</button>
                            </form>
                        </>
                    )}

                    <hr />

                    <h2>Ocene</h2>

                    {!selectedBookId ? (
                        <p className="muted">Klikni knjigo na levi, da vidiš ocene.</p>
                    ) : (
                        <>
                            <p className="muted small">Izbrana knjiga ID: {selectedBookId}</p>

                            <div className="reviewList">
                                {reviews.length === 0 ? (
                                    <p className="muted">Ni ocen.</p>
                                ) : (
                                    reviews.map((r) => (
                                        <div key={r.id} className="review">
                                            <div className="reviewTop">
                                                <strong>{r.reviewerName}</strong>
                                                <span className="pill ok">⭐ {r.rating}/5</span>
                                            </div>
                                            <div className="muted">{r.comment}</div>
                                        </div>
                                    ))
                                )}
                            </div>

                            {/* POST /reviews je pri tebi JWT protected -> to je super dokaz */}
                            <form className="stack" onSubmit={handleAddReview}>
                                <div className="row">
                                    <input
                                        className="input"
                                        type="number"
                                        min="1"
                                        max="5"
                                        value={newReview.rating}
                                        onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                                        placeholder="Ocena (1-5)"
                                    />
                                    <input
                                        className="input"
                                        value={newReview.comment}
                                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                        placeholder="Komentar"
                                    />
                                </div>
                                <button className="btn primary" type="submit">Dodaj oceno</button>
                                {!getToken() && <p className="muted small">Za dodajanje ocene se moraš prijaviti.</p>}
                            </form>
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}
