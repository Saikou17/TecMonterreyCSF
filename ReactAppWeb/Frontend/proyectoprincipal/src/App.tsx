import { Admin, ListGuesser, Resource, ShowGuesser, CustomRoutes } from "react-admin";
import {BrowserRouter, Route} from 'react-router-dom';
import { dataProvider } from "./dataProvider";
import  authProvider  from "./authProvider";
import { UserList } from "./users";
import { TicketCreate, TicketEdit, TicketsList } from "./tickets";
import Registrarse from "./registrarse";
import { MyLoginPage } from "./MyLoginPage";
import PostIcon from "@mui/icons-material/Book";

export const App = () => {
  return(
  <Admin dataProvider={dataProvider} authProvider={authProvider} loginPage={MyLoginPage}>
    {/* <Resource name="users" list={UserList} /> */}
    <Resource name="Tickets" list={TicketsList} edit={TicketEdit} create={TicketCreate}/>
    <CustomRoutes noLayout>
        <Route path="/Registrarse" element={<Registrarse/>}/>
    </CustomRoutes>
  </Admin>);
};
export default App;


