import axios from '../../../lib/axios';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box, MenuItem, FormControl, InputLabel, Select } from '@mui/material';

const EditPersonagem = () => {
  const router = useRouter();
  const { id } = router.query;
  const [personagem, setPersonagem] = useState({
    nome: '',
    tipoPersonagem: 1, // Valor padrão para o tipo de personagem
    descricao: '',
  });

  // Enum de TipoPersonagem
  const TipoPersonagem = {
    'Herói': 0,
    'Vilão': 1,
    'Equipe': 2,
    'Anti-Herói': 3,
    'Personagem(ns) de Fábula(s)': 4,
    'Personagem(ns) Histórico(s)': 5,
    'Personagem(ns) de Desenho(s)': 6,
    'Personagem(ns) de Filme(s)': 7,
    'Pessoa(s) Comum(ns)':8
  };

  const generateTipoPersonagemOptions = () => {
    return Object.keys(TipoPersonagem).map((key) => (
      <MenuItem key={TipoPersonagem[key]} value={TipoPersonagem[key]}>
        {key}
      </MenuItem>
    ));
  };

  useEffect(() => {
    if (id) {
      axios.get(`/personagem/${id}`)
        .then(response => {
          setPersonagem(response.data);
        })
        .catch(error => {
          console.error('Erro ao buscar personagem:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonagem({
      ...personagem,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/personagem/${id}`, personagem);
      alert('Personagem atualizado com sucesso!');
      router.push('/personagens'); // Substitua '/personagens' pelo caminho correto para a lista de personagens
    } catch (error) {
      console.error('Erro ao atualizar personagem:', error);
      alert('Erro ao atualizar personagem.');
    }
  };

  const handleBack = () => {
    router.push('/personagens'); // Substitua '/personagens' pelo caminho correto para a lista de personagens
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
      <Typography variant="h4">Editar Personagem</Typography>
      <TextField
        label="Nome"
        name="nome"
        value={personagem.nome}
        onChange={handleChange}
        required
        sx={{ width: '100%', marginBottom: 2 }}
      />
      <FormControl sx={{ width: '100%', marginBottom: 2 }}>
        <InputLabel>Tipo de Personagem</InputLabel>
        <Select
          value={personagem.tipoPersonagem}
          onChange={handleChange}
          name="tipoPersonagem"
          required
        >
          {generateTipoPersonagemOptions()}
        </Select>
      </FormControl>
      <TextField
        label="Descrição"
        name="descricao"
        value={personagem.descricao}
        onChange={handleChange}
        multiline
        rows={4}
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

export default EditPersonagem;