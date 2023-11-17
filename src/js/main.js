document.addEventListener("DOMContentLoaded", function () {
  const calculadora = new CalculadoraPromedio()

  var agregarBtn = document.getElementById("agregarBtn")
  agregarBtn.addEventListener("click", function (event) {
    event.preventDefault()
    calculadora.agregarInput()
  })

  var calcularButton = document.getElementById("calcularButton")
  calcularButton.addEventListener("click", function () {
    calculadora.calcularPromedio()
    document.activeElement.blur()
    scrollAlElemento("resultados")
  })

  calcularButton.addEventListener("touchend", function () {
    scrollAlElemento("resultados")
  })

  function scrollAlElemento(elementoID) {
    var elemento = document.getElementById(elementoID)
    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth" })
    }
  }
})

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
    this.notasInputs = document.getElementById("notas-inputs")

    // Iniciar con dos inputs
    this.agregarInputsIniciales(2)

    this.inicializarListaPromedios()

    this.nombreAlumno = ""
    this.cantidadNotas = 2
    this.notas = []
    this.estadoMensaje = ""
    this.estado = ""
    this.promedio = 0
    this.listaPromedios = []

    this.filtroNombreInput = document.getElementById("filtroNombre")
    this.filtroNombreInput.addEventListener("input", () => {
      this.actualizarTablaPromedios()
    })

    // Condicional CSS Cantidad notas
    if (this.cantidadNotas <= 1) {
      this.notasInputs.style.display = this.estado === "aprobado" ? "block" : "none"
    }
  }

  limpiarInputs() {
    var inputs = this.notasInputs.querySelectorAll("input")

    inputs.forEach(function (input) {
      input.value = ""
    })
  }

  async inicializarListaPromedios() {
    try {
      const response = await fetch("https://run.mocky.io/v3/1efbc0bb-f15e-4d29-ae69-44741f28afde")
      const data = await response.json()

      if (Array.isArray(data)) {
        this.listaPromedios = data
        this.actualizarTablaPromedios()
      } else {
        console.error("Error: Los datos obtenidos no son un arreglo.")
      }
    } catch (error) {
      console.error("Error al obtener los datos:", error)
    }
  }

  agregarInputsIniciales(cantidad) {
    for (let i = 0; i < cantidad; i++) {
      this.agregarInput()
    }
  }

  agregarInput() {
    var nuevoInput = document.createElement("div")
    nuevoInput.classList.add("input-container")

    var inputElement = document.createElement("input")
    inputElement.setAttribute("type", "number")
    inputElement.setAttribute("min", "1")
    inputElement.setAttribute("max", "10")
    inputElement.placeholder = `Nota ${this.notasInputs.children.length + 1}`

    var deleteButton = document.createElement("div")
    deleteButton.innerText = "x"
    deleteButton.classList.add("button-delete")

    deleteButton.addEventListener("click", () => {
      this.eliminarInput(nuevoInput)
    })

    nuevoInput.appendChild(inputElement)
    nuevoInput.appendChild(deleteButton)

    this.notasInputs.appendChild(nuevoInput)

    // Configurar MutationObserver para detectar cambios en el DOM
    var observer = new MutationObserver(() => {
      this.actualizarVisibilidadEliminar()
    })

    // Observar cambios en notasInputs
    observer.observe(this.notasInputs, { childList: true })

    // Detener la la obserbacion
    setTimeout(() => {
      observer.disconnect()
    }, 100)
  }

  eliminarInput(inputDiv) {
    var inputs = this.notasInputs.children

    // Verificar si hay mas elementos
    if (inputs.length > 2) {
      this.notasInputs.removeChild(inputDiv)
      this.renumerarInputs()
    }

    // Actualizar la visibilidad de eliminar
    this.actualizarVisibilidadEliminar()
  }

  actualizarVisibilidadEliminar() {
    var inputs = this.notasInputs.children
    var tieneDosElementos = inputs.length === 2

    for (let i = 0; i < inputs.length; i++) {
      var deleteButton = inputs[i].querySelector("div")
      if (deleteButton) {
        deleteButton.disabled = tieneDosElementos
        deleteButton.style.display = tieneDosElementos ? "none" : "block"
      }
    }
  }

  calcularPromedio() {
    this.notas = []
    this.promedio = 0
    this.nombreAlumno = this.nombreAlumnoInput.value

    // Validaciones nombre estudiante
    if (this.nombreAlumno.trim() === "") {
      Swal.fire({
        title: "No tan rapido...",
        text: "Ingresa un nombre",
        icon: "error",
        confirmButtonText: "Ok",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      })
      return
    }

    const expresionRegular = /^[A-Za-z\s]+$/
    if (!expresionRegular.test(this.nombreAlumno)) {
      Swal.fire({
        title: "Heyyy!",
        text: "¡El nombre del alumno solo debe contener letras y espacios!",
        icon: "error",
        confirmButtonText: "Ok",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `,
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `,
        },
      })
      return
    }

    // Obtener notas de los inputs
    var inputs = document.querySelectorAll("#notas-inputs input")
    for (let i = 0; i < inputs.length; i++) {
      let input = inputs[i]
      let nota = parseFloat(input.value.trim())

      // Validarciones
      if (isNaN(nota) || input.value.trim() === "") {
        Swal.fire({
          title: "No tan rapido...",
          text: "Ingresa un número en todos los campos.",
          icon: "error",
          confirmButtonText: "Ok",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
          },
        })
        return
      } else if (nota > 10 || nota < 1) {
        Swal.fire({
          title: "No tan rapido...",
          text: "La nota debe estar entre 1 y 10.",
          icon: "error",
          confirmButtonText: "Ok",
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `,
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `,
          },
        })
        return
      } else {
        this.notas.push(nota)
      }
    }

    // Calcular Promedio
    this.promedio = this.notas.length > 0 ? this.calcularPromedioTotal() : 0

    // Estados de aprobación o no
    this.calcularEstado()

    // Arreglo de Objetos, Nuevo alumno
    const nuevoAlumno = {
      nombreAlumno: this.nombreAlumno,
      notas: [...this.notas],
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
    this.limpiarInputs()
    this.nombreAlumnoInput.value = ""
    // this.nombreAlumnoInput.focus()

    // Llama a actualizar la tabla de promedios
    this.actualizarTablaPromedios()
  }

  calcularPromedioTotal() {
    return this.notas.reduce((total, nota) => total + nota, 0) / this.notas.length
  }

  calcularEstado() {
    if (this.promedio === 10) {
      this.estado = "aprobado"
      this.estadoMensaje = "¡Perfecto 🥳!"
    } else if (this.promedio >= 9) {
      this.estado = "aprobado"
      this.estadoMensaje = "¡Distinguido 🤩!"
    } else if (this.promedio >= 7.6) {
      this.estado = "aprobado"
      this.estadoMensaje = "¡Muy bien 😎!"
    } else if (this.promedio >= 6) {
      this.estado = "aprobado"
      this.estadoMensaje = "¡Suficiente 😁!"
    } else {
      this.estado = "reprobado"
      this.estadoMensaje = "¡Reprobado 🥲!"
    }
  }

  actualizarTablaPromedios() {
    const filtroNombre = this.filtroNombreInput.value.toLowerCase()
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
