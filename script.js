let carrito = [];

const buscador = document.getElementById("buscador");

buscador.addEventListener("keyup", () => {
  let texto = buscador.value.toLowerCase();

  document.querySelectorAll(".card").forEach(p => {
    p.style.display = p.innerText.toLowerCase().includes(texto) ? "block" : "none";
  });
});

// FILTROS
function filtrar(categoria) {
  let productos = document.querySelectorAll(".card");

  productos.forEach(p => {
    if (categoria === "todos") {
      p.style.display = "block";
    } else {
      p.style.display = p.classList.contains(categoria) ? "block" : "none";
    }
  });
}

// CARRITO
function agregarCarrito(nombre, precio) {
  let producto = carrito.find(p => p.nombre === nombre);

  if (producto) producto.cantidad++;
  else carrito.push({ nombre, precio, cantidad: 1 });

  actualizarCarrito();
  mostrarNotificacion("Agregado al carrito 🛒");
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
        ${p.nombre} x${p.cantidad}
        <button onclick="eliminar(${i})">❌</button>
      </li>
    `;
  });

  total.innerText = "Total: $" + suma;
  contador.innerText = cant;
}

function eliminar(i) {
  carrito.splice(i, 1);
  actualizarCarrito();
}

// WHATSAPP
function enviarWhatsApp() {
  if (!carrito.length) return;

  let mensaje = "Hola, quiero pedir:\n";

  carrito.forEach(p => {
    mensaje += `- ${p.nombre} x${p.cantidad}\n`;
  });

  let url = "https://wa.me/573218299283?text=" + encodeURIComponent(mensaje);

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