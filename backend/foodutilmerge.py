#Merging Util and Food non-spatial data on attribute 'household_type'
import pandas as pd

def food_util_merge(utils_path, food_path):
    df_util = pd.read_csv(utils_path)
    df_food = pd.read_csv(food_path)

    merged_df = pd.merge(df_util, df_food, on='household_type')

    return merged_df