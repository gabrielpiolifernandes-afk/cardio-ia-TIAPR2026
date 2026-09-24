import PerfilPaciente from '../components/PerfilPaciente.jsx'

export default function Perfil({ paciente, afericoes, onIrPacientes }) {
  if (!paciente) {
    return (
      <section className="painel">
        <h2>Nenhum paciente selecionado</h2>
        <p>
          O perfil reúne as medições repetidas de uma pessoa: horários,
          tendência e o recorte educacional (estável, hipertensão, elevação
          com dor ou cuidados médicos).
        </p>
        <button type="button" className="botao-principal" onClick={onIrPacientes}>
          Escolher paciente
        </button>
      </section>
    )
  }

  return <PerfilPaciente paciente={paciente} afericoes={afericoes} />
}