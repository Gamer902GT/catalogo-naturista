let carrito = [];
let categoriaActual = "todos";

const buscador = document.getElementById("buscador");

// 🔥 FILTROS + BUSCADOR (ARREGLADO)
function aplicarFiltros() {
  let texto = buscador.value.toLowerCase();
  let productos = document.querySelectorAll(".card");

  productos.forEach(p => {
    let coincideTexto = p.innerText.toLowerCase().includes(texto);
    let coincideCategoria =
      categoriaActual === "todos" ||
      p.classList.contains(categoriaActual);

    p.style.display = (coincideTexto && coincideCategoria) ? "block" : "none";
  });
}

// EVENTO BUSCADOR
buscador.addEventListener("keyup", aplicarFiltros);

// BOTONES FILTRO
function filtrar(categoria) {
  categoriaActual = categoria;
  aplicarFiltros();
}

// 🛒 AGREGAR AL CARRITO
function agregarCarrito(nombre, precio) {
  let producto = carrito.find(p => p.nombre === nombre);

  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  actualizarCarrito();
  mostrarNotificacion("Producto agregado 🛒");
}

// 🛒 ACTUALIZAR CARRITO
function actualizarCarrito() {
  let lista = document.getElementById("lista-carrito");
  let total = document.getElementById("total");
  let contador = document.getElementById("contador");

  lista.innerHTML = "";
  let suma = 0;
  let cantidadTotal = 0;

  carrito.forEach((p, i) => {
    let subtotal = p.precio * p.cantidad;
    suma += subtotal;
    cantidadTotal += p.cantidad;

    lista.innerHTML += `
      <li>
        ${p.nombre} x${p.cantidad} - $${subtotal}
        <div>
          <button onclick="cambiarCantidad(${i}, -1)">➖</button>
          <button onclick="cambiarCantidad(${i}, 1)">➕</button>
          <button onclick="eliminar(${i})">❌</button>
        </div>
      </li>
    `;
  });

  total.innerText = "Total: $" + suma;
  contador.innerText = cantidadTotal;
}

// ➕➖ CAMBIAR CANTIDAD
function cambiarCantidad(index, cambio) {
  carrito[index].cantidad += cambio;

  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }

  actualizarCarrito();
}

// ❌ ELIMINAR
function eliminar(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// 📲 WHATSAPP
function enviarWhatsApp() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
    return;
  }

  let metodo = document.getElementById("metodoPago").value;

  let mensaje = "Hola, quiero pedir:\n";

  carrito.forEach(p => {
    mensaje += `- ${p.nombre} x${p.cantidad} ($${p.precio * p.cantidad})\n`;
  });

  let total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);

  mensaje += `Total: $${total}\n`;
  mensaje += `Método de pago: ${metodo}`;

  let url = "https://wa.me/573218299283?text=" + encodeURIComponent(mensaje);

  window.open(url, "_blank");
}

// 🧾 ABRIR / CERRAR CARRITO
function toggleCarrito() {
  document.getElementById("carritoPanel").classList.toggle("activo");
  document.getElementById("overlay").classList.toggle("activo");
}

// 🔔 NOTIFICACIÓN
function mostrarNotificacion(msg) {
  let n = document.getElementById("notificacion");
  n.innerText = msg;
  n.classList.add("mostrar");

  setTimeout(() => {
    n.classList.remove("mostrar");
  }, 2000);
}