// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
// import MailIcon from "@mui/icons-material/Mail";
// import { useNavigate } from "react-router-dom";
// import { useAppStore } from "../../AppStore";

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// export default function AdminSidenav() {
//   const theme = useTheme();
//   // const [open, setOpen] = React.useState(true);

//   const open = useAppStore((state) => state.dopen);

//   const navigate = useNavigate();

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <Box height={30} />
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <IconButton>
//             {theme.direction === "rtl" ? (
//               <ChevronRightIcon />
//             ) : (
//               <ChevronLeftIcon />
//             )}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           <ListItem
//             disablePadding
//             sx={{ display: "block" }}
//             onClick={() => navigate("/admin/home")}
//           >
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? "initial" : "center",
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : "auto",
//                   justifyContent: "center",
//                 }}
//               >
//                 <InboxIcon />
//               </ListItemIcon>
//               <ListItemText primary="Home" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>
//           <ListItem
//             disablePadding
//             sx={{ display: "block" }}
//             onClick={() => navigate("/admin/product")}
//           >
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? "initial" : "center",
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : "auto",
//                   justifyContent: "center",
//                 }}
//               >
//                 <InboxIcon />
//               </ListItemIcon>
//               <ListItemText primary="Product" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>
//           <ListItem
//             disablePadding
//             sx={{ display: "block" }}
//             onClick={() => navigate("/admin/order")}
//           >
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? "initial" : "center",
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : "auto",
//                   justifyContent: "center",
//                 }}
//               >
//                 <InboxIcon />
//               </ListItemIcon>
//               <ListItemText primary="Order" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>
//           <ListItem
//             disablePadding
//             sx={{ display: "block" }}
//             onClick={() => navigate("/admin/material")}
//           >
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? "initial" : "center",
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : "auto",
//                   justifyContent: "center",
//                 }}
//               >
//                 <InboxIcon />
//               </ListItemIcon>
//               <ListItemText primary="Material" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>
//           <ListItem
//             disablePadding
//             sx={{ display: "block" }}
//             onClick={() => navigate("/admin/bailer")}
//           >
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? "initial" : "center",
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : "auto",
//                   justifyContent: "center",
//                 }}
//               >
//                 <InboxIcon />
//               </ListItemIcon>
//               <ListItemText primary="Bailing" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>
//           <ListItem
//             disablePadding
//             sx={{ display: "block" }}
//             onClick={() => navigate("/admin/bin")}
//           >
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? "initial" : "center",
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : "auto",
//                   justifyContent: "center",
//                 }}
//               >
//                 <InboxIcon />
//               </ListItemIcon>
//               <ListItemText primary="Bin" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>
//           <ListItem
//             disablePadding
//             sx={{ display: "block" }}
//             onClick={() => navigate("/admin/employee")}
//           >
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? "initial" : "center",
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : "auto",
//                   justifyContent: "center",
//                 }}
//               >
//                 <InboxIcon />
//               </ListItemIcon>
//               <ListItemText primary="Employee" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>
//           <ListItem
//             disablePadding
//             sx={{ display: "block" }}
//             onClick={() => navigate("/admin/setting")}
//           >
//             <ListItemButton
//               sx={{
//                 minHeight: 48,
//                 justifyContent: open ? "initial" : "center",
//                 px: 2.5,
//               }}
//             >
//               <ListItemIcon
//                 sx={{
//                   minWidth: 0,
//                   mr: open ? 3 : "auto",
//                   justifyContent: "center",
//                 }}
//               >
//                 <InboxIcon />
//               </ListItemIcon>
//               <ListItemText primary="Profile" sx={{ opacity: open ? 1 : 0 }} />
//             </ListItemButton>
//           </ListItem>
//         </List>
//         <Divider />
//       </Drawer>
//     </Box>
//   );
// }


// import * as React from "react";
// import { styled, useTheme } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import MuiDrawer from "@mui/material/Drawer";
// import List from "@mui/material/List";
// import CssBaseline from "@mui/material/CssBaseline";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import HomeIcon from "@mui/icons-material/Home";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import AssignmentIcon from "@mui/icons-material/Assignment";
// import InventoryIcon from "@mui/icons-material/Inventory";
// import WorkIcon from "@mui/icons-material/Work";
// import SettingsIcon from "@mui/icons-material/Settings";
// import { useNavigate } from "react-router-dom";
// import { useAppStore } from "../../AppStore";

