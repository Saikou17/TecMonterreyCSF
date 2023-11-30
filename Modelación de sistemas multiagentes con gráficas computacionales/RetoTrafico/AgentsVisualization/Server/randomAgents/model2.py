from mesa import Model, DataCollector
from mesa.time import RandomActivation
from mesa.space import MultiGrid
from randomAgents.agent2 import *
import json
import networkx as nx
import matplotlib.pyplot as plt

class CityModel(Model):
    """ 
        Creates a model based on a city map.

        Args:
            N: Number of agents in the simulation
    """
    def __init__(self):

        # Load the map dictionary. The dictionary maps the characters in the map file to the corresponding agent.
        dataDictionary = json.load(open("randomAgents/city_files/mapDictionary.json"))
        self.initialize = False
        self.traffic_lights = []
        self.cars = []
        self.destinations = []
        self.city = []
        self.arrived = []
        self.datacollector = DataCollector( 
                model_reporters = {
                        "Car collision": lambda m: 1 if m.checkCollision() else 0,
            })
        

        # Load the map file. The map file is a text file where each character represents an agent.
        with open('randomAgents/city_files/2022_base.txt') as baseFile:
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
                        agent = Destination(f"d_{r*self.width+c}", self, dataDictionary[col]["Direction"],dataDictionary[col]["Value"])
                        self.grid.place_agent(agent, (c, self.height - r - 1))
                        self.destinations.append(agent)
                        self.city.append(agent)
                    
                    elif col in ["1","2","3","4"]:
                        agent = Spawn(f"s_{r*self.width+c}_{self.schedule.steps}", self, dataDictionary[col]["Direction"],dataDictionary[col]["Value"])
                        self.city.append(agent)
                        self.schedule.add(agent)
                        self.grid.place_agent(agent, (c, self.height - r - 1))
                        agent = Car(f"c_{r*self.width+c}_{self.schedule.steps}", self)
                        self.schedule.add(agent)
                        self.grid.place_agent(agent, (c, self.height - r - 1))
                        self.cars.append(agent)

        self.graph = nx.DiGraph()
        self.create_graph()
        # self.num_agents = N
        self.running = True

    def checkCollision(self):
        for i in range(self.width):
            for j in range(self.height):
                if len(self.grid[i][j]) >= 3:
                    for x in self.grid[i][j]:
                        if isinstance(x, Destination):
                            return False
                    print("---------------------")
                    print(f"Colition at: ({i}, {j})")
                    for x in self.grid[i][j]:
                        if not isinstance(x, Road):
                            print(x.unique_id)
                    self.running = False
                    return True
        
    def create_graph(self):
        """
        Creates a graph based on the city grid.
        """
        for nodo in self.city:
            self.graph.add_node(nodo.pos)

        for camino in self.city:
            if isinstance(camino,Road) or isinstance(camino,Traffic_Light) or isinstance(camino,Spawn):
                if camino.direction == "Left":
                    conexiones = self.grid.get_neighbors(camino.pos,moore = True,include_center=False,radius=1)
                    direccion = [agente for agente in conexiones if isinstance(agente,(Road,Traffic_Light,Destination,Spawn)) and
                                 agente.pos[0]<camino.pos[0] and 
                                 ((agente.pos[1]-camino.pos[1] >= 0 and agente.sense["y"] >= 0) or (agente.pos[1]-camino.pos[1] <= 0 and agente.sense["y"] <= 0))]           
                    for i in direccion:
                        self.graph.add_edge(camino.pos,i.pos)
                    
                elif camino.direction == "Right":
                    conexiones = self.grid.get_neighbors(camino.pos,moore = True,include_center=False,radius=1)
                    direccion = [agente for agente in conexiones if isinstance(agente,(Road,Traffic_Light,Destination,Spawn)) and
                                 agente.pos[0]>camino.pos[0] and 
                                 ((agente.pos[1]-camino.pos[1] >= 0 and agente.sense["y"] >= 0) or (agente.pos[1]-camino.pos[1] <= 0 and agente.sense["y"] <= 0))]
                    for i in direccion:
                        self.graph.add_edge(camino.pos,i.pos)

                elif camino.direction == "Up":
                    conexiones = self.grid.get_neighbors(camino.pos,moore = True,include_center=False,radius=1)
                    direccion = [agente for agente in conexiones if isinstance(agente,(Road,Traffic_Light,Destination,Spawn)) and
                                 agente.pos[1]>camino.pos[1] and 
                                 ((agente.pos[0]-camino.pos[0] >= 0 and agente.sense["x"] >= 0) or (agente.pos[0]-camino.pos[0] <= 0 and agente.sense["x"] <= 0))]
                    for i in direccion:
                        self.graph.add_edge(camino.pos,i.pos)

                elif camino.direction == "Down":
                    conexiones = self.grid.get_neighbors(camino.pos,moore = True,include_center=False,radius=1)
                    direccion = [agente for agente in conexiones if isinstance(agente,(Road,Traffic_Light,Destination,Spawn)) and
                                 agente.pos[1]<camino.pos[1] and 
                                 ((agente.pos[0]-camino.pos[0] >= 0 and agente.sense["x"] >= 0) or (agente.pos[0]-camino.pos[0] <= 0 and agente.sense["x"] <= 0))]
                    for i in direccion:
                        self.graph.add_edge(camino.pos,i.pos)

                elif camino.direction == "Intersection":
                    conexiones = self.grid.get_neighbors(camino.pos,moore = True,include_center=False,radius=1)
                    direccion = [agente for agente in conexiones if agente.pos[1]>camino.pos[1]]
                    for i in direccion:
                        self.graph.add_edge(camino.pos,i.pos)

    def step(self):
        '''Advance the model by one step.'''
        self.schedule.step()
        self.datacollector.collect(self)
        if not self.initialize:
            self.initialize = True
        
        
            
