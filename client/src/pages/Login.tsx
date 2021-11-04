import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

import { UserContext } from '../context/userContext';

interface DefaultContext {
  token?: string,
  setToken: (token: string) => void,
  user?: {
    id: string,
    name: string,
    email: string,
  }
}

function Login(): JSX.Element {
  const { setToken } = useContext<DefaultContext>(UserContext);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [login, setLogin] = useState<boolean>(false);

  const loginUser = async (ev: any) => {
    ev.preventDefault();
    const payload = { email, password };
    try {
      const { data } = await api.post('api/login', payload);
      setToken(data);
      setLogin(true);
    } catch (_e) {
      console.log('Deu ruim!');
      alert('Não foi possivel fazer Login');
    }
  };

  if (login) {
    return <Redirect to="/home" />;
  }

  return (
    <>
      <h1 className="title-pages">Login</h1>
      <form className="form-content">
        <input
          type="text"
          name="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          autoComplete="off"
          placeholder="Digite seu email"
        />
        <input
          type="password"
          name="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          autoComplete="off"
          placeholder="Digite sua senha"
        />
        <button className="btn" type="submit" onClick={loginUser} >Entrar</button>
      </form>
      <div className="content-link-user">
      <p>Ainda nao possui cadastro? <Link to="/register">Click aqui</Link> </p>
      </div>
    </>
  );
}

export default Login;