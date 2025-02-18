import { Group } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router";

export default function HomePage() {
  return (
    <Paper
      sx={{
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundImage: 'linear-gradient(0deg, #152b35 35%, rgba(31, 41, 55, 1) 65%, rgba(41, 38, 53, 1) 100%)'
      }}
    >
      <Box sx={{
        display: 'flex', alignItems: 'center', alignContent: 'center',
        color: 'white', gap: 3
      }}
      >
        <Group sx={{ height: 110, width: 110 }} />
        <Typography variant="h1">
          Reactivities
        </Typography>
      </Box>
      <Typography variant="h2">
        Welcome To Reactivities
      </Typography>
      <Button
        component={Link}
        to='/activities'
        size="large"
        variant="outlined"
        color="inherit"
        sx={{ height: 80, borderRadius: 4, fontSize: '1.5rem' }}
      >
        Take me to the activities!
      </Button>
    </Paper>
  )
}