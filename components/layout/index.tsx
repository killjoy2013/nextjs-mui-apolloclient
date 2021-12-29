import MenuIcon from '@mui/icons-material/Menu';
import { useSession, signOut } from 'next-auth/client';
import {
  AppBar,
  Button,
  createTheme,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React, { useState } from 'react';
import { Session } from 'next-auth';
import getConfig from 'next/config';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

const drawerWidth = 240;

const theme = createTheme({});

const StyledAppBar = styled(AppBar)(() => ({
  position: 'fixed',
  width: '100%',
  zIndex: 1400,
  backgroundColor: publicRuntimeConfig.toolbarColor,
}));

const StyledApp = styled('div')(() => ({
  zIndex: 1,
  overflow: 'hidden',
  height: '100vh',
}));

const StyledDrawer = styled(Drawer)(() => ({
  backgroundColor: 'yellow',
  top: '264px',
  position: 'fixed',
  width: drawerWidth,
  borderRadius: 0,
  borderTop: 'none',
  borderBottom: 'none',
  //top: theme.spacing(8), // push content down to fix scrollbar position
  height: `calc(100vh - 64px)`, // subtract appbar height
}));

const StyledMenuButton = styled(IconButton)(() => ({
  marginLeft: 12,
  marginRight: 20,
}));

type StyledContentWrapperType = {
  open: boolean;
};

const StyledContentWrapper = styled('div')<StyledContentWrapperType>(
  (props) => ({
    padding: 0,
    margin: 0,
    overflow: 'auto',
    position: 'fixed',
    top: theme.spacing(8),
    height: 'calc(100vh)', // Subtract width of header
    width: '100%',
    //backgroundColor: 'pink',
    marginLeft: props.open ? drawerWidth : '0px',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  })
);

type DrawerPartType = {
  open: boolean;
};

const DrawerPart: React.FC<DrawerPartType> = (props: DrawerPartType) => {
  const { open } = props;
  const router = useRouter();
  const [session, loading] = useSession();

  const logoutHandler = () => {
    signOut();
  };

  return (
    <StyledDrawer
      id="drawer-part"
      variant="persistent"
      anchor="left"
      open={open}
      elevation={0}
      PaperProps={{
        variant: 'outlined',
        sx: { top: '64px', height: 'calc(100vh - 64px)' },
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="space-between"
        sx={{ height: '100vh', width: '240px', bgcolor: 'yellow' }}
      >
        <Grid item>
          <List>
            <ListItem onClick={() => router.push('/countries')}>
              <Typography variant="caption">Countries</Typography>
            </ListItem>
            <ListItem onClick={() => router.push('/add-country')}>
              <Typography variant="caption">Add Country</Typography>
            </ListItem>
            <ListItem onClick={() => router.push('/cities')}>
              <Typography variant="caption">Cities</Typography>
            </ListItem>
            <ListItem onClick={() => router.push('/add-city')}>
              <Typography variant="caption">Add City</Typography>
            </ListItem>
            <ListItem onClick={() => router.push('/my-client-page')}>
              <Typography variant="caption">Client Page</Typography>
            </ListItem>
            <ListItem onClick={() => router.push('/other-client-page')}>
              <Typography variant="caption">Other Client Page</Typography>
            </ListItem>
            <ListItem onClick={() => router.push('/my-static-page')}>
              <Typography variant="caption">Static Page</Typography>
            </ListItem>
            <ListItem onClick={() => router.push('/other-static-page')}>
              <Typography variant="caption">Other Static Page</Typography>
            </ListItem>
          </List>
        </Grid>

        {/* <StyledLogout> */}
        <Grid item>
          <List>
            <Divider />
            <ListItem
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
              }}
            >
              {session && <Button onClick={logoutHandler}>Logout</Button>}
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </StyledDrawer>
  );
};

type PersistentDrawerType = {
  children: React.ReactNode;
};

interface CustomSessionType extends Session {
  username: string;
}

const HeaderLink = styled('a')`
  text-decoration: none;
  :hover {
    text-decoration: none;
  }
`;

const PersistentDrawer: React.FC<PersistentDrawerType> = (
  props: PersistentDrawerType
) => {
  const [open, setOpen] = useState(true);
  const [session, loading] = useSession();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <StyledApp>
      <StyledAppBar elevation={0}>
        <Toolbar disableGutters={true}>
          <Grid
            container
            direction="row"
            alignItems="center"
            sx={{ pr: '32px' }}
          >
            <Grid container item alignItems="center" sx={{ flex: 1 }}>
              <Grid item>
                <StyledMenuButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={handleDrawerToggle}
                >
                  <MenuIcon />
                </StyledMenuButton>
              </Grid>
              <Grid item>
                <Link href="/">
                  <HeaderLink>
                    <Typography variant="h5">FANCY APP</Typography>
                  </HeaderLink>
                </Link>
              </Grid>
            </Grid>
            <Grid item>
              {session && (
                <Typography variant="button" color="inherit" noWrap>
                  {(session as unknown as CustomSessionType).username}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </StyledAppBar>
      <DrawerPart open={open} />

      <StyledContentWrapper open={open}>
        <div style={{ padding: theme.spacing(2) }}>{props.children}</div>
      </StyledContentWrapper>
    </StyledApp>
  );
};

export default PersistentDrawer;
