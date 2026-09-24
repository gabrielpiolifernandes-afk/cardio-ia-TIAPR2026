import { useState } from 'react'
 
const formInicial = {
  sistolica: '',
  diastolica: '',
  pulso: '',
  contexto: 'rotina',
}
 
export default function FormAfericao({ onSalvar, desabilitado }) {
  const [form, setForm] = useState(formInicial)
  const [erro, setErro] = useState('')
 
  function atualizarCampo(evento) {
    const { name, value } = evento.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }
 
  function handleSubmit(evento) {
    evento.preventDefault()
 
    if (desabilitado) {
      setErro('Selecione um paciente antes de salvar a medição.')
      return
    }
 
    const sistolica = Number(form.sistolica)
    const diastolica = Number(form.diastolica)
    const pulso = form.pulso === '' ? null : Number(form.pulso)
 
    if (!sistolica || !diastolica) {
      setErro('Informe sistólica e diastólica em mmHg.')
      return
    }
 
    if (sistolica <= diastolica) {
      setErro('A sistólica precisa ser maior que a diastólica.')
      return
    }
 
    onSalvar({
      sistolica,
      diastolica,
      pulso,
      contexto: form.contexto,
    })
    setForm(formInicial)
    setErro('')
  }
 
  return (
    <form className="formulario" onSubmit={handleSubmit}>
      <h2>Nova aferição</h2>
      <p className="hint">
        Valores em mmHg, como no medidor. O contexto (rotina ou dor) entra no
        perfil. Registro educacional, não diagnóstico médico.
      </p>
 
      <div className="grade-campos">
        <label>
          Sistólica
          <input
            name="sistolica"
            type="number"
            min="70"
            max="250"
            placeholder="120"
            value={form.sistolica}
            onChange={atualizarCampo}
            disabled={desabilitado}
          />
        </label>
        <label>
          Diastólica
          <input
            name="diastolica"
            type="number"
            min="40"
            max="150"
            placeholder="80"
            value={form.diastolica}
            onChange={atualizarCampo}
            disabled={desabilitado}
          />
        </label>
        <label>
          Pulso (opcional)
          <input
            name="pulso"
            type="number"
            min="30"
            max="220"
            placeholder="72"
            value={form.pulso}
            onChange={atualizarCampo}
            disabled={desabilitado}
          />
        </label>
        <label>
          Contexto
          <select
            name="contexto"
            value={form.contexto}
            onChange={atualizarCampo}
            disabled={desabilitado}
          >
            <option value="rotina">Rotina / repouso</option>
            <option value="dor">Durante dor</option>
            <option value="esforco">Após esforço</option>
            <option value="outro">Outro</option>
          </select>
        </label>
      </div>
 
      {erro && <p className="erro">{erro}</p>}
 
      <button type="submit" className="botao-principal" disabled={desabilitado}>
        Salvar neste paciente
      </button>
    </form>
  )
}