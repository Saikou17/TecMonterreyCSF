import {
  Admin,
  Resource,
  ShowGuesser,
  Layout,
} from "react-admin"; 
import { dataProvider} from "./dataProvider";
import { UserList } from "./users"; // <-- this is the file we created in the previous step 
import { PostList , PostEdit, PostCreate } from "./posts"; // <-- this is the file we created in the previous step
import PostIcon from "@mui/icons-material/Book";
import UserIcon from "@mui/icons-material/Group";
import {Dashboard} from "./Dashboard";
import { authProvider } from "./authProvider";
import { i18nProvider } from './i18nProvider';
import { MyAppBar } from "./AppBar";
import LoginPage from "./LoginPage";
import StraightAnglePieChart from "./Charts";


const MyLayout = (props: any) => <Layout {...props} appBar={MyAppBar} />;


export const App = () => <Admin loginPage={LoginPage}  authProvider={authProvider} dataProvider={dataProvider} dashboard={Dashboard} i18nProvider={i18nProvider}  layout={MyLayout} darkTheme={{palette: {mode: 'dark'}}} >
<Resource name="users" list={UserList} show={ShowGuesser} recordRepresentation="name" icon={UserIcon} options={{ label: 'Usuarios' }} />
<Resource name="posts" list={PostList} edit={PostEdit} create={PostCreate} icon={PostIcon} options={{ label: 'Posts' }} />
<Resource name = "charts" list={StraightAnglePieChart} />
</Admin>

