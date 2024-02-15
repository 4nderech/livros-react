import { useState, useEffect } from "react";

import ControleEditora from "./controle/ControleEditora";
import ControleLivro from "./controle/ControleLivros";

const controleLivros = new ControleLivro();
const controleEditora = new ControleEditora();

const LinhaLivro = props => {
  const { livro, excluir } = props;
  const nomeEditora = controleEditora.getNomeEditora;

  return (
    <tr>
      <td>
        <p>{livro.titulo}</p>
        <button type="button" className="btn btn-danger" onClick={() => excluir(livro.codigo)}>Excluir</button>
      </td>
      <td>{livro.resumo}</td>
      <td>{nomeEditora(livro.codEditora)}</td>
      <td>
        <ul>
          {livro.autores.map((autor, index) => (
            <li key={index}>{autor}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
}

const LivroLista = () => {
  const [livros, setLivros] = useState([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    setLivros(controleLivros.obterLivros());
    setCarregado(true);
  }, [carregado]);

  const excluir = (codigo) => {
    controleLivros.excluir(codigo);
    setCarregado(false);
  }

  return (
    <main class="container-fluid">
      <h1>Catálogo de Livros</h1>
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th className='col-sm-2'>Título</th>
            <th className='col-sm-6'>Resumo</th>
            <th className='col-sm-2'>Editora</th>
            <th className='col-sm-2'>Autores</th>
          </tr>
        </thead>
        <tbody>
          {livros.map(livro => (
            <LinhaLivro
              key={livro.codigo}
              livro={livro}
              excluir={excluir}
              getNomeEditora={controleEditora.getNomeEditora}
            />
          ))}
        </tbody>
      </table>
    </main>
  )
}

export default LivroLista;