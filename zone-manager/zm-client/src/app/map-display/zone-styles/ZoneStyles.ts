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
  weight: 3,
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
