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
                    if col in ["v", "^", ">", "<","*","x"]: 
                        agent = Road(f"r_{r*self.width+c}", self, dataDictionary[col])
                        self.grid.place_agent(agent, (c, self.height - r - 1))
                        self.city.append(agent)


                    elif col in ["S", "s"]:
                        agent = Traffic_Light(f"tl_{r*self.width+c}", self, False if col == "S" else True, int(dataDictionary[col]))
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
                    
                    elif col == "C":
                        agent = Car(f"c_{r*self.width+c}", self)
                        self.grid.place_agent(agent, (c, self.height - r - 1))
                        self.schedule.add(agent)
                        self.cars.append(agent)
                        self.city.append(agent)

        self.num_agents = N
        self.running = True
        
    # def create_graph(self):
    #     """
    #     Creates a graph based on the city grid.
    #     """
    #     graph = nx.DiGraph()
    #     for nodo in self.city:
    #         graph.add_node(nodo)

    #     for camino in self.city:
    #         destino = self.grid.get_neighbors(camino.pos, moore=True, include_center=False)

    #         for destinos in destino:
    #             if isinstance(destinos,Road) and isinstance(camino,Road):
    #                 direccion_actual = camino.direction
    #                 direccion_siguiente = destinos.direction
    #                 if (direccion_actual == "Left" and direccion_siguiente == "Down") or (direccion_actual == "Left" and direccion_siguiente == "Up"):
    #                     graph.add_edge(camino,destinos)
    #                 elif (direccion_actual == "Right" and direccion_siguiente == "Down") or (direccion_actual == "Right" and direccion_siguiente == "Up"):
    #                     graph.add_edge(camino,destinos)
    #                 elif (direccion_actual == "Up" and direccion_siguiente == "Left") or (direccion_actual == "Up" and direccion_siguiente == "Right"):
    #                     graph.add_edge(camino,destinos)
    #                 elif (direccion_actual == "Down" and direccion_siguiente == "Left") or (direccion_actual == "Down" and direccion_siguiente == "Right"):
    #                     graph.add_edge(camino,destinos)
    #                 elif (direccion_actual == "Intersection"):
    #                     graph.add_edge(camino,destinos)
    #                 elif (direccion_actual == "Contrary"):
    #                     graph.add_edge(camino,destinos)

                
    #             elif isinstance(destinos,Traffic_Light) and isinstance(camino,Road) or isinstance(destinos,Road) and isinstance(camino,Traffic_Light):
    #                 graph.add_edge(camino,destinos) 
                
    #             elif isinstance(destinos,Destination) and isinstance(camino,Road) or isinstance(destinos,Road) and isinstance(camino,Destination):


                          
    #     pos = nx.spring_layout(graph)  # Layout para la visualización
    #     nx.draw(graph, pos, with_labels=True, arrowsize=20)
    #     plt.show()
        

    def step(self):
        '''Advance the model by one step.'''
        self.schedule.step()

        if not self.initialize:
            self.initialize = True
        
        # else:
        #     self.create_graph()
            
