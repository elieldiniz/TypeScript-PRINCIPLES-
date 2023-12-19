import { Product,Order } from "./entities";

/*garante que prodctProp pego os parametros de product */
export type ProductProp = keyof Product
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


    async getProducts(sortProp: ProductProp = "id", category? : string): Promise<Product[]>{
        await this.loading;
        return this.selectProducts(this._products, sortProp,category)
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

    protected selectProducts(prods: Product[], sortProp: ProductProp, category?: string ): Product[]{
        return prods.filter(p => category === undefined || p.category === category)
        .sort((p1,p2) => p1[sortProp] < p2[sortProp] ? -1 : p1[sortProp] > p2[sortProp] ? 1 : 0)
    }

    
    abstract storeOrder(): Promise<number>
}