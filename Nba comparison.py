#!/usr/bin/env python
# coding: utf-8

# In[268]:


import os                               # a way to interact with the operating system
import pandas as pd                     # allows us to manipulate data
import numpy as np                      # used to preform mathematical operations
import matplotlib as mlt                # helps create graphs
from matplotlib import pyplot as plt    # used to help with visualizations
import csv                              # helps to read csv files
from collections import Counter         # counts and stores elements in a dictionary
import requests                         # allows to work with websites
from bs4 import BeautifulSoup           # use for webscraping and extracting data
import re                               # allows to use regular expressions
from statistics import mean
from math import sqrt


# ### Helper Functions

# In[ ]:





# In[269]:



sheet = pd.read_csv("playerStats.csv")
playbyplay = pd.read_csv("playbyplay.csv")


# In[270]:


sheet


# In[271]:


playbyplay


# In[272]:


sheet = sheet.merge(playbyplay, on = ["Rk","Player","Tm"])

sheet


# In[274]:


sheet.set_index("Rk")
sheet.astype({"Player":str})


# In[275]:


for row, rowSeries in sheet.iterrows():
    endL = 0
    for i in range(0, len(rowSeries["Player"])):
        if(rowSeries["Player"][i] == "\\"):
            endL = i
            print(i)
            break
    preString = rowSeries["Player"][0:endL]
    sheet.at[row, "Player"] = preString 
 
    


# In[276]:


for row, rowSeries in sheet.iterrows():
    print(rowSeries["Player"])


# ## Getting a Certain Player's Data Separated From the Rest of The DataFrame

# In[283]:


## Input the player's name
playername = "Devin Booker"


# In[284]:



playerData = []
for row, rowSeries in sheet.iterrows():
    if(rowSeries["Player"]==playername):
        playerData = rowSeries
    
print(playerData)


# ## Unitizing this Player's Data

# In[285]:


#getting the magnitude of the array/vector

sum = 0
mag = 0
for i in range(5,len(playerData)):
    sum += (playerData[i] * playerData[i])

mag = sqrt(sum)
print(mag)

unitizedPlayerData = []
sumA = 0
for i in range(5,len(playerData)):
    unitVal = playerData[i]/mag
    unitizedPlayerData.append(unitVal)
    sumA += unitVal
print(unitizedPlayerData)


# ## Comparing the Selected Player's Data to Every Other Player's Data
# 

# In[286]:


lowestDotProd = 0.0
mostSimilarPlayerData = []
mostSimilarPlayer = ""
for row, rowSeries in sheet.iterrows():
    compPlayerName = rowSeries["Player"]
    compPlayer = rowSeries
    sumA = 0
    mag = 0
    for i in range(5,len(compPlayer)):
        sumA += (compPlayer[i] * compPlayer[i])

    mag = sqrt(sumA)
    unitizedComp = []
    sumB= 0
    for i in range(5,len(compPlayer)):
        unitVal = compPlayer[i]/mag
        unitizedComp.append(unitVal)
        sumB+= unitVal
    dotProd = np.dot(unitizedPlayerData, unitizedComp)
    if((dotProd > float(lowestDotProd)) and (playername != str(compPlayer["Player"]))):
        lowestDotProd = dotProd
        mostSimilarPlayer = compPlayer["Player"]
        mostSimilarPlayerData = compPlayer
print(mostSimilarPlayer)
print(mostSimilarPlayerData)
print("Dot Product", lowestDotProd)


# In[281]:


comparisonTable = []
comparisonTable.append(playerData)
comparisonTable.append(mostSimilarPlayerData)
compTable = pd.DataFrame(comparisonTable, columns = sheet.columns)


# In[282]:


compTable


# In[ ]:






file = open("filename.csv")
contents = read(file)
lines = contents.split('\n')

LoL = []

columns = lines[0].split(",")
for line in lines[1:]: 
    LoL.append(line.split(','))

