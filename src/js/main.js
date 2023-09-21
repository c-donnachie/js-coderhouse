
const input = document.getElementById('input-1')

// Notas

let notas = []
const cantidadNotas = 4

// const promediarNotas = () => {
//     for (let i = 0; i === notas.length; i++) {

//     }
// }


for (let i = 0; i === cantidadNotas; i++)  {
    let nota = prompt(`Ingresa la nota numero ${i}`)
    notas.push(nota)
    console.log(nota)
    document.write(notas)
}