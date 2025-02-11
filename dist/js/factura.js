function facturaPDF(){
    const listItem = JSON.parse(localStorage.getItem('cartItem')) || [];
                       // Vaciar el carrito después de generar la factura
    localStorage.removeItem('cartItem');
    console.log("El carrito ha sido vaciado.");

            var newCart = [];
            var Total = 0;
            for (let i = 0; i < listItem.length; i++) {
                if(listItem[i].catItem == "Escolar"){
                    var cartItem = JSON.parse(localStorage.getItem('cartEsc')) || [];
                    let result = cartItem.find((item) => item.IdArticulo === listItem[i].idItem);
                    Total = Total + (listItem[i].cantItem * result.Precio);
                    var item = {
                        "col1": result.NombreArt,
                        "col2": listItem[i].cantItem,
                        "col3": result.Precio,
                        "col4": listItem[i].cantItem * result.Precio
                    }
                    newCart.push(item);
                }else if(listItem[i].catItem == "Arte"){
                    var cartItem = JSON.parse(localStorage.getItem('cartArt')) || [];
                    let result = cartItem.find((item) => item.IdArticulo === listItem[i].idItem);
                    Total = Total + (listItem[i].cantItem * result.Precio);
                    var item = {
                        "col1": result.NombreArt,
                        "col2": listItem[i].cantItem,
                        "col3": result.Precio,
                        "col4": listItem[i].cantItem * result.Precio
                    }
                    newCart.push(item);
                }else{
                    var cartItem = JSON.parse(localStorage.getItem('cartOfc')) || [];
                    let result = cartItem.find((item) => item.IdArticulo === listItem[i].idItem);
                    Total = Total + (listItem[i].cantItem * result.Precio);
                    var item = {
                        "col1": result.NombreArt,
                        "col2": listItem[i].cantItem,
                        "col3": result.Precio,
                        "col4": listItem[i].cantItem * result.Precio
                    }
                    newCart.push(item);
                }      
                 
            }

            const doc = new jsPDF({
            orientation: "p", //set orientation
            unit: "pt", //set unit for document
            format: "letter" //set document standard
            });
            doc.text(20, 30, 'Libreria la Nueva - Factura');
            const btn = document.querySelector("button");
            const sizes = {
            xs: 10, 
            sm : 14, 
            p: 16, 
            h3: 18, 
            h2: 20, 
            h1: 22
            };
            const fonts = {
            times: 'Times', 
            helvetica: 'Helvetica'
            };
            const margin = 0.5; // inches on a 8.5 x 11 inch sheet.
            const verticalOffset = margin;
            var columns = [
                {title: "Item", dataKey: "col1"},
                {title: "Cant", dataKey: "col2"}, 
                {title: "Precio Unitario", dataKey: "col3"},
                {title: "Total", dataKey: "col4"}
            ];

            doc.autoTable(columns, newCart, {
                styles: {
                    fillColor: [51,51,51],
                    lineColor: 240, 
                    lineWidth: 1,
                },
                columnStyles: {
                    col1: {fillColor: false},
                    col2: {fillColor: false},
                    col3: {fillColor: false},
                    col4: {fillColor: false},
                    col5: {fillColor: false},
                    col6: {fillColor: false},        
                },
                margin: {top: 70},
                addPageContent: function(data) {
                    doc.text("", 40, 30);
                }
            });
            var numAle = Math.floor(Math.random() * 1000);
            doc.text(20, 50, 'Total a Pagar: $'+Total);
            doc.text(450, 50, 'N° Factura ' + numAle);
            doc.save('factura-' + numAle + '.pdf');
alert ('gracas por su compra');
window.location.reload();
}            