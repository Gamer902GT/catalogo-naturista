let carrito = [];

function agregarCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  actualizarCarrito();
}

function actualizarCarrito() {
  let lista = document.getElementById("lista-carrito");
  let total = document.getElementById("total");

  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((producto, index) => {
    suma += producto.precio;

    lista.innerHTML += `
      <li>
        ${producto.nombre} - $${producto.precio}
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

  let mensaje = "Hola, quiero pedir:\n";

  carrito.forEach(p => {
    mensaje += `- ${p.nombre} ($${p.precio})\n`;
  });

  let total = carrito.reduce((acc, p) => acc + p.precio, 0);

  mensaje += `Total: $${total}`;

  let url = "https://wa.me/573218299283?text=" + encodeURIComponent(mensaje);

  window.open(url, "_blank");
}