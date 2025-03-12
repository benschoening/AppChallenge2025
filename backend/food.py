import pandas as pd
import numpy as np
import sys

# How monthly (30-day) grocery cost was calculated:
# https://www.numbeo.com/food-prices/in/Vancouver

# avg 1 adult (13 or older), 0 children (ages 4 - 12) daily food cost:

# $0.50 per egg
# $0.69 per 250ml milk
# $0.55 per 100g rice
# $1.09 per serving of bread (125g)
# $2.89 per 150g chicken breast
# $3.37 per 150g beef round
# $1.36 per 200g tomatoes
# $0.87 per 200g potatoes
# $0.39 per 100g onion
# $0.70 per 0.2 head
# $1.76 per 100g cheese
# $1.78 per 300g apples
# $0.52 per banana

# for children, multiply adult cost by 0.75 and add to the total, per child.

def main():
    grocery_df = pd.read_csv('./data/grocery.csv')

    # cost of one adult per month
    adult = np.sum(grocery_df['price']) * 30

    # cost of one kid per month
    kid = 0.75 * adult

    # household costs per month
    costs = {
        '1a0k': round(adult, 2),
        '1a1k': round(adult + kid, 2),
        '1a2k': round(adult + 2 * kid, 2),
        '2a0k': round(2 * adult, 2),
        '2a1k': round(2 * adult + kid, 2),
        '2a2k': round(2 * adult + 2 * kid, 2),
    }

    # create DataFrame with household types as index
    costs_df = pd.DataFrame.from_dict(costs, orient='index', columns=['monthly_food_cost'])
    costs_df.index.name = 'household_type'

    # save to CSV
    costs_df.to_csv('./data/grocery_costs.csv')


if __name__ == '__main__':
    main()

    
