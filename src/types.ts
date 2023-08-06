export interface productDB {
    id: string,
    name: string,
    description: string,
    price: number,
    amountInStock: number,
    createdAt: string,
    updatedAt: string
}

export interface userDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    createdAt: string,
    updatedAt: string
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
    productsAmount: string
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