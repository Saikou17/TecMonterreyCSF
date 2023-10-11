import {
  Admin,
  ListGuesser,
  Resource,
  ShowGuesser,
  CustomRoutes,
} from "react-admin";
import { Route } from "react-router-dom";
import { dataProvider } from "./dataProvider";
// import  authProvider  from "./authProvider";
import { UserList } from "./users";
import { TicketCreate, TicketEdit, TicketsList } from "./tickets";
import Registrarse from "./registrarse";
import PostIcon from "@mui/icons-material/Book";
import { PostCreate, PostEdit, PostList } from "./posts";
import { DashboardList } from "./DashboardList";
import { Home, DynamicFeed, Description } from "@mui/icons-material";
import { Dashboard } from "./dashboard/Dashboard";

export const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="dashboard" list={Dashboard} icon={Home} />
      <Resource name="users" list={UserList} />
      <Resource
        name="posts"
        list={PostList}
        edit={PostEdit}
        create={PostCreate}
        icon={DynamicFeed}
      />
    </Admin>
  );
};
export default App;
