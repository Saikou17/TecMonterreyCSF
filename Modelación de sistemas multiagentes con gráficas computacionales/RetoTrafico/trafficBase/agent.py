from mesa import Agent
import random
import networkx as nx
import matplotlib.pyplot as plt


class Car(Agent):
    """
    Agent that moves randomly.
    Attributes:
        unique_id: Agent's ID 
        direction: Randomly chosen direction chosen from one of eight directions
        acciones: List of actions that the agent can take
        1. Move forward
        2. See the traffic light
        3. See the destination
        4. See the obstacle
        5. Stop at traffic light
        6. Wait one step
    """
    def __init__(self, unique_id, model):
        """
        Creates a new random agent.
        Args:
            unique_id: The agent's ID
            model: Model reference for the agent
        """
        super().__init__(unique_id, model)
        #Creamos un estadp que indique en que sentido va el carro: Izquierda, Derecha, Arriba o Abajo
        self.direction = ""
        #Creamos un estado que indique como se encuentra el carro: Estatico o Movimiento
        self.state = "Movimiento"
        #Inicializamos una variable como None , la cual guardara el destino aleatorio del carro
        self.destination = None
        #Variable para iniciar la simulacion
        self.iniciar = False
        #Variable para activar 
        self.activar = True
        #Variable que guarda la vision del carro
        self.vision = []
        #Variable que guarda los espacios vacios
        self.empty_spaces = []
        #Guardamos la ruta al destino
        self.route = []
        
        
    #Funcion para iniializar la simulacion
    def Check_Model_Initialize(self):
        
        self.destination = random.choice(self.model.destinations)
        self.route = nx.shortest_path(self.model.graph, source=self.pos, target=self.destination.pos)

    def recalculate_route(self):

        self.route = nx.shortest_path(self.model.graph, source=self.pos, target=self.destination.pos)

    #Funcion que se llama cuando las celdas 
    def move(self):
        """
        Determina si el agente puede moverse en la dirección elegida
        """
        self.model.grid.move_agent(self,self.route[0])
        self.route.pop(0)


        # if self.direction == "Left":
        #     self.model.grid.move_agent(self, (self.pos[0] - 1, self.pos[1]))
        # elif self.direction == "Right":
        #     self.model.grid.move_agent(self, (self.pos[0] + 1, self.pos[1]))
        # elif self.direction == "Up":
        #     self.model.grid.move_agent(self, (self.pos[0], self.pos[1] + 1))
        # elif self.direction == "Down":
        #     self.model.grid.move_agent(self, (self.pos[0], self.pos[1] - 1))


        self.see_enviroment()
        

        

    def move_around(self):
        """
        Determina si el agente puede moverse en la dirección elegida
        """
        # if self.direction == "Left":
        #     empty_spaces = [empty for empty in self.vision if empty.pos[0]<self.pos[0] and self.model.grid.is_cell_empty(empty.pos) == True]
        # elif self.direction == "Right":
        #     empty_spaces = [empty for empty in self.vision if empty.pos[0]>self.pos[0] and self.model.grid.is_cell_empty(empty.pos) == True]
        # elif self.direction == "Up":
        #     empty_spaces = [empty for empty in self.vision if empty.pos[1]>self.pos[1] and self.model.grid.is_cell_empty(empty.pos) == True]
        # elif self.direction == "Down":
        #     empty_spaces = [empty for empty in self.vision if empty.pos[1]<self.pos[1] and self.model.grid.is_cell_empty(empty.pos) == True]

        possible_path = list(map(self.model.grid.is_cell_empty,self.vision.pos))
        next_move = [p for p,f in zip(self.vision.pos,possible_path) if f == True]
        if next_move == []:
            self.state = "Estatico"
        else:
            self.state = "Movimiento"
            next_move = random.choice(next_move)


    def stop(self):
        """ 
        Determines if the agent should stop at the traffic light
        """
        pass
    
    # def see_destination(self):
    #     """ 
    #     Determines if the agent can see the destination
    #     """
    #     shortest_path = nx.shortest_path(self.grid_graph, source=self.pos, target=self.destination.pos)
    #     for step in shortest_path[1:]:
    #         i
    #     pass
    
    #Funcion que usamos para guardar informacion de nuestra vision y direccion
    def see_enviroment(self):
        """ 
        Determines if the agent can see the enviroment
        """
        self.vision = self.model.grid.get_neighbors(self.pos,moore=True,include_center=True,radius=1)
        self.direction = [center.direction for center in self.vision if center.pos == self.pos][0]

        if self.direction == "Left":
            self.vision = [vision for vision in self.vision if vision.pos[0]<=self.pos[0] ]
        elif self.direction == "Right":
            self.vision = [vision for vision in self.vision if vision.pos[0]>=self.pos[0] ]
        elif self.direction == "Up":
            self.vision = [vision for vision in self.vision if vision.pos[1]>=self.pos[1] ]
        elif self.direction == "Down":
            self.vision = [vision for vision in self.vision if vision.pos[1]<=self.pos[1] ]
        elif self.direction == "Intersection":
            self.vision = [vision for vision in self.vision if vision.pos[1]>=self.pos[1] and vision.pos != self.pos]
        elif self.direction == "Destination":
            self.model.grid.remove_agent(self)
            self.state = "Destino Alcanzado"


    
    def see_traffic_light(self):
        """ 
        Determines if the agent can see the traffic light
        """

        # if self.direction == "Left":
        #     traffic_ligths = [lights for lights in self.vision if lights.pos[0]<self.pos and isinstance(lights,Traffic_Light)]
        # elif self.direction == "Right":
        #     traffic_ligths = [lights for lights in self.vision if lights.pos[0]>self.pos and isinstance(lights,Traffic_Light)]
        # elif self.direction == "Up":
        #     traffic_ligths = [lights for lights in self.vision if lights.pos[1]>self.pos and isinstance(lights,Traffic_Light)]
        # elif self.direction == "Down":
        #     traffic_ligths = [lights for lights in self.vision if lights.pos[1]<self.pos and isinstance(lights,Traffic_Light)]

        ligths = [lights for lights in self.vision if isinstance(lights,Traffic_Light) and lights.pos == self.pos]
        print(self.pos)
        for a in self.vision:
            print(a.pos)
        if ligths == []:
            self.state = "Movimiento"
        else:
            print(ligths)
            if ligths[0].state == False:
                self.state = "Estatico"
            else:
                self.state = "Movimiento"

    def step(self):
        """ 
        Determines the new direction it will take, and then moves
        """

        if self.iniciar == False:
            self.iniciar = True
        
        elif self.iniciar == True:

            if self.activar == True:
                self.Check_Model_Initialize()
                self.see_enviroment()
                self.activar = False

                print(self.model.graph.number_of_nodes())

                print(self.destination.pos)

                print(self.direction)

                print(self.vision)

                print(self.state)

                print(self.route)
            
            elif self.state == "Destino Alcanzado":
                return None
        
            elif any(isinstance(a, Car) and a.pos != self.pos for a in self.vision):
                print("Si hay")
                if self.state == "Estatico":
                    self.stop()
                    self.see_enviroment()
                else:
                    self.move_around()
                    self.see_enviroment()
            
            elif any(isinstance(a,Traffic_Light) for a in self.vision):
                print("Semaforo")
                self.see_traffic_light()
                if self.state == "Estatico":
                    self.stop()
                    self.see_enviroment()
                else:
                    self.move()
                    self.see_enviroment()

            elif self.state == "Movimiento":
                # self.recalculate_route()
                self.move()
                
        

