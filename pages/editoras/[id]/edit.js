import axios from '../../../lib/axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const EditEditora = () => {
  const router = useRouter();
  const { id } = router.query;
  const [editora, setEditora] = useState({
    nomeEditora: '',
  });

  useEffect(() => {
    if (id) {
      axios.get(`/editora/${id}`)
        .then(response => {
          setEditora(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar editora:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditora({
      ...editora,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/editora/${id}`, editora);
      alert('Editora atualizada com sucesso!');
      router.push('/editoras'); // Substitua '/editoras' pelo caminho correto para a lista de editoras
    } catch (error) {
      console.error('Erro ao atualizar editora:', error);
      alert('Erro ao atualizar editora.');
    }
  };

  const handleBack = () => {
    router.push('/editoras'); // Substitua '/editoras' pelo caminho correto para a lista de editoras
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: '600px', // Define uma largura máxima para o formulário
        margin: '0 auto', // Centraliza o formulário na tela
      }}
    >
      <Typography variant="h4">Editar Editora</Typography>
      <TextField
        label="Nome"
        name="nomeEditora"
        value={editora.nomeEditora}
        onChange={handleChange}
        required
        sx={{ width: '100%', marginBottom: 2 }}
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button type="submit" variant="contained" color="primary" sx={{ flex: 1 }}>
          Salvar
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleBack} sx={{ flex: 1 }}>
          Voltar
        </Button>
      </Box>
    </Box>
  );
};

export default EditEditora;