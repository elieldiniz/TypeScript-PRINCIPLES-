import { Product,Order } from "./entities";

export abstract class abstractDataSource {
    private _products: Product[];
    private _categoria: Set<string>
    public order: Order;
    public loading: Promise<void>

    constructor(){
        this._products = [];
        this._categoria = new Set<string>();
        this.order = new Order;
        this.loading = this.getDate()
    }

    async getCategories(): Promise<string[]>{
        await this.loading;
        return [...this._categoria.values()]
    }
    /*so clases erdadas tem esse metodo INPLEMENTACAO OBRIGATORIA PARA CLASS FILHO*/
    protected abstract loadProucts():Promise<Product[]>
    
    protected async getDate(): Promise<void>{
        this._products = []
        this._categoria.clear()
        const rawData = await this.loadProucts();
        rawData.forEach(p =>{
            this._products.push(p)
            this._categoria.add(p.category);
        })

    }
    abstract storeOrder(): Promise<number>
}