import FormPaciente from '../components/FormPaciente.jsx'
import ListaPacientes from '../components/ListaPacientes.jsx'

export default function Pacientes({
  pacientes,
  pacienteAtualId,
  afericoes,
  onSalvar,
  onSelecionar,
}) {
  return (
    <section className="painel">
      <FormPaciente onSalvar={onSalvar} />
      <h2>Pacientes deste aparelho</h2>
      <p className="hint">
        Clique em um card para selecionar o paciente. As aferições da outra
        aba passam a gravar só neste perfil.
      </p>
      <ListaPacientes
        pacientes={pacientes}
        pacienteAtualId={pacienteAtualId}
        afericoes={afericoes}
        onSelecionar={onSelecionar}
      />
    </section>
  )
}