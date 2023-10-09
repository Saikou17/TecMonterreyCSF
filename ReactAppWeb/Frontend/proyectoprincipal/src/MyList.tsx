import  Button from "react-bootstrap/Button";
import  Card from "react-bootstrap/Card"; 
import { List, useListContext, ReferenceInput, TextInput } from "react-admin";
import 'bootstrap/dist/css/bootstrap.min.css';

const postFilters = [
  <TextInput source="q" label="Search" alwaysOn />,
  <ReferenceInput source="userId" label="User" reference="users" />,
];


type Post = {
    id: number;
    title: string;
    body: string;
    userId: number;
  };


const CardView = () => {
  const { data } = useListContext<Post>();
  return (
    <div>
      {data?.map(post => (
      <Card style={{ width: '17.5rem', height:'17.5rem', display:'inline-flex', margin: ' 10px 5px 15px 20px'}}>
        <Card.Body style={{padding:'0px'}}>
          <Card.Header>{post.id}</Card.Header>
          <Card.Title style={{marginLeft:' 5px', marginBottom:'5px'}}>{post.title}</Card.Title>
          <Card.Text style={{marginLeft:' 5px', marginBottom:'5px'}}>
            {post.title}
          </Card.Text>
          <Button style={{marginLeft:'5px', marginBottom:'5px'}} variant="info">Ver</Button>
          <Card.Footer style={{bottom:'1px', alignItems:'flex-end', flexDirection:'column'}}>
            <small className="text-muted">{post.userId}</small>
          </Card.Footer>
        </Card.Body>
      </Card>
      ))}
    </div>
  );
}

export const CardList = (props:any) => (
    <List filters={postFilters}>
        <CardView />
    </List>
    )
