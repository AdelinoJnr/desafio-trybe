import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <>
      <h1>Login</h1>
      <input
        type="text"
        name="email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
        autoComplete="off"
        placeholder="Digite seu email"
      />
      <input
        type="text"
        name="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        autoComplete="off"
        placeholder="Digite sua senha"
      />
      <button type="submit">Entrar</button>
      <Link to="/register">Quero cadastrar</Link>
    </>
  );
}

export default Login;