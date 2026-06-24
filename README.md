# 📚 BookStore

A Full-Stack Book Management Application built with **ASP.NET Core Web API** and **React**.

The application allows managing books stored in an XML file, including creating, updating, deleting, searching, and generating HTML reports.

## 🚀 Technologies

### Backend

* ASP.NET Core Web API
* C#
* LINQ to XML
* Swagger / OpenAPI

### Frontend

* React
* JavaScript
* Axios

### Testing

* xUnit

### Storage

* XML File

---

## ✨ Features

* View all books
* Get book details by ISBN
* Add new books
* Update existing books
* Delete books
* Generate HTML reports
* Support multiple authors
* Environment-based XML configuration

---

## 🔗 API Endpoints

| Method | Endpoint               | Description          |
| ------ | ---------------------- | -------------------- |
| GET    | /api/books             | Get all books        |
| GET    | /api/books/{isbn}      | Get book by ISBN     |
| POST   | /api/books             | Create a new book    |
| PUT    | /api/books/{isbn}      | Update a book        |
| DELETE | /api/books/{isbn}      | Delete a book        |
| GET    | /api/books/report/html | Generate HTML report |

---

## 📸 Screenshots

### Swagger UI

![alt text](image.png)

### React Client

![alt text](image-1.png)

---

## ▶️ Run API

```bash
cd BookStore.Api
dotnet run
```

Swagger UI:

```text
http://localhost:5066/swagger
```

---

## ▶️ Run Client

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

## 👩‍💻 Author

**Yuli Garnaga**
Senior Full-Stack Developer
