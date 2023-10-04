import { Admin, ListGuesser, Resource, ShowGuesser } from "react-admin";
import { dataProvider } from "./dataProvider";
import { PostList, PostEdit, PostCreate } from "./posts";
import { UserList } from "./users";
import { TicketsList } from "./tickets";
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";

export const App = () => {
  return(
  <Admin dataProvider={dataProvider}>
    <Resource name="users" list={UserList} />
    {/* <Resource name="Tickets" list={TicketsList}/> */}
  </Admin>);
};
export default App;

