document.addEventListener('DOMContentLoaded', function(){
    const getProductsBtn = document.getElementById('getProducts');
    const getProductBtn = document.getElementById('getProduct');
    const getUsersBtn = document.getElementById('getUsers');
    const getUserBtn = document.getElementById('getUser');
    const productIdInput = document.getElementById('productId');
    const userIdInput = document.getElementById('userId');
    const resultsContainer = document.getElementById('results-container');
    const loadingIndicator = document.getElementById('loading');

const API_URL = 'https://fakestoreapi.com';

function showLoading() {
    loadingIndicator.classList.remove('hidden');
    resultsContainer.innerHTML = '';
}
function hideLoading() {
    loadingIndicator.classList.add('hidden');
}

function handleError(error) {
    resultsContainer.innerHTML = `
        <div class="error">
            <p>Ocurrió un error: ${error.message}</p>
        </div>
    `;
    hideLoading();
}

async function fetchAllProducts() {
    showLoading();
    try {
        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error('Error al obtener productos');
        
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        handleError(error);
    } finally {
        hideLoading();
    }
}

async function fetchAllUsers() {
    showLoading();
    try {
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) throw new Error('Error al obtener usuarios');
        
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        handleError(error);
    } finally {
        hideLoading();
    }
}

function displayProducts(products) {
    if (products.length === 0) {
        resultsContainer.innerHTML = '<p>No se encontraron productos</p>';
        return;
    }
    
    const productsHTML = products.map(product => `
        <div class="product">
            <h3>${product.title}</h3>
            <img src="${product.image}" alt="${product.title}">
            <p><strong>Precio:</strong> $${product.price}</p>
            <p><strong>Categoría:</strong> ${product.category}</p>
            <p><strong>Descripción:</strong> ${product.description}</p>
            <p><strong>Rating:</strong> ${product.rating.rate} (${product.rating.count} votos)</p>
        </div>
    `).join('');
    
    resultsContainer.innerHTML = productsHTML;
}

function displayUsers(users) {
    if (users.length === 0) {
        resultsContainer.innerHTML = '<p>No se encontraron usuarios</p>';
        return;
    }
    
    const usersHTML = users.map(user => `
        <div class="user">
            <h3>${user.name.firstname} ${user.name.lastname}</h3>
            <p><strong>Usuario:</strong> ${user.username}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Teléfono:</strong> ${user.phone}</p>
            <p><strong>Dirección:</strong> 
                ${user.address.street}, ${user.address.city}, 
                ${user.address.zipcode}
            </p>
        </div>
    `).join('');
    
    resultsContainer.innerHTML = usersHTML;
}

getProductsBtn.addEventListener('click', fetchAllProducts);
getProductBtn.addEventListener('click', () => fetchProductById(productIdInput.value));
getUsersBtn.addEventListener('click', fetchAllUsers);
getUserBtn.addEventListener('click', () => fetchUserById(userIdInput.value));

})

