import { Accordion } from "react-bootstrap";
import { useListContext, List } from "react-admin";


type Report = {
    id: number;
    title: string;
    body: string;
    userId: number;
};


const ReportsView = () => {
    const { data } = useListContext<Report>();

    return (
        <div>
            {data?.map(post => (
                <Accordion>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>{post.title}</Accordion.Header>
                        <Accordion.Body>
                            <h1>{post.title}</h1>
                            <p>{post.body}</p>
                            <p>Id usuario: {post.userId}</p>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            ))}
        </div>
    );
};

export const ReportsList = (props:any) => (
    <List {...props}>
        <ReportsView />
    </List>
)
