const MapIcons = '../assets/Map-Icons/'
const ZoneIcons = `${MapIcons}Zone-Icons/`;
const ToolIcons = `${MapIcons}Tool-Icons/`;

export const IconPaths: Map<string, Array<string>> = new Map<string,
  Array<string>>([
    [ZoneIcons, ['zone-add', 'zone-edit']],
    [ToolIcons, ['move-icon', 'select-icon']],
    [MapIcons, ['zoom-in', 'zoom-out']]
  ]
);
