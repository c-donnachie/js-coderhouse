function calcularPromedio() {
  const cantidadNotasInput = document.getElementById("cantidadNotas")
  const resultadoDivNotas = document.getElementById("resultado-notas")
  const resultadoDivPromedio = document.getElementById("resultado-promedio")
  const resultadoDivEstado = document.getElementById("resultado-estado")
  const border = document.getElementById("border")
  const aprobado = document.getElementById("lottie-aprobado")
  const reprobado = document.getElementById("lottie-reprobado")

  const cantidadNotas = parseInt(cantidadNotasInput.value)
  const notas = []
  let suma = 0

  for (let i = 0; i < cantidadNotas; i++) {
    let nota = parseFloat(prompt(`Ingresa la nota número ${i + 1}`))

    if (isNaN(nota)) {
      alert("Por favor, ingresa un número válido.")
      i--
    } else {
      notas.push(nota)
      suma += nota
    }
  }

  const promedio = notas.length > 0 ? suma / notas.length : 0
  let estadoMensaje = ""
  let estado = ""

  if (promedio === 10.0) {
    estado = "aprobado"
    estadoMensaje = "Perfecto 🥳"
  } else if (promedio >= 9.0) {
    estado = "aprobado"
    estadoMensaje = "Distinguido 🤩"
  } else if (promedio >= 7,6.0) {
    estado = "aprobado"
    estadoMensaje = "Muy bien 😎"
  } else if (promedio >= 6.0) {
    estado = "aprobado"
    estadoMensaje = "Suficiente 😁"
  } else {
    estado = "reprobado"
    estadoMensaje = "Reprobado 🥲"
  }

  resultadoDivNotas.innerHTML = "Notas ingresadas: " + notas.join(", ")
  resultadoDivPromedio.innerHTML = "Promedio: " + promedio.toFixed(2)
  resultadoDivEstado.innerHTML = estadoMensaje

  aprobado.style.display = estado === "aprobado" ? "block" : "none"
  reprobado.style.display = estado === "reprobado" ? "block" : "none"
  border.style.borderColor = estado == "aprobado" ? "#00DDB3" : "#F52C2C"
  resultadoDivEstado.style.borderColor = estado === "aprobado" ? "#00DDB3" : "#F52C2C"
  resultadoDivEstado.style.display = estado !== "" ? "block" : "none"
}

document.getElementById("calcularButton").addEventListener("click", calcularPromedio)
