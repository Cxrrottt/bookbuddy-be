const API_URL = "http://localhost:3000";

export function setToken(token) {
    localStorage.setItem("token", token);
}
export function getToken() {
    return localStorage.getItem("token");
}
export function logout() {
    localStorage.removeItem("token");
}

async function request(path, options = {}) {
    const token = getToken();
    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch(`${API_URL}${path}`, { ...options, headers });
    const text = await res.text();
    let data;
    try { data = text ? JSON.parse(text) : null; } catch { data = text; }

    if (!res.ok) throw new Error(data?.message || res.statusText);
    return data;
}

export const api = {
    // auth
    register: (body) => request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
    login: (body) => request("/auth/login", { method: "POST", body: JSON.stringify(body) }),

    // books
    getBooks: () => request("/books"),
    addBook: (body) => request("/books", { method: "POST", body: JSON.stringify(body) }),

    // loans
    loanBook: (body) => request("/loans", { method: "POST", body: JSON.stringify(body) }),
    getLoans: () => request("/loans"),
    returnLoan: (loanId) =>
        request(`/loans/${loanId}/return`, { method: "PATCH" }),

    // reviews
    getReviewsForBook: (bookId) => request(`/reviews/book/${bookId}`),
    addReview: (body) => request("/reviews", { method: "POST", body: JSON.stringify(body) }),
};