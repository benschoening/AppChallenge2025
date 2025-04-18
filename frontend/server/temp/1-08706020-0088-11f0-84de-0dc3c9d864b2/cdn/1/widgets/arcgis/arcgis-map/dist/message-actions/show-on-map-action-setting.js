System.register(["jimu-core","jimu-ui","jimu-ui/advanced/map","jimu-ui/advanced/setting-components","jimu-theme","jimu-arcgis"],(function(o,e){var t={},s={},i={},l={},n={},a={};return{setters:[function(o){t.FormattedMessage=o.FormattedMessage,t.Immutable=o.Immutable,t.React=o.React,t.css=o.css,t.jsx=o.jsx,t.polished=o.polished},function(o){s.Checkbox=o.Checkbox,s.Label=o.Label,s.Radio=o.Radio},function(o){i.JimuSymbolType=o.JimuSymbolType,i.SymbolSelector=o.SymbolSelector},function(o){l.SettingRow=o.SettingRow,l.SettingSection=o.SettingSection},function(o){n.withTheme=o.withTheme},function(o){a.featureUtils=o.featureUtils,a.loadArcGISJSAPIModules=o.loadArcGISJSAPIModules}],execute:function(){o((()=>{"use strict";var o={62686:o=>{o.exports=a},79244:o=>{o.exports=t},1888:o=>{o.exports=n},14321:o=>{o.exports=s},48993:o=>{o.exports=i},79298:o=>{o.exports=l}},e={};function m(t){var s=e[t];if(void 0!==s)return s.exports;var i=e[t]={exports:{}};return o[t](i,i.exports,m),i.exports}m.d=(o,e)=>{for(var t in e)m.o(e,t)&&!m.o(o,t)&&Object.defineProperty(o,t,{enumerable:!0,get:e[t]})},m.o=(o,e)=>Object.prototype.hasOwnProperty.call(o,e),m.r=o=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})};var r={};m.r(r),m.d(r,{default:()=>I});var p=m(79244),y=m(14321),d=m(48993),u=m(79298);const b="Point",c="Polyline",S="Polygon",h="Use layer-defined symbols",g="Use custom symbols",f="Set as operational layers";var x=m(1888),j=m(62686);class C extends p.React.PureComponent{constructor(o){super(o),this.modalStyle={position:"absolute",top:"0",bottom:"0",width:"259px",height:"auto",borderRight:"",borderBottom:"",paddingBottom:"1px"},this.onOperationalLayerCheckboxChange=o=>{var e;const t=!!(null===(e=null==o?void 0:o.target)||void 0===e?void 0:e.checked),s=this.props.config.set("isOperationalLayer",t);this.props.onSettingChange({actionId:this.props.actionId,config:s})},this.handleIsUseCustomSymbolOption=o=>{this.props.onSettingChange({actionId:this.props.actionId,config:this.props.config.set("isUseCustomSymbol",o).set("symbolOption",null)})},this.onSymbolChanged=(o,e)=>{this.props.onSettingChange({actionId:this.props.actionId,config:this.props.config.setIn(["symbolOption",e],o.toJSON())})},this.onSymbolCreated=(o,e)=>{this.defaultSymbolOption=this.defaultSymbolOption.set(e,null==o?void 0:o.toJSON()),!this.props.config.symbolOption&&this.defaultSymbolOption.pointSymbol&&this.defaultSymbolOption.polylineSymbol&&this.defaultSymbolOption.polygonSymbol&&this.props.onSettingChange({actionId:this.props.actionId,config:this.props.config.setIn(["symbolOption"],this.defaultSymbolOption)})},this.getInitSymbolFromConfig=o=>{let e;const t=this.props.config.symbolOption;return this.jsonUtils&&(o===d.JimuSymbolType.Point?e=(null==t?void 0:t.pointSymbol)?t.pointSymbol:j.featureUtils.getDefaultSymbol("point"):o===d.JimuSymbolType.Polyline?e=(null==t?void 0:t.polylineSymbol)?t.polylineSymbol:j.featureUtils.getDefaultSymbol("polyline"):o===d.JimuSymbolType.Polygon&&(e=(null==t?void 0:t.polygonSymbol)?t.polygonSymbol:j.featureUtils.getDefaultSymbol("polygon"))),e?this.jsonUtils.fromJSON(e):null},this.jsonUtils=null,this.defaultSymbolOption=(0,p.Immutable)({}),this.state={isModulesLoaded:!1}}componentDidMount(){(0,j.loadArcGISJSAPIModules)(["esri/symbols/support/jsonUtils"]).then((o=>{[this.jsonUtils]=o,this.setState({isModulesLoaded:!0})})),this.props.onSettingChange({actionId:this.props.actionId,config:this.props.config})}getStyle(o){return p.css`
      .setting-header {
        padding: ${p.polished.rem(10)} ${p.polished.rem(16)} ${p.polished.rem(0)} ${p.polished.rem(16)}
      }

      .deleteIcon {
        cursor: pointer;
        opacity: .8;
      }

      .deleteIcon:hover {
        opacity: 1;
      }
    `}render(){var o;const e=!!(null===(o=this.props.config)||void 0===o?void 0:o.isOperationalLayer);return(0,p.jsx)("div",{css:this.getStyle(this.props.theme)},(0,p.jsx)(u.SettingSection,{title:this.props.intl.formatMessage({id:"symbol",defaultMessage:"symbol"})},(0,p.jsx)(u.SettingRow,null,(0,p.jsx)("div",{className:"d-flex justify-content-between w-100 align-items-center"},(0,p.jsx)("div",{className:"align-items-center d-flex"},(0,p.jsx)(y.Radio,{style:{cursor:"pointer"},checked:!this.props.config.isUseCustomSymbol,onChange:()=>{this.handleIsUseCustomSymbolOption(!1)},"aria-labelledby":"useLayerDefinedLabel"}),(0,p.jsx)("label",{id:"useLayerDefinedLabel",className:"m-0 ml-2",style:{cursor:"pointer"}},this.props.intl.formatMessage({id:"mapAction_UseLayerDefinedSymbols",defaultMessage:h}))))),(0,p.jsx)(u.SettingRow,null,(0,p.jsx)("div",{className:"d-flex justify-content-between w-100 align-items-center"},(0,p.jsx)("div",{className:"align-items-center d-flex"},(0,p.jsx)(y.Radio,{style:{cursor:"pointer"},checked:this.props.config.isUseCustomSymbol,onChange:()=>{this.handleIsUseCustomSymbolOption(!0)},"aria-labelledby":"useCustomLabel"}),(0,p.jsx)("label",{id:"useCustomLabel",className:"m-0 ml-2",style:{cursor:"pointer"}},this.props.intl.formatMessage({id:"mapAction_UseCustomSymbols",defaultMessage:g}))))),this.props.config.isUseCustomSymbol&&this.jsonUtils&&(0,p.jsx)(u.SettingSection,null,(0,p.jsx)(u.SettingRow,{label:this.props.intl.formatMessage({id:"mapAction_Point",defaultMessage:b})},(0,p.jsx)(d.SymbolSelector,{jimuSymbolType:d.JimuSymbolType.Point,symbol:this.getInitSymbolFromConfig(d.JimuSymbolType.Point),onPointSymbolChanged:o=>{this.onSymbolChanged(o,"pointSymbol")},onCreated:o=>{this.onSymbolCreated(o.symbol,"pointSymbol")}})),(0,p.jsx)(u.SettingRow,{label:this.props.intl.formatMessage({id:"mapAction_Polyline",defaultMessage:c})},(0,p.jsx)(d.SymbolSelector,{jimuSymbolType:d.JimuSymbolType.Polyline,symbol:this.getInitSymbolFromConfig(d.JimuSymbolType.Polyline),onPolylineSymbolChanged:o=>{this.onSymbolChanged(o,"polylineSymbol")},onCreated:o=>{this.onSymbolCreated(o.symbol,"polylineSymbol")}})),(0,p.jsx)(u.SettingRow,{label:this.props.intl.formatMessage({id:"mapAction_Polygon",defaultMessage:S})},(0,p.jsx)(d.SymbolSelector,{jimuSymbolType:d.JimuSymbolType.Polygon,symbol:this.getInitSymbolFromConfig(d.JimuSymbolType.Polygon),onPolygonSymbolChanged:o=>{this.onSymbolChanged(o,"polygonSymbol")},onCreated:o=>{this.onSymbolCreated(o.symbol,"polygonSymbol")}})))),(0,p.jsx)(u.SettingSection,null,(0,p.jsx)(u.SettingRow,null,(0,p.jsx)(y.Label,null,(0,p.jsx)(y.Checkbox,{checked:e,className:"mr-1",onChange:this.onOperationalLayerCheckboxChange}),(0,p.jsx)(p.FormattedMessage,{id:"mapAction_OperationalLayer",defaultMessage:f})))))}}C.defaultProps={config:(0,p.Immutable)({isUseCustomSymbol:!0,isOperationalLayer:!0})};const I=(0,x.withTheme)(C);return r})())}}}));