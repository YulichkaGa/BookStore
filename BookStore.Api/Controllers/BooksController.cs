using BookStore.Api.Models;
using BookStore.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace BookStore.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BooksController : ControllerBase
{
    private readonly BookXmlService _service;

    public BooksController(BookXmlService service)
    {
        _service = service;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var books = _service.GetAll();
        return Ok(books);
    }

    [HttpGet("{isbn}")]
    public IActionResult GetByIsbn(string isbn)
    {
        var book = _service.GetByIsbn(isbn);

        if (book == null)
            return NotFound();

        return Ok(book);
    }

    [HttpPost]
    public IActionResult Add(BookDto book)
    {
        _service.Add(book);

        return CreatedAtAction(
            nameof(GetByIsbn),
            new { isbn = book.Isbn },
            book);
    }

    [HttpDelete("{isbn}")]
    public IActionResult Delete(string isbn)
    {
        var deleted = _service.Delete(isbn);

        if (!deleted)
            return NotFound();

        return NoContent();
    }

    [HttpPut("{isbn}")]
    public IActionResult Update(
    string isbn,
    BookDto book)
    {
        var updated = _service.Update(isbn, book);

        if (!updated)
            return NotFound();

        return NoContent();
    }
    [HttpGet("report/html")]
    public IActionResult HtmlReport()
    {
        var html = _service.GenerateHtmlReport();

        return Content(html, "text/html");
    }
}