# 🛒 E-Commerce Product Listing & Shopping Cart

## 📄 Project Description

**E-Commerce Product Listing & Shopping Cart** is a modern, interactive web-based shopping application built using **HTML, Tailwind CSS, and Vanilla JavaScript**.

The application fetches product data from the **DummyJSON Products API** and dynamically displays products with their images, titles, descriptions, categories, prices, and ratings.

Users can search for products, filter products by category and rating, add products to a shopping cart, manage product quantities, remove products, and view the total cart price.

The project also uses **Local Storage** to persist cart data, allowing cart items to remain available even after refreshing the browser.

The application is completely client-side and does not require a custom backend.

---

## ✅ Features

### 🛍 Product Management

* Fetch products from DummyJSON API
* Display products dynamically
* Product image preview
* Product title
* Product description
* Product category
* Product price
* Product rating
* Responsive product card layout

### 🔎 Product Search

* Search products dynamically
* Search by:

  * Product title
  * Product category
  * Product rating
* Case-insensitive search
* Automatically trims unnecessary spaces
* Debounced search for better performance
* 300ms debounce delay
* Displays a "No Products Found" message when no results match

### 🎯 Product Filtering

#### Category Filter

* Filter products by category
* Support multiple category selections
* Dynamically update product results

#### Rating Filter

* Filter products based on minimum rating
* Support multiple rating selections
* Multiple rating filters can be selected

### 🧹 Filter Management

* Clear all selected category filters
* Clear all selected rating filters
* Reset product listing after clearing filters

### 🛒 Shopping Cart

* Add products to cart
* Prevent duplicate cart entries
* Increase product quantity
* Decrease product quantity
* Automatically remove product when quantity reaches zero
* Remove products from cart
* Display product image, title, price, and quantity
* Display number of unique products
* Display total number of items
* Calculate total cart price dynamically

### 💾 Local Storage

* Save cart data to browser Local Storage
* Restore cart data after page refresh
* Store cart using JSON serialization
* Retrieve cart using JSON parsing

### 📦 Cart Drawer

* Open shopping cart drawer
* Close cart using close button
* Close cart by clicking the overlay
* Smooth drawer animation
* Dynamic cart updates

---

## 🛠 Technologies Used

* **HTML5** – Page structure and semantic elements
* **Tailwind CSS** – Responsive design, styling, layouts, and transitions
* **JavaScript (Vanilla JS)** – Application logic and DOM manipulation
* **Fetch API** – Fetch product data from the external API
* **DummyJSON API** – Provides product data
* **Local Storage API** – Persists shopping cart data
* **JSON** – Converts cart data between JavaScript objects and strings
* **Remix Icon** – Provides shopping cart and action icons
