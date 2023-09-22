import * as React from 'react';
import  { useState } from 'react';
import { useLogin, useNotify} from 'react-admin';
import { styled } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const login = useLogin();
    const notify = useNotify();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // will call authProvider.login({ email, password })
        login({ email:'abc11@123.com', password:'1234' }).catch(() =>
            notify('Contraseña o usuario incorrecto')
        );
    };

    const MyButton = styled(Button)({
        background: 'linear-gradient(to bottom, #c62d1f 5%, #f24437 100%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        
      });
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'white', height: '100vh', padding: '20px', justifyContent: 'center'}}>
  <img src="https://www.pormexicofundacion.org/images/logo-wide.png" alt="Girl in a jacket" width="200" height="100" style={{ marginBottom: '20px' }} />
  <Paper elevation={3} style={{ padding: '20px', maxWidth: '400px' }}>
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Intorduce tu correo electrónico..."
        style={{ width: '100%', marginBottom: '10px', background: '#f5f5f5', borderRadius: '3px', border: 'none', padding: '10px' }}
      />
      <input
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Introduce tu contraseña..."
        style={{ width: '100%', marginBottom: '10px', background: '#f5f5f5', borderRadius: '3px', border: 'none', padding: '10px' }}
      />
      <MyButton variant="contained" type="submit" style={{ width: '100%' }}>
        Iniciar sesión
      </MyButton>
    </form>
  </Paper>
</div>

   );
};
export default LoginPage;