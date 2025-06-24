import { Group } from "@mui/icons-material";
import { AppBar, Box, Container, LinearProgress, MenuItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router";
import MenuItemLink from "../shared/components/MenuItemLink";
import { useStore } from "../../lib/hooks/useStore";
import { Observer } from "mobx-react-lite";
import { useAccounts } from "../../lib/hooks/useAccounts";

export default function NavBar() {

  const { uiStore } = useStore()

  const {currentUser} = useAccounts()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
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
              {/* <MenuItemLink to='/counter' >Counter</MenuItemLink>
              <MenuItemLink to='/errors' >Errors</MenuItemLink> */}
            </Box>
            <Box
              display='flex'
              alignItems='center'
            >
              {currentUser ? (
                <Typography>Welcome {currentUser.displayName}</Typography>
              ) : (
                <>
                  <MenuItemLink to='/login'>Login</MenuItemLink>
                  <MenuItemLink to='/login'>Register</MenuItemLink>
                </>
              )}
            </Box>
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
