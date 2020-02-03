import React, { useState } from 'react';
import axios from 'axios';

import Check from '@material-ui/icons/Check';
import IconButton from '@material-ui/core/IconButton';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import { dataBase, params, schema } from '../../../utils';

export const EditRow = ({ defaultData = schema, isNew = false, setEdit, fetch }) => {
  // HOOK DE ESTADO
  const [data, setData] = useState(defaultData);

  // ENVIA POR METODO POST UN NUEVO PRODUCTO
  const newProduct = () => {
    if (localStorage.getItem('token')) {
      axios
        .post(
          `${dataBase}/products.json?auth=${localStorage.getItem('token')}`,
          {
            name: data.name,
            price: data.price,
            category: data.category,
            desc: data.desc
          },
          params
        )
        .then(response => {
          // REINICIA LOS CAMPOS Y LLAMA A FETCH PARA QUE SE RE-RENDERIZE LA TABLA
          setData(schema);
          fetch()
        })
        .catch(error => console.log(error));
    }
  };

  // ENVIA POR PATCH LA MODIFICACION A UN PRODUCTO, BASANDOSE EN EL ID
  const editProduct = () => {
    if (localStorage.getItem('token')) {
      axios
        .patch(
          `${dataBase}/products/${data.id}.json?auth=${localStorage.getItem(
            'token'
          )}`,
          {
            name: data.name,
            price: data.price,
            category: data.category,
            desc: data.desc
          },
          params
        )
        .then(response => {
          setEdit(null)
          fetch()
        })
        .catch(error => console.log(error));
    }
  };

  // FUNCION QUE VERIFICA SI LOS CAMPOS ESTAN CORRECTOS, Y SI SE TRATA
  // DE UN NUEVO PRODUCTO O UNA EDICION
  const confirmData = () => {
    if (checkData()) {
      isNew ? newProduct() : editProduct();
    }
  };

  // FUNCION QUE DEVUELVE TRUE SI LOS DATOS NO ESTAN VACIOS
  const checkData = () => {
    const { name, price, category, desc } = data;
    return name !== '' && price !== '' && category !== '' && desc !== '';
  };

  return (
    <TableRow>
      <TableCell component='th' scope='row'>
        <TextField
          id='newName'
          label='Nombre'
          value={data.name}
          onChange={e => setData({ ...data, name: e.target.value })}
        />
      </TableCell>
      <TableCell align='right'>
        <TextField
          id='newPrice'
          label='Precio'
          type='number'
          value={data.price}
          onChange={e => setData({ ...data, price: e.target.value })}
        />
      </TableCell>
      <TableCell align='right'>
        <TextField
          id='newCategory'
          label='Categoria'
          value={data.category}
          onChange={e => setData({ ...data, category: e.target.value })}
        />
      </TableCell>
      <TableCell align='right'>
        <TextField
          id='newDesc'
          label='Descripcion'
          value={data.desc}
          onChange={e => setData({ ...data, desc: e.target.value })}
        />
      </TableCell>
      <TableCell align='right'>
        <IconButton onClick={confirmData}>
          <Check />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
