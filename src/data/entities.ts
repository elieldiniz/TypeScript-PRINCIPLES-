export type Product = {
    id: number,
    name: string,
    description: string,
    category: string,
    price: number
}

export class OrderLine{
    constructor(public product: Product, public quantity: number){
    
    }
    set quantity1(qt:number){
        this.quantity
    }

    get total(): number{
        return this.product.price * this.quantity;
    }


}


export class Order {
    private lines = new Map<number, OrderLine>()

    constructor(initialines?:OrderLine[]){
        if (initialines) {
            initialines.forEach(element => {
                this.lines.set(element.product.id,element )
            });
        }
    }
    public addProduct(prod: Product, quantity: number){
        if(this.lines.has(prod.id)){
            if(quantity ===0 ){
                this.removeProduct(prod.id);
            }else{
                this.lines.get(prod.id).quantity += quantity
            }
        }else{
            this.lines.set(prod.id,new OrderLine(prod,quantity))
            
        }
    }
    public removeProduct(id:number){
        this.lines.delete(id)
    }
    get orderLines(): OrderLine[] {
        return[...this.lines.values()]
    }
    get producCount(): number {
        return [...this.lines.values()].reduce((total ,el) => total += el.quantity,0 )
    }
    get total(): number {
        return [...this.lines.values()].reduce((total ,el) => total += el.total,0 )
    }
}
