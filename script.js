let carrito = [];
let categoriaActual = "todos";

const buscador = document.getElementById("buscador");

// FILTROS + BUSCADOR
function aplicarFiltros() {
  let texto = buscador.value.toLowerCase();

  document.querySelectorAll(".card").forEach(p => {
    let coincideTexto = p.innerText.toLowerCase().includes(texto);
    let coincideCategoria =
      categoriaActual === "todos" ||
      p.classList.contains(categoriaActual);

    p.style.display = (coincideTexto && coincideCategoria) ? "block" : "none";
  });
}

buscador.addEventListener("keyup", aplicarFiltros);

function filtrar(cat) {
  categoriaActual = cat;
  aplicarFiltros();
}

// CARRITO
function agregarCarrito(nombre, precio) {
  let prod = carrito.find(p => p.nombre === nombre);

  if (prod) prod.cantidad++;
  else carrito.push({ nombre, precio, cantidad: 1 });

  actualizarCarrito();
  mostrarNotificacion("Agregado 🛒");
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
        ${p.nombre} x${p.cantidad} - $${p.precio * p.cantidad}
        <button onclick="cambiar(${i},-1)">➖</button>
        <button onclick="cambiar(${i},1)">➕</button>
        <button onclick="eliminar(${i})">❌</button>
      </li>
    `;
  });

  total.innerText = "Total: $" + suma;
  contador.innerText = cant;
}

function cambiar(i, v) {
  carrito[i].cantidad += v;
  if (carrito[i].cantidad <= 0) carrito.splice(i, 1);
  actualizarCarrito();
}

function eliminar(i) {
  carrito.splice(i, 1);
  actualizarCarrito();
}

// WHATSAPP
function enviarWhatsApp() {
  if (!carrito.length) return alert("Carrito vacío");

  let metodo = document.getElementById("metodoPago").value;

  let msg = "Hola, quiero pedir:\n";

  carrito.forEach(p => {
    msg += `- ${p.nombre} x${p.cantidad}\n`;
  });

  msg += "Pago: " + metodo;

  let url = "https://wa.me/573218299283?text=" + encodeURIComponent(msg);

  window.open(url, "_blank");
}

// UI
function toggleCarrito() {
  document.getElementById("carritoPanel").classList.toggle("activo");
  document.getElementById("overlay").classList.toggle("activo");
}

function mostrarNotificacion(msg) {
  let n = document.getElementById("notificacion");
  n.innerText = msg;
  n.classList.add("mostrar");
  setTimeout(() => n.classList.remove("mostrar"), 2000);
}