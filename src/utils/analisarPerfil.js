import { classificarPressao } from './classificarPressao.js'

export function analisarPerfil(afericoes) {
  if (!afericoes.length) {
    return {
      rotulo: 'Sem histórico',
      nivel: 'vazio',
      texto:
        'Ainda não há aferições deste paciente. Registre pelo menos duas medições, em horários diferentes, para montar o perfil.',
    }
  }

  const ordenadas = [...afericoes].sort(
    (a, b) => new Date(a.registradoEm) - new Date(b.registradoEm),
  )
  const ultima = ordenadas[ordenadas.length - 1]
  const classeUltima = classificarPressao(ultima.sistolica, ultima.diastolica)

  if (classeUltima.nivel === 'crise') {
    return {
      rotulo: 'Cuidados médicos',
      nivel: 'crise',
      texto:
        'A última aferição chegou em faixa de crise (educacional: sistólica >= 180 ou diastólica >= 120). Oriente busca de atendimento. Isto não é diagnóstico.',
    }
  }

  if (ordenadas.length >= 2) {
    const anterior = ordenadas[ordenadas.length - 2]
    const deltaS = ultima.sistolica - anterior.sistolica
    if (deltaS >= 15 && ultima.contexto === 'dor') {
      return {
        rotulo: 'Elevação com dor',
        nivel: 'atencao',
        texto: `A sistólica subiu ${deltaS} mmHg em relação à medição anterior, no contexto de dor. Vale repetir em repouso. Se permanecer alta, buscar avaliação. Recorte educacional, não laudo.`,
      }
    }
  }

  const altas = ordenadas.filter((item) => {
    const classe = classificarPressao(item.sistolica, item.diastolica)
    return classe.nivel === 'alta' || classe.nivel === 'crise'
  })

  if (altas.length >= 2 || (ordenadas.length >= 3 && altas.length / ordenadas.length >= 0.5)) {
    return {
      rotulo: 'Perfil hipertensivo',
      nivel: 'alta',
      texto: `Das ${ordenadas.length} aferições, ${altas.length} ficaram em alta ou crise. Padrão compatível com acompanhamento de hipertensão, sempre como material didático.`,
    }
  }

  if (classeUltima.nivel === 'alta' || classeUltima.nivel === 'limite') {
    return {
      rotulo: 'Atenção na última medição',
      nivel: classeUltima.nivel,
      texto: `A medição mais recente ficou em ${classeUltima.rotulo}. Repita em outro horário para confirmar o padrão deste paciente.`,
    }
  }

  return {
    rotulo: 'Estável neste recorte',
    nivel: 'normal',
    texto: 'As medições registradas, neste recorte educacional, não indicam crise. Continue isolando os dados por paciente e anotando o horário.',
  }
}