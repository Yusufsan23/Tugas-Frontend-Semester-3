// Inisialisasi Data Awal (Jika localStorage kosong, masukkan 10 data default)
const initializeData = () => {
    const defaultData = [
        { id: 1, name: "Laptop Thinkpad X1", category: "Elektronik", price: 15000000, stock: 5 },
        { id: 2, name: "Mechanical Keyboard Corsair", category: "Elektronik", price: 850000, stock: 12 },
        { id: 3, name: "Mouse Gaming Logitech G502", category: "Elektronik", price: 750000, stock: 20 },
        { id: 4, name: "Monitor LG UltraWide 34\"", category: "Elektronik", price: 4500000, stock: 7 },
        { id: 5, name: "Headset Razer Kraken", category: "Elektronik", price: 1200000, stock: 15 },
        { id: 6, name: "Webcam Logitech C920", category: "Elektronik", price: 950000, stock: 10 },
        { id: 7, name: "External SSD Samsung T7", category: "Elektronik", price: 2000000, stock: 8 },
        { id: 8, name: "Printer Canon PIXMA G3010", category: "Elektronik", price: 2500000, stock: 4 },
        { id: 9, name: "Router WiFi TP-Link Archer C6", category: "Elektronik", price: 600000, stock: 18 },
        { id: 10, name: "Smartphone Samsung Galaxy A52", category: "Elektronik", price: 4000000, stock: 6 }
    ];
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(defaultData));
    }
    return JSON.parse(localStorage.getItem('products'));
};

let productCatalog = initializeData();

// Fungsi Render Tabel
const renderTable = (products) => {
    const tableBody = document.getElementById('admin-table-body');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    products.forEach((prod, index) => {
        const tr = document.createElement('tr');
        tr.setAttribute('data-id', prod.id);

        tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${prod.name}</td>
            <td>${prod.category || 'Elektronik'}</td>
            <td>Rp ${prod.price.toLocaleString('id-ID')}</td>
            <td>${prod.stock}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="handleEdit(${prod.id})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="handleDelete(${prod.id})">Hapus</button>
            </td>
        `;
        tableBody.append(tr);
    });
};

// Aksi Hapus Data
const handleDelete = (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
        // Filter array untuk membuang data yang dihapus
        productCatalog = productCatalog.filter(prod => prod.id !== id);
        // Simpan pembaruan ke localStorage
        localStorage.setItem('products', JSON.stringify(productCatalog));
        // Render ulang tabel
        renderTable(productCatalog);
    }
};

// Aksi Edit Data (Menggunakan Prompt)
const handleEdit = (id) => {
    // 1. Cari data produk yang akan diedit berdasarkan ID
    const productIndex = productCatalog.findIndex(prod => prod.id === id);
    if (productIndex === -1) return;

    const currentProduct = productCatalog[productIndex];

    // 2. Minta input baru dari pengguna (data lama menjadi nilai default)
    const newName = prompt("Edit Nama Produk:", currentProduct.name);
    if (newName === null) return;

    const newCategory = prompt("Edit Kategori:", currentProduct.category || "Elektronik");
    if (newCategory === null) return;

    const newPrice = prompt("Edit Harga (Rp):", currentProduct.price);
    if (newPrice === null) return;

    const newStock = prompt("Edit Stok:", currentProduct.stock);
    if (newStock === null) return;

    // 3. Validasi angka
    const parsedPrice = parseFloat(newPrice);
    const parsedStock = parseInt(newStock);

    if (!newName.trim() || !newCategory.trim() || isNaN(parsedPrice) || parsedPrice <= 0 || isNaN(parsedStock) || parsedStock < 0) {
        alert("Gagal memperbarui: Data tidak valid atau format salah.");
        return;
    }

    // 4. Perbarui data di dalam array
    productCatalog[productIndex].name = newName.trim();
    productCatalog[productIndex].category = newCategory.trim();
    productCatalog[productIndex].price = parsedPrice;
    productCatalog[productIndex].stock = parsedStock;

    // 5. Simpan perubahan ke localStorage dan render ulang
    localStorage.setItem('products', JSON.stringify(productCatalog));
    renderTable(productCatalog);
    alert(`Sukses! Produk '${currentProduct.name}' berhasil diperbarui.`);
};

// Eksekusi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
    renderTable(productCatalog);

    // LOGIKA PENCARIAN DATA PRODUK
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (event) => {
            const keyword = event.target.value.toLowerCase();

            // Filter array berdasarkan nama atau kategori
            const filteredProducts = productCatalog.filter(prod => {
                const nameMatch = prod.name.toLowerCase().includes(keyword);
                const categoryMatch = prod.category.toLowerCase().includes(keyword);
                return nameMatch || categoryMatch;
            });

            // Render ulang tabel dengan data hasil pencarian
            renderTable(filteredProducts);
        });
    }
});

// Eksekusi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
    renderTable(productCatalog);
});