import {
  Admin,
  ListGuesser,
  Resource,
  ShowGuesser,
  CustomRoutes,
} from "react-admin";
import { BrowserRouter, Route } from "react-router-dom";
import { dataProvider } from "./dataProvider";
import authProvider from "./authProvider";
import { UserList } from "./users";
import { TicketCreate, TicketEdit, TicketsList } from "./tickets";
import Registrarse from "./registrarse";
import { MyLoginPage } from "./MyLoginPage";
import PostIcon from "@mui/icons-material/Book";
import { PostCreate, PostEdit, PostList } from "./posts";
import { DashboardList } from "./DashboardList";
import { Home, DynamicFeed, Description } from "@mui/icons-material";
import { Dashboard } from "./dashboard/Dashboard";
import {CardList, CardEdit, CardCreate} from "./MyList"
import { ReportsList } from "./Reportes";
import { Label } from "recharts";
import { report } from "process";

export const App = () => {
  return(
  <Admin dashboard={Dashboard} dataProvider={dataProvider} authProvider={authProvider} loginPage={MyLoginPage}>
    {/* <Resource name="users" list={UserList} /> */}
    <Resource name="Tickets" list={CardList} edit={CardEdit} create={CardCreate}/>
    {/* <Resource
        name="posts"
        list={PostList}
        edit={PostEdit}
        create={PostCreate}
        icon={DynamicFeed}
      /> */}
      <CustomRoutes noLayout>
        <Route path="/Registrarse" element={<Registrarse />} />
      </CustomRoutes>
      <Resource
        name="Reportes"
        list={ReportsList}
        icon={Description}
        options={{ Label: "Reportes" }}
      />
    </Admin>
  );
};
export default App;
