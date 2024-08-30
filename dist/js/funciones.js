function imprimirCatalogo(articulos){
  // Obtiene el elemento principal donde se añadirá el catálogo
  var main = document.getElementById("main");
  
  // Recorre la lista de artículos para crear el catálogo
  for (let i = 0; i < articulos.length; i++) {
      // Crea un contenedor para cada artículo
      var col = document.createElement("div");
      col.classList.add("col", "col-2"); // Añade clases para el diseño
      
      // Crea la tarjeta del artículo
      var card = document.createElement("div");
      card.classList.add("card");
      
      // Añade la imagen del artículo
      var image = document.createElement("img");
      image.setAttribute("src", articulos[i].urlImage);
      image.setAttribute("alt", articulos[i].NombreArt);
      
      // Crea el cuerpo de la tarjeta
      var cardB = document.createElement("div");
      cardB.classList.add("card-body");
      
      // Añade el título del artículo
      var cardT = document.createElement("h5");
      cardT.classList.add("card-title");
      var h5Text = document.createTextNode(articulos[i].NombreArt + " ");
      
      // Crea un botón de información con un popover
      var buttonInfo = document.createElement("button");
      buttonInfo.setAttribute("tabindex", "0");
      buttonInfo.setAttribute("type", "button");
      buttonInfo.classList.add("btn", "btn-outline-dark");
      buttonInfo.setAttribute("data-bs-toggle", "popover");
      buttonInfo.setAttribute("data-bs-trigger", "focus");
      buttonInfo.setAttribute("title", "Información");
      buttonInfo.setAttribute("data-bs-content", articulos[i].Info);
      
      // Añade un icono al botón de información
      var iconInfo = document.createElement("i");
      iconInfo.classList.add("fa-solid", "fa-circle-info");
      buttonInfo.appendChild(iconInfo);
      
      // Añade el precio del artículo
      var pPrecio = document.createElement("p");
      var precioText = document.createTextNode("Precio: $" + articulos[i].Precio);
      pPrecio.appendChild(precioText);
      
      // Añade el stock del artículo
      var pStock = document.createElement("p");
      var stockText = document.createTextNode("Stock: " + articulos[i].Stock);
      pStock.appendChild(stockText);
      
      // Añade un botón para agregar el artículo al carrito
      var pCarrito = document.createElement("p");
      var carritoText = document.createTextNode("Añadir al Carrito ");
      var carrito = document.createElement("i");
      carrito.classList.add("fa-solid", "fa-cart-shopping");
      
      // Captura las variables necesarias para añadir al carrito
      let idVar = articulos[i].IdArticulo;
      let catVar = articulos[i].Categoria;
      
      // Añade un evento de click al botón de carrito
      carrito.addEventListener("click", function() {
          añadirCarrito(idVar, catVar, 1);
      });
      
      pCarrito.appendChild(carritoText);
      pCarrito.appendChild(carrito);
      
      // Añade todos los elementos al cuerpo de la tarjeta
      cardT.appendChild(h5Text);
      cardT.appendChild(buttonInfo);
      cardB.appendChild(cardT);
      cardB.appendChild(pPrecio);
      cardB.appendChild(pStock);
      cardB.appendChild(pCarrito);
      
      // Añade la imagen y el cuerpo a la tarjeta
      card.appendChild(image);
      card.appendChild(cardB);
      
      // Añade la tarjeta al contenedor de la columna
      col.appendChild(card);
      // Añade la columna al elemento principal
      main.appendChild(col);
  }
}

function añadirCarrito(id, cat, cant){
  // Crea un objeto con la información del artículo
  var item = {
      idItem: id,
      catItem: cat,
      cantItem: cant
  };
  
  // Obtiene la lista de artículos del carrito desde el localStorage
  var listItem = JSON.parse(localStorage.getItem('cartItem')) || [];
  
  // Busca si el artículo ya está en el carrito
  const result = listItem.find((item) => item.idItem === id);
  
  if (result == undefined) {
      // Si no está, lo añade al carrito y lo guarda en el localStorage
      listItem.push(item);
      localStorage.setItem('cartItem', JSON.stringify(listItem));
      
      // Muestra una notificación de éxito
      var myToast = document.querySelector('.toast');
      var toast = new bootstrap.Toast(myToast);
      toast.show();
  } else {
      // Si ya está en el carrito, muestra una notificación de error
      var myToast = document.querySelector('.toasterror');
      var toast = new bootstrap.Toast(myToast);
      toast.show();
  }
  
  // Actualiza la visualización del carrito
  imprimirCarrito();
}

