import { localStorage } from "./data/localDataSource";

async function displayData(): Promise<string>{
    let ds = new localStorage()

    let allCategories = await ds.getCategories()
    let allProducts = await ds.getProducts()
    let chessProducts = await ds.getProducts("name", "carro")

    let result = ''

    chessProducts.forEach(p => result += `Product:${p.name}, ${p.category},${p.price}`)
    console.log(allProducts)
    return result
}

displayData().then(res => console.log(res))