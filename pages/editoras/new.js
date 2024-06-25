import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from '../../lib/axios';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';

const NovaEditora = () => {
    const router = useRouter();
    const [editora, setEditora] = useState({
        nomeEditora: '',
    });

    const [editoras, setEditoras] = useState([]);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchEditoras = async () => {
            try {
                const response = await axios.get('/editora');
                setEditoras(response.data);
            } catch (error) {
                console.error('Erro ao buscar editoras:', error);
            }
        };
        fetchEditoras();
    }, []);

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
            await axios.post('/editora', editora);
            setSuccessMessage('Editora cadastrada com sucesso!');
            setErrorMessage('');
        } catch (error) {
            console.error('Erro ao cadastrar editora:', error);
            setErrorMessage('Erro ao cadastrar editora.');
            setSuccessMessage('');
        }
    };

    const handleBack = () => {
        router.push('/editoras');
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
            <Typography variant="h4">Nova Editora</Typography>
            {successMessage && <Alert severity="success">{successMessage}</Alert>}
            {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
            <TextField
                label="Nome"
                name="nomeEditora"
                value={editora.nomeEditora}
                onChange={handleChange}
                required
                sx={{ width: '50%' }}
            />
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Button type="submit" variant="contained" color="primary">Cadastrar Editora</Button>
                <Button variant="outlined" color="secondary" onClick={handleBack}>Voltar</Button>
            </Box>
        </Box>
    );
};

export default NovaEditora;