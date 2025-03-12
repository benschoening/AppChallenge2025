#Merging Util and Food non-spatial data on attribute 'household_type'
import pandas as pd

def merge_costs(df_utils, df_grocery):

    # TODO: need to turn the household types into columns
    
    utils_food_df = pd.merge(df_utils, df_grocery, on='household_type')
    
    # convert second column onwards into numbers
    for col in utils_food_df.columns[1:]:
        utils_food_df[col] = pd.to_numeric(utils_food_df[col], errors='coerce')
    
    # convert all annual values to monthly
    for col in utils_food_df.columns:
        if 'annual' in col:
            utils_food_df[col] = (utils_food_df[col] / 12).round(2)

    # calculate the total monthly cost
    # Calculate the total monthly cost by summing all numeric columns
    numeric_cols = utils_food_df.select_dtypes(include=['number']).columns
    utils_food_df['total_monthly_cost'] = utils_food_df[numeric_cols].sum(axis=1).round(2)
    
    return utils_food_df
