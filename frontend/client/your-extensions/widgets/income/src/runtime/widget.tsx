import { React, type AllWidgetProps } from "jimu-core";
import { useState, useEffect } from "react";
import { type IMConfig } from "../config";
import { JimuMapViewComponent, JimuMapView } from "jimu-arcgis";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { useSelector } from "react-redux";
import { Radio, Button } from "jimu-ui";

import incomeTaxCalc from "./income-tax";
import livingWageCarJSON from "./data/living_wage_car.json";
import livingWageTransitJSON from "./data/living_wage_transit.json";
import { set } from "seamless-immutable";

// Define Redux state type
interface AppState {
  widgetsState?: {
    w2?: {
      currLayer?: string;
    };
  };
}

const LAYER_TYPES = {
  "Car - 2 Adults 2 Kids": "2a2k_living_cost",
  "Car - 2 Adults 1 Kid": "2a1k_living_cost",
  "Car - 2 Adults 0 Kids": "2a0k_living_cost",
  "Car - 1 Adult 2 Kids": "1a2k_living_cost",
  "Car - 1 Adult 1 Kid": "1a1k_living_cost",
  "Car - 1 Adult 0 Kids": "1a0k_living_cost",
  "Transit - 2 Adults 2 Kids": "2a2k_living_cost",
  "Transit - 2 Adults 1 Kid": "2a1k_living_cost",
  "Transit - 2 Adults 0 Kids": "2a0k_living_cost",
  "Transit - 1 Adult 2 Kids": "1a2k_living_cost",
  "Transit - 1 Adult 1 Kid": "1a1k_living_cost",
  "Transit - 1 Adult 0 Kids": "1a0k_living_cost",
};

const Widget = (props: AllWidgetProps<{}>) => {
  const [option, setOption] = useState("Hourly");
  const [suitability, setSuitability] = useState({});
  const [taxedHourly, setTaxedHourly] = useState(0);
  const [taxedSalary, setTaxedSalary] = useState(0);

  // Get the selected layer ID from Redux state

  const selectedLayer = useSelector(
    (state: AppState) => state?.widgetsState?.w2?.currLayer
  );

  const onOptionChange = () => {
    if (option === "Hourly") {
      setOption("Salary");
    } else {
      setOption("Hourly");
    }
  };

  const calculateSuitability = (income: number) => {
    let livingWageData;
    if (selectedLayer?.includes("Car")) {
      livingWageData = livingWageCarJSON[LAYER_TYPES[selectedLayer]];
    } else {
      livingWageData = livingWageTransitJSON[LAYER_TYPES[selectedLayer]];
    }

    // Transform the living wage data by subtracting each value from income
    const transformedData = {};
    for (const [key, value] of Object.entries(livingWageData)) {
      transformedData[key] = income - Number(value);
    }

    // Filter out negative values (cases where income is less than living wage)
    for (const key in transformedData) {
      if (transformedData[key] < 0) {
        delete transformedData[key];
      }
    }

    // Sort transformed data in decreasing order
    const sortedEntries = Object.entries(transformedData).sort(
      ([, valueA], [, valueB]) => Number(valueB) - Number(valueA)
    );

    // Convert back to object if needed
    const sortedData = {};
    sortedEntries.forEach(([key, value]) => {
      sortedData[key] = value;
    });

    // Now sortedData contains the values in decreasing order
    // and sortedEntries can be used for iteration in sorted order

    setSuitability(sortedData);
  };

  const onSubmit = () => {
    const income = (document.getElementById("income") as HTMLInputElement)
      ?.value;
    if (income) {
      let taxed_income: number;
      if (option === "Hourly") {
        taxed_income =
          Math.round(
            (incomeTaxCalc(parseFloat(income) * 40 * 52) / (52 * 40)) * 100
          ) / 100;
        setTaxedHourly(taxed_income);
        setTaxedSalary(taxed_income * 40 * 52);
      } else {
        // converted to hourly
        taxed_income =
          Math.round(incomeTaxCalc(parseFloat(income)) * 100) / 100;
        setTaxedSalary(taxed_income);

        taxed_income = Math.round((taxed_income / 40 / 52) * 100) / 100;
        setTaxedHourly(taxed_income);
      }
      calculateSuitability(taxed_income);
    } else {
      alert("Please enter an income");
    }
  };

  return (
    <div
      className="widget-demo jimu-widget m-2 p-2"
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {/* <JimuMapViewComponent
        useMapWidgetId={props.useMapWidgetIds?.[0]}
        onActiveViewChange={handleActiveViewChange}
      /> */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        style={{ width: "20%" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h4>Gross Income: </h4>
          <input
            type="text"
            id="income"
            name="income"
            placeholder={option === "Hourly" ? "$/hr" : "$/yr"}
          ></input>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginRight: "20px",
              }}
            >
              <Radio
                id="hourly"
                name="incomeType"
                value="Hourly"
                checked={option === "Hourly"}
                onChange={onOptionChange}
                aria-label="Hourly"
              />
              <label
                htmlFor="hourly"
                style={{ marginLeft: "8px", marginTop: "8px" }}
              >
                Hourly
              </label>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Radio
                id="salary"
                name="incomeType"
                value="Salary"
                checked={option === "Salary"}
                onChange={onOptionChange}
                aria-label="Salary"
              />
              <label
                htmlFor="salary"
                style={{ marginLeft: "8px", marginTop: "8px" }}
              >
                Salary
              </label>
            </div>
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
      <div
        style={{
          marginLeft: "5%",
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
          width: "70%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <h4>Affordable Cities Ranked:</h4>
          <p>
            Estimated Income After Tax:
            {option === "Hourly"
              ? ` $${taxedHourly.toFixed(2)}/hr, $${taxedSalary.toFixed(2)}/yr`
              : ` $${taxedSalary.toFixed(2)}/yr, $${taxedHourly.toFixed(2)}/hr`}
          </p>
        </div>
        <div>
          {taxedHourly > 0 ? (
            Object.keys(suitability).length > 0 ? (
              <>
                <ol
                  style={{
                    columnCount: 3,
                    columnGap: "60px",
                  }}
                >
                  {Object.entries(suitability).map(
                    ([key, value]: [string, number]) => (
                      <li
                        key={key}
                        style={{ breakInside: "avoid", marginLeft: "-20px" }}
                      >
                        {key}: (Save ${value.toFixed(2)}/hr)
                      </li>
                    )
                  )}
                </ol>
              </>
            ) : (
              <p>
                Your estimated income cannot fulfill the living costs of any
                city, given the household type.
              </p>
            )
          ) : (
            <p>Please input your estimated gross income.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Widget;
