import pandas as pd

def merge_rental(df_util_food, df_rental, df_childcare):

    # converting rental data into numbers only if the column isn't "Neighbourhood"
    df_rental = df_rental.apply(lambda x: pd.to_numeric(x, errors='ignore') if x.name != "FullName" else x)

    # Create an empty DataFrame for living costs
    living_costs_columns = [
        'City',
        '1a0k_living_cost',
        '1a1k_living_cost',
        '1a2k_living_cost',
        '2a0k_living_cost',
        '2a1k_living_cost',
        '2a2k_living_cost'
    ]
    living_costs_df = pd.DataFrame(columns=living_costs_columns)

    # changing column to city, to accurately represent the column
    living_costs_df['City'] = df_rental['FullName']

    # Note: This empty DataFrame will be used later to store calculated living costs by neighborhood
    # We'll populate it after combining rental and utility/food costs
    
    # Extract monthly_cost from df_util_food rows
    monthly_cost_1a0k = df_util_food['total_monthly_cost'].iloc[0]
    monthly_cost_1a1k = df_util_food['total_monthly_cost'].iloc[1]
    monthly_cost_1a2k = df_util_food['total_monthly_cost'].iloc[2]
    monthly_cost_2a0k = df_util_food['total_monthly_cost'].iloc[3]
    monthly_cost_2a1k = df_util_food['total_monthly_cost'].iloc[4]
    monthly_cost_2a2k = df_util_food['total_monthly_cost'].iloc[5]

    # get avg cost of childcare
    avg_childcare_cost = df_childcare['Median (Full Fee)'] + df_childcare['Median (Reduced Fee)'] / 2
    avg_childcare_cost = avg_childcare_cost.mean()

    # translink monthly pass costs
    MONTHLY_PASS = 107.3
    MONTHLY_PASS_CHILD = 61.35

    # average cost of SUV ownership per year
    SUV_COST = 5147.94 / 12

    # misc costs per household
    OTHER_COSTS = 100

    # Create a copy of the living_costs_df for each transporation scenario
    living_costs_df_transit = living_costs_df.copy()
    living_costs_df_car = living_costs_df.copy()

    # calculating living costs for each household type for the transit scenario
    living_costs_df_transit['1a0k_living_cost'] = round(df_rental[["Bachelor", "1 Bedroom"]].mean(axis=1) + monthly_cost_1a0k + MONTHLY_PASS + OTHER_COSTS, 2)
    living_costs_df_transit['1a1k_living_cost'] = round(df_rental["2 Bedroom"] + monthly_cost_1a1k + avg_childcare_cost + MONTHLY_PASS + MONTHLY_PASS_CHILD + OTHER_COSTS, 2)
    living_costs_df_transit['1a2k_living_cost'] = round(df_rental["3 Bedroom +"] + monthly_cost_1a2k + 2 * avg_childcare_cost + MONTHLY_PASS + 2 * MONTHLY_PASS_CHILD + OTHER_COSTS, 2)
    living_costs_df_transit['2a0k_living_cost'] = round(df_rental[["Bachelor", "1 Bedroom"]].mean(axis=1) + monthly_cost_2a0k + 2 * MONTHLY_PASS + OTHER_COSTS, 2)
    living_costs_df_transit['2a1k_living_cost'] = round(df_rental["2 Bedroom"] + monthly_cost_2a1k + avg_childcare_cost + 2 * MONTHLY_PASS + MONTHLY_PASS_CHILD + OTHER_COSTS, 2)
    living_costs_df_transit['2a2k_living_cost'] = round(df_rental["3 Bedroom +"] + monthly_cost_2a2k + 2 * avg_childcare_cost + 2 * MONTHLY_PASS + 2 * MONTHLY_PASS_CHILD + OTHER_COSTS, 2)

    # calculating living costs for each household type for the car scenario
    living_costs_df_car['1a0k_living_cost'] = round(df_rental[["Bachelor", "1 Bedroom"]].mean(axis=1) + monthly_cost_1a0k + SUV_COST + OTHER_COSTS, 2)
    living_costs_df_car['1a1k_living_cost'] = round(df_rental["2 Bedroom"] + monthly_cost_1a1k + avg_childcare_cost + SUV_COST + OTHER_COSTS, 2)
    living_costs_df_car['1a2k_living_cost'] = round(df_rental["3 Bedroom +"] + monthly_cost_1a2k + 2 * avg_childcare_cost + SUV_COST + OTHER_COSTS, 2)
    living_costs_df_car['2a0k_living_cost'] = round(df_rental[["Bachelor", "1 Bedroom"]].mean(axis=1) + monthly_cost_2a0k + SUV_COST + OTHER_COSTS, 2)
    living_costs_df_car['2a1k_living_cost'] = round(df_rental["2 Bedroom"] + monthly_cost_2a1k + avg_childcare_cost + SUV_COST + OTHER_COSTS, 2)
    living_costs_df_car['2a2k_living_cost'] = round(df_rental["3 Bedroom +"] + monthly_cost_2a2k + 2 * avg_childcare_cost + SUV_COST + OTHER_COSTS, 2)

    return living_costs_df_transit, living_costs_df_car