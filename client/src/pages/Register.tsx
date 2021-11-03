import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';

interface Payload {
  name: string,
  email: string,
  password: string,
}

function Register(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const createUser = async (ev: any) => {
    ev.preventDefault();
    const payload: Payload = { name, email, password };
    try {
      const { data } = await api.post('api/users', payload);
      alert(`Usuario ${data.name} foi cadastrado`);
    } catch (_e) {
      console.log('Deu ruim!');
      alert('Não foi possivel Cadastrar');
    }
  };

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
      <button type="submit" onClick={createUser} >Cadastrar</button>
      <Link to="/login">Ja tenho cadastro</Link>
    </>
  );
}

export default Register;