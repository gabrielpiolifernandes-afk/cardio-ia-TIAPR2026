export default function Home({
  totalPacientes,
  totalAfericoes,
  pacienteAtual,
  onIrPacientes,
  onIrAfericoes,
}) {
  return (
    <section className="painel">
      <h2>Pacientes e medições, cada um no seu perfil</h2>
      <p>
        O CardioIA agora separa os dados por paciente, ainda sem login. O
        médico (ou vocês, no laboratório) escolhe o perfil, registra aferições
        repetidas e acompanha horários. A inteligência artificial continua
        fora desta aula.
      </p>
      <p className="hint">
        {totalPacientes} paciente(s) · {totalAfericoes} aferição(ões) no
        aparelho
        {pacienteAtual ? ` · atual: ${pacienteAtual.nome}` : ' · nenhum selecionado'}
      </p>
      <div className="acoes-home">
        <button type="button" className="botao-principal" onClick={onIrPacientes}>
          Cadastrar ou escolher paciente
        </button>
        <button type="button" className="botao-secundario" onClick={onIrAfericoes}>
          Ir para aferições
        </button>
      </div>
    </section>
  )
}