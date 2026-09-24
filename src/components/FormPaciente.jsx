import { useState } from 'react'

const formInicial = {
  nome: '',
  idade: '',
}

export default function FormPaciente({ onSalvar }) {
  const [form, setForm] = useState(formInicial)
  const [erro, setErro] = useState('')

  function atualizarCampo(evento) {
    const { name, value } = evento.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(evento) {
    evento.preventDefault()

    const nome = form.nome.trim()
    if (!nome) {
      setErro('Informe o nome do paciente.')
      return
    }

    onSalvar({
      nome,
      idade: form.idade === '' ? null : Number(form.idade),
    })
    setForm(formInicial)
    setErro('')
  }

  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>Novo paciente</h2>
      <p className="hint">
        Sem login nesta etapa. Cada paciente é um perfil local, só neste
        navegador. As aferições dele ficam isoladas das dos outros.
      </p>

      <div className="grade-campos">
        <label>
          Nome
          <input
            name="nome"
            type="text"
            placeholder="Maria Silva"
            value={form.nome}
            onChange={atualizarCampo}
          />
        </label>
        <label>
          Idade (opcional)
          <input
            name="idade"
            type="number"
            min="1"
            max="120"
            placeholder="58"
            value={form.idade}
            onChange={atualizarCampo}
          />
        </label>
      </div>

      {erro && <p className="erro">{erro}</p>}

      <button type="submit" className="botao-principal">
        Cadastrar paciente
      </button>
    </form>
  )
}