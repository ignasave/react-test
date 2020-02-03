import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Send from '@material-ui/icons/Send';
import TextField from '@material-ui/core/TextField';

import { loginSchema, endpointAUTH } from '../../utils';

const Login = () => {
  // HOOK DE REACT ROUTER PARA ACCEDER AL HISTORIAL DE ROUTING
  let history = useHistory();
  // HOOK DE ESTADO
  const [data, setData] = useState(loginSchema);

  // LOGIN ENVIA UNA REQUEST DE TIPO POST A LA API PARA VERIFICAR
  // EL EMAIL Y LA CONTRASEÑA INGRESADOS, PARA OBTENER EL TOKEN
  const login = () => {
    axios
      .post(endpointAUTH, {
        email: data.email,
        password: data.password,
        returnSecureToken: true
      })
      .then(response => {
        const timestamp =
          Math.round(new Date() / 1000) + response.data.expiresIn;
        // SETEO UNA FECHA EN SEGUNDOS EN EL LOCALSTORAGE QUE SERVIRA
        // PARA VOLVER A LOGEARSE LUEGO DE QUE HAYA EXPIRADO Y NO USAR
        // UN TOKEN VENCIDO
        localStorage.setItem('expired', timestamp);
        // SETEO EN EL LOCALSTORAGE EL TOKEN
        localStorage.setItem('token', response.data.idToken);
        // REDIRIJO HACIA EL INDEX
        history.push('/');
      })
      .catch(error => console.log(error));
  };

  //FUNCION QUE VERIFICA QUE LOS CAMPOS NO ESTEN VACIOS
  const send = () => {
    if (data.email !== '' && data.password !== '') login();
  };

  return (
    <Grid
      container
      direction='column'
      justify='center'
      alignItems='center'
      spacing={3}
    >
      <Grid item>
        <TextField
          id='email'
          label='Email'
          value={data.email}
          onChange={e => setData({ ...data, email: e.target.value })}
        />
      </Grid>
      <Grid item>
        <TextField
          id='password'
          label='Password'
          type='password'
          value={data.password}
          onChange={e => setData({ ...data, password: e.target.value })}
        />
      </Grid>
      <Grid item>
        <Button
          variant='contained'
          color='primary'
          endIcon={<Send />}
          onClick={send}
        >
          Send
        </Button>
      </Grid>
    </Grid>
  );
};
export default Login;
