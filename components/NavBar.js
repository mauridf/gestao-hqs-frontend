import Link from 'next/link';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

const NavBar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit">
                    <Link href="/">Home</Link>
                </Button>
                <Box sx={{ marginLeft: '8px', marginRight: '8px' }}>
                    <Button color="inherit">
                        <Link href="/editoras">Editoras</Link>
                    </Button>
                </Box>
                <Button color="inherit">
                    <Link href="/personagens">Personagens</Link>
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;