function calcularPromedio() {
  let notas = []
  const cantidadNotasInput = document.getElementById("cantidadNotas")
    const cantidadNotas = parseInt(cantidadNotasInput.value)
    
  for (let i = 0; i < cantidadNotas; i++) {
    let nota = parseFloat(prompt(`Ingresa la nota número ${i + 1}`))

    if (!isNaN(nota)) {
      notas.push(nota)
      console.log(nota)
    } else {
      alert("Por favor, ingresa un número válido.")
      i--
    }
  }

  let suma = 0
  for (let i = 0; i < notas.length; i++) {
    suma += notas[i]
  }

  let promedio = suma / notas.length

  const resultadoDiv = document.getElementById("resultado")
  resultadoDiv.innerHTML = "Notas ingresadas: " + notas.join(", ") + "<br>"
  resultadoDiv.innerHTML += "Promedio: " + promedio.toFixed(2)
}

document.getElementById("calcularButton").addEventListener("click", calcularPromedio)
