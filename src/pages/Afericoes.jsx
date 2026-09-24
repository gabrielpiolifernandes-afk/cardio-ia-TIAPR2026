import FormAfericao from '../components/FormAfericao.jsx'
import ListaAfericoes from '../components/ListaAfericoes.jsx'

export default function Afericoes({
  paciente,
  afericoes,
  onSalvar,
  onRemover,
  onIrPacientes,
}) {
  if (!paciente) {
    return (
      <section className="painel">
        <h2>Selecione um paciente</h2>
        <p>
          Cada medição precisa de um perfil. Sem isso, os dados de pessoas
          diferentes se misturam de novo.
        </p>
        <button type="button" className="botao-principal" onClick={onIrPacientes}>
          Ir para pacientes
        </button>
      </section>
    )
  }

  return (
    <section className="painel">
      <p className="hint">
        Gravando em <strong>{paciente.nome}</strong>. Só as aferições deste
        id aparecem no histórico abaixo.
      </p>
      <FormAfericao onSalvar={onSalvar} />
      <h2>Histórico deste paciente</h2>
      <ListaAfericoes afericoes={afericoes} onRemover={onRemover} />
    </section>
  )
}