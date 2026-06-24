import { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

import { addBook, deleteBook, getBooks } from './services/booksApi';

function App() {
    const [books, setBooks] = useState<any[]>([]);
    const [visible, setVisible] = useState(false);

    const [newBook, setNewBook] = useState({
        isbn: '',
        title: '',
        category: '',
        authors: [''],
        year: 2025,
        price: 0
    });

    const loadBooks = async () => {
        const data = await getBooks();
        setBooks(data);
    };

    useEffect(() => {
        loadBooks().catch(console.error);
    }, []);

    const handleDelete = async (isbn: string) => {
        await deleteBook(isbn);
        await loadBooks();
    };

    const handleAdd = async () => {
        await addBook(newBook);

        setVisible(false);

        setNewBook({
            isbn: '',
            title: '',
            category: '',
            authors: [''],
            year: 2025,
            price: 0
        });

        await loadBooks();
    };

    return (
        <div style={{ padding: '24px' }}>
            <h1>Book Store</h1>

            <div style={{ marginBottom: '16px', display: 'flex', gap: '10px' }}>
                <Button
                    label="View HTML Report"
                    icon="pi pi-file"
                    onClick={() =>
                        window.open('http://localhost:5066/api/books/report/html', '_blank')
                    }
                />

                <Button
                    label="Add Book"
                    icon="pi pi-plus"
                    onClick={() => setVisible(true)}
                />
            </div>

            <DataTable value={books} paginator rows={5} tableStyle={{ minWidth: '50rem' }}>
                <Column field="isbn" header="ISBN" />
                <Column field="title" header="Title" />
                <Column field="category" header="Category" />
                <Column field="year" header="Year" />
                <Column field="price" header="Price" />

                <Column
                    header="Actions"
                    body={(rowData) => (
                        <Button
                            icon="pi pi-trash"
                            severity="danger"
                            onClick={() => handleDelete(rowData.isbn)}
                        />
                    )}
                />
            </DataTable>

            <Dialog
                header="Add Book"
                visible={visible}
                style={{ width: '30rem' }}
                onHide={() => setVisible(false)}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <InputText
                        placeholder="ISBN"
                        value={newBook.isbn}
                        onChange={(e) =>
                            setNewBook({ ...newBook, isbn: e.target.value })
                        }
                    />

                    <InputText
                        placeholder="Title"
                        value={newBook.title}
                        onChange={(e) =>
                            setNewBook({ ...newBook, title: e.target.value })
                        }
                    />

                    <InputText
                        placeholder="Category"
                        value={newBook.category}
                        onChange={(e) =>
                            setNewBook({ ...newBook, category: e.target.value })
                        }
                    />

                    <InputText
                        placeholder="Author"
                        value={newBook.authors[0]}
                        onChange={(e) =>
                            setNewBook({ ...newBook, authors: [e.target.value] })
                        }
                    />

                    <InputText
                        placeholder="Year"
                        value={String(newBook.year)}
                        onChange={(e) =>
                            setNewBook({ ...newBook, year: Number(e.target.value) })
                        }
                    />

                    <InputText
                        placeholder="Price"
                        value={String(newBook.price)}
                        onChange={(e) =>
                            setNewBook({ ...newBook, price: Number(e.target.value) })
                        }
                    />

                    <Button label="Save" icon="pi pi-check" onClick={handleAdd} />
                </div>
            </Dialog>
        </div>
    );
}

export default App;