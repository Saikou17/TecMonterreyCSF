from Model import RandomModel, ObstacleAgent, Trash, Battery
from mesa.visualization import CanvasGrid, BarChartModule
from mesa.visualization import ModularServer

def agent_portrayal(agent):
    if agent is None: return
    
    portrayal = {"Shape": "circle",
                 "Filled": "true",
                 "Layer": 0,
                 "Color": "red",
                 "r": 0.5}

    if (isinstance(agent, ObstacleAgent)):
        portrayal["Color"] = "blue"
        portrayal["r"] = 1

    if (isinstance(agent,Trash)):
        portrayal["Image"] = "bolsa-de-basura.png"
        portrayal["Color"] = "black"
        portrayal["r"] = 0.2
    
    if (isinstance(agent,Battery)):
        portrayal["Color"] = "green"
        portrayal["r"] = 0.4


    return portrayal

model_params = {"N":5, "width":10, "height":10}

grid = CanvasGrid(agent_portrayal, 10, 10, 500, 500)

bar_chart = BarChartModule(
    [{"Label":"Steps", "Color":"#AA0000"}], 
    scope="agent", sorting="ascending", sort_by="Steps")

server = ModularServer(RandomModel, [grid, bar_chart], "Random Agents", model_params)
                       
server.port = 8521 # The default
server.launch()