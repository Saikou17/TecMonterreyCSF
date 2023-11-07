from mesa import Agent

class Person(Agent):
    """
        A person cell.
        
        Attributes:
            x, y: Grid coordinates
            condition: Can be "Fine", "On Fire", or "Burned Out"
            condition: Can be "Alive" or "Dead"
            unique_id: (x,y) tuple.

            unique_id isn't strictly necessary here, but it's good practice to give one to each agent anyway.
    """

    def __init__(self, pos, model): 
        """
        Create a new person.

        Args:
            self: Is the person (Agent) methods
            pos: The person's coordinates on the grid.
            model: standard model reference for agent.
        """
        super().__init__(pos, model)
        self.pos = pos #Pos is a tuple
        self.condition = "Dead" #State or condition of the person
        self._next_condition = None

    def step(self):

        """

        Cellular Automata Rule 90:

        THe rule consists of one-dimensional array of cells, each of which holds a single binary value. Each value is updated
        simultaneously. 

        Rules:

        This person will check their neighbours ahead.
        If they are all dead and there is no fire nearby, then this person dies of loneliness.
        There are 8 conditions:
        1. 0 0 0 = 0
        2. 0 0 1 = 1
        3. 0 1 0 = 0
        4. 0 1 1 = 1
        5. 1 0 0 = 1
        6. 1 0 1 = 0
        7. 1 1 0 = 1
        8. 1 1 1 = 0

        0 is Dead
        1 is Alive

        Steps:

        1. Create a set of rules
        2. Check the neighbours ahead.
        3. Check the neighborhood ahead (Three elements)
        4. Apply the rules and change the state
            4.1 Cell state = f(neighborhood state t-1)
        """

        #We create a ruleset Dead or ALive
        #1 is Alive and 0 is Dead

        rules = {
            "000":"Dead",
            "010":"Dead",
            "101":"Dead",
            "111":"Dead",
            "001":"Alive",
            "011":"Alive",
            "100":"Alive",
            "110":"Alive"
        }

        #First, we need to check if we are in the edeges x=1 or x=49 in order to avoid them
        if self.pos[0] != 0 and self.pos[0] != 49 and self.pos[1] != 49:
            #We create a pattern
            patron="" 
            #We check the neighbours from the actual pos (We don't get the digonals and we check the center as well)
            for neighbor in self.model.grid.iter_neighbors(self.pos,True,False):
                #We only check the side neighburs
                if neighbor.pos[1] == self.pos[1]+1:
                    #Finally we get the condition of the actual neighbour
                    if neighbor.condition == "Alive":
                        patron+="1"
                    else:
                        patron+="0"
            #After save the pattern in our string , we change the value of the Agent
            self._next_condition = rules.get(patron,"Dead")
        #Else, just keep the actual condition
        else:
            self._next_condition = self.condition
    
    def advance(self):
        """
        Advance the model by one step.
        """
        if self._next_condition is not None:
            self.condition = self._next_condition