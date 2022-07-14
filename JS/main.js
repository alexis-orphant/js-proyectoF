// para que cada vez que entro el local storage este limpio
localStorage.clear();
// ARRAY QUE VA A CONTENER LOS PRODUCTOS
const productos = [];
// array para cargar el carrito
let carrito =[];

// objetos que se cargan a la clase contructora
const tecno1 = new Tecnologia(1, "Mouse Gamer", 12500, 5);
const tecno2 = new Tecnologia(2, "Teclado Gamer", 15000,3);
const tecno3 = new Tecnologia(3, "Monitor Gamer", 40000, 7);
const tecno4 = new Tecnologia(4, "Auriculares Gamer", 22000, 4);

// CARGO LOS PRODUCTOS AL ARRAY
productos.push(tecno1, tecno2, tecno3, tecno4);

// SELECCIONO DONDE VOY A PONER MIS PRODUCTOS
const divContenedor = document.getElementById("section");

// EMPIEZO A MOSTRAR LOS PRODUCTOS EN EL HTML
for(const producto of productos){
    // se cra este div por cada elemento dentro del array. un div para cada producto
    const div = document.createElement("div");
    // le agrego una clase al div
    div.className = "col w-100 mx-auto";
    // le cargo al div la estructura html que va a contener
    div.innerHTML = `
                <h3 class="fs-4">Producto: ${producto.name}</h3>
                <h3 class="fs-5">Precio: ${producto.precio}</h3>
                <p class="fs-5">Seleccione la cantidad de cuotas: 
                    <select id=${producto.id}>
                        <option value="1">Seleccione las cuotas</option>
                        <option value="3">3 cuotas</option>
                        <option value="6">6 cuotas</option>
                        <option value="12">12 cuotas</option>
                    </select>
                </p>
                <button type="button" id=boton-${producto.id} class="btn btn-outline-light">Agregar al carrito</button>
                <p id=precio-${producto.id}>El precio de cada cuota es: $ ${producto.precioFinalCuotas}</p>
                `;
        // agregamos el div al div del html
        divContenedor.append(div);

        //EVENTO DE CUOTAS
        //constante sobre la que vamos a aplicar el evento
        const select = document.getElementById(`${producto.id}`);
        // evento (cambia el precio de las cuotas segun lo seleccionado en el select)
        select.addEventListener("change", () => {
            //paso lo parametros que cambio
            cambioCuotas(select.value, producto);  
        });

        //EVENTO AGREGAR AL CARRITO  
        const boton = document.getElementById(`boton-${producto.id}`);
        boton.addEventListener("click", () => {
            // console.log(producto)

            // agregar pruducto al carrito, obtenerlo del y agragarlo al localstorage
            // obtengo el json y lo vuelvo a convertir en un objeto
            const obtenerCarrito = localStorage.getItem("carrito")
            
            if(obtenerCarrito){
                carrito = JSON.parse(obtenerCarrito);
            }
            // agrego los productos al array carrito y al local storage
            carrito.push(producto);
            const carritoStorage = JSON.stringify(carrito);
            localStorage.setItem("carrito", carritoStorage);
            alert("el producto fue añadido al carrito")
        });
};

// FUNCION PARA CALCULAR LAS CUOTAS DE CADA
// recibe los parametros y muestra el precio
function cambioCuotas(cantCuotas, producto){
    producto.cuotas = cantCuotas;
    const precioFinalCuotas = producto.calcularPrecioCuotas();
    document.getElementById(`precio-${producto.id}`).innerHTML = `El precio de cada cuota es: $ ${precioFinalCuotas}`
};
