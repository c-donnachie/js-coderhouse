class CalculadoraPromedio {
  constructor() {
    this.nombreAlumnoInput = document.getElementById("nombreAlumno")
    this.cantidadNotasInput = document.getElementById("cantidadNotas")
    this.resultadoDivAlumno = document.getElementById("resultado-alumno")
    this.resultadoDivNotas = document.getElementById("resultado-notas")
    this.resultadoDivPromedio = document.getElementById("resultado-promedio")
    this.resultadoDivEstado = document.getElementById("resultado-estado")
    this.border = document.getElementById("border")
    this.aprobado = document.getElementById("lottie-aprobado")
    this.reprobado = document.getElementById("lottie-reprobado")

    this.nombreAlumno = ""
    this.cantidadNotas = 0
    this.notas = []
    this.suma = 0
    this.nota2 = 0
    this.estadoMensaje = ""
    this.estado = ""
    this.promedio = 0

    // Arreglo de Objetos
    this.listaPromedios = []

    document
      .getElementById("calcularButton")
      .addEventListener("click", this.calcularPromedio.bind(this))

    // Inicia la tabla promedios
    this.actualizarTablaPromedios()

    // Agrega evento al filtro
    this.filtroNombreInput = document.getElementById("filtroNombre")
    this.filtroNombreInput.addEventListener("input", () => {
      this.actualizarTablaPromedios()
    })
  }

  calcularPromedio() {
    this.notas = []
    this.suma = 0
    this.nota2 = 0
    this.estadoMensaje = ""
    this.estado = ""
    this.promedio = 0
    this.cantidadNotas = parseInt(this.cantidadNotasInput.value)
    this.nombreAlumno = this.nombreAlumnoInput.value

    // Validaciones nombre estudiante
    if (this.nombreAlumno.trim() === "") {
      alert("Ingresa el nombre del alumno!")
      return
    }

    const expresionRegular = /^[A-Za-z\s]+$/
    if (!expresionRegular.test(this.nombreAlumno)) {
      alert("El nombre del alumno solo debe contener letras y espacios!")
      return
    }

    // Ingreso notas y validaciones
    for (let i = 0; i < this.cantidadNotas; i++) {
      let nota = parseFloat(prompt(`Ingresa la nota número ${i + 1}`))

      this.nota2 = nota >= 10 ? nota : nota.toFixed(1)

      if (isNaN(nota)) {
        alert("Por favor, ingresa un número válido.")
        i--
      } else if (nota > 10) {
        alert("La nota máxima es 10.")
        i--
      } else if (nota < 1) {
        alert("La nota no puede ser menor a 1.")
        i--
      } else {
        this.notas.push(nota)
        this.suma += nota
      }
    }

    // Calcular Promedio
    this.promedio = this.notas.length > 0 ? this.suma / this.notas.length : 0

    // Estados de aprobacion o no
    if (this.promedio === 10) {
      this.estado = "aprobado"
      this.estadoMensaje = "Perfecto 🥳"
    } else if (this.promedio >= 9) {
      this.estado = "aprobado"
      this.estadoMensaje = "Distinguido 🤩"
    } else if (this.promedio >= 7.6) {
      this.estado = "aprobado"
      this.estadoMensaje = "Muy bien 😎"
    } else if (this.promedio >= 6) {
      this.estado = "aprobado"
      this.estadoMensaje = "Suficiente 😁"
    } else {
      this.estado = "reprobado"
      this.estadoMensaje = "Reprobado 🥲"
    }

    // Arreglo de Objetos, Nuevo alumno
    const nuevoAlumno = {
      nombreAlumno: this.nombreAlumno,
      notas: this.notas,
      promedio: this.promedio,
      estado: this.estado,
    }

    this.listaPromedios = [...this.listaPromedios, nuevoAlumno]

    // Resultados
    this.resultadoDivAlumno.innerHTML = "Alumno: " + this.nombreAlumno
    this.resultadoDivNotas.innerHTML = "Notas ingresadas: " + this.notas.join(", ")
    this.resultadoDivPromedio.innerHTML = "Promedio: " + this.promedio.toFixed(1)
    this.resultadoDivEstado.innerHTML = this.estadoMensaje

    // CSS condicionado
    this.aprobado.style.display = this.estado === "aprobado" ? "block" : "none"
    this.reprobado.style.display = this.estado === "reprobado" ? "block" : "none"
    this.border.style.borderColor = this.estado == "aprobado" ? "#00DDB3" : "#F52C2C"
    this.resultadoDivEstado.style.borderColor = this.estado === "aprobado" ? "#00DDB3" : "#F52C2C"
    this.resultadoDivEstado.style.display = this.estado !== "" ? "block" : "none"

    // Limpiar inputs y focus
    this.nombreAlumnoInput.value = ""
    this.nombreAlumnoInput.focus()

    // Llama a actualizar la tabla de promedios
    this.actualizarTablaPromedios()
  }

  actualizarTablaPromedios() {
    const filtroNombre = document.getElementById("filtroNombre").value.toLowerCase()
    const tablaPromedios = document.getElementById("tablaPromedios")
    tablaPromedios.innerHTML = "" // Borrar tabla anterior

    // Nuevo arreglo de "listaPromedios" con map
    const filas = this.listaPromedios
      .filter((alumno) => alumno.nombreAlumno.toLowerCase().includes(filtroNombre))
      .map((alumno) => {
        const fila = document.createElement("tr")
        fila.innerHTML = `
          <td>${alumno.nombreAlumno}</td>
          <td>${alumno.promedio.toFixed(1)}</td>
          <td>${alumno.estado}</td>
        `
        return fila
      })

    // Agrega datos/filas al html
    filas.forEach((fila) => tablaPromedios.appendChild(fila))
  }
}

const calculadora = new CalculadoraPromedio()
