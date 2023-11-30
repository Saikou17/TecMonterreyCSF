// TC2008B. Sistemas Multiagentes y Gráficas Computacionales
// C# client to interact with Python. Based on the code provided by Sergio Ruiz.
// Juan Pablo Cruz Rodriguez. October 2023

using System;
using System.Collections;
using System.Collections.Generic;
using UnityEditor;
using UnityEngine;
using UnityEngine.Networking;

[Serializable]
public class AgentData
{
    /*
    The AgentData class is used to store the data of each agent.
    
    Attributes:
        id (string): The id of the agent.
        x (float): The x coordinate of the agent.
        y (float): The y coordinate of the agent.
        z (float): The z coordinate of the agent.
        direccion: Sentido de la calle y orientacion en el unity
    */
    public string id;
    public float x, y, z;
    public string direccion;

    //Constructor de Agentes 
    public AgentData(string id, float x, float y, float z)
    {
        this.id = id;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    //Constructor de Agentes para semaforos y camino
    public traffic_roadData(string id, float x, float y, float z, string direccion){
        this.id = id;
        this.x = x;
        this.y = y;
        this.z = z;
        this.direccion = direccion;
    }
}

[Serializable]

public class AgentsData
{
    /*
    The AgentsData class is used to store the data of all the agents.

    Attributes:
        positions (list): A list of AgentData objects.
    */
    public List<AgentData> agentes;

    public AgentsData() => this.agentes= new List<AgentData>();

}

public class AgentController : MonoBehaviour
{
    //Endpoints de nuestro servidor
    string serverUrl = "http://localhost:8585";
    string getAgentsEndpoint = "/getAgents";
    string getObstaclesEndpoint = "/getObstacles";
    string getTrafficLightsEndpoint = "/getTrafficLights";
    string getDetinationsEndpoint = "/getDestinations";
    string getRoadsEndpoint = "/getRoads";
    string getSpawnsEndpoint = "/getSpawns";
    string sendConfigEndpoint = "/init";
    string updateEndpoint = "/update";
    //Creamos clases de listas para guardar por tipos de agente
    AgentsData agentsData, obstacleData, trafficLightsData, destinationsData, spawnsData, roadData;
    //Diccionario de nuestro agentes
    Dictionary<string, GameObject> agents;
    //Diccionario de posiciones anteriores y actuales
    Dictionary<string, Vector3> prevPositions, currPositions;
    // updated (bool): A boolean to know if the simulation has been updated.
    //started (bool): A boolean to know if the simulation has started.
    bool updated = false, started = false;
    //Prefabs de cada uno de los agentes
    public GameObject agentPrefab,trafficLightPrefab, destinationPrefab, spawnPrefab, roadPrefab;
    //Lista que guarda los prefabs de nuestros edificios
    [SerializeField] GameObject[] obstaclePrefab;
    //Tiempo que se actualiza cada vez la simulacion 
    public float timeToUpdate = 5.0f;
    //timer (float): The timer to update the simulation.
    //dt (float): The delta time.
    private float timer, dt;

    void Start()
    {
        //Creamos una lista nueva de agentes por tipo de agentes
        agentsData = new AgentsData();
        obstacleData = new AgentsData();
        trafficLightsData = new AgentsData();
        destinationsData = new AgentsData();
        spawnsData = new AgentsData();
        roadData = new AgentsData();
        //Creamos nuestro diccionario de posiciones
        prevPositions = new Dictionary<string, Vector3>();
        currPositions = new Dictionary<string, Vector3>();
        //Cremoas nuestro diccionario de agentes
        agents = new Dictionary<string, GameObject>();
        //Ingresamos el timepo de la simulacion
        timer = timeToUpdate;
        // Launches a couroutine to send the configuration to the server.
        StartCoroutine(SendConfiguration());
    }

private void Update() 
    {
        if(timer < 0)
        {
            timer = timeToUpdate;
            updated = false;
            StartCoroutine(UpdateSimulation());
        }

        if (updated)
        {
            timer -= Time.deltaTime;
            dt = 1.0f - (timer / timeToUpdate);

            // Iterates over the agents to update their positions.
            // The positions are interpolated between the previous and current positions.
            foreach(var agent in currPositions)
            {
                Vector3 currentPosition = agent.Value;
                Vector3 previousPosition = prevPositions[agent.Key];
                agents[agent.Key].GetComponent<Movimiento>().MovementCar(currentPosition, previousPosition, dt);
            }

            // float t = (timer / timeToUpdate);
            // dt = t * t * ( 3f - 2f*t);
        }
    }
 
