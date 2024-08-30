function imprimirCatalogo(articulos){
    var main = document.getElementById("main");
    for (let i = 0; i < articulos.length; i++) {
      var col = document.createElement("div");
      col.classList.add("col");
      col.classList.add("col-2");
      var card = document.createElement("div");
      card.classList.add("card");
      var image = document.createElement("img");
      image.setAttribute("src",articulos[i].urlImage);
      image.setAttribute("alt",articulos[i].NombreArt);

      var cardB = document.createElement("div");
      cardB.classList.add("card-body");

      var cardT = document.createElement("h5");
      cardT.classList.add("card-title");
      var h5Text = document.createTextNode(articulos[i].NombreArt + " ");

      var pPrecio = document.createElement("p");
      var precioText = document.createTextNode("Precio: $" + articulos[i].Precio);

      var pStock = document.createElement("p");
      var stockText = document.createTextNode("Stock: " + articulos[i].Stock);

      var pCarrito = document.createElement("p");
      var carritoText = document.createTextNode("Añadir al Carrito ");

      var carrito = document.createElement("i");
      carrito.classList.add("fa-solid");
      carrito.classList.add("fa-cart-shopping");

    
      pCarrito.appendChild(carritoText);
      
      pCarrito.appendChild(carrito);

      pStock.appendChild(stockText);

      pPrecio.appendChild(precioText);
      
      cardT.appendChild(h5Text);
      cardB.appendChild(cardT);
      cardB.appendChild(pPrecio);
      cardB.appendChild(pStock);
      cardB.appendChild(pCarrito);

      card.appendChild(image);
      card.appendChild(cardB);

      col.appendChild(card);
      main.appendChild(col);

    }
}