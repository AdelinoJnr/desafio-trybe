import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <>
      <h1>Cadastrar</h1>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
        placeholder="Digite seu nome"
      />
      <input
        type="text"
        name="email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
        placeholder="Digite seu email"
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
        placeholder="Digite sua senha"
      />
      <button type="submit">Cadastrar</button>
      <Link to="/login">Ja tenho cadastro</Link>
    </>
  );
}

export default Register;