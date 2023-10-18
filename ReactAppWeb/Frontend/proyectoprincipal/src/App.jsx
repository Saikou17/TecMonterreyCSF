import {
  Admin,
  Resource,
  CustomRoutes,
  Layout
} from "react-admin";
import { Route } from "react-router-dom";
import { dataProvider } from "./dataProvider";
import authProvider from "./authProvider";
import Registrarse from "./registrarse";
import { MyLoginPage } from "./MyLoginPage";
import { Description } from "@mui/icons-material";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { Dashboard } from "./dashboard/Dashboard";
import { CardList, CardEdit, CardCreate } from "./MyList";
import { ReportsList} from "./Reportes";
import { i18nProvider } from "./i18nProvider";
import { MyAppBar } from "./MyAppBar";

const MyLayout = (props) => <Layout {...props} appBar={MyAppBar} />;

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
        {permissions => (
          <>
            {permissions==="Coordinador Aula"?<Resource name="Tickets" list={CardList} edit={CardEdit} create={CardCreate} icon={ConfirmationNumberIcon}/> : null}
            {permissions==="Coordinador Nacional"?<Resource name="Tickets" list={CardList} edit={CardEdit} icon={ConfirmationNumberIcon}/>:null }
            {permissions==="Coordinador Nacional"?<Resource name="Reportes" list={ReportsList} icon={Description} options={{ Label: "Reportes" }}/>:null}
            {permissions==="Ejecutivo"?<Resource name="Reportes" list={ReportsList} icon={Description} options={{ Label: "Reportes" }} />:null}
          </>
        )}
        <CustomRoutes noLayout>
          <Route path="/Registrarse" element={<Registrarse />} />
        </CustomRoutes>
      </Admin>
    );
  };
  export default App;
