export default function ListaPacientes({
  pacientes,
  pacienteAtualId,
  afericoes,
  onSelecionar,
}) {
  if (pacientes.length === 0) {
    return (
      <p className="vazio">
        Nenhum paciente cadastrado. Use o formulário acima para criar o primeiro
        perfil.
      </p>
    )
  }

  return (
    <ul className="lista-pacientes">
      {pacientes.map((paciente) => {
        const total = afericoes.filter((item) => item.pacienteId === paciente.id).length
        const ativo = paciente.id === pacienteAtualId

        return (
          <li key={paciente.id}>
            <button
              type="button"
              className={ativo ? 'card-paciente ativo' : 'card-paciente'}
              onClick={() => onSelecionar(paciente.id)}
            >
              <span className="paciente-nome">{paciente.nome}</span>
              <span className="meta">
                {paciente.idade ? `${paciente.idade} anos · ` : ''}
                {total} aferição(ões)
                {ativo ? ' · selecionado' : ''}
              </span>
            </button>
          </li>
        )
      })}
    </ul>
  )
}