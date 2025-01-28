import React, { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import { makeStyles } from '@mui/styles';

import {
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  CssBaseline,
  Divider,
  IconButton,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Typography,
} from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  StarBorder,
  Download as DownloadIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import UserProfile from "../../Components/UserProfile";
import proxima360 from "../../Assets/icons/proxima360.png";
import { GetItems, routeMap } from "./menu";
import Hamburger from "hamburger-react"; // npm install hamburger-react

const drawerWidth = 0;

const openedMixin = (theme) => ({
  // width:"10px",
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

//Menu side panel when it is closed//
const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  // width: `calc(${theme.spacing(7.5)} + 1px)`,
  backgroundColor: `white`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(7.5)} + 1px)`,
    marginLeft: "3px",
  },
});

//Top of stock_ledger name when it is opened//
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 2),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - 310px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

//Menu when it is opened//
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": {
      width: "310px",
      // backgroundColor: "#f9f9f9"
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

//Top bar in the screen//
const useStyles = makeStyles({
  LayoutDiv: {
    display: "flex",
    justifyContent: "space-between",
  },
  LayoutIconDiv: {
    display: "flex",
  },
  ImageDiv: {
    width: "55px",
  },
});


const items = GetItems();

export default function Index() {
  // const theme = useTheme();
  const [menu, setMenu] = useState(null);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [tabName, setTabName] = useState('');
  const [highlight, setHighlight] = useState('');
  const Layoutclasses = useStyles();
  const navigate = useNavigate();
  useEffect(() => { setHighlight('Home'); }, []);
  useEffect(() => { setHighlight(tabName); }, [tabName]);
  const handleDrawerOpen = () => { setOpen(true); };

  const handleDrawerClose = () => {
    const curTabIndex = items?.list.reduce((acc, item) => {
      acc[item.name] = item.id;
      return acc;
    }, {});

    setOpen(false); setIsOpen(false);
    setHighlight(tabName); setMenu(curTabIndex[tabName]);
  };
  const handleDrawerToggle = () => { setOpen(!open); setMenu(null); }
  const clickLogo = () => {
    navigate("/dashboard");
    handleDrawerClose();
    setTabName('Home');
  }
  const handleMenuToggle = (index) => {
    setMenu(menu === index ? null : index);
    setIsOpen(!isOpen);
  };
  const handleNavigation = (itemName,itemTab=null) => {
    const route = routeMap[itemName];
    if (route) {
      navigate(route);
    } else {
      console.error("Route not found for:", itemName);
    }
    
    itemTab===null?setTabName(itemName):setTabName(itemTab);
    handleDrawerToggle();
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f4f4f4", }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}
        sx={{
          backgroundColor: "white",
        }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", height: 60 }}>
          <div className={Layoutclasses.LayoutIconDiv}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon sx={{ color: "#b4b4b4" }} />
            </IconButton>
            <IconButton onClick={clickLogo} disableRipple sx={{ padding: "0px" }}>
              <img src={proxima360} className={Layoutclasses.ImageDiv} />
            </IconButton>
          </div>
          <div>
            <UserProfile />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}
        sx={{
          width: open ? `calc(${drawerWidth}px )` : 0, // Adjust width dynamically
          transition: "width 0.3s ease", // Smooth transition for Drawer width
          flexShrink: 0,
          whiteSpace: "nowrap",
          overflowX: "hidden",
        }}
      >

        <DrawerHeader >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Stock Ledger
          </Typography>
          <div style={{ marginRight: '-10px' }}>
            <Hamburger toggled={open} toggle={handleDrawerToggle} color="black" size={18} sx={{ marginLeft: "20px" }} />
          </div>
        </DrawerHeader>
        <Divider />
        <List
          size="small"

          sx={{
            width: open ? "100%" : '90%',
            maxWidth: 380,
            bgcolor: "white",
            display: "flex",
            flexDirection: "column", // Ensure vertical stacking
            padding: '5px 0xp 0px 0px', // Remove extra padding
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {items?.list?.map((item, index) => (
            <React.Fragment key={item.name} >
              <ListItemButton
                onClick={() => {
                  handleMenuToggle(index);
                  setOpen(true);
                  if (item.name === 'Home' && open) {
                    handleNavigation(item.name);
                  }
                  setHighlight(item.name); // Set the highlighted item

                }}
                sx={{
                  // py: 1, // Reduce vertical padding
                  minHeight: 30, // Reduce minimum height
                  display: "flex",
                  alignItems: "center", // Ensure alignment
                  backgroundColor: item.name === highlight ? "#B6D0E2" : "transparent", // Highlight selected item
                  borderRadius: "60px", // Add rounded corners
                  "&:hover": {
                    backgroundColor: "#D5E4ED", // Highlight on hover for consistency
                  },
                }}
              >
                <ListItemIcon sx={{ width: 'fit-content', }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name} //typographyProps={{ variant:'body' }} // Use smaller text
                  primaryTypographyProps={{ variant: "body2" }} // Use smaller text

                />
                {item.subitems?.length ? (
                  menu === index ? <ExpandLess /> : <ExpandMore />
                ) : null}
              </ListItemButton>
              {item.subitems && (
                <Collapse sx={{ borderRight: '2px solid blue', }}
                  in={menu === index}
                  timeout="auto"
                  unmountOnExit
                  key={item}
                >
                  <List
                    component="div"
                    disablePadding
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                    }} // Vertical layout for subitems
                  >
                    {open && item.subitems.map((subItem) => (
                      <ListItemButton
                        key={subItem.name}
                        onClick={() => open && handleNavigation(subItem.name,item.name)}
                        sx={{
                          pl: 4,
                          py: 0.4, // Reduce padding for subitems
                          minHeight: 30, // Further reduce subitem height
                          display: "flex",
                          alignItems: "center", // Ensure alignment for subitems
                        }}
                      >
                        <ListItemIcon
                        // sx={{
                        //   minWidth: 30, // Reduce subitem icon space
                        //   marginRight: 0.5, // Reduce space between subitem icon and text
                        // }}
                        >
                          {subItem.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={subItem.name}
                          primaryTypographyProps={{ variant: "body2" }} // Smaller text for subitems
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 1 ,background:'white'}} onClick={handleDrawerClose}>
        <Outlet />
      </Box>
    </Box>
  );
}
