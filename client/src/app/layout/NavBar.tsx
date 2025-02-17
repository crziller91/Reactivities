import { Group } from "@mui/icons-material";
import { AppBar, Box, Button, Container, MenuItem, Toolbar, Typography } from "@mui/material";

type Props = {
  openForm: () => void;
}

export default function NavBar({ openForm }: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
        backgroundImage: 'linear-gradient(0deg, rgba(21, 43, 53, 1) 35%, rgba(31, 41, 55, 1) 65%, rgba(41, 38, 53, 1) 100%)'
      }}>
        <Container maxWidth='xl'>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <MenuItem sx={{ display: 'flex', gap: 2 }}>
                <Group fontSize="medium" />
                <Typography variant="h6" fontWeight='bold' >Reactivities</Typography>
              </MenuItem>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <MenuItem sx={{ textTransform: 'uppercase', fontWeight: 'bold' }} >Activities</MenuItem>
              <MenuItem sx={{ textTransform: 'uppercase', fontWeight: 'bold' }} >About</MenuItem>
              <MenuItem sx={{ textTransform: 'uppercase', fontWeight: 'bold' }} >Contact</MenuItem>
            </Box>
            <Button size="large" variant="outlined" color="inherit" onClick={openForm}>Create Activity</Button>
          </Toolbar>
        </Container>

      </AppBar>
    </Box>
  )
}
