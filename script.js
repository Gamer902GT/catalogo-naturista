let carrito = [];

function agregarCarrito(nombre, precio) {
  let productoExistente = carrito.find(p => p.nombre === nombre);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  actualizarCarrito();
}

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

function eliminar(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function enviarWhatsApp() {
  if (carrito.length === 0) {
    alert("El carrito está vacío");
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

alert("Producto agregado al carrito 🛒");