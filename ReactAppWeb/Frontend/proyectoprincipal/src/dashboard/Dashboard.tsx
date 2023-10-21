import { Card, CardContent, CardHeader, Avatar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

export const Dashboard = () => (
  <div className="DashboardList">
    <Card>
      <CardHeader title="Bienvenido a Fundación Por México" />
      <CardContent style={{ textAlign: "justify" }}>
        Fundación por México es una organización comprometida con el bienestar y
        el progreso de la sociedad mexicana. Nuestra misión es impulsar el
        cambio positivo y el desarrollo sostenible en México a través de
        proyectos y programas que abordan desafíos clave en áreas como la
        educación, la salud, el medio ambiente y el desarrollo comunitario.
      </CardContent>
      <br />
      <CardContent style={{ textAlign: "justify" }}>
        El objetivo de la aplicación es poder tramitar tickets con respecto a
        los probelmas que se presentan en lugares, tanto problemas a individuos
        como al moviliario. De igualmanera se presentan reportes con respecto a
        como se han estado manejando los tickets, cuantos fueron tramitados,
        porque, quien, y el estado en el que estan.
      </CardContent>
    </Card>
    <iframe
      style={{
        marginTop: "2px",
        background: "#F1F5F4",
        border: "none",
        borderRadius: "2px",
        boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
        width: "100%",
        height: "500px",
      }}
      src="https://charts.mongodb.com/charts-project-0-ylbrs/embed/dashboards?id=6529cc0d-90aa-47d0-801b-d0d369dd2939&theme=light&autoRefresh=true&maxDataAge=3600&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"
    ></iframe>
  </div>
);
