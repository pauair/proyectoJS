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

//Listado de productos

const sectionProducts = document.getElementById("section-products")
let productos = []

fetch("../json/productos.json")
.then(response => response.json())
.then(productos => {
    productos.forEach((producto) => {
        let {id, nombre, descripcion, amargor, volAlc, precio, moneda} = producto
        productos.push(producto)
        sectionProducts.innerHTML += `
        <div id="producto${id}" class="col">
            <div class="card p-4 m-4">
                <img src="../assets/images/producto${id}.png" class="mx-auto card-img-top img-product">
                <div class="card-body">
                    <h5 class="card-title text-center text-uppercase">${nombre}</h5>
                    <p class="card-text fw-lighter">${descripcion}</p>
                    <p class="card-text text-center fw-lighter"> Amargor: ${amargor} - VolAlc: ${volAlc}</p>
                    <p class="card-text"> ${moneda} ${precio}</p>
                    <p class="card-text"> <a id="agregar${id}" class="link-warning" href="#"> AGREGAR AL CARRITO </a></p>
                </div>
            </div>
        </div>
        `
    })
})

/*

//Se crea un carrito de compras
let carrito = JSON.parse(localStorage.getItem("itemCarrito")) ?? []


//Agregar producto al carrito
productos.forEach(p => {
    document.getElementById(`agregar${p.id}`).addEventListener("click", ()=> {
        carrito.push(p)
        let carritoString = JSON.stringify(carrito)
        localStorage.setItem("itemCarrito", carritoString)
        Swal.fire({
            icon: 'success',
            iconColor: 'orange',
            title: 'Agregado al carrito',
            width: 600,
            padding: '3em',
            color: 'white',
            background: '#fff',
            showConfirmButton: false,
            timer: 1000
        })
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

*/