let carrito = [];
let categoriaActual = "todos";

const buscador = document.getElementById("buscador");

// 🔍 BUSCADOR
buscador.addEventListener("keyup", aplicarFiltros);

// 🛒 AGREGAR AL CARRITO
function agregarCarrito(nombre, precio) {
  let productoExistente = carrito.find(p => p.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  actualizarCarrito();
  mostrarNotificacion("Producto agregado 🛒");
}

// 🔄 ACTUALIZAR CARRITO
function actualizarCarrito() {
  let lista = document.getElementById("lista-carrito");
  let total = document.getElementById("total");

  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((producto, index) => {
    let subtotal = producto.precio * producto.cantidad;
    suma += subtotal;

    lista.innerHTML += `
      <li>
        ${producto.nombre} x${producto.cantidad} - $${subtotal}
        <button onclick="eliminar(${index})">❌</button>
      </li>
    `;
  });

  total.innerText = "Total: $" + suma;
}

// ❌ ELIMINAR PRODUCTO
function eliminar(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// 📲 ENVIAR A WHATSAPP
function enviarWhatsApp() {
  if (carrito.length === 0) {
    mostrarNotificacion("El carrito está vacío ❌");
    return;
  }

  let mensaje = "Hola, quiero pedir:%0A";

  carrito.forEach(p => {
    mensaje += `- ${p.nombre} x${p.cantidad} ($${p.precio * p.cantidad})%0A`;
  });

  let total = carrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);

  mensaje += `Total: $${total}`;

  let url = "https://wa.me/573218299283?text=" + mensaje;

  window.open(url, "_blank");
}

// 🔍 FILTROS POR CATEGORÍA
function filtrar(categoria) {
  categoriaActual = categoria;

  document.querySelectorAll(".filtros button").forEach(btn => {
    btn.classList.remove("activo");
  });

  event.target.classList.add("activo");

  aplicarFiltros();
}

// 🔍 APLICAR FILTROS + BUSCADOR
function aplicarFiltros() {
  let texto = buscador.value.toLowerCase();
  let productos = document.querySelectorAll(".card");

  productos.forEach(p => {
    let coincideTexto = p.innerText.toLowerCase().includes(texto);
    let coincideCategoria = categoriaActual === "todos" || p.classList.contains(categoriaActual);

    if (coincideTexto && coincideCategoria) {
      p.style.display = "block";
    } else {
      p.style.display = "none";
    }
  });
}

// 🔔 NOTIFICACIÓN PRO
function mostrarNotificacion(mensaje) {
  let noti = document.getElementById("notificacion");

  noti.innerText = mensaje;
  noti.classList.add("mostrar");

  setTimeout(() => {
    noti.classList.remove("mostrar");
  }, 2000);
}