# 🛒 Angular 19 E-Commerce

> A hands-on Angular 19 e-commerce application built to explore modern Angular features, Signals, reactive state management, standalone architecture, lazy loading and Docker.

This project was created as a practical playground to experiment with the evolution of Angular and understand how modern Angular APIs can be applied to a real-world application.

Rather than focusing only on CRUD operations, the project explores how Angular Signals can be used to manage local application state and coordinate interactions between components.

---

## 🎯 Project Goals

The main objective of this project is to experiment with modern Angular concepts through a realistic e-commerce use case.

The application focuses on:

- Angular Signals
- Reactive state management
- Standalone components
- Modern Angular APIs
- Lazy-loaded routes
- Declarative UI
- Component communication
- Product and cart state management
- API integration
- Dockerized development environment

The project uses the [Fake Store API](https://fakestoreapi.com/) as its product data source.

---

## ✨ Features

### 🛍️ Products

- Display products
- Display product categories
- Filter products by category
- View product information
- Retrieve products from a REST API

### 🛒 Shopping Cart

- Add products to the cart
- Remove products from the cart
- Update product quantities
- Keep cart state using Angular Signals
- Display the number of items in the cart

### 🔎 Product Filtering

Products can be filtered dynamically by category while keeping the UI synchronized with the application state.

### 🔔 Reactive Notifications

The cart badge is automatically updated when the cart state changes.

### 🚀 Lazy Loading

Application features are organized using lazy-loaded routes to reduce the initial application workload.

### 🐳 Docker

The project includes Docker support to provide a consistent development environment.

---

# ⚡ Angular Signals

One of the main objectives of this project is to experiment with Angular Signals.

Signals provide a reactive primitive for tracking application state and allowing Angular to react to state changes. :contentReference[oaicite:1]{index=1}

The application uses Signals for state such as:

```text
Products
    │
    ▼
Product Signal
    │
    ├── Product-list
    ├── Categories
    └── Filtering
         
Cart
    │
    ▼
Cart Signal
    │
    ├── Cart items
    ├── Quantities
    └── Notification badge
