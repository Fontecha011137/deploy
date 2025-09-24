import { useState } from 'react'
import './App.css'

const palabras = ['react', 'ahorcado', 'computadora', 'programa']

const getPalabraAleatoria = () =>
  palabras[Math.floor(Math.random() * palabras.length)]

function App() {
  const [palabra, setPalabra] = useState(getPalabraAleatoria)
  const [letrasAdivinadas, setLetrasAdivinadas] = useState([])
  const [letrasIncorrectas, setLetrasIncorrectas] = useState([])
  const [letra, setLetra] = useState('')
  const [mensaje, setMensaje] = useState('')

  const manejarEnvio = (e) => {
    e.preventDefault()

    if (!letra.match(/^[a-zA-ZñÑáéíóúÁÉÍÓÚ]$/)) {
      setMensaje('Introduce una sola letra válida.')
      return
    }

    const letraMin = letra.toLowerCase()

    if (letrasAdivinadas.includes(letraMin) || letrasIncorrectas.includes(letraMin)) {
      setMensaje('Ya usaste esa letra.')
      return
    }

    if (palabra.includes(letraMin)) {
      setLetrasAdivinadas([...letrasAdivinadas, letraMin])
      setMensaje('')
    } else {
      setLetrasIncorrectas([...letrasIncorrectas, letraMin])
      setMensaje('')
    }

    setLetra('')
  }

  const mostrarPalabra = palabra
    .split('')
    .map((l) => (letrasAdivinadas.includes(l) ? l : '_'))
    .join(' ')

  const juegoGanado = !mostrarPalabra.includes('_')
  const juegoPerdido = letrasIncorrectas.length >= 6

  const reiniciarJuego = () => {
    setPalabra(getPalabraAleatoria())
    setLetrasAdivinadas([])
    setLetrasIncorrectas([])
    setLetra('')
    setMensaje('')
  }

  return (
    <div className="container">
      <h1>Juego del Ahorcado</h1>

      <p className="palabra">Palabra: {mostrarPalabra}</p>

      <form onSubmit={manejarEnvio}>
        <input
          type="text"
          maxLength="1"
          value={letra}
          onChange={(e) => setLetra(e.target.value)}
          disabled={juegoGanado || juegoPerdido}
          className="input-letra"
        />
        <button type="submit" disabled={juegoGanado || juegoPerdido}>
          Probar
        </button>
      </form>

      {mensaje && <p className="mensaje">{mensaje}</p>}

      <p>Letras incorrectas: {letrasIncorrectas.join(', ')}</p>

      {juegoGanado && <p className="ganaste">🎉 ¡Ganaste!</p>}
      {juegoPerdido && (
        <p className="perdiste">
          💀 Perdiste. La palabra era: <strong>{palabra}</strong>
        </p>
      )}

      {(juegoGanado || juegoPerdido) && (
        <button onClick={reiniciarJuego} className="btn-reiniciar">
          🔁 Reiniciar Juego
        </button>
      )}
    </div>
  )
}

export default App
