import React, { useEffect, useState } from 'react';
import axios from '../../lib/axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TablePagination from '@mui/material/TablePagination';

export default function Editoras() {
  const [editoras, setEditoras] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchEditoras();
  }, []);

  const fetchEditoras = () => {
    axios.get('/editora')
      .then(response => {
        console.log('Resposta completa da API:', response);
        setEditoras(response.data);
        console.log('Editoras extraídas:', response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar editoras:', error);
      });
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja excluir esta editora?')) {
      try {
        await axios.delete(`/editora/${id}`);
        fetchEditoras();
        alert('Editora excluída com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir editora:', error);
        alert('Erro ao excluir editora.');
      }
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de Editoras
      </Typography>
      <Button variant="contained" color="primary" href="/editoras/new">
        Adicionar Nova Editora
      </Button>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome da Editora</TableCell>
              <TableCell>Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {editoras.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(editora => (
              <TableRow key={editora.id}>
                <TableCell>{editora.id}</TableCell>
                <TableCell>{editora.nomeEditora}</TableCell>
                <TableCell>
                  <IconButton href={`/editoras/${editora.id}/edit`} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(editora.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={editoras.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
}