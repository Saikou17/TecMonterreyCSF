import {
  Admin,
  ListGuesser,
  Resource,
  ShowGuesser,
  CustomRoutes,
  Layout,
} from "react-admin";
import { BrowserRouter, Route } from "react-router-dom";
import { dataProvider } from "./dataProvider";
import authProvider from "./authProvider";
import Registrarse from "./registrarse";
import { MyLoginPage } from "./MyLoginPage";
import { DashboardList } from "./DashboardList";
import { Home, DynamicFeed, Description } from "@mui/icons-material";
import { Dashboard } from "./dashboard/Dashboard";
import { CardList, CardEdit, CardCreate } from "./MyList";
import { ReportsList } from "./Reportes";
import { Label } from "recharts";
import { report } from "process";
import { i18nProvider } from "./i18nProvider";
import { MyAppBar } from "./MyAppBar";

const MyLayout = (props: any) => <Layout {...props} appBar={MyAppBar} />;

export const App = () => {
  return (
    <Admin
      i18nProvider={i18nProvider}
      dashboard={Dashboard}
      dataProvider={dataProvider}
      authProvider={authProvider}
      loginPage={MyLoginPage}
      layout={MyLayout}
      darkTheme={{ palette: { mode: "dark" } }}
    >
      {/* <Resource name="users" list={UserList} /> */}
      <Resource
        name="Tickets"
        list={CardList}
        edit={CardEdit}
        create={CardCreate}
      />
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
