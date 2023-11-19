from Model import RandomModel, ObstacleAgent, Trash, Battery, Floor
from mesa.visualization import CanvasGrid, BarChartModule, PieChartModule
from mesa.visualization import ModularServer

def agent_portrayal(agent):
    if agent is None: return
    
    portrayal = {"Shape": "roomba.png",
                 "scale": "0.9",
                 "Layer": 1,
    }

    if (isinstance(agent, ObstacleAgent)):
        portrayal = {"Shape": "rect",
                     "Filled": "true",
                     "Layer":0,
                     "Color": "grey",
                     "w": 1,
                     "h": 1}

    if (isinstance(agent,Trash)):
        portrayal = {
            "Shape": "bolsa-de-basura.png",
            "scale": 0.9,
            "Layer": 0,
        }
        
    
    if (isinstance(agent,Battery)):
        portrayal = {
            "Shape": "rect",
            "Filled": "true",
            "Layer": 0,
            "Color": "green",
            "w": 1,
            "h": 1}
        
    if (isinstance(agent,Floor)):
        portrayal = {
            "Shape": "suelo.png",
            "scale": 1,
            "Layer": 0
        }
        
    return portrayal

model_params = {"N":10, "width":20, "height":20}

grid = CanvasGrid(agent_portrayal, 20, 20, 500, 500)

bar_chart = BarChartModule([{"Label":"Steps", "Color":"#AA0000"}], scope="agent", sorting="ascending", sort_by="Steps")

server = ModularServer(RandomModel, [grid, bar_chart], "Random Agents", model_params)
                       
server.port = 8521 # The default
server.launch()