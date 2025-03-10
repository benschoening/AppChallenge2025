#
# convert property tax data into spatial data using zip code to 
# to identify location. 
#
# INPUT: Vancouver property tax reports, geocoded postal codes
# OUTPUT: average property value, and average tax levy by postal code in Vancouver
#

import pandas as pd 


# Vancouver property tax reports
df_pt = pd.read_csv('./gus_data/property-tax-report.csv', sep=';', usecols=[
    'ZONING_DISTRICT',
    'ZONING_CLASSIFICATION',
    'TO_CIVIC_NUMBER',
    'STREET_NAME',
    'PROPERTY_POSTAL_CODE',
    'CURRENT_LAND_VALUE',
    'CURRENT_IMPROVEMENT_VALUE',
    'TAX_ASSESSMENT_YEAR',
    'NEIGHBOURHOOD_CODE',
    'TAX_LEVY'
], dtype={'PROPERTY_POSTAL_CODE':'string'})

# use only the latest values (year 2025). 
df_pt = df_pt[df_pt['TAX_ASSESSMENT_YEAR'] == 2024]

# Postal Code data 
df_pc = pd.read_csv('./gus_data/CanadianPostalCodes202403.csv', usecols=[
    'POSTAL_CODE',
    'LATITUDE',
    'LONGITUDE'
], dtype={'POSTAL_CODE': 'string'})

# remove postal code whitespaces
df_pc['POSTAL_CODE'] = df_pc['POSTAL_CODE'].str.replace(' ', '')
df_pt['PROPERTY_POSTAL_CODE'] = df_pt['PROPERTY_POSTAL_CODE'].str.replace(' ', '')

# group data by location
df_pt_group = df_pt.groupby(['PROPERTY_POSTAL_CODE']).agg({
    'TAX_LEVY':'mean', 
    'CURRENT_LAND_VALUE':'mean'
}).reset_index()

df_pt_group = df_pt_group.rename(columns={'TAX_LEVY':'AVG_TAX_LEVY', 'CURRENT_LAND_VALUE':'AVG_LAND_VALUE'})


df_merge = df_pt_group.merge(df_pc, how='left', left_on='PROPERTY_POSTAL_CODE', right_on='POSTAL_CODE').drop(columns=['PROPERTY_POSTAL_CODE'])
df_merge.to_csv('./gus_data/van_property_tax_out.csv', index=False)
