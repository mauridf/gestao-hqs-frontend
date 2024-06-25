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

export default function Personagens() {
  const [personagens, setPersonagens] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchPersonagens();
  }, []);

  const fetchPersonagens = () => {
    axios.get('/personagem')
      .then(response => {
        console.log('Resposta completa da API:', response);
        setPersonagens(response.data);
        console.log('Personagens extraídas:', response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar personagens:', error);
      });
  };

  const handleDelete = async (id) => {
    if (confirm('Tem certeza que deseja excluir este personagem?')) {
      try {
        await axios.delete(`/personagem/${id}`);
        fetchPersonagens();
        alert('Personagem excluído com sucesso!');
      } catch (error) {
        console.error('Erro ao excluir personagem:', error);
        alert('Erro ao excluir personagem.');
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

  const getTipoPersonagemName = (tipoPersonagem) => {
    switch (tipoPersonagem) {
        case 0:
            return 'Herói';
        case 1:
            return 'Vilão';
        case 2:
            return 'Equipe';
        case 3:
            return 'Anti-Herói';
        case 4:
            return 'Personagem(ns) de Fábula(s)';
        case 5:
            return 'Personagem(ns) Histórico(s)';
        case 6:
            return 'Personagem(ns) de Desenho(s)';
        case 7:
            return 'Personagem(ns) de Filme(s)';
        case 8:
            return 'Pessoa(s) Comum(ns)';
        default:
            return 'Desconhecido';
    }
  };
  
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de Personagens
      </Typography>
      <Button variant="contained" color="primary" href="/personagens/new">
        Adicionar Novo Personagem
      </Button>
      <TableContainer component={Paper} style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome do Personagem</TableCell>
              <TableCell>Tipo do Personagem</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {personagens.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(personagem => (
              <TableRow key={personagem.id}>
                <TableCell>{personagem.id}</TableCell>
                <TableCell>{personagem.nome}</TableCell>
                <TableCell>{getTipoPersonagemName(personagem.tipoPersonagem)}</TableCell>
                <TableCell>{personagem.descricao}</TableCell>
                <TableCell>
                  <IconButton href={`/personagens/${personagem.id}/edit`} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(personagem.id)} color="secondary">
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
          count={personagens.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
}