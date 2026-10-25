document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('product-form');
    const feedback = document.getElementById('form-feedback');
    const nameInput = document.getElementById('product-name');
    const previewName = document.getElementById('preview-teks');
    const categoryInput = document.getElementById('product-category');
    const previewCategory = document.getElementById('preview-kategori');

    // Fitur Live Preview
    if (nameInput && previewName) {
        nameInput.addEventListener('input', (e) => previewName.textContent = "Pratinjau: " + e.target.value);
    }
    if (categoryInput && previewCategory) {
        categoryInput.addEventListener('change', (e) => previewCategory.textContent = e.target.value ? "Kategori: " + e.target.value : "");
    }

    // Penanganan Submit Form
    if (form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault(); 

            const nameVal = nameInput.value.trim();
            const categoryVal = categoryInput.value;
            const priceVal = parseFloat(document.getElementById('product-price').value);
            const stockVal = parseInt(document.getElementById('stok').value);

            // Validasi Input
            if (!nameVal || !categoryVal || isNaN(priceVal) || priceVal <= 0 || isNaN(stockVal) || stockVal <= 0) {
                feedback.textContent = "Mohon lengkapi seluruh data produk dengan valid!";
                feedback.className = "feedback-msg error";
                return;
            }

            // Ambil data lama dari localStorage (atau array kosong jika belum ada)
            let products = JSON.parse(localStorage.getItem('products')) || [];

            // Buat objek produk baru
            const newProduct = {
                id: Date.now(),
                name: nameVal,
                category: categoryVal,
                price: priceVal,
                stock: stockVal
            };

            // Masukkan ke array dan simpan permanen ke localStorage
            products.push(newProduct);
            localStorage.setItem('products', JSON.stringify(products));

            // Tampilkan pesan sukses di layar
            feedback.textContent = `Sukses! Produk '${newProduct.name}' berhasil ditambahkan.`;
            feedback.className = "feedback-msg success";

            // Kosongkan form dan pratinjau setelah berhasil
            form.reset();
            if (previewName) previewName.textContent = "";
            if (previewCategory) previewCategory.textContent = "";
        });
    }
});