import os                               # a way to interact with the operating system
import pandas as pd                     # allows us to manipulate data
import numpy as np                      # used to preform mathematical operations
import matplotlib as mlt                # helps create graphs
from matplotlib import pyplot as plt    # used to help with visualizations
import csv                              # helps to read csv files
from collections import Counter         # counts and stores elements in a dictionary
import requests                         # allows to work with websites
import re                               # allows to use regular expressions
from statistics import mean
from math import sqrt


playerStats = pd.read_csv("playerStats.csv", sep = ",")

def cosine_sim(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def find_comparison(player):
    # Get the stats for the target player
    player_data = playerStats.loc[playerStats['Player'] == player].iloc[0]
    print(player_data)
    
    # Select numerical columns for comparison (excluding Player name and any other non-numeric columns)
    numeric_cols = playerStats.select_dtypes(include=[np.number]).columns
    numeric_cols = numeric_cols.drop('Awards') #excluding awards column
    print(numeric_cols)
    
    # Calculate cosine similarity with all other players
    similarities = []
    for row, rowSeries in playerStats.iterrows():
        if rowSeries['Player'] != player:  # Skip comparing player with themselves
            similarity = cosine_sim(player_data[numeric_cols], rowSeries[numeric_cols])
            similarities.append((rowSeries['Player'], similarity))
    
    # Sort by similarity score in descending order
    similarities.sort(key=lambda x: x[1], reverse=True)
    

    return similarities[:5]


print(find_comparison("LeBron James"))

