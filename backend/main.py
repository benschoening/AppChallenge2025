# we will do all the merging and living wage calculations here

import pandas as pd
import sys

from backend.helpers.foodutilmerge import food_util_merge 

# we should define constant costs here, such as transportation

def main():
    # the data should be contained in the "data" folder,
    # so that we can access it using relative pathing
    # df_property_tax = pd.read_csv("insert path to property tax data here")
    # df_rent = pd.read_csv("insert path to rent data here")
    # df_childcare = pd.read_csv("insert path to childcare data here")
    df_util = pd.read_csv("./data/Vancouver_Utilities_Cost.csv")
    df_food = pd.read_csv("./data/food_costs.csv")

    # merge the data
    merged_df = food_util_merge(df_util, df_food)

    # calculate the living wage
    merged_df['living_wage'] = merged_df['monthly_housing_cost'] + merged_df['monthly_food_cost']

    # save the data
    merged_df.to_csv('./data/living_wage.csv')

if __name__ == '__main__':
    main()