    IEnumerator UpdateSimulation()
    {
        UnityWebRequest www = UnityWebRequest.Get(serverUrl + updateEndpoint);
        yield return www.SendWebRequest();
 
        if (www.result != UnityWebRequest.Result.Success)
            Debug.Log(www.error);
        else 
        {
            StartCoroutine(GetAgentsData());
        }
    }

    IEnumerator SendConfiguration()
    {
        /*
        The SendConfiguration method is used to send the configuration to the server.

        It uses a WWWForm to send the data to the server, and then it uses a UnityWebRequest to send the form.
        */

        UnityWebRequest www = UnityWebRequest.Post(serverUrl + sendConfigEndpoint);
        www.SetRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        yield return www.SendWebRequest();

        if (www.result != UnityWebRequest.Result.Success)
        {
            Debug.Log(www.error);
        }
        else
        {
            Debug.Log("Configuration upload complete!");
            Debug.Log("Getting Agents positions");

            // Once the configuration has been sent, it launches a coroutine to get the agents data.
            StartCoroutine(GetAgentsData());
            StartCoroutine(GetObstacleData());
            StartCoroutine(GetTrafficLightsData());
            StartCoroutine(GetDestinationsData());
            StartCoroutine(GetSpawnsData());
            StartCoroutine(GetRoadsData());

        }
    }

    IEnumerator GetAgentsData() 
    {
        // The GetAgentsData method is used to get the agents data from the server.

        UnityWebRequest www = UnityWebRequest.Get(serverUrl + getAgentsEndpoint);
        yield return www.SendWebRequest();
 
        if (www.result != UnityWebRequest.Result.Success)
            Debug.Log(www.error);
        else 
        {
            // Once the data has been received, it is stored in the agentsData variable.
            // Then, it iterates over the agentsData.positions list to update the agents positions.
            agentsData = JsonUtility.FromJson<AgentsData>(www.downloadHandler.text);
            Debug.Log(agentsData.agentes);

            foreach(AgentData agent in agentsData.agentes)
            {
                Vector3 newAgentPosition = new Vector3(agent.x, agent.y, agent.z);

                    if(agents.ContainsKey(agent.id))
                    {
                        Vector3 currentPosition = new Vector3();
                        if(currPositions.TryGetValue(agent.id, out currentPosition))
                            prevPositions[agent.id] = currentPosition;
                        currPositions[agent.id] = newAgentPosition;
                    }
                    else
                    {
                        //? Aqui en el Quaternion.identity toca inicializar con respecto a su direccion
                        prevPositions[agent.id] = newAgentPosition;
                        agents[agent.id] = Instantiate(agentPrefab, new Vector3(0,0,0), Quaternion.identity);
                    }
            }
            //Activamos el update y el start
            updated = true;
            if(!started) started = true;
        }
    }

    IEnumerator GetObstacleData()//Inicializa los edificios
    {
        UnityWebRequest www = UnityWebRequest.Get(serverUrl + getObstaclesEndpoint);
        yield return www.SendWebRequest();
 
        if (www.result != UnityWebRequest.Result.Success)
            Debug.Log(www.error);
        else 
        {
            obstacleData = JsonUtility.FromJson<AgentsData>(www.downloadHandler.text);

            Debug.Log(obstacleData.agentes);

            foreach(AgentData obstacle in obstacleData.agentes)
            {
                int rand = UnityEngine.Random.Range(0, obstaclePrefab.Length);
                Instantiate(obstaclePrefab[rand], new Vector3(obstacle.x, obstacle.y, obstacle.z), Quaternion.identity);
            }
        }
    }

