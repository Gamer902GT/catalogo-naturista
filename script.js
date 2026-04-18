let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const buscador = document.getElementById("buscador");

buscador.addEventListener("keyup", aplicarFiltros);

// 🛒 AGREGAR + EFECTO VUELO
function agregarCarrito(nombre, precio, boton) {

  let card = boton.closest(".card");
  let img = card.querySelector("img");

  let clone = img.cloneNode();
  let rect = img.getBoundingClientRect();

  clone.classList.add("fly-img");
  clone.style.left = rect.left + "px";
  clone.style.top = rect.top + "px";

  document.body.appendChild(clone);

  let carritoBtn = document.querySelector(".btn-carrito");
  let destino = carritoBtn.getBoundingClientRect();

  setTimeout(() => {
    clone.style.left = destino.left + "px";
    clone.style.top = destino.top + "px";
    clone.style.width = "20px";
    clone.style.opacity = "0.5";
  }, 10);

  setTimeout(() => clone.remove(), 800);

  // LÓGICA NORMAL
  let producto = carrito.find(p => p.nombre === nombre);

  if (producto) producto.cantidad++;
  else carrito.push({ nombre, precio, cantidad: 1 });

  guardar();
  actualizarCarrito();
  mostrarNotificacion("Agregado 🛒");
}

// CAMBIAR CANTIDAD
function cambiarCantidad(i, cambio) {
  carrito[i].cantidad += cambio;
  if (carrito[i].cantidad <= 0) carrito.splice(i, 1);
  guardar();
  actualizarCarrito();
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

// WHATSAPP
function enviarWhatsApp() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  let mensaje = "Hola, quiero pedir:\n";

  carrito.forEach(p => {
    mensaje += `- ${p.nombre} x${p.cantidad} ($${p.precio * p.cantidad})\n`;
  });

  let total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);

  mensaje += `Total: $${total}`;

  // 🔥 CLAVE
  let url = "https://wa.me/573218299283?text=" + encodeURIComponent(mensaje);

  window.open(url, "_blank");
}

// TOGGLE
function toggleCarrito() {
  document.getElementById("carritoPanel").classList.toggle("activo");
  document.getElementById("overlay").classList.toggle("activo");
}

// FILTROS
function filtrar() {}

function aplicarFiltros() {
  let texto = buscador.value.toLowerCase();

  document.querySelectorAll(".card").forEach(p => {
    p.style.display = p.innerText.toLowerCase().includes(texto) ? "block" : "none";
  });
}

// NOTIFICACIÓN
function mostrarNotificacion(msg) {
  let n = document.getElementById("notificacion");
  n.innerText = msg;
  n.classList.add("mostrar");
  setTimeout(() => n.classList.remove("mostrar"), 2000);
}

actualizarCarrito();