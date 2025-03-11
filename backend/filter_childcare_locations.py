import pandas as pd

childcare_df = pd.read_csv("childcare_locations.csv")

#Filtering Vancouver Child Care Locations (2,000 + -> approx. 500)
dataFrame = childcare_df[childcare_df['CITY'].str.contains('Vancouver')]

#Checking
print(childcare_df.head())
