import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

import { InfoRow } from '../Table/InfoRow';
import { EditRow } from '../Table/EditRow';
import { dataBase, params } from '../../utils';
import { useStyles } from './styles';

export default function Main() {
  // HOOK DE ESTILOS DE MATERIAL UI
  const classes = useStyles();
  // ESTADOS DE MAIN
  const [edit, setEdit] = useState(null);
  const [products, setProducts] = useState([]);
  const [catFilter, setCatFilter] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  //EN EL PRIMER RENDER LLAMA A FETCH PARA MOSTRAR DATOS
  useEffect(() => fetch(), []);
  //CUANDO CAMBIA PRODUCTOS O EL FILTRO, FILTRA LOS PRODUCTOS
  useEffect(() => {
    setFilteredProducts(
      products.filter(
        element => element.category.toLowerCase().indexOf(catFilter) !== -1
      )
    );
  }, [products, catFilter]);

  //FETCH TOMA EL TOKEN Y LLAMA CON METODO GET A API PARA OBTENER LOS PRODUCTOS
  const fetch = () => {
    if (localStorage.getItem('token')) {
      axios
        .get(
          `${dataBase}/products.json?auth=${localStorage.getItem('token')}`,
          params
        )
        .then(response => setProducts(formatResponse(response)))
        .catch(error => console.log(error));
    }
  };

  //FORMATEA LA RESPUESTA YA QUE EL ID DEL PRODUCTO VIENE COMO KEY
  const formatResponse = response => {
    let formated = [];
    if (response.data) {
      formated = Object.entries(response.data).map(item => {
        return { ...item[1], id: item[0] };
      });
    }
    return formated;
  };

  return (
    <TableContainer className={classes.container}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align='center'>Precio</TableCell>
            <TableCell align='right'>
              <TextField
                id='categoria'
                label='Categoria'
                value={catFilter}
                onChange={e => setCatFilter(e.target.value)}
              />
            </TableCell>
            <TableCell align='center'>Descripcion</TableCell>
            <TableCell align='right'></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {//MAPEO LOS PRODUCTOS FILTRADOS Y MUESTRO LA FILA
          //EDICION SEGUN EL ESTADO EDIT
          filteredProducts.map(row =>
            edit === row.id ? (
              <EditRow
                key={row.id}
                fetch={fetch}
                setEdit={setEdit}
                defaultData={row}
              />
            ) : (
              <InfoRow key={row.id} row={row} setEdit={setEdit} fetch={fetch} />
            )
          )}
          {
            //AGREGA UN NUEVO PRODUCTO GRACIAS A LA PROP ISNEW
          }
          <EditRow
            isNew
            fetch={fetch}
            setEdit={setEdit}
            setProducts={setProducts}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
}
