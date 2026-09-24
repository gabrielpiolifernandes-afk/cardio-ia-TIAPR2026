import { useEffect, useState } from 'react'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Pacientes from './pages/Pacientes.jsx'
import Afericoes from './pages/Afericoes.jsx'
import Perfil from './pages/Perfil.jsx'
import { lerEstado, salvarEstado } from './utils/storage.js'
import './App.css'

export default function App() {
  const [inicial] = useState(lerEstado)
  const [pagina, setPagina] = useState('inicio')
  const [pacientes, setPacientes] = useState(inicial.pacientes)
  const [pacienteAtualId, setPacienteAtualId] = useState(inicial.pacienteAtualId)
  const [afericoes, setAfericoes] = useState(inicial.afericoes)

  const pacienteAtual = pacientes.find((item) => item.id === pacienteAtualId) ?? null
  const afericoesDoPaciente = afericoes.filter(
    (item) => item.pacienteId === pacienteAtualId,
  )

  useEffect(() => {
    const titulos = {
      inicio: 'CardioIA',
      pacientes: 'Pacientes | CardioIA',
      afericoes: 'Aferições | CardioIA',
      perfil: 'Perfil | CardioIA',
    }
    document.title = titulos[pagina] ?? 'CardioIA'
  }, [pagina])

  useEffect(() => {
    salvarEstado({ pacientes, pacienteAtualId, afericoes })
  }, [pacientes, pacienteAtualId, afericoes])

  function salvarPaciente(dados) {
    const novo = {
      id: crypto.randomUUID(),
      ...dados,
      criadoEm: new Date().toISOString(),
    }

    setPacientes((prev) => [novo, ...prev])
    setPacienteAtualId(novo.id)
  }

  function salvarAfericao(dados) {
    if (!pacienteAtualId) return

    const nova = {
      id: crypto.randomUUID(),
      pacienteId: pacienteAtualId,
      ...dados,
      registradoEm: new Date().toISOString(),
    }

    setAfericoes((prev) => [nova, ...prev])
  }

  function removerAfericao(id) {
    setAfericoes((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <Layout
      paginaAtual={pagina}
      onNavegar={setPagina}
      pacienteAtual={pacienteAtual}
    >
      {pagina === 'inicio' && (
        <Home
          totalPacientes={pacientes.length}
          totalAfericoes={afericoes.length}
          pacienteAtual={pacienteAtual}
          onIrPacientes={() => setPagina('pacientes')}
          onIrAfericoes={() => setPagina('afericoes')}
        />
      )}
      {pagina === 'pacientes' && (
        <Pacientes
          pacientes={pacientes}
          pacienteAtualId={pacienteAtualId}
          afericoes={afericoes}
          onSalvar={salvarPaciente}
          onSelecionar={setPacienteAtualId}
        />
      )}
      {pagina === 'afericoes' && (
        <Afericoes
          paciente={pacienteAtual}
          afericoes={afericoesDoPaciente}
          onSalvar={salvarAfericao}
          onRemover={removerAfericao}
          onIrPacientes={() => setPagina('pacientes')}
        />
      )}
      {pagina === 'perfil' && (
        <Perfil
          paciente={pacienteAtual}
          afericoes={afericoesDoPaciente}
          onIrPacientes={() => setPagina('pacientes')}
        />
      )}
    </Layout>
  )
}