const STORAGE_KEY = 'cardioia-dados-v2'
const STORAGE_ANTIGO = 'cardioia-afericoes'

export function estadoVazio() {
  return {
    pacientes: [],
    pacienteAtualId: null,
    afericoes: [],
  }
}

export function lerEstado() {
  try {
    const atual = localStorage.getItem(STORAGE_KEY)
    if (atual) {
      const dados = JSON.parse(atual)
      return {
        pacientes: dados.pacientes ?? [],
        pacienteAtualId: dados.pacienteAtualId ?? null,
        afericoes: dados.afericoes ?? [],
      }
    }

    const antigo = localStorage.getItem(STORAGE_ANTIGO)
    if (antigo) {
      const lista = JSON.parse(antigo)
      if (Array.isArray(lista) && lista.length > 0) {
        const id = crypto.randomUUID()
        return {
          pacientes: [
            {
              id,
              nome: 'Paciente importado',
              idade: '',
              criadoEm: new Date().toISOString(),
            },
          ],
          pacienteAtualId: id,
          afericoes: lista.map((item) => ({
            ...item,
            pacienteId: id,
            contexto: item.contexto || 'rotina',
          })),
        }
      }
    }
  } catch {
    return estadoVazio()
  }

  return estadoVazio()
}

export function salvarEstado(dados) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dados))
}