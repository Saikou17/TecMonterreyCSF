import { Accordion } from "react-bootstrap";
import { useListContext, List } from "react-admin";
/*import { report } from "process";*/

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
      {data?.map((report) => (
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>{report.title}</Accordion.Header>
            <Accordion.Body>
              <h1>{report.title}</h1>
              <p>{report.body}</p>
              <p>Id usuario: {report.userId}</p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      ))}
    </div>
  );
};

export const ReportsList = (props: any) => (
  <List {...props}>
    <ReportsView />
  </List>
);
