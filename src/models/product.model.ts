export interface Product {
    _id: string
    name: string
    description: string
    price: string
    category: string
    edit?: boolean
}

export interface CartProduct extends Product{
    amount: number
    total: number
}

export interface ProductList {
    data:{
        products:{
            list: Product[];
            count: number
        }
    }
}