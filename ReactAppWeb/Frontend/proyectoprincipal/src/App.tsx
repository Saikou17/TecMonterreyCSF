import { Admin, Resource, ShowGuesser } from "react-admin";
import { dataProvider } from "./dataProvider";
import { PostList, PostEdit, PostCreate } from "./posts";
import { UserList } from "./users";
import { TicketsList } from "./tickets";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";

export const App = () => (<Admin dataProvider={dataProvider}>
  <Resource name="users" list={UserList} show={ShowGuesser} recordRepresentation="name" icon={UserIcon}/>
  <Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon}/>
  <Resource name="Tickets" list={TicketsList} show={ShowGuesser} recordRepresentation="name"/>
</Admin>);
