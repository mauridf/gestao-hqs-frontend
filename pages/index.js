import React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Home() {
  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Bem-vindo a Gestão de HQ
      </Typography>
      <Typography variant="body1">
        Este é o seu aplicativo para gerenciar minha coleção de HQs.
      </Typography>
    </Container>
  );
}