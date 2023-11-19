from itertools import product
from mesa import Model, agent
from mesa.time import RandomActivation
from mesa.space import MultiGrid
from mesa import DataCollector
from Agents import RandomAgent, ObstacleAgent, Trash, Battery, Floor

class RandomModel(Model):
    """ 
    Creates a new model with random agents.
    Args:
        N: Number of agents in the simulation
        height, width: The size of the grid to model
    """
    

    def __init__(self, N, width, height):
        self.num_agents = N
        # Multigrid is a special type of grid where each cell can contain multiple agents.
        self.grid = MultiGrid(width,height,torus = False) 

        # RandomActivation is a scheduler that activates each agent once per step, in random order.
        self.schedule = RandomActivation(self)
        
        self.running = True 

        self.datacollector = DataCollector( 
        agent_reporters={"Steps": lambda a: a.steps_taken if isinstance(a, RandomAgent) else 0,
                        #  "Trash": lambda m: m.schedule.get_agent_count(Trash),

}
        # agent_trash={"Trash": lambda m: sum(1 for agent in m.schedule.agents if isinstance(agent, Trash))}
        )

        # Creates the border of the grid
        border = [(x,y) for y in range(height) for x in range(width) if y in [0, height-1] or x in [0, width - 1]]

        # Add obstacles to the grid
        for pos in border:
            obs = ObstacleAgent(pos, self)
            self.grid.place_agent(obs, pos)

        # Function to generate random positions
        pos_gen = lambda w, h: (self.random.randrange(w), self.random.randrange(h))

        #We add a battery
        b = Battery(4000, self) #We set an unique id , model
        self.schedule.add(b) #We add the battery to the schedule
        
        #We create a pos
        pos = pos_gen(self.grid.width, self.grid.height)

        #We set the position in an empty cell
        while (not self.grid.is_cell_empty(pos)):
                
                pos = pos_gen(self.grid.width, self.grid.height)

        #We place the battery
        self.grid.place_agent(b, pos)

        #We add the roomba
        a = RandomAgent(1000, self, pos) 

        #We add the roomba in the schedule 
        self.schedule.add(a)

        #We add the roomba in the battery cell
        self.grid.place_agent(a, pos)

        #Add the agent trash to a random positions
        for i in range(self.num_agents):

            t = Trash(i+2000, self) 
            self.schedule.add(t)

            pos = pos_gen(self.grid.width, self.grid.height)

            while (not self.grid.is_cell_empty(pos)):
                pos = pos_gen(self.grid.width, self.grid.height)
            
            self.grid.place_agent(t, pos)
        
         #We add random obstacles
        
        for i in range(self.num_agents):

            o = ObstacleAgent(i+3000, self) 
            self.schedule.add(o)

            pos = pos_gen(self.grid.width, self.grid.height)

            while (not self.grid.is_cell_empty(pos)):
                pos = pos_gen(self.grid.width, self.grid.height)

            self.grid.place_agent(o, pos)

        z = 0

        for i in range(self.grid.width):
            for j in range(self.grid.height):

                if self.grid.is_cell_empty((i,j)):
                    f = Floor(5000+z,self)
                    self.schedule.add(f)
                    self.grid.place_agent(f,(i,j))
                    z+=1

        self.datacollector.collect(self)

    def step(self):
        '''Advance the model by one step.'''
        self.schedule.step()
        self.datacollector.collect(self)