// const drawerWidth = 240;

// const openedMixin = (theme) => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme) => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   ...theme.mixins.toolbar,
// }));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

// export default function AdminSidenav() {
//   const theme = useTheme();
//   const open = useAppStore((state) => state.dopen);
//   const navigate = useNavigate();

//   const menuItems = [
//     { text: "Home", icon: <HomeIcon />, path: "/admin/home" },
//     { text: "Product", icon: <ShoppingCartIcon />, path: "/admin/product" },
//     { text: "Order", icon: <AssignmentIcon />, path: "/admin/order" },
//     { text: "Material", icon: <InventoryIcon />, path: "/admin/material" },
//     { text: "Bailing", icon: <WorkIcon />, path: "/admin/bailer" },
//     { text: "Bin", icon: <InventoryIcon />, path: "/admin/bin" },
//     { text: "Employee", icon: <WorkIcon />, path: "/admin/employee" },
//     { text: "Profile", icon: <SettingsIcon />, path: "/admin/setting" },
//   ];

//   return (
//     <Box sx={{ display: "flex" }}>
//       <CssBaseline />
//       <Drawer variant="permanent" open={open}>
//         <DrawerHeader>
//           <IconButton>
//             {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
//           </IconButton>
//         </DrawerHeader>
//         <Divider />
//         <List>
//           {menuItems.map((item, index) => (
//             <ListItem
//               key={index}
//               disablePadding
//               sx={{ display: "block" }}
//               onClick={() => navigate(item.path)}
//             >
//               <ListItemButton
//                 sx={{
//                   minHeight: 48,
//                   justifyContent: open ? "initial" : "center",
//                   px: 2.5,
//                   "&:hover": {
//                     backgroundColor: theme.palette.primary.light,
//                     color: theme.palette.primary.contrastText,
//                   },
//                 }}
//               >
//                 <ListItemIcon
//                   sx={{
//                     minWidth: 0,
//                     mr: open ? 3 : "auto",
//                     justifyContent: "center",
//                   }}
//                 >
//                   {item.icon}
//                 </ListItemIcon>
//                 <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
//               </ListItemButton>
//             </ListItem>
//           ))}
//         </List>
//         <Divider />
//       </Drawer>
//     </Box>
//   );
// }


import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentIcon from "@mui/icons-material/Assignment";
import InventoryIcon from "@mui/icons-material/Inventory";
import WorkIcon from "@mui/icons-material/Work";
import SettingsIcon from "@mui/icons-material/Settings";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppStore } from "../../AppStore";
import SummarizeIcon from '@mui/icons-material/Summarize';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  backgroundColor: theme.palette.background.paper,
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: theme.palette.background.paper,
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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

export default function AdminSidenav() {
  const theme = useTheme();
  const open = useAppStore((state) => state.dopen);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/admin/home" },
    { text: "Product", icon: <ShoppingCartIcon />, path: "/admin/product" },
    { text: "Order", icon: <AssignmentIcon />, path: "/admin/order" },
    { text: "Material", icon: <InventoryIcon />, path: "/admin/material" },
    { text: "Bailing", icon: <WorkIcon />, path: "/admin/bailer" },
    { text: "Bin", icon: <InventoryIcon />, path: "/admin/bin" },
    { text: "Employee", icon: <WorkIcon />, path: "/admin/employee" },
    { text: "Report", icon: <SummarizeIcon />, path: "/admin/report" },
    { text: "Profile", icon: <SettingsIcon />, path: "/admin/setting" },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => useAppStore.getState().updateOpen(!open)}>
            {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {menuItems.map((item, index) => (
            <Tooltip title={item.text} placement="right" key={index} arrow disableHoverListener={open}>
              <ListItem
                disablePadding
                sx={{ display: "block" }}
                onClick={() => navigate(item.path)}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    background: location.pathname === item.path ? 'linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(116,198,157,1) 100%)' : 'none',
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                      color: theme.palette.primary.contrastText,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      transition: 'transform 0.2s',
                      ...(location.pathname === item.path && {
                        color: theme.palette.primary.main,
                        transform: 'scale(1.1)',
                      }),
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Tooltip>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
