const buscador = document.getElementById("buscador");

buscador.addEventListener("keyup", function() {
  let filtro = buscador.value.toLowerCase();
  let productos = document.querySelectorAll(".card");

  productos.forEach(producto => {
    let texto = producto.innerText.toLowerCase();
    producto.style.display = texto.includes(filtro) ? "" : "none";
  });   
});

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