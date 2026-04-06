let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const buscador = document.getElementById("buscador");

buscador.addEventListener("keyup", aplicarFiltros);

function agregarCarrito(nombre, precio) {
  let producto = carrito.find(p => p.nombre === nombre);

  if (producto) producto.cantidad++;
  else carrito.push({ nombre, precio, cantidad: 1 });

  guardar();
  actualizarCarrito();
  mostrarNotificacion("Agregado 🛒");
}

function cambiarCantidad(i, cambio) {
  carrito[i].cantidad += cambio;

  if (carrito[i].cantidad <= 0) carrito.splice(i, 1);

  guardar();
  actualizarCarrito();
}

function guardar() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

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
        ${p.nombre}
        <div class="controles">
          <button onclick="cambiarCantidad(${i}, -1)">➖</button>
          <span>${p.cantidad}</span>
          <button onclick="cambiarCantidad(${i}, 1)">➕</button>
        </div>
      </li>
    `;
  });

  total.innerText = "Total: $" + suma;
  contador.innerText = cant;
}

function enviarWhatsApp() {
  let metodo = document.getElementById("metodoPago").value;

  if (!carrito.length || !metodo) return;

  let mensaje = "Hola, quiero pedir:%0A";

  carrito.forEach(p => {
    mensaje += `- ${p.nombre} x${p.cantidad}%0A`;
  });

  let total = carrito.reduce((a, p) => a + p.precio * p.cantidad, 0);

  mensaje += `Total: $${total}%0A`;
  mensaje += `Pago: ${metodo}`;

  window.open("https://wa.me/573218299283?text=" + mensaje);
}

function toggleCarrito() {
  document.getElementById("carritoPanel").classList.toggle("activo");
  document.getElementById("overlay").classList.toggle("activo");
}

function filtrar() {}

function aplicarFiltros() {
  let texto = buscador.value.toLowerCase();

  document.querySelectorAll(".card").forEach(p => {
    p.style.display = p.innerText.toLowerCase().includes(texto) ? "block" : "none";
  });
}

function mostrarNotificacion(msg) {
  let n = document.getElementById("notificacion");
  n.innerText = msg;
  n.classList.add("mostrar");
  setTimeout(() => n.classList.remove("mostrar"), 2000);
}

actualizarCarrito();