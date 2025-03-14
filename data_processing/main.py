# we will do all the merging and living wage calculations here

import pandas as pd
import sys

from merge_non_spatial import merge_costs 
from merge_rental import merge_rental

# we should define constant costs here, such as transportation

def main():
    # the data should be contained in the "data" folder,
    # so that we can access it using relative pathing
    # df_property_tax = pd.read_csv("insert path to property tax data here")
    # df_rent = pd.read_csv("insert path to rent data here")
    # df_childcare = pd.read_csv("insert path to childcare data here")
    df_util = pd.read_csv("./data/Vancouver_Utilities_Cost.csv")
    df_grocery = pd.read_csv("./data/grocery_costs.csv")
    df_rental = pd.read_csv("./data/city_med_rent.csv")
    df_childcare = pd.read_csv("./data/child_care.csv")

    # merge the non-spatial data
    merged_df = merge_costs(df_util, df_grocery)

    # calculate living costs w/ rental data for transit case and car case
    merged_df_transit, merged_df_car = merge_rental(merged_df, df_rental, df_childcare)

    # save the data
    merged_df_transit.to_csv('./data/living_wage_transit.csv')
    merged_df_car.to_csv('./data/living_wage_car.csv')

if __name__ == '__main__':
    main()