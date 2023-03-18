class Product {
    constructor(id, name, price, description, totalQuantity, availableQuantity) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.totalQuantity = totalQuantity;
        this.availableQuantity = availableQuantity;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            marketPrice: this.price,
            description: this.description,
            totalQuantity: this.totalQuantity,
            availableQuantity: this.availableQuantity
        }
    }


}

let prod = new Product(1, "test", 1, "test", 1, 1);

console.log(prod.toJSON()); 