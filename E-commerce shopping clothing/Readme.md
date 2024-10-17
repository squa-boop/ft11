## Clothing shopping store Management Application
This is a simple clothing shopping store Application that allows users to create, read, update, and delete (CRUD) products. The application interacts with a local API and performs operations such as adding new products, viewing a list of products, editing product details, and deleting products.
## Features
Add Product: Submit a new product with name, price, and color.
View Products: View a list of all products fetched from the API.
Edit Product: Update the details of an e
## set up instruction
Install JSON Server globally by running:
npm install -g json-server
## step  to run
clone the repository https://github.com/squa-boop/Clothing-store

Start the JSON Server:http://localhost:3000
## Open the project:
 Open index.html in your browser to use the Product Management Application.
 ## API Endpoints
GET /products: Fetch all products.
POST /products: Add a new product.
DELETE /products/:id: Delete a product by ID.
PUT /products/:id: Update a product by ID.

## Project Structure
.
├── db.json                # JSON database for storing product information
├── index.html             # HTML file for the application interface
├── index.js               # JavaScript file containing CRUD operations
├── style.css              # CSS file for styling the interface
├── README.md              # Documentation file
## How clothing store work
Fetching Products: Upon loading the page, the application fetches the list of products from the server and displays them dynamically on the page.

Adding Products: Users can fill in the product form with details such as the name, price, and color. When the form is submitted, the product is added to the server and displayed on the page.

Editing Products: Clicking the "Edit" button for a product will populate the form with that product's current details, allowing users to modify and


## Problem Faced
During the development of this application, several challenges were encountered, including:

API Integration: Ensuring that the application properly communicates with the local JSON server and handles errors effectively.
Form Handling: Managing form states during creation and editing of products required careful event handling and state management.
UI Updates: Dynamically updating the product list in the UI after performing CRUD operations was essential for a seamless user experien
## Licences
This project is licensed under the MIT License.[]