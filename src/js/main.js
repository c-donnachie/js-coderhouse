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
  let estado = ""

  const  x = document.getElementById("resultado-estado")

  // animaciones lotties
  const aprobado = document.getElementById("lottie-aprobado")
  const reprobado = document.getElementById("lottie-reprobado")

  //border of container
  const border = document.getElementById("border")

  function resultado() {
    if (estado !== "") {
      x.style.display = "block"
    }
  }

  if (promedio === 100.0) {
    estado = " Perfecto 🥳"
    x.style.borderColor = "#00DDB3"
    aprobado.style.display = "block"
    border.style.borderColor = "#00DDB3"
  } else if (promedio >= 90.0) {
    estado = " Distinguido 🤩"
    x.style.borderColor = "#00DDB3"
  } else if (promedio >= 76.0) {
    estado = " Bueno 😎"
    x.style.borderColor = "#00DDB3"
  } else if (promedio >= 60.0) {
    estado = " Suficiente 😁"
    x.style.borderColor = "#00DDB3"
  } else {
    estado = " Reprobado 🥲"
    x.style.borderColor = "rgb(245, 44, 44)"
    reprobado.style.display = "block"
    border.style.borderColor = 'rgb(245, 44, 44)'
  }

  resultado()

  const resultadoDivNotas = document.getElementById("resultado-notas")
  const resultadoDivPromedio = document.getElementById("resultado-promedio")
  const resultadoDivEstado = document.getElementById("resultado-estado")

  resultadoDivNotas.innerHTML = "Notas ingresadas: " + notas.join(", ")
  resultadoDivPromedio.innerHTML = "Promedio: " + promedio.toFixed(2)
  resultadoDivEstado.innerHTML = estado
}

document.getElementById("calcularButton").addEventListener("click", calcularPromedio)
