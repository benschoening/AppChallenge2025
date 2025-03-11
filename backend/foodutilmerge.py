#Merging Util and Food non-spatial data on attribute 'household_type'

df_util = pd.read_csv('OneDrive\Desktop\git\AppChallenge2025\AppChallenge2025\backend\data\Vancouver_Utilities_Cost.csv')

df_food = pd.read_csv('OneDrive\Desktop\git\AppChallenge2025\AppChallenge2025\backend\data\food_costs')

merged_df = pd.merge(df_util, df_food, on='household_type')

print(merged_df.head())