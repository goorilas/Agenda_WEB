import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import PessoasLista from './pages/pessoas-lista/pessoas-lista';
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle"
import Loading from './components/loading/loading';
import PessoasListaStore from './pages/pessoas-lista/pessoas-lista.store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Loading>
      <PessoasListaStore>
        <PessoasLista />
      </PessoasListaStore>
    </Loading>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
