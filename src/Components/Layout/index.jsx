import React, { useState } from "react";
import {
  styled,
  // useTheme,
  Box,
  CssBaseline,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  // Divider,
  IconButton,
  Typography,
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Hamburger from "hamburger-react"; // npm install hamburger-react
import { useNavigate, Outlet } from "react-router-dom";
import proxima360 from "../../Assets/proxima360.png";
import { GetItems, routeMap } from "./menu";

const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(0, 2),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar)(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function AdminLayout() {
  // const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  // const [pageName, setPageName] = useState('');
  const [tabName, setTabName] = useState('');
  const [highlight, setHighlight] = useState('');
  const items = GetItems();

  const handleDrawerToggle = () => { setOpen(!open); setMenu(null); }

  const handleMenuToggle = (index) => {
    setMenu(menu === index ? null : index);
    setIsOpen(!isOpen);
  };

  const handleLogoClick = () => {
    navigate("/dashboard");
    setOpen(false);
  };
  const handleNavigation = (itemName) => {
    const route = routeMap[itemName];
    console.log("page name: ", itemName, route)
    if (route) {
      navigate(route);
    } else {
      console.error("Route not found for:", itemName);
    }
    setTabName(itemName);
    handleDrawerToggle();
  };
  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#f4f4f4", }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}
        sx={{
          backgroundColor: "white", transition: "width 0.3s ease", // Smooth transition for AppBar when it resizes
          width: open ? `calc(100% - ${drawerWidth}px)` : "100%", // Adjust width based on drawer open state
          marginLeft: open ? `${drawerWidth}px` : "0", // Shift AppBar when drawer is open
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            //paddingX: 2,
            height: 60
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", marginLeft: "-20px", }}>
            {!open && (
              <Hamburger toggled={open} toggle={setOpen} color="black" size={18} />
            )}
            <IconButton onClick={handleLogoClick} disableRipple sx={{ marginLeft: 2 }}>
              <img src={proxima360} alt="Logo" style={{ width: "55px" }} />
            </IconButton>
          </Box>
          {/* <Typography variant="h6" sx={{ color: "white",}}>
            Admin Panel
          </Typography> */}
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
        {/* <Divider /> */}
        <List
          size="small"

          sx={{
            width: "100%",
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
            <React.Fragment key={item.name}>
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
                  minHeight: 32, // Reduce minimum height
                  display: "flex",
                  alignItems: "center", // Ensure alignment
                  backgroundColor: item.name === highlight ? "#B6D0E2" : "transparent", // Highlight selected item
                  borderRadius: "60px", // Add rounded corners
                  "&:hover": {
                    backgroundColor: "#D5E4ED", // Highlight on hover for consistency
                  }
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={{ variant: "body2" }} // Use smaller text
                />
                {item.subitems?.length ? (
                  menu === index ? <ExpandLess /> : <ExpandMore />
                ) : null}
              </ListItemButton>
              {item.subitems && (
                <Collapse
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
                    {item.subitems.map((subItem) => (
                      <ListItemButton
                        key={subItem.name}
                        onClick={() => open && handleNavigation(subItem.name)}
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
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          padding: "5px 5px 0px 65px",
          background: 'white',
        }}
        onClick={() => { setOpen(false); setMenu(null); setHighlight(tabName); }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