function imprimirCarrito(){
  // Obtiene la lista de artículos del carrito desde el localStorage
  const listItem = JSON.parse(localStorage.getItem('cartItem')) || [];
  
  // Obtiene el contenedor donde se mostrarán los artículos del carrito
  var cart = document.getElementById("carritoList");
  cart.innerHTML = "";
  
  var Total = 0;
  
  // Recorre la lista de artículos del carrito para mostrarlos
  for (let i = 0; i < listItem.length; i++) {
      
      var cartItem;
      let result;
      
      // Dependiendo de la categoría, busca el artículo en la lista correspondiente
      if(listItem[i].catItem == "Escolar"){
          cartItem = JSON.parse(localStorage.getItem('cartEsc')) || [];
          result = cartItem.find((item) => item.IdArticulo === listItem[i].idItem);
      }else if(listItem[i].catItem == "Arte"){
          cartItem = JSON.parse(localStorage.getItem('cartArt')) || [];
          result = cartItem.find((item) => item.IdArticulo === listItem[i].idItem);
      }else{
          cartItem = JSON.parse(localStorage.getItem('cartOfc')) || [];
          result = cartItem.find((item) => item.IdArticulo === listItem[i].idItem);
      }

      // Calcula el total a pagar
      Total = Total + (listItem[i].cantItem * result.Precio); 
      
      // Crea el elemento del carrito
      var prueba = itemCarrito(result, listItem[i].cantItem);
      
      // Añade el elemento del carrito al contenedor
      cart.appendChild(prueba);
  }
  
  // Muestra el total a pagar
  var h5Total = document.createElement("h5");
  var h5TotalText = document.createTextNode("Total a Pagar: $" + Total);
  h5Total.appendChild(h5TotalText);
  cart.appendChild(h5Total);
  
  // Actualiza el número de artículos en el carrito
  numCart();
}

function numCart(){
  // Obtiene el número de artículos en el carrito desde el localStorage
  var numCart = JSON.parse(localStorage.getItem('cartItem')) || [];
  
  // Actualiza el icono del carrito con el número de artículos
  var cart = document.getElementById("carritoIcon");
  if(numCart.length != 0){
      cart.innerHTML = numCart.length;
  }else{
      cart.innerHTML = "";
  }
}

function itemCarrito(result, cant){
  // Crea un enlace para el artículo del carrito
  var aItem = document.createElement("a");
  aItem.classList.add("list-group-item", "list-group-item-action");
  aItem.setAttribute("aria-current", "true");
  
  // Crea un contenedor para el contenido del artículo
  var divItem = document.createElement("div");
  divItem.classList.add("d-flex", "w-100", "justify-content-between");
  
  // Añade la imagen del artículo
  var imageItem = document.createElement("img");
  imageItem.setAttribute("src", result.urlImage);
  imageItem.setAttribute("alt", result.NombreArt);
  imageItem.classList.add("imageItem");
  
  // Añade el título del artículo
  var h5Item = document.createElement("h5");
  h5Item.classList.add("mb-1");
  var h5ItemText = document.createTextNode(result.NombreArt);
  h5Item.appendChild(h5ItemText);
  
  // Añade el stock del artículo
  var smallItem = document.createElement("small");
  var smallText = document.createTextNode("Stock: " + result.Stock);
  smallItem.appendChild(smallText);
  
  // Añade los botones para aumentar y disminuir la cantidad
  var more = document.createElement("i");
  more.classList.add("fa-solid", "fa-plus");
  more.addEventListener("click", function() {
      addItem(result.IdArticulo, result.Stock);
  });

  var minus = document.createElement("i");
  minus.classList.add("fa-solid", "fa-minus");
  minus.addEventListener("click", function() {
      minusItem(result.IdArticulo);
  });

  var smallItemCant = document.createElement("small");
  var smallItemCantText = document.createTextNode(cant);
  smallItemCant.appendChild(smallItemCantText);
  
  // Añade los elementos al contenedor
  divItem.appendChild(h5Item);
  divItem.appendChild(smallItem);
  divItem.appendChild(minus);
  divItem.appendChild(smallItemCant);
  divItem.appendChild(more);
  aItem.appendChild(divItem);
  divItem.appendChild(imageItem);
  
  // Añade la información adicional y el precio del artículo
  var pItem =  document.createElement("p");
  var pItemText = document.createTextNode(result.Info);
  pItem.appendChild(pItemText);

  var smallItemPrice = document.createElement("small");
  var smallItemPriceText = document.createTextNode("Precio Unitario: $" + result.Precio + " ");
  smallItemPrice.appendChild(smallItemPriceText);
  
  // Añade un botón para eliminar el artículo del carrito
  var iDelete = document.createElement("i");
  iDelete.classList.add("fa-solid", "fa-trash");
  iDelete.addEventListener("click", function() {
      deleteItem(result.IdArticulo);
  });

  // Añade el precio y el botón de eliminación al contenedor principal
  aItem.appendChild(pItem);
  aItem.appendChild(smallItemPrice);
  aItem.appendChild(iDelete);

  return aItem;
}

