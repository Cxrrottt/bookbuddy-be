--
-- PostgreSQL database dump
--

\restrict hFvOUzNXmVhQys4ldrts9epBnruygF1hUKU6XCANkcOZdBGIdlXONhY9KXTavQh

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.6

-- Started on 2026-01-06 15:37:25

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 24578)
-- Name: book; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.book (
    id integer NOT NULL,
    title character varying NOT NULL,
    author character varying NOT NULL,
    description character varying NOT NULL,
    isbn character varying NOT NULL,
    available boolean DEFAULT true NOT NULL
);


ALTER TABLE public.book OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24577)
-- Name: book_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.book_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.book_id_seq OWNER TO postgres;

--
-- TOC entry 4932 (class 0 OID 0)
-- Dependencies: 217
-- Name: book_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.book_id_seq OWNED BY public.book.id;


--
-- TOC entry 220 (class 1259 OID 24588)
-- Name: loan; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.loan (
    id integer NOT NULL,
    "borrowerName" character varying NOT NULL,
    "loanDate" timestamp with time zone NOT NULL,
    "returnDate" timestamp with time zone,
    "bookId" integer
);


ALTER TABLE public.loan OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24587)
-- Name: loan_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.loan_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.loan_id_seq OWNER TO postgres;

--
-- TOC entry 4933 (class 0 OID 0)
-- Dependencies: 219
-- Name: loan_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.loan_id_seq OWNED BY public.loan.id;


--
-- TOC entry 222 (class 1259 OID 24602)
-- Name: review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.review (
    id integer NOT NULL,
    "reviewerName" character varying NOT NULL,
    rating integer NOT NULL,
    comment text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "bookId" integer
);


ALTER TABLE public.review OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24601)
-- Name: review_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.review_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.review_id_seq OWNER TO postgres;

--
-- TOC entry 4934 (class 0 OID 0)
-- Dependencies: 221
-- Name: review_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.review_id_seq OWNED BY public.review.id;


--
-- TOC entry 224 (class 1259 OID 24616)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    email character varying NOT NULL,
    "passwordHash" character varying NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24615)
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- TOC entry 4935 (class 0 OID 0)
-- Dependencies: 223
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- TOC entry 4757 (class 2604 OID 24581)
-- Name: book id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book ALTER COLUMN id SET DEFAULT nextval('public.book_id_seq'::regclass);


--
-- TOC entry 4759 (class 2604 OID 24591)
-- Name: loan id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loan ALTER COLUMN id SET DEFAULT nextval('public.loan_id_seq'::regclass);


--
-- TOC entry 4760 (class 2604 OID 24605)
-- Name: review id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review ALTER COLUMN id SET DEFAULT nextval('public.review_id_seq'::regclass);


--
-- TOC entry 4761 (class 2604 OID 24619)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- TOC entry 4920 (class 0 OID 24578)
-- Dependencies: 218
-- Data for Name: book; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.book (id, title, author, description, isbn, available) FROM stdin;
2	1984	George Orwell	Dystopia	9780451524935	t
3	The Hobbit	J.R.R. Tolkien	Fantasy	9780261103344	t
1	Harry Potter	J. K. Rowling	Fantasy	12345	t
\.


--
-- TOC entry 4922 (class 0 OID 24588)
-- Dependencies: 220
-- Data for Name: loan; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.loan (id, "borrowerName", "loanDate", "returnDate", "bookId") FROM stdin;
1	Deja	2025-12-28 14:08:41.766+01	2025-12-28 14:09:59.547+01	1
2	Deja	2025-12-28 14:10:20.264+01	2025-12-31 11:04:14.363+01	1
3	Deja	2025-12-31 10:51:50.258+01	2025-12-31 11:04:16.378+01	2
4	Deja	2025-12-31 11:04:22.118+01	2025-12-31 11:04:32.506+01	3
5	Deja	2025-12-31 11:04:48.782+01	2025-12-31 11:04:55.484+01	1
\.


--
-- TOC entry 4924 (class 0 OID 24602)
-- Dependencies: 222
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.review (id, "reviewerName", rating, comment, "createdAt", "bookId") FROM stdin;
1	Deja	5	Super knjiga!	2025-12-29 12:00:30.465+01	1
\.


--
-- TOC entry 4926 (class 0 OID 24616)
-- Dependencies: 224
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, email, "passwordHash", name) FROM stdin;
1	test@test.com	$2b$10$Eab3gObR5gBxYhUHP3m3C.bbm/VEfXZmfVOGu7jwF0qTFhxKGhGfS	Deja
\.


--
-- TOC entry 4936 (class 0 OID 0)
-- Dependencies: 217
-- Name: book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.book_id_seq', 4, true);


--
-- TOC entry 4937 (class 0 OID 0)
-- Dependencies: 219
-- Name: loan_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.loan_id_seq', 5, true);


--
-- TOC entry 4938 (class 0 OID 0)
-- Dependencies: 221
-- Name: review_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.review_id_seq', 1, true);


--
-- TOC entry 4939 (class 0 OID 0)
-- Dependencies: 223
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 1, true);


--
-- TOC entry 4767 (class 2606 OID 24609)
-- Name: review PK_2e4299a343a81574217255c00ca; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY (id);


--
-- TOC entry 4765 (class 2606 OID 24595)
-- Name: loan PK_4ceda725a323d254a5fd48bf95f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loan
    ADD CONSTRAINT "PK_4ceda725a323d254a5fd48bf95f" PRIMARY KEY (id);


--
-- TOC entry 4763 (class 2606 OID 24586)
-- Name: book PK_a3afef72ec8f80e6e5c310b28a4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book
    ADD CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY (id);


--
-- TOC entry 4769 (class 2606 OID 24623)
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- TOC entry 4771 (class 2606 OID 24625)
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- TOC entry 4772 (class 2606 OID 24596)
-- Name: loan FK_1465982ea6993042a656754f4cc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.loan
    ADD CONSTRAINT "FK_1465982ea6993042a656754f4cc" FOREIGN KEY ("bookId") REFERENCES public.book(id);


--
-- TOC entry 4773 (class 2606 OID 24610)
-- Name: review FK_ae1ec2fd91f77b5df325d1c7b4a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "FK_ae1ec2fd91f77b5df325d1c7b4a" FOREIGN KEY ("bookId") REFERENCES public.book(id) ON DELETE CASCADE;


-- Completed on 2026-01-06 15:37:26

--
-- PostgreSQL database dump complete
--

\unrestrict hFvOUzNXmVhQys4ldrts9epBnruygF1hUKU6XCANkcOZdBGIdlXONhY9KXTavQh

