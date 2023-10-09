import { Admin, ListGuesser, Resource, ShowGuesser, CustomRoutes } from "react-admin";
import {  Route} from 'react-router-dom';
import { dataProvider } from "./dataProvider";
// import  authProvider  from "./authProvider";
import { UserList } from "./users";
import { TicketCreate, TicketEdit, TicketsList } from "./tickets";
import Registrarse from "./registrarse";
import PostIcon from "@mui/icons-material/Book";
import { PostCreate, PostEdit, PostList } from "./posts";

export const App = () => {
  return(
  <Admin dataProvider={dataProvider}>
    {/* <Resource name="users" list={UserList} /> */}
    {/* <Resource name="Tickets" list={TicketsList} edit={TicketEdit} create={TicketCreate}/>
    <CustomRoutes>
      <Route path="/Registrarse" element={<Registrarse/>}/>
    </CustomRoutes> */}
    <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate}/>
  </Admin>);
};
export default App;


