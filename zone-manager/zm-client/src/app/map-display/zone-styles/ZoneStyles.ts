// Check documentation at
// https://leafletjs.com/reference.html#path

export const DEFAULT_ZONE_STYLE: L.PathOptions = {
  stroke: true,
  color: '#00c4ff',
  weight: 3,
  opacity: 1.0,
  lineCap: 'round',
  lineJoin: 'round',
  dashArray: undefined,
  dashOffset: undefined,
  fill: true,
  fillColor: 'rgba(0,196,255,0.61)',
  fillOpacity: 0.2,
  fillRule: 'evenodd',
  bubblingMouseEvents: true,
}

export const SELECTED_ZONE_STYLE: L.PathOptions = {
  stroke: true,
  color: '#000000',
  weight: 4,
  opacity: 1.0,
  lineCap: 'round',
  lineJoin: 'round',
  dashArray: undefined,
  dashOffset: undefined,
  fill: true,
  fillColor: 'rgba(0,0,0,0.75)',
  fillOpacity: 0.2,
  fillRule: 'evenodd',
  bubblingMouseEvents: true,
}

export const NAVIGATE_INTO_ZONE_STYLE: L.PathOptions = {
  stroke: true,
  color: '#00c4ff',
  weight: 5,
  opacity: 1.0,
  lineCap: 'round',
  lineJoin: 'round',
  dashArray: [10,10],
  dashOffset: '10',
  fill: false,
  fillColor: 'rgba(0,196,255,0.35)',
  fillOpacity: 0.2,
  fillRule: 'evenodd',
  bubblingMouseEvents: true,
}

export const COMMERCIAL_ZONE_STYLE: L.PathOptions = {
  stroke: true,
  color: '#00ffda',
  weight: 2,
  opacity: 1.0,
  lineCap: 'round',
  lineJoin: 'round',
  dashArray: undefined,
  dashOffset: undefined,
  fill: true,
  fillColor: 'rgba(0,255,218,0.5)',
  fillOpacity: 0.2,
  fillRule: 'evenodd',
  bubblingMouseEvents: true,
}

export const EDUCATIONAL_ZONE_STYLE: L.PathOptions = {
  stroke: true,
  color: '#ffff00',
  weight: 2,
  opacity: 1.0,
  lineCap: 'round',
  lineJoin: 'round',
  dashArray: undefined,
  dashOffset: undefined,
  fill: true,
  fillColor: 'rgba(255,255,0,0.5)',
  fillOpacity: 0.2,
  fillRule: 'evenodd',
  bubblingMouseEvents: true,
}

export const INDUSTRIAL_ZONE_STYLE: L.PathOptions = {
  stroke: true,
  color: '#ffa500',
  weight: 2,
  opacity: 1.0,
  lineCap: 'round',
  lineJoin: 'round',
  dashArray: undefined,
  dashOffset: undefined,
  fill: true,
  fillColor: 'rgba(255,165,0,0.5)',
  fillOpacity: 0.2,
  fillRule: 'evenodd',
  bubblingMouseEvents: true,
}

export const RESIDENTIAL_ZONE_STYLE: L.PathOptions = {
  stroke: true,
  color: '#00ff00',
  weight: 2,
  opacity: 1.0,
  lineCap: 'round',
  lineJoin: 'round',
  dashArray: undefined,
  dashOffset: undefined,
  fill: true,
  fillColor: 'rgba(0,255,0,0.5)',
  fillOpacity: 0.2,
  fillRule: 'evenodd',
  bubblingMouseEvents: true,
}

export const CULTURAL_ZONE_STYLE: L.PathOptions = {
  stroke: true,
  color: '#FF00FF',
  weight: 2,
  opacity: 1.0,
  lineCap: 'round',
  lineJoin: 'round',
  dashArray: undefined,
  dashOffset: undefined,
  fill: true,
  fillColor: 'rgba(255,0,255,0.5)',
  fillOpacity: 0.2,
  fillRule: 'evenodd',
  bubblingMouseEvents: true,
}

export const GREEN_SPACE_ZONE_STYLE: L.PathOptions = {
  stroke: true,
  color: '#964B00',
  weight: 3,
  opacity: 1.0,
  lineCap: 'round',
  lineJoin: 'round',
  dashArray: [10,10],
  dashOffset: '10',
  fill: true,
  fillColor: '#00ff00',
  fillOpacity: 0.2,
  fillRule: 'evenodd',
  bubblingMouseEvents: true,
}

export const BUSINESS_ZONE_STYLE: L.PathOptions = {
  stroke: true,
  color: '#0000FF',
  weight: 3,
  opacity: 1.0,
  lineCap: 'round',
  lineJoin: 'round',
  dashArray: undefined,
  dashOffset: undefined,
  fill: true,
  fillColor: 'rgba(0,0,255,0.5)',
  fillOpacity: 0.2,
  fillRule: 'evenodd',
  bubblingMouseEvents: true,
}

export const ADMINISTRATION_ZONE_STYLE: L.PathOptions = {
  stroke: true,
  color: '#808080',
  weight: 3,
  opacity: 1.0,
  lineCap: 'round',
  lineJoin: 'round',
  dashArray: undefined,
  dashOffset: undefined,
  fill: true,
  fillColor: 'rgba(128,128,128,0.5)',
  fillOpacity: 0.2,
  fillRule: 'evenodd',
  bubblingMouseEvents: true,
}
