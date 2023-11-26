from mesa import Model
from mesa.time import RandomActivation
from mesa.space import MultiGrid
from agent import *
import json
import networkx as nx
import matplotlib.pyplot as plt

class CityModel(Model):
    """ 
        Creates a model based on a city map.

        Args:
            N: Number of agents in the simulation
    """
    def __init__(self, N):

        # Load the map dictionary. The dictionary maps the characters in the map file to the corresponding agent.
        dataDictionary = json.load(open("city_files/mapDictionary.json"))
        self.initialize = False
        self.traffic_lights = []
        self.cars = []
        self.destinations = []
        self.city = []
        print(dataDictionary)

        # Load the map file. The map file is a text file where each character represents an agent.
        with open('city_files/2022_base.txt') as baseFile:
            lines = baseFile.readlines()
            self.width = len(lines[0])-1
            self.height = len(lines)

            self.grid = MultiGrid(self.width, self.height, torus = False) 
            self.schedule = RandomActivation(self)

            # Goes through each character in the map file and creates the corresponding agent.
            for r, row in enumerate(lines):
                for c, col in enumerate(row):
                    if col in ["v", "^", ">", "<","*"]: 
                        agent = Road(f"r_{r*self.width+c}", self, dataDictionary[col]["Direction"],dataDictionary[col]["Value"])
                        self.grid.place_agent(agent, (c, self.height - r - 1))
                        self.city.append(agent)


                    elif col in ["N","n","S", "s","E","e","W","w"]:
                        agent = Traffic_Light(f"tl_{r*self.width+c}", self,dataDictionary[col]["Direction"],dataDictionary[col]["Value"], False if col == "S" else True, int(dataDictionary[col]["Time"]))
                        self.grid.place_agent(agent, (c, self.height - r - 1))
                        self.schedule.add(agent)
                        self.city.append(agent)

                    elif col == "#":
                        agent = Obstacle(f"ob_{r*self.width+c}", self)
                        self.grid.place_agent(agent, (c, self.height - r - 1))

                    elif col == "D":
                        agent = Destination(f"d_{r*self.width+c}", self)
                        self.grid.place_agent(agent, (c, self.height - r - 1))
                        self.destinations.append(agent)
                        self.city.append(agent)
                    
                    elif col in ["1","2","3","4"]:
                        agent = Road(f"r_{r*self.width+c}", self, dataDictionary[col]["Direction"],dataDictionary[col]["Value"])
                        agent = Car(f"c_{r*self.width+c}", self)
                        self.grid.place_agent(agent, (c, self.height - r - 1))
                        self.schedule.add(agent)
                        self.cars.append(agent)
                        self.city.append(agent)

        self.num_agents = N
        self.running = True
        
    def create_graph(self):
        """
        Creates a graph based on the city grid.
        """
        graph = nx.DiGraph()
        for nodo in self.city:
            graph.add_node(nodo)

        for camino in self.city:
            if isinstance(camino,Road) or isinstance(camino,Traffic_Light):
                if camino.direction == "Left":
                    conexiones = self.grid.get_neighbors(camino.pos,moore = True,include_center=False,radius=1)
                    direccion = [agente for agente in conexiones if agente.pos[0]<=camino.pos[0] and ((agente.pos[0]-camino.pos[0] > 0 and agente.sense.x > 0 or agente.pos[0]-camino.pos[0] < 0 and agente.sense.x < 0 ) and (agente.pos[1]-camino.pos[1] > 0 and agente.sense.y > 0 or agente.pos[1]-camino.pos[1] < 0 and agente.sense.y < 0 ))]
                    for i in direccion:
                        graph.add_edge(camino,i)
                elif camino.direction == "Right":
                    conexiones = self.grid.get_neighbors(camino.pos,moore = True,include_center=False,radius=1)
                    direccion = [agente for agente in conexiones if agente.pos[0]>=camino.pos[0] and ((agente.pos[0]-camino.pos[0] > 0 and agente.sense.x > 0 or agente.pos[0]-camino.pos[0] < 0 and agente.sense.x < 0 ) and (agente.pos[1]-camino.pos[1] > 0 and agente.sense.y > 0 or agente.pos[1]-camino.pos[1] < 0 and agente.sense.y < 0 ))]
                    for i in direccion:
                        graph.add_edge(camino,i)
                elif camino.direction == "Up":
                    conexiones = self.grid.get_neighbors(camino.pos,moore = True,include_center=False,radius=1)
                    direccion = [agente for agente in conexiones if agente.pos[1]>=camino.pos[1] and ((agente.pos[0]-camino.pos[0] > 0 and agente.sense.x > 0 or agente.pos[0]-camino.pos[0] < 0 and agente.sense.x < 0 ) and (agente.pos[1]-camino.pos[1] > 0 and agente.sense.y > 0 or agente.pos[1]-camino.pos[1] < 0 and agente.sense.y < 0 ))]
                    for i in direccion:
                        graph.add_edge(camino,i)
                elif camino.direction == "Down":
                    conexiones = self.grid.get_neighbors(camino.pos,moore = True,include_center=False,radius=1)
                    direccion = [agente for agente in conexiones if agente.pos[1]<=camino.pos[1] and ((agente.pos[0]-camino.pos[0] > 0 and agente.sense.x > 0 or agente.pos[0]-camino.pos[0] < 0 and agente.sense.x < 0 ) and (agente.pos[1]-camino.pos[1] > 0 and agente.sense.y > 0 or agente.pos[1]-camino.pos[1] < 0 and agente.sense.y < 0 ))]
                    for i in direccion:
                        graph.add_edge(camino,i)
                elif camino.direction == "Intersection":
                    conexiones = self.grid.get_neighbors(camino.pos,moore = True,include_center=False,radius=1)
                    for i in conexiones:
                        graph.add_edge(camino,i)
            
            elif isinstance(camino,Destination):
                conexiones = self.grid.get_neighbors(camino.pos,moore = False,include_center=False,radius=1)
                for i in conexiones:
                    graph.add_edge(camino,i)
                        
        pos = nx.spring_layout(graph)  # Layout para la visualización
        nx.draw(graph, pos, with_labels=True, arrowsize=20)
        plt.show()
        

    def step(self):
        '''Advance the model by one step.'''
        self.schedule.step()

        if not self.initialize:
            self.initialize = True
        
        else:
            self.create_graph()
            
