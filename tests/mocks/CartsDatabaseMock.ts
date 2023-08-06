import { cartDB } from '../../src/types'

export class OrdersDatabaseMock {
    public getCartByOwner = (ownerIdMock: string): cartDB | undefined => {
        const cartFoundMock: cartDB = {
            cartOwner: 'id-mock',
            productId: 'produto id-mock',
            productsAmount: 'quantidade-mock'
        }
        if (ownerIdMock === "id-mock") {
            return cartFoundMock
        }
    }

    public addProductToCartMock = (cartWithProductAddedMock: cartDB): string => {
        return `${cartWithProductAddedMock.productsAmount} do produto de id '${cartWithProductAddedMock.productId}' foi adicionado ao carrinho de usuário de id ${cartWithProductAddedMock.cartOwner}.`
    }

    public updateCartMock = (updatedCartMock: cartDB): string => {
        return `O carrinho do usuário de id '${updatedCartMock.cartOwner}' foi atualizado com sucesso.`
    }

    public deductProductFromCartMock = (ownerIdMock: string, productIdMock: string): string => {
        return `O produto de id '${productIdMock}' foi retirado do carrinho do usuário de id '${ownerIdMock}`
    }
}