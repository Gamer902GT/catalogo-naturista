let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const buscador = document.getElementById("buscador");

// BUSCADOR
buscador.addEventListener("keyup", aplicarFiltros);

// AGREGAR
function agregarCarrito(nombre, precio) {
  let producto = carrito.find(p => p.nombre === nombre);

  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  guardar();
  actualizarCarrito();
  mostrarNotificacion("Producto agregado 🛒");
}

// GUARDAR
function guardar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ACTUALIZAR
function actualizarCarrito() {
  let lista = document.getElementById("lista-carrito");
  let total = document.getElementById("total");
  let contador = document.getElementById("contador");

  lista.innerHTML = "";
  let suma = 0;
  let cant = 0;

  carrito.forEach((p, i) => {
    suma += p.precio * p.cantidad;
    cant += p.cantidad;

    lista.innerHTML += `
      <li>
        ${p.nombre} x${p.cantidad}
        <button onclick="eliminar(${i})">❌</button>
      </li>
    `;
  });

  total.innerText = "Total: $" + suma;
  contador.innerText = cant;
}

// ELIMINAR
function eliminar(i) {
  carrito.splice(i, 1);
  guardar();
  actualizarCarrito();
}

// WHATSAPP
function enviarWhatsApp() {
  let metodo = document.getElementById("metodoPago").value;

  if (carrito.length === 0) {
    mostrarNotificacion("Carrito vacío ❌");
    return;
  }

  if (!metodo) {
    mostrarNotificacion("Selecciona método ⚠️");
    return;
  }

  let mensaje = "Hola, quiero pedir:%0A";

  carrito.forEach(p => {
    mensaje += `- ${p.nombre} x${p.cantidad}%0A`;
  });

  let total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);

  mensaje += `Total: $${total}%0A`;
  mensaje += `Pago: ${metodo}`;

  window.open("https://wa.me/573218299283?text=" + mensaje);
}

// TOGGLE
function toggleCarrito() {
  document.getElementById("carritoPanel").classList.toggle("activo");
  document.getElementById("overlay").classList.toggle("activo");
}

// FILTROS
function filtrar(cat) {
  categoriaActual = cat;
  aplicarFiltros();
}

function aplicarFiltros() {
  let texto = buscador.value.toLowerCase();

  document.querySelectorAll(".card").forEach(p => {
    let ok = p.innerText.toLowerCase().includes(texto);
    p.style.display = ok ? "block" : "none";
  });
}

// NOTIFICACIÓN
function mostrarNotificacion(msg) {
  let n = document.getElementById("notificacion");
  n.innerText = msg;
  n.classList.add("mostrar");

  setTimeout(() => n.classList.remove("mostrar"), 2000);
}

// INICIO
actualizarCarrito();