let categoriaActual = "todos";

const buscador = document.getElementById("buscador");

buscador.addEventListener("keyup", aplicarFiltros);

function filtrar(categoria) {
  categoriaActual = categoria;

  document.querySelectorAll(".filtros button").forEach(btn => {
    btn.classList.remove("activo");
  });

  event.target.classList.add("activo");

  aplicarFiltros();
}

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
