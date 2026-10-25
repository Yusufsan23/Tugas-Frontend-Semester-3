// Ambil data dari localStorage
let productCatalog = JSON.parse(localStorage.getItem('products')) || [];

const renderProductCards = (products) => {
    const container = document.querySelector('#product-container');
    if (!container) return;
    container.innerHTML = '';

    products.forEach((prod) => {
        const card = document.createElement('article');
        card.className = 'product-card dynamic-item';
        card.setAttribute('data-id', prod.id);

        card.innerHTML = `
            <h3 class="product-title">${prod.name}</h3>
            <p class="product-price">Rp ${prod.price.toLocaleString('id-ID')}</p>
            <p class="product-stock">Sisa Stok: <span class="badge-stock">${prod.stock}</span></p>
            <p class="product-status">Status: <span class="badge badge-aktif">Aktif</span></p>
            <div class="card-actions">
                <button class="btn btn-secondary btn-sm" onclick="handleToggleStatus(this)">Toggle Status</button>
                <button class="btn btn-delete btn-sm" onclick="handleDeleteProduct(${prod.id})">Hapus</button>
            </div>
        `;
        container.append(card);
    });
};

const handleDeleteProduct = (productId) => {
    const cardToDelete = document.querySelector(`article[data-id="${productId}"]`);
    if (cardToDelete) {
        cardToDelete.classList.add('fade-out');
        setTimeout(() => {
            // Hapus dari DOM
            cardToDelete.remove();
            // Hapus permanen dari localStorage
            productCatalog = productCatalog.filter(prod => prod.id !== productId);
            localStorage.setItem('products', JSON.stringify(productCatalog));
        }, 300);
    }
};

const handleToggleStatus = (btnElement) => {
    const badge = btnElement.closest('article').querySelector('.badge');
    if (badge) {
        badge.classList.toggle('badge-nonaktif');
        badge.textContent = badge.classList.contains('badge-nonaktif') ? 'Nonaktif' : 'Aktif';
    }
};

document.addEventListener('DOMContentLoaded', () => {
    renderProductCards(productCatalog);
});