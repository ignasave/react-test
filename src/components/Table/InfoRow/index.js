import React from 'react';
import axios from 'axios';

import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';

import { dataBase, params } from '../../../utils'

export const InfoRow = ({ row, fetch, setEdit }) => {

  const deleteProduct = () => {
    if (localStorage.getItem('token')) {
      axios
        .delete(
          `${dataBase}/products/${row.id}.json?auth=${localStorage.getItem(
            'token'
          )}`, params)
        .then(response => {
          fetch()
        })
        .catch(error => console.log(error));
    }
  };

  return (
    <TableRow>
      <TableCell component='th' scope='row'>
        {row.name}
      </TableCell>
      <TableCell align='right'>{row.price}</TableCell>
      <TableCell align='right'>{row.category}</TableCell>
      <TableCell align='right'>{row.desc}</TableCell>
      <TableCell align='right'>
        <IconButton onClick={() => setEdit(row.id)}>
          <Edit />
        </IconButton>
        <IconButton onClick={deleteProduct}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
