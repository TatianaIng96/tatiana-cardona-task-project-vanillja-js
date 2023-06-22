const cajaTarea = document.querySelector("input#nuevaTarea");
const botonTarea = document.querySelector("button#botonTarea");
const contenedorTareas = document.querySelector("ul#contenedorTareas");
const botonDelete = document.querySelector("button#botonDelete");
var elementos = [];

function agregarElemento(valor) {
  const nuevoElemento = {
    id: elementos.length + 1, // Generar ID automático basado en la longitud actual del arreglo
    valor: valor,
    completed: false,
  };

  elementos.push(nuevoElemento);
  if(elementos.length>0){
    botonDelete.removeAttribute("hidden");
  }
}

function mostrarListaTareas() {
  if (contenedorTareas.hasChildNodes()) {
    contenedorTareas.textContent = "";
  }
  for (let i = 0; i < elementos.length; i++) {
    var listaItem = document.createElement("li");
    listaItem.id = "checkbox" + i;
    listaItem.className="list-group-item";
    contenedorTareas.append(listaItem);

    var divItem = document.createElement("div");
    divItem.className = "form-check";
    divItem.id = "checkbox" + i;
    listaItem.append(divItem)

    var checkTarea = document.createElement("input");
    checkTarea.type = "checkbox";
    checkTarea.className="form-check-input";
    checkTarea.value = elementos[i].valor;
    checkTarea.id = "checkbox" + i;

    var label = document.createElement("label");
    label.className = "form-check-label";
    label.htmlFor = "checkbox" + i;
    label.id = "checkbox" + i;
    label.appendChild(document.createTextNode(elementos[i].valor));
    divItem.appendChild(checkTarea);
    divItem.appendChild(label);
  }
  removeTarea(elementos);
}

botonTarea.addEventListener(
  "click",
  function (event) {
    const valor = cajaTarea.value;
    agregarElemento(valor);
    cajaTarea.value = ""; // Limpiar el valor del input después de agregarlo al arreglo
    mostrarListaTareas();
    console.log(elementos); // Mostrar el arreglo actualizado en la consola
  },
  false
);

function removeTarea() {
  var checkboxes = document.querySelectorAll('input[type="checkbox"]');
  var label = document.querySelectorAll('label');
  console.log("estos son los labels : ",label);
  for (var i = 0; i < checkboxes.length; i++) {
      checkboxes[i].addEventListener("change", function() {
        if (this.checked) {
            completed(this.value, 1);
      } else {
        completed(this.value, 2);
      }
    });
  }
}

function completed(valor, caso){
    console.log("el valor del elementos es: ", elementos, valor);
    switch (caso) {
        case 1:
            if(elementos.find((element) => element.valor === valor)){
                var indice = elementos.findIndex(element => element.valor === valor);
                console.log("el valor del indice es: ", indice);
                elementos[indice].completed = true
                console.log(elementos);
                var labelCheck = document.querySelector(`label#checkbox${indice}`);
                labelCheck.className = "text-decoration-line-through";
            }
        break;
        
        case 2:
            if(elementos.find((element) => element.valor === valor)){
                var indice = elementos.findIndex(element => element.valor === valor);
                console.log("el valor del indice es: ", indice);
                elementos[indice].completed = false
                console.log(elementos);
                var labelCheck = document.querySelector(`label#checkbox${indice}`);
                labelCheck.className = "text-decoration-none";
            } 
        break;

        default:
            break;
    }   
}

botonDelete.addEventListener(
    "click",
    function (event) {
        var indice = elementos.findIndex(element => element.completed === true);
        elementos.splice(indice,1);
        console.log(elementos);
        document.querySelector(`label#checkbox${indice}`).remove();
        document.querySelector(`input[type="checkbox"]#checkbox${indice}`).remove();
        document.querySelector(`div#checkbox${indice}`).remove();
        document.querySelector(`li#checkbox${indice}`).remove();


    },
    false
  );