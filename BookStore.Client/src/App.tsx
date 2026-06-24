import { useEffect, useRef, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

import { addBook, deleteBook, getBooks, updateBook } from './services/booksApi';

type Book = {
    isbn: string;
    title: string;
    category: string;
    authors: string[];
    year: number;
    price: number;
};

const emptyBook: Book = {
    isbn: '',
    title: '',
    category: '',
    authors: [''],
    year: new Date().getFullYear(),
    price: 0
};

function App() {
    const toast = useRef<Toast>(null);

    const [books, setBooks] = useState<Book[]>([]);
    const [visible, setVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [bookForm, setBookForm] = useState<Book>(emptyBook);
    const [loading, setLoading] = useState(false);

    const showMessage = (
        severity: 'success' | 'info' | 'warn' | 'error',
        summary: string,
        detail: string
    ) => {
        toast.current?.show({ severity, summary, detail, life: 3000 });
    };

    const loadBooks = async () => {
        try {
            setLoading(true);
            const data = await getBooks();
            setBooks(data);
        } catch {
            showMessage('error', 'Error', 'Failed to load books');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBooks();
    }, []);

    const openAddDialog = () => {
        setBookForm({ ...emptyBook });
        setIsEditMode(false);
        setVisible(true);
    };

    const openEditDialog = (book: Book) => {
        setBookForm({
            ...book,
            authors: book.authors?.length ? book.authors : ['']
        });

        setIsEditMode(true);
        setVisible(true);
    };

    const validateForm = () => {
        if (!bookForm.isbn.trim()) return 'ISBN is required';
        if (!bookForm.title.trim()) return 'Title is required';
        if (!bookForm.category.trim()) return 'Category is required';
        if (!bookForm.authors[0]?.trim()) return 'Author is required';
        if (bookForm.year <= 0) return 'Year must be greater than 0';
        if (bookForm.price <= 0) return 'Price must be greater than 0';

        return '';
    };

    const handleSave = async () => {
        const error = validateForm();

        if (error) {
            showMessage('warn', 'Validation', error);
            return;
        }

        try {
            if (isEditMode) {
                await updateBook(bookForm.isbn, bookForm);
                showMessage('success', 'Updated', 'Book updated successfully');
            } else {
                await addBook(bookForm);
                showMessage('success', 'Added', 'Book added successfully');
            }

            setVisible(false);
            setBookForm({ ...emptyBook });
            await loadBooks();
        } catch (error: any) {
            showMessage(
                'error',
                'Error',
                error.response?.data?.message || 'Failed to save book'
            );
        }
    };

    const handleDelete = (isbn: string) => {
        confirmDialog({
            message: 'Are you sure you want to delete this book?',
            header: 'Confirm Delete',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Yes',
            rejectLabel: 'Cancel',
            accept: async () => {
                try {
                    await deleteBook(isbn);
                    await loadBooks();
                    showMessage('success', 'Deleted', 'Book deleted successfully');
                } catch {
                    showMessage('error', 'Error', 'Failed to delete book');
                }
            }
        });
    };

    return (
        <div style={{ padding: '24px' }}>
            <Toast ref={toast} />
            <ConfirmDialog />

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
                    onClick={openAddDialog}
                />
            </div>

            <DataTable
                value={books}
                loading={loading}
                paginator
                rows={5}
                tableStyle={{ minWidth: '50rem' }}
                emptyMessage="No books found"
            >
                <Column field="isbn" header="ISBN" />
                <Column field="title" header="Title" />
                <Column field="category" header="Category" />
                <Column field="year" header="Year" />
                <Column field="price" header="Price" />

                <Column
                    header="Actions"
                    body={(rowData: Book) => (
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <Button
                                icon="pi pi-pencil"
                                severity="info"
                                onClick={() => openEditDialog(rowData)}
                            />

                            <Button
                                icon="pi pi-trash"
                                severity="danger"
                                onClick={() => handleDelete(rowData.isbn)}
                            />
                        </div>
                    )}
                />
            </DataTable>

            <Dialog
                header={isEditMode ? 'Edit Book' : 'Add Book'}
                visible={visible}
                style={{ width: '30rem' }}
                onHide={() => setVisible(false)}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <InputText
                        placeholder="ISBN"
                        value={bookForm.isbn}
                        disabled={isEditMode}
                        onChange={(e) =>
                            setBookForm({ ...bookForm, isbn: e.target.value })
                        }
                    />

                    <InputText
                        placeholder="Title"
                        value={bookForm.title}
                        onChange={(e) =>
                            setBookForm({ ...bookForm, title: e.target.value })
                        }
                    />

                    <InputText
                        placeholder="Category"
                        value={bookForm.category}
                        onChange={(e) =>
                            setBookForm({ ...bookForm, category: e.target.value })
                        }
                    />

                    <InputText
                        placeholder="Author"
                        value={bookForm.authors[0]}
                        onChange={(e) =>
                            setBookForm({ ...bookForm, authors: [e.target.value] })
                        }
                    />

                    <InputText
                        placeholder="Year"
                        value={String(bookForm.year)}
                        onChange={(e) =>
                            setBookForm({ ...bookForm, year: Number(e.target.value) })
                        }
                    />

                    <InputText
                        placeholder="Price"
                        value={String(bookForm.price)}
                        onChange={(e) =>
                            setBookForm({ ...bookForm, price: Number(e.target.value) })
                        }
                    />

                    <Button
                        label={isEditMode ? 'Update' : 'Save'}
                        icon="pi pi-check"
                        onClick={handleSave}
                    />
                </div>
            </Dialog>
        </div>
    );
}

export default App;