// 1. Dataset Mock Produk UMKM
const productDataset = [
    {
        id: 1,
        name: "Keripik Pisang",
        category: "Makanan",
        price: 15000,
        stock: 20
    },
    {
        id: 2,
        name: "Kurupuk",
        category: "Makanan",
        price: 10000,
        stock: 50
    },
    {
        id: 3,
        name: "Sambal Terasi",
        category: "Makanan",
        price: 12000,
        stock: 30
    },
    {
        id: 4,
        name: "Kue Lapis",
        category: "Makanan",
        price: 18000,
        stock: 25
    },
    {
        id: 5,
        name: "Teh Botol",
        category: "Minuman",
        price: 25000,
        stock: 40
    },
    {
        id: 6,
        name: "Kopi Tubruk",
        category: "Minuman",
        price: 50000,
        stock: 60
    },
    {
        id: 7,
        name: "Jus Jeruk",
        category: "Minuman",
        price: 20000,
        stock: 35
    },
    {
        id: 8,
        name: "Kopi Susu",
        category: "Minuman",
        price: 15000,
        stock: 45
    },
];

// 2. Fungsi Filter Produk Berdasarkan Kategori
function filterCategory(products, categoryName) {
    console.log(`\n=== Hasil Filter Kategori: ${categoryName} ===`);
    let matchCount = 0;

    for (const product of products) {
        if (product.category === categoryName) {
            matchCount++;
            console.log(`[ID: ${product.id}] ${product.name} | Harga: Rp${product.price} | Stok: ${product.stock}`);
        }
    }
    console.log(`Total produk ditemukan: ${matchCount}`);
}

// Fungsi Kalkulasi Total Valuasi Stok Barang
function calculateTotalValuation(products) {
    console.log(`\n=== Kalkulasi Valuasi Stok Barang UMKM ===`);
    let totalValuation = 0;

    for (const product of products) {
        const productValuation = product.price * product.stock;
        totalValuation += productValuation;
    }

    console.log(`Total valuasi seluruh aset barang adalah: Rp${totalValuation}`);
    return totalValuation;
}

// 3. Eksekusi Console (Tugas Pertemuan 3)
filterCategory(productDataset, "Makanan");
calculateTotalValuation(productDataset);


// ==========================================================
// TUGAS PERTEMUAN 4 (FORM HANDLING) DI BAWAH INI
// ==========================================================

// In-memory collection data produk
const localProductList = [];

// Helper Arrow Function untuk formatting mata uang
const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency', currency: 'IDR'
    }).format(number);
};

// Inisialisasi Event Listener pada Form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('product-form');
    const feedback = document.getElementById('form-feedback');

    // Ambil elemen input nama untuk fitur Live Preview
    const nameInputElement = document.getElementById('product-name');

    // Ambil elemen <p> yang baru saja Anda buat di HTML
    const previewElement = document.getElementById('preview-teks');

    // EVENT 1: 'input' - Fitur Live Preview saat mengetik nama produk
    nameInputElement.addEventListener('input', (event) => {
        // 1. Tampilkan langsung di layar halaman web
        previewElement.textContent = "Pratinjau teks: " + event.target.value;

        // 2. Tetap tampilkan di console (untuk bukti tugas)
        console.log(`Live Preview Pengetikan: ${event.target.value}`);
    });

    // Ambil elemen input kategori dan tempat pratinjaunya
    const categoryInputElement = document.getElementById('product-category');
    const previewCategoryElement = document.getElementById('preview-kategori');

    categoryInputElement.addEventListener('change', (event) => {
        const selectedValue = event.target.value;

        if (selectedValue !== "") {
            // Memunculkan teks di layar web
            if (previewCategoryElement) previewCategoryElement.textContent = "Kategori terpilih: " + selectedValue;
            // Mencatat di console
            console.log(`Live Preview Kategori: ${selectedValue}`);
        } else {
            // Mengosongkan teks jika kembali ke "Pilih Kategori"
            if (previewCategoryElement) previewCategoryElement.textContent = "";
        }
    });

    // Ambil elemen input harga dan tempat pratinjaunya
    const priceInputElement = document.getElementById('product-price');
    const previewPriceElement = document.getElementById('preview-harga');

    // EVENT 1C: 'input' - Fitur Live Preview saat memasukkan harga
    priceInputElement.addEventListener('input', (event) => {
        const priceValue = parseFloat(event.target.value);
        if (!isNaN(priceValue)) {
            previewPriceElement.textContent = "Pratinjau harga: " + formatRupiah(priceValue);
            console.log(`Live Preview Harga: ${formatRupiah(priceValue)}`);
        } else {
            previewPriceElement.textContent = "";
        }
    });

    // Ambil elemen input stok dan tempat pratinjaunya
    const stockInputElement = document.getElementById('stok');
    const previewStockElement = document.getElementById('preview-stok');

    // EVENT 1D: 'input' - Fitur Live Preview saat memasukkan stok
    stockInputElement.addEventListener('input', (event) => {
        const stockValue = parseInt(event.target.value);
        if (!isNaN(stockValue)) {
            previewStockElement.textContent = "Pratinjau stok: " + stockValue;
            console.log(`Live Preview Stok: ${stockValue}`);
        } else {
            previewStockElement.textContent = "";
        }
    });

    // EVENT 2: 'submit' - Menangani pengiriman form
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Mencegah reload halaman

        // Menangkap SEMUA data dari form HTML
        const nameInput = document.getElementById('product-name').value.trim();
        const categoryInput = document.getElementById('product-category').value;
        const priceInput = parseFloat(document.getElementById('product-price').value);
        const stockInput = parseInt(document.getElementById('stok').value);

        // Validasi sederhana client-side (Cek apakah ada yang kosong/invalid)
        if (!nameInput || !categoryInput || isNaN(priceInput) || priceInput <= 0 || isNaN(stockInput) || stockInput <= 0) {
            feedback.textContent = "Mohon lengkapi seluruh data produk (Nama, Kategori, Harga, Stok) dengan valid!";
            feedback.className = "feedback-msg error";
            return;
        }

        // Konstruksi objek baru (sudah lengkap dengan category dan stock)
        const newProduct = {
            id: localProductList.length + 1,
            name: nameInput,
            category: categoryInput,
            price: priceInput,
            stock: stockInput
        };

        localProductList.push(newProduct);
        console.log("Data produk berhasil ditambahkan ke array localProductList:", newProduct);

        // Tampilkan feedback sukses ke pengguna
        feedback.textContent = `Sukses! Produk '${newProduct.name}' (${formatRupiah(newProduct.price)}) kategori ${newProduct.category} dengan stok ${newProduct.stock} tersimpan.`;
        feedback.className = "feedback-msg success";

        // Reset form input
        form.reset();
    });
});