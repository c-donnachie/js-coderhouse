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
  let nota2 = 0

  for (let i = 0; i < cantidadNotas; i++) {
    let nota = parseFloat(prompt(`Ingresa la nota número ${i + 1}`))

    nota2 = nota >= 10 ? nota : nota.toFixed(1)

    if (isNaN(nota)) {
      alert("Por favor, ingresa un número válido.")
      i--
    } else if (nota > 10) {
      alert("La nota maxima es un 10!")
      i--
    } else if (nota < 1) {
      alert("La nota no puede ser menor a 1!")
      i--
    } else {
      notas.push(nota)
      suma += nota
    }
  }

  const promedio = notas.length > 0 ? suma / notas.length : 0
  let estadoMensaje = ""
  let estado = ""

  if (promedio === 10) {
    estado = "aprobado"
    estadoMensaje = "Perfecto 🥳"
  } else if (promedio >= 9) {
    estado = "aprobado"
    estadoMensaje = "Distinguido 🤩"
  } else if (promedio >= 7.6) {
    estado = "aprobado"
    estadoMensaje = "Muy bien 😎"
  } else if (promedio >= 6) {
    estado = "aprobado"
    estadoMensaje = "Suficiente 😁"
  } else {
    estado = "reprobado"
    estadoMensaje = "Reprobado 🥲"
  }

  resultadoDivNotas.innerHTML = "Notas ingresadas: " + notas.join(", ")
  resultadoDivPromedio.innerHTML = "Promedio: " + promedio
  resultadoDivEstado.innerHTML = estadoMensaje

  aprobado.style.display = estado === "aprobado" ? "block" : "none"
  reprobado.style.display = estado === "reprobado" ? "block" : "none"
  border.style.borderColor = estado == "aprobado" ? "#00DDB3" : "#F52C2C"
  resultadoDivEstado.style.borderColor = estado === "aprobado" ? "#00DDB3" : "#F52C2C"
  resultadoDivEstado.style.display = estado !== "" ? "block" : "none"
}

document.getElementById("calcularButton").addEventListener("click", calcularPromedio)
