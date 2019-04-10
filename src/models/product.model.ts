export class Product {
    _id: string
    name: string
    description: string
    price: string
    category: string
    constructor(_id, name, description, price, category){
        this._id = _id
        this.name = name
        this.description = description
        this.price = price
        this.category = category
    }
}