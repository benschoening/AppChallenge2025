import pandas as pd

#getting rid of certain fields in childcare locations, then matching $10 a day ones and making field TRUE

new_childcare_df = pd.read_csv("childcare_locations.csv")
td_cc_updated_df = pd.read_csv("ten_a_day_ChildCareBCCentres.csv")
#Filters to only Vancouver locations for Ten Dollar childcare
#td_cc_updated_df = tendollar_childcare_df[tendollar_childcare_df['City'].str.contains('Vancouver')]
td_cc_updated_df.to_csv('updated_TENDOLLARchildcares.csv')

#Save only Vancouver ones
#new_childcare_df = childcare_df[childcare_df['CITY'].str.contains('Vancouver', na=False)]

#Dropping unnecessary Columns
columns_to_drop = ['PHONE',
                    'WEBSITE',
                    'EMAIL',
                    'OP_WEEKDAY_YN',
                    'OP_STAT_HOLIDAY_YN',
                    'OP_OVERNIGHT_YN',
                    'OP_EXT_WEEKDAY_BEFORE6AM_YN',
                    'OP_EXT_WEEKDAY_AFTER7PM_YN',
                    'SRVC_UNDER36_YN',
                    'SRVC_30MOS_5YRS_YN',
                    'SRVC_LICPRE_YN',
                    'SRVC_OOS_KINDER_YN',
                    'SRVC_OOS_GR1_AGE12_YN',
                    'LANG_CANTONESE_YN',
                    'LANG_PUNJABI_YN',
                    'LANG_MANDARIN_YN',
                    'LANG_FRENCH_YN',
                    'LANG_SPANISH_YN',
                    'LANG_OTHER_YN',
                    'PROVIDE_CD_MEALS',
                    'PROVIDE_CD_PICKUP',
                    'PRESCHOOL_MORNING_YN',
                    'PRESCHOOL_MIDDAY_YN',
                    'PRESCHOOL_AFTERNOON_YN',
                    'ABORIGINAL_PROGRAMMING_YN',
                    'ACCOMMODATE_SPECIAL_NEEDS',
                    'ECE_CERTIFICATION_YN',
                    'ELF_PROGRAMMING_YN',
                    'VACANCY_SRVC_UNDER36',
                    'VACANCY_SRVC_30MOS_5YRS',
                    'VACANCY_SRVC_LICPRE',
                    'VACANCY_SRVC_OOS_GR1_AGE12',
                    'VACANCY_LAST_UPDATE',
                    'HA_FAC_INSPEC_RPTS',
                    'IS_INCOMPLETE_IND',
                    'IS_CCFRI_AUTH',
                    'IS_DUPLICATE',
                    'SERVICE_TYPE_CD',
                    'OP_WEEKEND_YN'] 
new_childcare_df = new_childcare_df.drop(columns=columns_to_drop)


#save csv
new_childcare_df.to_csv('updated_childcares_locations.csv')