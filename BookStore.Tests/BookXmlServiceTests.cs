using BookStore.Api.Services;
using FluentAssertions;
using Microsoft.Extensions.Configuration;

namespace BookStore.Tests;

public class BookXmlServiceTests
{
    private static BookXmlService CreateService()
    {
        var config = new ConfigurationBuilder()
            .AddInMemoryCollection(new Dictionary<string, string?>
            {
                ["XmlFilePath"] = "../../../TestData/bookstore.xml"
            })
            .Build();

        return new BookXmlService(config);
    }

    [Fact]
    public void GetAll_ReturnsBooks()
    {
        var service = CreateService();

        var result = service.GetAll();

        result.Should().NotBeEmpty();
    }

    [Fact]
    public void GetByIsbn_ReturnsBook_WhenBookExists()
    {
        var service = CreateService();

        var result = service.GetByIsbn("9051234567897");

        result.Should().NotBeNull();
        result!.Isbn.Should().Be("9051234567897");
    }

    [Fact]
    public void GetByIsbn_ReturnsNull_WhenBookDoesNotExist()
    {
        var service = CreateService();

        var result = service.GetByIsbn("0000000000000");

        result.Should().BeNull();
    }
}