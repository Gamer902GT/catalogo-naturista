let carrito = [];
let categoriaActual = "todos";

const buscador = document.getElementById("buscador");

// 🔥 FUNCIÓN PRINCIPAL (ARREGLA TODO)
function aplicarFiltros() {
  let texto = buscador.value.toLowerCase();
  let productos = document.querySelectorAll(".card");

  productos.forEach(p => {
    let coincideTexto = p.innerText.toLowerCase().includes(texto);
    let coincideCategoria =
      categoriaActual === "todos" ||
      p.classList.contains(categoriaActual);

    if (coincideTexto && coincideCategoria) {
      p.style.display = "block";
    } else {
      p.style.display = "none";
    }
  });
}

// BUSCADOR
buscador.addEventListener("keyup", aplicarFiltros);

// BOTONES
function filtrar(categoria) {
  categoriaActual = categoria;
  aplicarFiltros();
}