import random
import mesa
from mesa import Model, DataCollector
from mesa.space import SingleGrid
from mesa.time import SimultaneousActivation

from AgentePerry import Person

class GameBoard(Model):
    """
        Simple Game Board Model

        Attributes:
            height, width: Grid size.
            density: What fraction of grid cells have a person in them.
    """

    def __init__(self, height=100, width=100, density=0.65):
        """
        Create a new game board model.
        
        Args:
            height, width: The size of the grid to model
            density: What fraction of grid cells have a person in them.
        """

        # Set up model objects
        # SimultaneousActivation is a Mesa object that runs all the agents at the same time. 
        # This is necessary in this model because the next state of each cell depends on the current state of all its neighbors -- before they've changed.
        # This activation method requires that all the agents have a step() and an advance() method. 
        # The step() method computes the next state of the agent, and the advance() method sets the state to the new computed state.
        self.schedule = SimultaneousActivation(self)
        self.grid = SingleGrid(height, width, torus=False)

        # A datacollector is a Mesa object for collecting data about the model.
        # We'll use it to count the number of trees in each condition each step.
        self.datacollector = DataCollector(
            {
                "Alive": lambda m: self.count_type(m, "Alive"),
                "Dead": lambda m: self.count_type(m, "Dead"),
            }
        )

        # Place a tree in each cell with Prob = density
        # coord_iter is an iterator that returns positions as well as cell contents.
        for contents, (x, y) in self.grid.coord_iter():
        # Create a tree
            new_person = Person((x, y), self)
            
            # Set random persons in the last row alive.
            if y == 49:
                estado = random.randint(0,1)
                if estado == 1:
                    new_person.condition = "Alive"
                else:
                    new_person.condition = "Dead"
            
            self.grid.place_agent(new_person, (x, y))
            self.schedule.add(new_person)

        self.running = True
        self.datacollector.collect(self)

    def step(self):
        """
        Have the scheduler advance each cell by one step
        """
        self.schedule.step()
        # collect data
        self.datacollector.collect(self)

        # Halt if no more fire
        if self.count_type(self, "Dead") == 0:
            self.running = False


    # staticmethod is a Python decorator that makes a method callable without an instance.
    @staticmethod
    def count_type(model, person_condition):
        """
        Helper method to count trees in a given condition in a given model.
        """
        #stop this simulation in 50 steps
        if model.schedule.steps == 50:
            model.running = False
        count = 0
        for person in model.schedule.agents:
            if person.condition == person_condition:
                count += 1
        return count