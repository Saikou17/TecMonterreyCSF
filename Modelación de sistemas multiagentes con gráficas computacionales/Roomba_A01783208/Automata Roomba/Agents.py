from mesa import Agent
import networkx as nx

class RandomAgent(Agent):
    """
    Agent that moves randomly.
    Attributes:
        unique_id: Agent's ID 
        direction: Randomly chosen direction chosen from one of eight directions
    """
    def __init__(self, unique_id, model, battery_station):
        """
        Creates a new random agent.
        Args:
            unique_id: The agent's ID
            model: Model reference for the agent
        """
        super().__init__(unique_id, model)
        self.direction = 4
        self.steps_taken = 0
        self.battery = 100
        self.station = battery_station
        self.inStation = False
        self.grid_graph = nx.grid_2d_graph(model.grid.width, model.grid.height, create_using=nx.DiGraph)

    def move(self):
        """ 
        Determines if the agent can move in the direction that was chosen
        """
        #Check the empty cells
        possible_steps = self.model.grid.get_neighbors(
            self.pos,
            moore=True, # Boolean for whether to use Moore neighborhood (including diagonals) or Von Neumann (only up/down/left/right).
            include_center=False) 

        # Filtrar agentes de tipo Floor
        floor_agents = [p for p in possible_steps if isinstance(p, Floor)]
        min_priority_agent = min(
            floor_agents,
            key=lambda p: p.prioridad,
            default=None
        )

        # Aquí, min_priority_agent contendrá el agente con la menor prioridad
        if min_priority_agent:
            self.battery -= 1
            min_priority_agent.prioridad += 1
            # self.road.append(min_priority_agent.pos)
            self.model.grid.move_agent(self, min_priority_agent.pos)
            self.steps_taken += 1
    
    def return_back(self):
        # Obtener la posición de la estación de carga
        station_pos = self.station

        # Calcular el camino más corto desde la posición actual hasta la estación de carga
        shortest_path = nx.shortest_path(self.grid_graph, source=self.pos, target=station_pos)

        # Moverse a lo largo del camino más corto
        for step in shortest_path[1:]:
            self.model.grid.move_agent(self, step)
            self.battery -= 1
            self.steps_taken += 1 
            return 

        # Reiniciar la lista de posiciones en el camino de regreso
        self.inStation = True

    def charging(self):
        self.battery += 5

    def clean(self):
        for neighbors in self.model.grid.iter_neighbors(self.pos, moore = True, include_center = True):
           if isinstance(neighbors, Trash):  # Verifica si el vecino es una instancia de la clase Trash
                self.battery -= 1
                self.model.grid.move_agent(self, neighbors.pos)
                self.model.grid.remove_agent(neighbors)
                return
           
    def search_trash(self):
        for neighbors in self.model.grid.iter_neighbors(self.pos, moore=True, include_center=True):
            if isinstance(neighbors, Trash):
                return neighbors  # Retorna el agente de basura encontrado en los vecinos
        return None  # Retorna None si no se encuentra basura en los vecinos

    def step(self):
        """ 
        Determines the new direction it will take, and then moves
        """
        print(self.battery)
        print(self.pos)
        print(self.search_trash())

        if self.battery == 0:
            self.model.grid.remove_agent(self)

        elif self.inStation == True:
            self.charging()
            if self.battery > 100:
                self.battery = 100
                self.inStation = False

        elif self.battery < 30:
            self.return_back()

        elif self.search_trash() != None:
            self.clean()
        
        else:
            self.move()

class ObstacleAgent(Agent):
    """
    Obstacle agent. Just to add obstacles to the grid.
    """
    def __init__(self, unique_id, model):
        super().__init__(unique_id, model)

    def step(self):
        pass

#We add a new class called trash or being more specific my own name :3
class Trash(Agent):
    """
    Trash agent. Just to be clean by the Roomba.
    """
    def __init__(self, unique_id, model): #We use this constructor in order to inicialize our trash agent.
        #Each agent will have an unique id and the typr pf model it contains the agent.
        super().__init__(unique_id, model) #The super calls the contructor.
        self.count = 0
    
    def step(self):
        pass

class Battery(Agent):
    """
    Battery agent. This is used to represent the battery of the roomba.
    """
    def __init__(self, unique_id, model):
        super().__init__(unique_id, model)
    
    def step(self):
        pass

class Floor(Agent):
    """
    Floor agent. This is used to represent the floor of the house.
    """
    def __init__(self, unique_id, model):
        super().__init__(unique_id, model)
        self.prioridad = 1
    
    def step(self):
        pass

    