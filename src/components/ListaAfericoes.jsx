import { classificarPressao } from '../utils/classificarPressao.js'
 
function formatarData(iso) {
  return new Date(iso).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  })
}
 
function rotuloContexto(contexto) {
  if (contexto === 'dor') return 'durante dor'
  if (contexto === 'esforco') return 'após esforço'
  if (contexto === 'outro') return 'outro contexto'
  return 'rotina'
}
 
export default function ListaAfericoes({ afericoes, onRemover }) {
  if (afericoes.length === 0) {
    return (
      <p className="vazio">
        Nenhuma aferição neste paciente. Preencha o formulário acima. Medições
        de outros perfis não aparecem aqui.
      </p>
    )
  }
 
  return (
    <ul className="lista-afericoes">
      {afericoes.map((item) => {
        const classe = classificarPressao(item.sistolica, item.diastolica)
 
        return (
          <li key={item.id} className="card-afericao">
            <div>
              <p className="medida">
                {item.sistolica}/{item.diastolica}{' '}
                <span>mmHg</span>
              </p>
              <p className="meta">
                {formatarData(item.registradoEm)}
                {item.pulso ? ` · pulso ${item.pulso} bpm` : ''}
                {` · ${rotuloContexto(item.contexto)}`}
              </p>
            </div>
            <div className="acoes-card">
              <span className={`selo selo-${classe.nivel}`}>{classe.rotulo}</span>
              <button type="button" onClick={() => onRemover(item.id)}>
                Remover
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}