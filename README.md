# 📚 BookStore

A Full-Stack Book Management Application built with ASP.NET Core Web API and React.

The application manages books stored in an XML file and provides CRUD operations, HTML reporting, API documentation, and automated tests.

---

## 🚀 Technologies

### Backend

* ASP.NET Core Web API
* C#
* LINQ to XML
* Swagger / OpenAPI

### Frontend

* React
* TypeScript
* Axios
* Vite
* CSS

### Testing

* xUnit

### Data Storage

* XML File

---

## ✨ Features

* View all books
* Get a book by ISBN
* Add a new book
* Update an existing book
* Delete a book
* Generate HTML reports
* Support multiple authors per book
* Environment-based XML file configuration

---

## 📖 Book Properties

Each book contains:

* ISBN
* Title
* Author(s)
* Category
* Year
* Price

---

## 🔗 API Endpoints

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| GET    | /api/books             | Get all books        |
| GET    | /api/books/{isbn}      | Get a book by ISBN   |
| POST   | /api/books             | Create a new book    |
| PUT    | /api/books/{isbn}      | Update a book        |
| DELETE | /api/books/{isbn}      | Delete a book        |
| GET    | /api/books/report/html | Generate HTML report |

---

## ▶️ Run the API

```bash
cd BookStore.Api
dotnet run
```

Swagger UI:

```text
http://localhost:5066/swagger
```

---

## ▶️ Run the Client

```bash
cd BookStore.Client
npm install
npm run dev
```

---

## 🧪 Run Tests

```bash
cd BookStore.Tests
dotnet test
```

---

## 📁 Project Structure

```text
BookStore
│
├── BookStore.Api
├── BookStore.Client
├── BookStore.Tests
├── README.md
└── .gitignore
```

---

## 👩‍💻 Author

Yuli Garnaga

Senior Full-Stack Developer
