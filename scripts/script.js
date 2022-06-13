class Producto {
    constructor(id, nombre, descripcion, amargor, volAlc, precio, stock, moneda) {
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

//Listado de productos en HTML
const sectionProducts = document.getElementById("section-products")

let productos = fetch("../json/productos.json").then(res => res.json())

productos.then((productos) => {
    productos.forEach((producto) => {
        let { id, nombre, descripcion, amargor, volAlc, precio, moneda } = producto
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

//Agregar productos al carrito
productos.then(productos => {
    productos.forEach(p => {
        document.getElementById(`agregar${p.id}`).addEventListener("click", () => {
            let carrito = JSON.parse(localStorage.getItem("itemCarrito")) ?? []
            if (carrito.some(prod => prod.nombre == p.nombre)) {
                let indice = carrito.findIndex(prod => prod.nombre == p.nombre)
                carrito[indice].cantidad++
                carrito[indice].precio += p.precio
            } else {
                let nuevoItem = {
                    ...p,
                    cantidad: 1
                }
                carrito.push(nuevoItem)
            }
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
})

//Actualizar carrito
function actualizarCarrito() {    
    mostrarCarrito.innerHTML = ``
    carrito = JSON.parse(localStorage.getItem("itemCarrito"))
    if (carrito != null) {
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
                                    <p class="card-text"> Cant: ${item.cantidad}</p>
                                    <p class="card-text"> <a id="eliminar${item.id}" class="link-warning eliminarItem" href="#"> Eliminar </a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                `
        })
        carrito.forEach(item => {
            mostrarCarrito.querySelector(`#eliminar${item.id}`).addEventListener("click", () => {
                eliminarItem(item.id)
            })
        })
    }
    actualizarTotal()
}

//Mostrar carrito
let mostrarCarrito = document.getElementById("mostrarCarrito")

document.getElementById("btn-mostrarCarrito").addEventListener("click", () => {
    actualizarCarrito()
})

//Eliminar item del carrito
function eliminarItem(itemId) {
    const borrar = carrito.find((c) => c.id === itemId)
    const indice = carrito.indexOf(borrar)
    if (carrito[indice].cantidad > 1) {
        let cantPrev = carrito[indice].cantidad
        let precioPrev = carrito[indice].precio
        carrito[indice].cantidad--
        carrito[indice].precio = precioPrev/cantPrev * carrito[indice].cantidad
    } else {
        carrito.splice(indice, 1)
    }
    let carritoString = JSON.stringify(carrito)
    localStorage.setItem("itemCarrito", carritoString)
    actualizarCarrito()
}

//Actualizar importe total
function actualizarTotal() {
    let totalCarrito = document.getElementById("totalCarrito")
    if (carrito == null) {
        totalCarrito.innerHTML = `TOTAL: 0 UYU`
    } else {
        const total = carrito.reduce((prev, sig)=> prev + sig.precio, 0)
        totalCarrito.innerHTML = `TOTAL: ${total} UYU`
    }       
}

//Vaciar carrito
function vaciarCarrito() {
    localStorage.clear()
    actualizarCarrito()
}

document.getElementById("btn-vaciarCarrito").addEventListener("click", () => {
    vaciarCarrito()
})

//Finalizar compra
document.getElementById("btn-finalizarCompra").addEventListener("click", () => {
    carrito = JSON.parse(localStorage.getItem("itemCarrito"))
    if (carrito == null) {
        Swal.fire({
            icon: 'success',
            iconColor: 'orange',
            title: 'No existen productos',
            width: 600,
            padding: '3em',
            color: 'white',
            background: '#fff',
            showConfirmButton: false,
            timer: 1000
        })
    }
    else {
        Swal.fire({
            icon: 'success',
            iconColor: 'orange',
            title: 'Gracias por tu compra',
            width: 600,
            padding: '3em',
            color: 'white',
            background: '#fff',
            showConfirmButton: false,
            timer: 1500
        })
    }
    vaciarCarrito()
})