class Traffic_Light(Agent): 
    """
    Traffic light. Where the traffic lights are in the grid.
    """
    def __init__(self, unique_id, model, direction, sense, state = False, timeToChange = 10):
        super().__init__(unique_id, model)
        """
        Creates a new Traffic light.
        Args:
            unique_id: The agent's ID
            model: Model reference for the agent
            state: Whether the traffic light is green or red
            timeToChange: After how many step should the traffic light change color 
        """
        self.direction = direction
        self.sense = sense
        self.state = state
        self.timeToChange = timeToChange

    def step(self):
        """ 
        To change the state (green or red) of the traffic light in case you consider the time to change of each traffic light.
        """
        if self.model.schedule.steps % self.timeToChange == 0:
            self.state = not self.state

class Destination(Agent):
    """
    Destination agent. Where each car should go.
    """
    def __init__(self, unique_id, model,direction,sense):
        super().__init__(unique_id, model)
        self.direction = direction
        self.sense = sense

    def step(self):
        pass

class Obstacle(Agent):
    """
    Obstacle agent. Just to add obstacles to the grid.
    """
    def __init__(self, unique_id, model):
        super().__init__(unique_id, model)

    def step(self):
        pass

class Road(Agent):
    """
    Road agent. Determines where the cars can move, and in which direction.
    """
    def __init__(self, unique_id, model, direction, sense):
        """
        Creates a new road.
        Args:
            unique_id: The agent's ID
            model: Model reference for the agent
            direction: Direction where the cars can move
        """
        #FUncion para inicializar el agente
        super().__init__(unique_id, model)
        #Variable que guarda la direccion del agente
        self.direction = direction
        #Variable que guarda el sentido (valor 1 o -1)
        self.sense = sense

    def step(self):
        pass
