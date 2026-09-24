import { analisarPerfil } from '../utils/analisarPerfil.js'
import { classificarPressao } from '../utils/classificarPressao.js'

function formatarData(iso) {
  return new Date(iso).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}

export default function PerfilPaciente({ paciente, afericoes }) {
  const perfil = analisarPerfil(afericoes)
  const ordenadas = [...afericoes].sort(
    (a, b) => new Date(a.registradoEm) - new Date(b.registradoEm),
  )

  return (
    <section className="painel">
      <h2>Perfil de {paciente.nome}</h2>
      <p className="hint">
        {paciente.idade ? `${paciente.idade} anos. ` : ''}
        {afericoes.length} medição(ões) isoladas neste perfil. Análise
        educacional, não substitui avaliação médica.
      </p>

      <div className={`resumo-perfil selo-${perfil.nivel}`}>
        <strong>{perfil.rotulo}</strong>
        <p>{perfil.texto}</p>
      </div>

      <h3>Linha do tempo</h3>
      {ordenadas.length === 0 ? (
        <p className="vazio">Sem horários registrados ainda.</p>
      ) : (
        <ol className="linha-tempo">
          {ordenadas.map((item) => {
            const classe = classificarPressao(item.sistolica, item.diastolica)
            return (
              <li key={item.id}>
                <span className="meta">{formatarData(item.registradoEm)}</span>
                <span>
                  {item.sistolica}/{item.diastolica} mmHg
                  {item.contexto && item.contexto !== 'rotina'
                    ? ` · ${item.contexto}`
                    : ''}
                </span>
                <span className={`selo selo-${classe.nivel}`}>{classe.rotulo}</span>
              </li>
            )
          })}
        </ol>
      )}
    </section>
  )
}