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
    cartOwner: string,
    productId: string,
    productsAmount: number
}
export interface orderDB {
    id: string,
    status: string,
    userId: string,
    productsId: string,
    productsAmount: string,
    purchaseDate: string,
    paid: number,
    paymentDate: string
}