using System.Xml.Linq;
using BookStore.Api.Models;

namespace BookStore.Api.Services;

public class BookXmlService
{
    private readonly string _filePath;

    public BookXmlService(IConfiguration configuration)
    {
        _filePath = configuration["XmlFilePath"]!;
    }
    public BookDto? GetByIsbn(string isbn)
    {
        return GetAll()
            .FirstOrDefault(b => b.Isbn == isbn);
    }

    public List<BookDto> GetAll()
    {
        var doc = XDocument.Load(_filePath);

        return doc.Root!
            .Elements("book")
            .Select(book => new BookDto
            {
                Isbn = book.Element("isbn")?.Value ?? "",
                Title = book.Element("title")?.Value ?? "",
                Category = book.Attribute("category")?.Value ?? "",
                Authors = book.Elements("author")
                              .Select(a => a.Value)
                              .ToList(),
                Year = int.Parse(book.Element("year")?.Value ?? "0"),
                Price = decimal.Parse(book.Element("price")?.Value ?? "0")
            })
            .ToList();
    }
    public void Add(BookDto book)
    {
        var doc = XDocument.Load(_filePath);

        var exists = doc.Root!
            .Elements("book")
            .Any(b => b.Element("isbn")?.Value == book.Isbn);

        if (exists)
            throw new Exception("Book already exists");

        var bookElement = new XElement("book",
            new XAttribute("category", book.Category),
            new XElement("isbn", book.Isbn),
            new XElement("title",
                new XAttribute("lang", "en"),
                book.Title),
            book.Authors.Select(a => new XElement("author", a)),
            new XElement("year", book.Year),
            new XElement("price", book.Price)
        );

        doc.Root!.Add(bookElement);
        doc.Save(_filePath);
    }
    public bool Delete(string isbn)
    {
        var doc = XDocument.Load(_filePath);

        var book = doc.Root!
            .Elements("book")
            .FirstOrDefault(b => b.Element("isbn")?.Value == isbn);

        if (book == null)
            return false;

        book.Remove();
        doc.Save(_filePath);

        return true;
    }
    public bool Update(string isbn, BookDto updatedBook)
    {
        var doc = XDocument.Load(_filePath);

        var book = doc.Root!
            .Elements("book")
            .FirstOrDefault(b => b.Element("isbn")?.Value == isbn);

        if (book == null)
            return false;

        book.SetAttributeValue("category", updatedBook.Category);

        book.Element("title")!.Value = updatedBook.Title;

        book.Elements("author").Remove();

        book.Element("year")!.AddBeforeSelf(
            updatedBook.Authors.Select(a =>
                new XElement("author", a))
        );

        book.Element("year")!.Value =
            updatedBook.Year.ToString();

        book.Element("price")!.Value =
            updatedBook.Price.ToString();

        doc.Save(_filePath);

        return true;
    }

    public string GenerateHtmlReport()
    {
        var books = GetAll();

        var rows = string.Join("", books.Select(b => $@"
        <tr>
            <td>{b.Title}</td>
            <td>{string.Join(", ", b.Authors)}</td>
            <td>{b.Category}</td>
            <td>{b.Year}</td>
            <td>{b.Price}</td>
        </tr>"));

        return $@"
    <html>
    <head>
        <title>Books Report</title>
        <style>
            table {{
                border-collapse: collapse;
                width: 100%;
            }}

            th, td {{
                border: 1px solid black;
                padding: 8px;
            }}

            th {{
                background-color: lightgray;
            }}
        </style>
    </head>
    <body>
        <h2>Books Report</h2>

        <table>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Year</th>
                <th>Price</th>
            </tr>

            {rows}
        </table>
    </body>
    </html>";
    }
}