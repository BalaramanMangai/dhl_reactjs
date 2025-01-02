import { lazy } from "react";
import Loadable from "app/components/Loadable";

const AppForm = Loadable(lazy(() => import("./forms/AppForm")));
const AppMenu = Loadable(lazy(() => import("./menu/AppMenu")));
const AppIcon = Loadable(lazy(() => import("./icons/AppIcon")));
const AppProgress = Loadable(lazy(() => import("./AppProgress")));
const AppRadio = Loadable(lazy(() => import("./radio/AppRadio")));
const AppTable = Loadable(lazy(() => import("./tables/AppTable")));
const AppSwitch = Loadable(lazy(() => import("./switch/AppSwitch")));
const AppSlider = Loadable(lazy(() => import("./slider/AppSlider")));
const AppDialog = Loadable(lazy(() => import("./dialog/AppDialog")));
const AppButton = Loadable(lazy(() => import("./buttons/AppButton")));
const AppCheckbox = Loadable(lazy(() => import("./checkbox/AppCheckbox")));
const AppSnackbar = Loadable(lazy(() => import("./snackbar/AppSnackbar")));
const AppAutoComplete = Loadable(lazy(() => import("./auto-complete/AppAutoComplete")));
const AppExpansionPanel = Loadable(lazy(() => import("./expansion-panel/AppExpansionPanel")));

//Members Module
const AddMember = Loadable(lazy(() => import("app/views/members/AddForm")));
const MemberTable = Loadable(lazy(() => import("./list/UserTable")));
const Editmember = Loadable(lazy(() => import("app/views/members/EditForm")));

//Agentss Module
const AddAgent = Loadable(lazy(() => import("app/views/agents/AddForm")));
const AgentTable = Loadable(lazy(() => import("./list/AgentTable")));
const Editagent = Loadable(lazy(() => import("app/views/agents/EditForm")));

//Product Module
const AddProduct = Loadable(lazy(() => import("app/views/products/AddForm")));
const ProductTable = Loadable(lazy(() => import("./list/ProductTable")));
const EditProduct = Loadable(lazy(() => import("app/views/products/EditForm")));

const AssignMembers = Loadable(lazy(() => import("./list/AssignTable")));
const AssignTable = Loadable(lazy(() => import("./list/Assign")));

const materialRoutes = [  
  { path: "/material/table", element: <AppTable /> },
  { path: "/material/form", element: <AppForm /> },
  { path: "/material/buttons", element: <AppButton /> },
  { path: "/material/icons", element: <AppIcon /> },
  { path: "/material/progress", element: <AppProgress /> },
  { path: "/material/menu", element: <AppMenu /> },
  { path: "/material/checkbox", element: <AppCheckbox /> },
  { path: "/material/switch", element: <AppSwitch /> },
  { path: "/material/radio", element: <AppRadio /> },
  { path: "/material/slider", element: <AppSlider /> },
  { path: "/material/autocomplete", element: <AppAutoComplete /> },
  { path: "/material/expansion-panel", element: <AppExpansionPanel /> },
  { path: "/material/dialog", element: <AppDialog /> },
  { path: "/material/snackbar", element: <AppSnackbar /> },

  { path: "/members", element: <MemberTable /> },
  { path: "/members/add-member", element: <AddMember /> },
  { path: "/members/edit-member", element: <Editmember /> },

  { path: "/agents", element: <AgentTable /> },
  { path: "/agents/add-agent", element: <AddAgent /> },
  { path: "/agents/edit-agent", element: <Editagent /> },


  { path: "/products/add-product", element: <AddProduct /> },
  { path: "/products/edit-product", element: <EditProduct /> },
  { path: "/sales", element: <AssignTable /> },
  { path: "/salesoverview", element: <AssignMembers /> },


  
  
];

export default materialRoutes;
