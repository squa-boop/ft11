const apiUrl = "http://localhost:3000/products"; // API endpoint for products
let allProducts = [];

// Select the form element
const productForm = document.getElementById('products');

// Fetch products from the API on page load
document.addEventListener('DOMContentLoaded', fetchProducts);

// Add event listener to handle form submission
productForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Gather form data
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const color = document.getElementById('color').value;

    const newProduct = { name, price, color };
    
    // Post new product to the server
    await postProduct(newProduct);

    // Reset the form
    productForm.reset();
});

// Fetch products from the API
async function fetchProducts() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        allProducts = data; // Store the fetched products
        displayProducts(allProducts); // Call a function to display products
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

// Display products on the page
function displayProducts(products) {
    const productsSection = document.querySelector('.products');
    productsSection.innerHTML = ''; // Clear previous products

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product', 'bg-white', 'p-4', 'shadow', 'rounded');
        productElement.innerHTML = `
            <h3 class="text-lg font-semibold">${product.name}</h3>
            <p class="text-gray-700">Color: ${product.color}</p>
            <p class="text-gray-700">$${product.price ? product.price.toFixed(2) : 'N/A'}</p>
            <button data-id="${product.id}" class="view-btn bg-blue-500 text-white p-2 rounded">View</button>
            <button data-id="${product.id}" class="delete-btn bg-red-500 text-white p-2 rounded">Delete</button>
            <button data-id="${product.id}" class="edit-btn bg-yellow-500 text-white p-2 rounded">Edit</button>
        `;
        productsSection.appendChild(productElement);
    });

    // Add event listeners for delete and edit buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', handleDeleteProduct);
    });

    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', handleEditProduct);
    });
}

// Function to post new product data
async function postProduct(product) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        if (!response.ok) {
            const errorMessage = await response.text(); // Get error message from response
            throw new Error(`Failed to add product: ${errorMessage}`);
        }
        await fetchProducts(); // Refresh product list after adding new product
    } catch (error) {
        console.error('Error adding product:', error);
        alert(`Error adding product: ${error.message}`); // Show an alert with the error
    }
}

// Function to handle product deletion
async function handleDeleteProduct(event) {
    const productId = event.target.getAttribute('data-id');
    
    try {
        const response = await fetch(`${apiUrl}/${productId}`, {
            method: 'DELETE'
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to delete product: ${errorMessage}`);
        }
        await fetchProducts(); // Refresh product list after deleting
    } catch (error) {
        console.error('Error deleting product:', error);
        alert(`Error deleting product: ${error.message}`);
    }
}

// Function to handle product edit
async function handleEditProduct(event) {
    const productId = event.target.getAttribute('data-id');
    const product = allProducts.find(p => p.id == productId);

    // Fill the form with the current product data for editing
    document.getElementById('name').value = product.name;
    document.getElementById('price').value = product.price;
    document.getElementById('color').value = product.color;

    // Update form submission to edit the existing product
    productForm.removeEventListener('submit', handleFormSubmit); // Remove previous handler
    productForm.addEventListener('submit', function handleFormSubmitEdit(event) {
        event.preventDefault();
        const updatedProduct = {
            name: document.getElementById('name').value,
            price: parseFloat(document.getElementById('price').value),
            color: document.getElementById('color').value
        };

        updateProduct(productId, updatedProduct);
        productForm.removeEventListener('submit', handleFormSubmitEdit); // Remove this handler after edit
    });
}

// Function to update an existing product
async function updateProduct(productId, updatedProduct) {
    try {
        const response = await fetch(`${apiUrl}/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        });
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Failed to update product: ${errorMessage}`);
        }
        await fetchProducts(); // Refresh the product list after updating
        productForm.reset(); // Reset the form
    } catch (error) {
        console.error('Error updating product:', error);
        alert(`Error updating product: ${error.message}`);
    }
}
