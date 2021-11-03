import { useState } from 'react';

function Login(): JSX.Element {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

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
    </>
  );
}

export default Login;