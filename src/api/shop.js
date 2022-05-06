const _products = [
    {name: "hola", qty: 2},
    {name: "hola1", qty: 1},
    {name: "hola2", qty: 3},
    {name: "hola3", qty: 4}
]

export default {
    getProducts(okCallback) {
        setTimeout(() => okCallback(_products), 300)
    },
    buyProduct(product, okCallback, errorCallback) {
        setTimeout(() => {
            Math.random() > 0.5 ? okCallback() : errorCallback()
        }, 300)
    }
}