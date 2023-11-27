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
        self.graph = nx.DiGraph()
        

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
                        print(agent.pos)
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
                        agent = Destination(f"d_{r*self.width+c}", self, dataDictionary[col]["Direction"],dataDictionary[col]["Value"])
                        self.grid.place_agent(agent, (c, self.height - r - 1))
                        self.destinations.append(agent)
                        self.city.append(agent)
                    
                    elif col in ["1","2","3","4"]:
                        agent = Road(f"r_{r*self.width+c}", self, dataDictionary[col]["Direction"],dataDictionary[col]["Value"])
                        self.city.append(agent)
                        self.schedule.add(agent)
                        self.grid.place_agent(agent, (c, self.height - r - 1))
                        agent = Car(f"c_{r*self.width+c}", self)
                        self.schedule.add(agent)
                        self.grid.place_agent(agent, (c, self.height - r - 1))
                        self.cars.append(agent)

        self.num_agents = N
        self.running = True
        
    def create_graph(self):
        """
        Creates a graph based on the city grid.
        """
        for nodo in self.city:
            self.graph.add_node(nodo.pos)

        for camino in self.city:
            if isinstance(camino,Road) or isinstance(camino,Traffic_Light):
                if camino.direction == "Left":
                    conexiones = self.grid.get_neighbors(camino.pos,moore = True,include_center=False,radius=1)
                    direccion = [agente for agente in conexiones if isinstance(agente,(Road,Traffic_Light,Destination)) and
                                 agente.pos[0]<camino.pos[0] and 
                                 ((agente.pos[1]-camino.pos[1] >= 0 and agente.sense["y"] >= 0) or (agente.pos[1]-camino.pos[1] <= 0 and agente.sense["y"] <= 0))]           
                    for i in direccion:
                        self.graph.add_edge(camino.pos,i.pos)
                    
                elif camino.direction == "Right":
                    conexiones = self.grid.get_neighbors(camino.pos,moore = True,include_center=False,radius=1)
                    direccion = [agente for agente in conexiones if isinstance(agente,(Road,Traffic_Light,Destination)) and
                                 agente.pos[0]>camino.pos[0] and 
                                 ((agente.pos[1]-camino.pos[1] >= 0 and agente.sense["y"] >= 0) or (agente.pos[1]-camino.pos[1] <= 0 and agente.sense["y"] <= 0))]
                    for i in direccion:
                        self.graph.add_edge(camino.pos,i.pos)

                elif camino.direction == "Up":
                    conexiones = self.grid.get_neighbors(camino.pos,moore = True,include_center=False,radius=1)
                    direccion = [agente for agente in conexiones if isinstance(agente,(Road,Traffic_Light,Destination)) and
                                 agente.pos[1]>camino.pos[1] and 
                                 ((agente.pos[0]-camino.pos[0] >= 0 and agente.sense["x"] >= 0) or (agente.pos[0]-camino.pos[0] <= 0 and agente.sense["x"] <= 0))]
                    for i in direccion:
                        self.graph.add_edge(camino.pos,i.pos)

                elif camino.direction == "Down":
                    conexiones = self.grid.get_neighbors(camino.pos,moore = True,include_center=False,radius=1)
                    direccion = [agente for agente in conexiones if isinstance(agente,(Road,Traffic_Light,Destination)) and
                                 agente.pos[1]<camino.pos[1] and 
                                 ((agente.pos[0]-camino.pos[0] >= 0 and agente.sense["x"] >= 0) or (agente.pos[0]-camino.pos[0] <= 0 and agente.sense["x"] <= 0))]
                    for i in direccion:
                        self.graph.add_edge(camino.pos,i.pos)

                elif camino.direction == "Intersection":
                    conexiones = self.grid.get_neighbors(camino.pos,moore = True,include_center=False,radius=1)
                    direccion = [agente for agente in conexiones if agente.pos[1]>camino.pos[1]]
                    for i in direccion:
                        self.graph.add_edge(camino.pos,i.pos)

        for node in self.graph.nodes:
            neighbors = self.graph.neighbors(node)
            print(f"Node {node}: {list(neighbors)}")

    def step(self):
        '''Advance the model by one step.'''
        self.schedule.step()

        if not self.initialize:
            self.create_graph()
            self.initialize = True
        
        
            
