-- Active: 1681320195383@@127.0.0.1@3306

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT UNIQUE NOT NULL,
        img_url TEXT UNIQUE NOT NULL,
        description TEXT NOT NULL,
        price INTEGER NOT NULL,
        amount_in_stock INTEGER NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT
    );

INSERT INTO
    products(
        id,
        name,
        img_url,
        description,
        price,
        amount_in_stock,
        created_at,
        updated_at
    )
VALUES (
        "id-novo",
        "Meteorito de Ferro",
        "https://i.ibb.co/sPhhv62/Meteorito-De-Ferro.png",
        "É de ferro! Do espaço!",
        150,
        20,
        "12/10/2023",
        "Nunca"
    );

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
        updated_at TEXT
    );

CREATE TABLE
    carts (
        cart_owner TEXT UNIQUE NOT NULL,
        product_id TEXT UNIQUE NOT NULL,
        product_amount INTEGER DEFAULT(0) NOT NULL,
        FOREIGN KEY(cart_owner) REFERENCES users(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    );

CREATE TABLE
    orders (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        status TEXT NOT NULL,
        products_purchased TEXT NOT NULL,
        products_amount TEXT NOT NULL,
        total_price INTEGER NOT NULL,
        purchase_date TEXT DEFAULT(DATETIME('now', 'localtime')) NOT NULL,
        paid INTEGER DEFAULT(0) NOT NULL,
        payment_date TEXT DEFAULT('NÃO PAGO') NOT NULL
    );

DROP TABLE products;

DROP TABLE users;

DROP TABLE carts;

DROP TABLE orders;