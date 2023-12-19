import { abstractDataSource } from "./abstract";
import { Product } from "./entities";

export class localStorage extends abstractDataSource {

    protected loadProucts(): Promise<Product[]>{
        return Promise.resolve([
          {id: 2, name:"p1", category: "waterports1", description: "P12 waterports ", price:3},
          {id: 3, name:"p12", category: "waterports2", description: "P13 waterports ", price:33},
          {id: 4, name:"p14", category: "waterport3s", description: "P14 waterports ", price:34},
          {id: 5, name:"p51", category: "waterports4", description: "P15 waterports ", price:36},
        ])
    }

    storeOrder(): Promise<number> {
        console.log("store order")
        console.log(JSON.stringify)
        return Promise.resolve(1)
    }
}