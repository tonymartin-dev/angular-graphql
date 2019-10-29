export class Product {
    _id: string
    name: string
    description: string
    price: string
    category: string
    edit?: boolean
    constructor(_id, name, description, price, category, edit){
        this._id = _id
        this.name = name
        this.description = description
        this.price = price
        this.category = category
        this.edit = edit
    }
}