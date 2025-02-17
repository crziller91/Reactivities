import { Group } from "@mui/icons-material";
import { AppBar, Box, Container, MenuItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
        backgroundImage: 'linear-gradient(0deg, rgba(21, 43, 53, 1) 35%, rgba(31, 41, 55, 1) 65%, rgba(41, 38, 53, 1) 100%)'
      }}>
        <Container maxWidth='xl'>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Box>
              <MenuItem component={NavLink} to='/' sx={{ display: 'flex', gap: 2 }}>
                <Group fontSize="medium" />
                <Typography variant="h6" fontWeight='bold' >Reactivities</Typography>
              </MenuItem>
            </Box>
            <Box sx={{ display: 'flex' }}>
              <MenuItemLink to='/activities' >Activities</MenuItemLink>
              <MenuItemLink to='/createActivity' >Create Activity</MenuItemLink>
            </Box>
            <MenuItem>
              User Menu
            </MenuItem>
          </Toolbar>
        </Container>

      </AppBar>
    </Box>
  )
}
