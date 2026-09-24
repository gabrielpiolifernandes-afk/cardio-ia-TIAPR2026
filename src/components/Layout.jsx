import Header from './Header.jsx'
import Nav from './Nav.jsx'
 
export default function Layout({
  children,
  paginaAtual,
  onNavegar,
  pacienteAtual,
}) {
  const subtitulo = pacienteAtual
    ? `Paciente em análise: ${pacienteAtual.nome}. Medições isoladas neste perfil.`
    : 'Cadastre um paciente para isolar as aferições. Sem login nesta etapa.'
 
  return (
    <div className="layout">
      <Header titulo="CardioIA" subtitulo={subtitulo} />
      <Nav paginaAtual={paginaAtual} onNavegar={onNavegar} />
      <div className="conteudo">{children}</div>
    </div>
  )
}