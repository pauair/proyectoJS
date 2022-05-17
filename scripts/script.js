class Producto {
    constructor (id, nombre, descripcion, amargor, volAlc, precio, stock, moneda) {
        this.id = id
        this.nombre = nombre
        this.descripcion = descripcion
        this.amargor = amargor
        this.volAlc = volAlc
        this.precio = precio
        this.stock = stock
        this.moneda = moneda
    }
}

//Se ingresan los productos
const producto1 = new Producto (1, "Cerveza Ipa", "Cerveza dorada opalescente, con marcadas notas a lúpulo en aroma y sabor. Deleita con sus notas a pomelo, limón y sutiles toques especiados. Con un amargor pronunciado pero elegante y fácil de tomar.", "5/5", "7,0%", 150, 60, "UYU")
const producto2 = new Producto (2, "Cerveza Blonde", "Cerveza dorada de cuerpo pleno, con un balance perfecto entre malta y lúpulo, brindando notas a miel y pan en boca.", "1/5", "5,7%", 140, 80, "UYU")
const producto3 = new Producto (3, "Cerveza Red", "Cerveza roja, madurada con roble, vainilla y bourbon. Profundo aroma a vainilla, intensa en boca donde se mezclan el dulzor de la malta caramelo con el sabor y el calor del bourbon.", "2/5", "6,4%", 140, 70, "UYU")
const producto4 = new Producto (4, "Cerveza Black", "Cerveza oscura, con intenso aroma a café. En boca presenta un sabor complejo otorgado por la mezcla de maltas tostadas con un final cálido que nos deja la alta graduación alcohólica.", "4/5", "7,5%", 160, 90, "UYU")
const producto5 = new Producto (5, "Pack degustación", "Presentamos esta excelente oportunidad para probar todas nuestras variedades.", "", "", 450, 30, "UYU")

let productos = [producto1, producto2, producto3, producto4, producto5]

//Se crea un carrito de compras
let carrito = JSON.parse(localStorage.getItem("itemCarrito")) ?? []

//Listado de productos
const sectionProducts = document.getElementById("section-products")

productos.forEach(p => {
    sectionProducts.innerHTML += `
    <div id="producto${p.id}" class="col">
        <div class="card p-4 m-4">
            <img src="../assets/images/producto${p.id}.png" class="mx-auto card-img-top img-product">
            <div class="card-body">
                <h5 class="card-title text-center text-uppercase">${p.nombre}</h5>
                <p class="card-text fw-lighter">${p.descripcion}</p>
                <p class="card-text text-center fw-lighter"> Amargor: ${p.amargor} - VolAlc: ${p.volAlc}</p>
                <p class="card-text"> ${p.moneda} ${p.precio}</p>
                <p class="card-text"> <a id="agregar${p.id}" class="link-warning" href="#"> AGREGAR AL CARRITO </a></p>
            </div>
        </div>
    </div>
    `
});

//Agregar producto al carrito
productos.forEach(p => {
    document.getElementById(`agregar${p.id}`).addEventListener("click", ()=> {
        carrito.push(p)
        let carritoString = JSON.stringify(carrito)
        localStorage.setItem("itemCarrito", carritoString)
    })
});

//Mostrar carrito
let mostrarCarrito = document.getElementById("mostrarCarrito")

document.getElementById("btn-mostrarCarrito").addEventListener("click", ()=> {
    carrito = JSON.parse(localStorage.getItem("itemCarrito"))
    carrito.forEach(item => {
        mostrarCarrito.innerHTML += `
        <div class="card mb-3 mt-3" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-3 mx-auto">
                    <img src="../assets/images/producto${item.id}.png" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-9">
                    <div class="card-body">
                        <h5 class="card-title">${item.nombre}</h5>
                        <p class="card-text"> ${item.moneda} ${item.precio}</p>
                        <p class="card-text"> <a id="eliminar${item.id}" class="link-warning" href="#"> Eliminar </a></p>
                    </div>
                </div>
            </div>
      </div>
    `
    })
});