    //? Se debe de obtener su estado para prender y apagar
    IEnumerator GetTrafficLightsData() //Inicializa semaforos 
    {
        UnityWebRequest www = UnityWebRequest.Get(serverUrl + getTrafficLightsEndpoint);
        yield return www.SendWebRequest();
 
        if (www.result != UnityWebRequest.Result.Success)
            Debug.Log(www.error);
        else 
        {
            trafficLightsData = JsonUtility.FromJson<AgentsData>(www.downloadHandler.text);

            Debug.Log(trafficLightsData.agentes);

            foreach(AgentData trafficLight in trafficLightsData.agentes)
            {
                if(trafficLight.direction == "Left"){
                    Instantiate(trafficLightPrefab, new Vector3(trafficLight.x, trafficLight.y, trafficLight.z), Quaternion.Euler(0,360,0));
                    Instantiate(roadPrefab, new Vector3(trafficLight.x, trafficLight.y, trafficLight.z), Quaternion.Euler(0,360,0));
                }
                else if(trafficLight.direction == "Right"){
                    Instantiate(trafficLightPrefab, new Vector3(trafficLight.x, trafficLight.y, trafficLight.z), Quaternion.Euler(0,180,0));
                    Instantiate(roadPrefab, new Vector3(trafficLight.x, trafficLight.y, trafficLight.z), Quaternion.Euler(0,180,0));
                }
                else if(trafficLight.direction == "Up"){
                    Instantiate(trafficLightPrefab, new Vector3(trafficLight.x, trafficLight.y, trafficLight.z), Quaternion.Euler(0,90,0));
                    Instantiate(roadPrefab, new Vector3(trafficLight.x, trafficLight.y, trafficLight.z), Quaternion.Euler(0,90,0));
                }
                else if(trafficLight.direction == "Down"){
                    Instantiate(trafficLightPrefab, new Vector3(trafficLight.x, trafficLight.y, trafficLight.z), Quaternion.Euler(0,270,0));
                    Instantiate(roadPrefab, new Vector3(trafficLight.x, trafficLight.y, trafficLight.z), Quaternion.Euler(0,270,0));
                }
                
            }
        }
    }

    IEnumerator GetDestinationsData() //Inicializa nuestros destinos
    {
        UnityWebRequest www = UnityWebRequest.Get(serverUrl + getDetinationsEndpoint);
        yield return www.SendWebRequest();
 
        if (www.result != UnityWebRequest.Result.Success)
            Debug.Log(www.error);
        else 
        {
            destinationsData = JsonUtility.FromJson<AgentsData>(www.downloadHandler.text);

            Debug.Log(destinationsData.positions);

            foreach(AgentData destination in destinationsData.positions)
            {

                Instantiate(destinationPrefab, new Vector3(destination.x, destination.y, destination.z), Quaternion.identity);
            }
        }
    }

    IEnumerator GetSpawnsData() //Inicializa nuestros spawns
    {
        UnityWebRequest www = UnityWebRequest.Get(serverUrl + getSpawnsEndpoint);
        yield return www.SendWebRequest();
 
        if (www.result != UnityWebRequest.Result.Success)
            Debug.Log(www.error);
        else 
        {
            spawnsData = JsonUtility.FromJson<AgentsData>(www.downloadHandler.text);

            Debug.Log(spawnsData.positions);

            foreach(AgentData spawn in spawnsData.positions)
            {
                Instantiate(spawnPrefab, new Vector3(spawn.x, spawn.y, spawn.z), Quaternion.identity);
            }
        }
    }

    IEnumerator GetRoadsData() 
    {
        UnityWebRequest www = UnityWebRequest.Get(serverUrl + getRoadsEndpoint);
        yield return www.SendWebRequest();
 
        if (www.result != UnityWebRequest.Result.Success)
            Debug.Log(www.error);
        else 
        {
            roadData = JsonUtility.FromJson<AgentsData>(www.downloadHandler.text);

            Debug.Log(roadData.positions);

            foreach(AgentData road in roadData.positions)
            {
                Instantiate(roadPrefab, new Vector3(road.x, road.y, road.z), Quaternion.identity);
            }
        }
    }
}