function addItem(id, stock){
  // Obtiene la lista de artículos del carrito desde el localStorage
  var itemCart = JSON.parse(localStorage.getItem('cartItem')) || [];
  var newCart = [];
  
  // Recorre la lista de artículos del carrito para modificar la cantidad
  for (let i = 0; i < itemCart.length; i++) {
      if(itemCart[i].idItem == id){
          if(itemCart[i].cantItem < stock){
              // Si la cantidad es menor que el stock, aumenta la cantidad
              var item = {
                  idItem: itemCart[i].idItem,
                  catItem: itemCart[i].catItem,
                  cantItem: parseInt(itemCart[i].cantItem) + 1,
              };
          }else{
              // Si la cantidad es igual al stock, no la modifica
              var item = {
                  idItem: itemCart[i].idItem,
                  catItem: itemCart[i].catItem,
                  cantItem: itemCart[i].cantItem,
              };
          }
      }else{
          // Si no es el artículo buscado, lo mantiene igual
          var item = {
              idItem: itemCart[i].idItem,
              catItem: itemCart[i].catItem,
              cantItem: parseInt(itemCart[i].cantItem),
          };
      }
      // Añade el artículo actualizado al nuevo carrito
      newCart.push(item);
      localStorage.setItem('cartItem', JSON.stringify(newCart));
      imprimirCarrito();
  }
}

function minusItem(id){
  // Similar a addItem, pero disminuye la cantidad del artículo
  var itemCart = JSON.parse(localStorage.getItem('cartItem')) || [];
  var newCart = [];
  
  for (let i = 0; i < itemCart.length; i++) {
      if(itemCart[i].idItem == id){
          if(itemCart[i].cantItem == 1){
              // Si la cantidad es 1, no la disminuye más
              var item = {
                  idItem: itemCart[i].idItem,
                  catItem: itemCart[i].catItem,
                  cantItem: 1,
              };
          }else{
              // Si la cantidad es mayor que 1, la disminuye
              var item = {
                  idItem: itemCart[i].idItem,
                  catItem: itemCart[i].catItem,
                  cantItem: parseInt(itemCart[i].cantItem) - 1,
              };
          }
      }else{
          // Si no es el artículo buscado, lo mantiene igual
          var item = {
              idItem: itemCart[i].idItem,
              catItem: itemCart[i].catItem,
              cantItem: parseInt(itemCart[i].cantItem),
          };
      }
      // Añade el artículo actualizado al nuevo carrito
      newCart.push(item);
      localStorage.setItem('cartItem', JSON.stringify(newCart));
      imprimirCarrito();
  }
}

function deleteItem(id){
  // Obtiene la lista de artículos del carrito desde el localStorage
  var itemCart = JSON.parse(localStorage.getItem('cartItem')) || [];
  
  if(itemCart.length <= 1){
      // Si solo hay un artículo, lo elimina del carrito
      localStorage.removeItem('cartItem');
      imprimirCarrito();
  }else{
      var newCart = [];
      for (let i = 0; i < itemCart.length; i++) {
          if(itemCart[i].idItem != id){
              // Si no es el artículo a eliminar, lo mantiene en el carrito
              let item = {
                  idItem: itemCart[i].idItem,
                  catItem: itemCart[i].catItem,
                  cantItem: parseInt(itemCart[i].cantItem),
              };
              newCart.push(item);
          }
      }
      // Guarda el nuevo carrito en el localStorage
      localStorage.setItem('cartItem', JSON.stringify(newCart));
      imprimirCarrito();
  }
}
