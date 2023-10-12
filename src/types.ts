export interface productDB {
    id: string,
    name: string,
    img_url: string,
    description: string,
    price: number,
    amount_in_stock: number,
    created_at: string,
    updated_at: string
}
export interface userDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    created_at: string,
    updated_at: string
}
export interface userUpdatedDB {
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: string,
    updatedAt: string
}
export interface cartDB {
    cart_owner: string,
    product_id: string,
    product_amount: number
}
export interface orderDB {
    id: string,
    status: string,
    buyer_id: string,
    products_purchased: string,
    products_amount: string,
    purchase_date: string,
    paid: number,
    payment_date: string
}