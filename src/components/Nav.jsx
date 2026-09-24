const itens = [
  { id: 'inicio', rotulo: 'Início' },
  { id: 'pacientes', rotulo: 'Pacientes' },
  { id: 'afericoes', rotulo: 'Aferições' },
  { id: 'perfil', rotulo: 'Perfil' },
]
 
export default function Nav({ paginaAtual, onNavegar }) {
  return (
    <nav className="nav" aria-label="Seções do CardioIA">
      {itens.map((item) => (
        <button
          key={item.id}
          type="button"
          className={paginaAtual === item.id ? 'nav-item ativo' : 'nav-item'}
          onClick={() => onNavegar(item.id)}
        >
          {item.rotulo}
        </button>
      ))}
    </nav>
  )
}