from mesa import Agent

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
        self.direction = ""
        
    def move(self):
        """
        Determina si el agente puede moverse en la dirección elegida
        """
        possible_roads = self.model.grid.iter_neighbors(
            self.pos, moore=False, include_center=True)

        # Filtrar agentes de tipo Road y obtener la dirección de la carretera
        road_agents = [p for p in possible_roads if isinstance(p, Road)]
        traffic_agents = [p for p in possible_roads if isinstance(p, Traffic_Light)]
        
        if road_agents:
            traffic_agent=traffic_agents[0]
            road = road_agents[0]  # Tomar la primera carretera (puedes ajustar esto según tus necesidades)
            self.direction = road.direction

            # Mover el agente según la dirección de la carretera
            if self.direction == "Left" and road.pos[0] < self.pos[0]:
                self.model.grid.move_agent(self, road.pos)
            elif self.direction == "Left" and traffic_agent.pos[0] < self.pos[0]:
                self.model.grid.move_agent(self, traffic_agent.pos)
            elif self.direction == "Right" and road.pos[0] > self.pos[0]:
                self.model.grid.move_agent(self, road.pos)
            elif self.direction == "Right" and traffic_agent.pos[0] > self.pos[0]:
                self.model.grid.move_agent(self, traffic_agent.pos)
            elif self.direction == "Up" and road.pos[1] > self.pos[1]:
                self.model.grid.move_agent(self, road.pos)
            elif self.direction == "Up" and traffic_agent.pos[1] > self.pos[1]:
                self.model.grid.move_agent(self, traffic_agent.pos)
            elif self.direction == "Down" and road.pos[1] < self.pos[1]:
                self.model.grid.move_agent(self, road.pos)
            elif self.direction == "Down" and traffic_agent.pos[1] < self.pos[1]:
                self.model.grid.move_agent(self, traffic_agent.pos)

    def stop_at_traffic_light(self):
        """ 
        Determines if the agent should stop at the traffic light
        """
        pass
    
    def see_destination(self):
        """ 
        Determines if the agent can see the destination
        """
        pass
    
    def see_obstacle(self):
        """ 
        Determines if the agent can see the obstacle
        """
        pass
    
    def see_traffic_light(self):
        """ 
        Determines if the agent can see the traffic light
        """
        for neighbors in self.model.grid.iter_neighbors(self.pos, moore = True, include_center = True):
            if isinstance(neighbors, Traffic_Light):
                return neighbors.state
        return None
    
    def step(self):
        """ 
        Determines the new direction it will take, and then moves
        """
        if self.see_traffic_light() != None:
            if self.see_traffic_light() == False:
                self.stop_at_traffic_light()
            else:
                self.move()        
        else:
            self.move()

class Traffic_Light(Agent):
    """
    Traffic light. Where the traffic lights are in the grid.
    """
    def __init__(self, unique_id, model, state = False, timeToChange = 10):
        super().__init__(unique_id, model)
        """
        Creates a new Traffic light.
        Args:
            unique_id: The agent's ID
            model: Model reference for the agent
            state: Whether the traffic light is green or red
            timeToChange: After how many step should the traffic light change color 
        """
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
    def __init__(self, unique_id, model):
        super().__init__(unique_id, model)

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
    def __init__(self, unique_id, model, direction):
        """
        Creates a new road.
        Args:
            unique_id: The agent's ID
            model: Model reference for the agent
            direction: Direction where the cars can move
        """
        super().__init__(unique_id, model)
        self.direction = direction

    def step(self):
        pass
