import { React } from "jimu-core";
import { type AllWidgetSettingProps } from "jimu-for-builder";
import { MapWidgetSelector } from "jimu-ui/advanced/setting-components";

import { type IMConfig } from "../config";

const WidgetSettings = (props: AllWidgetSettingProps<IMConfig>) => {
  // Update title change

  const onMapWidgetSelected = (useMapWidgetIds: string[]) => {
    props.onSettingChange({
      id: props.id,
      useMapWidgetIds: useMapWidgetIds,
    });
  };

  return (
    <div>
      <MapWidgetSelector
        onSelect={onMapWidgetSelected}
        useMapWidgetIds={props.useMapWidgetIds}
      />
    </div>
  );
};

export default WidgetSettings;
