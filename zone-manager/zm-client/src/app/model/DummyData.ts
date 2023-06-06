import {UtilityCost} from "./UtilityCost";
import {UrbanZone} from "./Organization/UrbanZone";
import {Complex} from "./Organization/Complex";
import {Neighborhood} from "./Organization/Neighborhood";
import {Sector} from "./Organization/Sector";
import {
  CRAIOVA_NE_SECTOR,
  CRAIOVA_NW_SECTOR,
  CRAIOVA_SE_SECTOR,
  CRAIOVA_SW_SECTOR, CRAIOVITA_NEIGHBORHOOD
} from "../map-display/GeoJsonDummyData";

export const URBAN_ZONE_INSTANCE = new UrbanZone("1b1a", "Bloc I5", "Residential", "1b1", [
    new UtilityCost("1b1a1", 56, 62, 70, 10, "Ron", new Date('15 Jan 2023 00:00:00 GMT'), "Month"),
    new UtilityCost("1b1a2", 56, 62, 70, 10, "Ron", new Date('15 Feb 2023 00:00:00 GMT'), "Month"),
    new UtilityCost("1b1a3", 56, 62, 70, 10, "Ron", new Date('15 Mar 2023 00:00:00 GMT'), "Month"),
  ]);

export const SECTORS: Sector[] = [
  new Sector('1', 'Zona North-West', [
    new Neighborhood("1a", "Brazda lui Novac", "1", [
      new Complex("1a1", "Complexul Baba Novac", "1a", []),
      new UrbanZone("1a2", "Bloc A25", "Residential", "1a", [])
    ]),
    new Neighborhood("1b", "Craiovita", "1", [
      new Complex("1b1", "Orizont", "1b", [
        new UrbanZone("1b1a", "Bloc I5", "Residential", "1b1", [
          new UtilityCost("1b1a1", 56, 62, 70, 10, "Ron", new Date('15 Jan 2023 00:00:00 GMT'), "Month"),
          new UtilityCost("1b1a2", 56, 62, 70, 10, "Ron", new Date('15 Feb 2023 00:00:00 GMT'), "Month"),
          new UtilityCost("1b1a3", 56, 62, 70, 10, "Ron", new Date('15 Mar 2023 00:00:00 GMT'), "Month"),
        ]),
        new UrbanZone("1b1b", "Frizerie", "Commercial", "1b1", [
          new UtilityCost("1b1b1", 26, 62, 70, 10, "Ron", new Date('15 Jun 2023 00:00:00 GMT'), "Month"),
          new UtilityCost("1b1b2", 36, 62, 70, 10, "Ron", new Date('15 Jul 2023 00:00:00 GMT'), "Month"),
          new UtilityCost("1b1b3", 36, 62, 70, 10, "Ron", new Date('15 Aug 2023 00:00:00 GMT'), "Month"),
        ]),
        new UrbanZone("1b1c", "Magazin la Scari", "Commercial", "1b1", []),
      ]),
      new UrbanZone("1b2", "Bloc H1", "Residential", "1b", []),
      new UrbanZone("1b3", "Bloc H2", "Residential", "1b", []),
      new UrbanZone("1b4", "Bloc H3", "Residential", "1b", []),
      new Complex("1b5", "Complexul Smit", "1b", [
        new UrbanZone("1b5a", "Bloc I5", "Residential", "1b1", [
          new UtilityCost("1b5a1", 56, 62, 70, 10, "Ron", new Date('15 Jan 2023 00:00:00 GMT'), "Month"),
          new UtilityCost("1b5a2", 56, 62, 70, 10, "Ron", new Date('15 Feb 2023 00:00:00 GMT'), "Month"),
          new UtilityCost("1b5a3", 56, 62, 70, 10, "Ron", new Date('15 Mar 2023 00:00:00 GMT'), "Month"),
        ]),
        new UrbanZone("1b5b", "Frizerie", "Commercial", "1b1", [
          new UtilityCost("1b5b1", 26, 62, 70, 10, "Ron", new Date('15 Jun 2023 00:00:00 GMT'), "Month"),
          new UtilityCost("1b5b2", 36, 62, 70, 10, "Ron", new Date('15 Jul 2023 00:00:00 GMT'), "Month"),
          new UtilityCost("1b5b3", 36, 62, 70, 10, "Ron", new Date('15 Aug 2023 00:00:00 GMT'), "Month"),
        ]),
        new UrbanZone("1b5c", "Magazin la Scari", "Commercial", "1b1", []),
      ]),
    ], undefined, CRAIOVITA_NEIGHBORHOOD),
    new Neighborhood("1c", "Craiovita Noua", "1", []),
    new Neighborhood("1d", "Craiovita Veche", "1", []),
    new Neighborhood("1e", "George Enescu", "1", []),
  ], CRAIOVA_NW_SECTOR),
  new Sector('2', 'Zona North-East', [], CRAIOVA_NE_SECTOR),
  new Sector('3', 'Zona South-East', [], CRAIOVA_SE_SECTOR),
  new Sector('4', 'Zona South-West', [], CRAIOVA_SW_SECTOR),
]
