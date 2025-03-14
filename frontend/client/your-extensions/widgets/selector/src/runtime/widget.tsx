// import { React, type AllWidgetProps } from 'jimu-core'
// /** ADD: **/
// import { JimuMapViewComponent, type JimuMapView } from 'jimu-arcgis'
// import FeatureLayer from '@arcgis/core/layers/FeatureLayer';

const { useState } = React;

/** @jsx jsx */
import { React, jsx, AllWidgetProps } from "jimu-core";
import { JimuMapViewComponent, JimuMapView } from "jimu-arcgis";
import { Select, Option } from "jimu-ui";
import { appActions } from "jimu-core";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { useEffect, useRef } from "react";
import { jimuMapViewAdded } from "jimu-core/lib/app-actions";

const Widget = (props: AllWidgetProps<{}>) => {
  const [mapView, setMapView] = React.useState<JimuMapView | null>(null);
  const [layers, setLayers] = React.useState<FeatureLayer[]>([]);
  const [selectedLayerId, setSelectedLayerId] = React.useState<string>(
    "1958df0111b-layer-333"
  );

  // Effect to update the widget state after layers are loaded
  useEffect(() => {
    if (layers.length > 0) {
      // Update selected layer ID in widget state
      props.dispatch(
        appActions.widgetStatePropChange(
          "w2",
          "selectedLayerId",
          selectedLayerId
        )
      );

      // Find the default selected layer
      const layer = layers.find((layer) => layer.id === selectedLayerId);

      // Update current layer title in widget state if layer exists
      if (layer) {
        props.dispatch(
          appActions.widgetStatePropChange("w2", "currLayer", layer.title)
        );

        // Make only the selected layer visible
        layers.forEach((l) => {
          l.visible = l.id === selectedLayerId;
        });
      }
    }
  }, [layers, selectedLayerId]);

  // Handle map view loading
  const handleActiveViewChange = (jimuMapView: JimuMapView) => {
    if (jimuMapView) {
      setMapView(jimuMapView);

      // Extract feature layers from the map
      const featureLayers = jimuMapView.view.map.layers.filter(
        (layer) => layer.type === "feature"
      );

      setLayers(featureLayers);
    }
  };

  // Handle dropdown change
  const handleLayerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const layerId = event.target.value;
    setSelectedLayerId(layerId);

    // Toggle layer visibility
    layers.forEach((layer) => {
      layer.visible = layer.id === layerId; // Only selected layer is visible
    });

    console.log("Selected Layer ID: ", layerId);

    const layer = layers.find((layer) => layer.id === layerId);

    props.dispatch(
      appActions.widgetStatePropChange("w2", "currLayer", layer.title)
    );
  };

  return (
    <div className="widget-layer-toggle">
      <JimuMapViewComponent
        useMapWidgetId={props.useMapWidgetIds?.[0]}
        onActiveViewChange={handleActiveViewChange}
      />

      {/* Dropdown to Select Layer */}
      <Select value={selectedLayerId || ""} onChange={handleLayerChange}>
        <Option value="">Select a layer</Option>
        {layers.map((layer) => (
          <Option key={layer.id} value={layer.id}>
            {layer.title}
          </Option>
        ))}
      </Select>
    </div>
  );
};

// const Widget = (props: AllWidgetProps<any>) => {

//   const [jimuMapView, setJimuMapView] = useState<JimuMapView>()

//   const activeViewChangeHandler = (jmv: JimuMapView) => {
//     if (jmv) {
//       setJimuMapView(jmv)
//     }
//   }

//   const formSubmit = (evt) => {
//     evt.preventDefault()
//     console.log('Button Clicked!')

//     const layer = new FeatureLayer({
//       url: 'https://services3.arcgis.com/GVgbJbqm8hXASVYi/arcgis/rest/services/Trailheads_Styled/FeatureServer/0'
//     })

//     // Add the layer to the map (accessed through the Experience Builder JimuMapView data source)
//     jimuMapView.view.map.add(layer)

//   }

//   return (
//     <div>
//       {props.useMapWidgetIds && props.useMapWidgetIds.length === 1 && (
//         <JimuMapViewComponent useMapWidgetId={props.useMapWidgetIds?.[0]} onActiveViewChange={activeViewChangeHandler} />
//       )}

//     <form onSubmit={formSubmit}>
//       <div>
//         <button>Add Layer</button>
//       </div>
//     </form>

//     </div>
//   )
// }

export default Widget;
