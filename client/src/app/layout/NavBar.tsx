import { Group } from "@mui/icons-material";
import { AppBar, Box, Container, LinearProgress, MenuItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { useStore } from "../../lib/hooks/useStore";
import { Observer } from "mobx-react-lite";

export default function NavBar() {

  const { uiStore } = useStore()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
        backgroundImage: 'linear-gradient(0deg, rgba(21, 43, 53, 1) 35%, rgba(31, 41, 55, 1) 65%, rgba(41, 38, 53, 1) 100%)',
        position: 'relative'
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
              <MenuItemLink to='/counter' >Counter</MenuItemLink>
            </Box>
            <MenuItem>
              User Menu
            </MenuItem>
          </Toolbar>
        </Container>
        <Observer>
          {() => uiStore.isLoading ? (
            <LinearProgress
              color="secondary"
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                height: 4
              }}
            />
          ) : null}
        </Observer>
      </AppBar>
    </Box>
  )
}
