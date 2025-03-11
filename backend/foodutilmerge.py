#Merging Util and Food non-spatial data on attribute 'household_type'
import pandas as pd

def food_util_merge(utils_df, food_df):

    merged_df = pd.merge(utils_df, food_df, on='household_type')

    return merged_df