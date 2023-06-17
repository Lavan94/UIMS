import {UtilityCost} from "./UtilityCost";
import {UrbanZone, UrbanZoneTypes} from "./Organization/UrbanZone";
import {Complex} from "./Organization/Complex";
import {Neighborhood} from "./Organization/Neighborhood";
import {Sector} from "./Organization/Sector";
import {
  BRAZDA_LUI_NOVAC_NEIGBORHOOD, CERNELE_INDUSTRIAL_NEIGHBORHOOD,
  CRAIOVA_NE_SECTOR,
  CRAIOVA_NW_SECTOR,
  CRAIOVA_SE_SECTOR,
  CRAIOVA_SW_SECTOR, CRAIOVITA_NEIGHBORHOOD, GEORGE_ENESCU_NEIGHBORHOOD, SEVERINULUI_NEIGHBORHOOD
} from "../map-display/GeoJsonDummyData";
import {
  CRAIOVITA_SHOPPING_CENTER_COMPLEX,
  ORIZONT_COMPLEX,
  PIATA_CRAIOVITA_COMPLEX
} from "../map-display/ComplexGeoJsonData";
import {
  BISERICA_SF_IOAN_SEBASTIAN_PIATA_CRAIOVITA_CULTURAL_ZONE,
  BLOC_1_PIATA_MARE,
  BLOC_2_PIATA_MARE_RESIDENTIAL_ZONE,
  BLOC_3_PIATA_MARE_RESIDENTIAL_ZONE,
  BLOC_4_PIATA_MARE_RESIDENTIAL_ZONE,
  BLOC_C1_CRAIOVITA_SHOPPING_CENTER_RESIDENTIAL_ZONE,
  CARREFOUR_CRAIOVITA_COMMERCIAL_ZONE, CEZ_BUISNESS_ZONE,
  CORNITOIU_PARK_ZONE,
  CRAIOVITA_PARK_PROMENADA_PARK_ZONE, DEPOU_RAT_ADMINISTRATION_ZONE,
  FABRICA_HEINEKEN_INDUSTRIAL_ZONE, FABRICA_SOFTRONIC_INDUSTRIAL_ZONE, JUMBO_COMMERCIAL_ZONE,
  KAUFLAND_CRAIOVITA_COMMERCIAL_ZONE,
  LIDL_CRAIOVITA_COMMERCIAL_ZONE,
  PENNY_COMMERCIAL_ZONE,
  PIATA_MARE_PARK_ZONE, RAT_ADMINISTRATION_ZONE,
  SC_ELENA_FARAGO_CRAIOVITA_EDUCATIONAL_ZONE
} from "../map-display/UrbanZoneGeoJsonDummyData";

export const URBAN_ZONE_INSTANCE = new UrbanZone("1b1a", "Bloc I5", "Residential", "1b1", [
  new UtilityCost("1b1a1", 56, 62, 70, 10, "Ron", new Date('15 Jan 2023 00:00:00 GMT'), "Month"),
  new UtilityCost("1b1a2", 56, 62, 70, 10, "Ron", new Date('15 Feb 2023 00:00:00 GMT'), "Month"),
  new UtilityCost("1b1a3", 56, 62, 70, 10, "Ron", new Date('15 Mar 2023 00:00:00 GMT'), "Month"),
]);

export const SECTORS: Sector[] = [
  new Sector('1', 'Zona North-West', [
    new Neighborhood("1b", "Craiovita", "1", [
      new Complex("1b1", "Craiovita Shopping Center", "1b", [
        new UrbanZone("1b1a", "Kaufland Craiovita", UrbanZoneTypes.COMMERCIAL.toString(), "1b1", [
          new UtilityCost("1b1a1", 56, 62, 70, 10, "Ron", new Date('15 Jan 2023 00:00:00 GMT'), "Month"),
          new UtilityCost("1b1a2", 56, 62, 70, 10, "Ron", new Date('15 Feb 2023 00:00:00 GMT'), "Month"),
          new UtilityCost("1b1a3", 56, 62, 70, 10, "Ron", new Date('15 Mar 2023 00:00:00 GMT'), "Month"),
        ], undefined, KAUFLAND_CRAIOVITA_COMMERCIAL_ZONE),
        new UrbanZone("1b1b", "Penny", UrbanZoneTypes.COMMERCIAL.toString(), "1b1", [
          new UtilityCost("1b1b1", 26, 62, 70, 10, "Ron", new Date('15 Jun 2023 00:00:00 GMT'), "Month"),
          new UtilityCost("1b1b2", 36, 62, 70, 10, "Ron", new Date('15 Jul 2023 00:00:00 GMT'), "Month"),
          new UtilityCost("1b1b3", 36, 62, 70, 10, "Ron", new Date('15 Aug 2023 00:00:00 GMT'), "Month"),
        ], undefined, PENNY_COMMERCIAL_ZONE),
        new UrbanZone("1b1c", "Bloc C1", UrbanZoneTypes.RESIDENTIAL.toString(), "1b1", [], undefined, BLOC_C1_CRAIOVITA_SHOPPING_CENTER_RESIDENTIAL_ZONE),
      ], undefined, CRAIOVITA_SHOPPING_CENTER_COMPLEX),
      new UrbanZone("1b2", "Lidl Craiovita", UrbanZoneTypes.COMMERCIAL.toString(), "1b", [], undefined, LIDL_CRAIOVITA_COMMERCIAL_ZONE),
      new UrbanZone("1b3", "Carrefour Craiovita", UrbanZoneTypes.COMMERCIAL.toString(), "1b", [], undefined, CARREFOUR_CRAIOVITA_COMMERCIAL_ZONE),
      new UrbanZone("1b4", "Scoala Generala Elena Farago", UrbanZoneTypes.EDUCATIONAL.toString(), "1b", [], undefined, SC_ELENA_FARAGO_CRAIOVITA_EDUCATIONAL_ZONE),
      new Complex("1b5", "Craiovita Shopping Plazza", "1b", [
        new UrbanZone("1b5a", "Biserica Sf. Ioan Sebastian", UrbanZoneTypes.CULTURAL.toString(), "1b1", [
          new UtilityCost("1b5a1", 56, 62, 70, 10, "Ron", new Date('15 Jan 2023 00:00:00 GMT'), "Month"),
          new UtilityCost("1b5a2", 56, 62, 70, 10, "Ron", new Date('15 Feb 2023 00:00:00 GMT'), "Month"),
          new UtilityCost("1b5a3", 56, 62, 70, 10, "Ron", new Date('15 Mar 2023 00:00:00 GMT'), "Month"),
        ], undefined, BISERICA_SF_IOAN_SEBASTIAN_PIATA_CRAIOVITA_CULTURAL_ZONE),
        new UrbanZone("1b5b", "Bloc B1", UrbanZoneTypes.RESIDENTIAL.toString(), "1b1", [
          new UtilityCost("1b5b1", 26, 62, 70, 10, "Ron", new Date('15 Jun 2023 00:00:00 GMT'), "Month"),
          new UtilityCost("1b5b2", 36, 62, 70, 10, "Ron", new Date('15 Jul 2023 00:00:00 GMT'), "Month"),
          new UtilityCost("1b5b3", 36, 62, 70, 10, "Ron", new Date('15 Aug 2023 00:00:00 GMT'), "Month"),
        ], undefined, BLOC_1_PIATA_MARE),
        new UrbanZone("1b5c", "Bloc B2", UrbanZoneTypes.RESIDENTIAL.toString(), "1b1", [], undefined, BLOC_2_PIATA_MARE_RESIDENTIAL_ZONE),
        new UrbanZone("1b5d", "Bloc B3", UrbanZoneTypes.RESIDENTIAL.toString(), "1b1", [], undefined, BLOC_3_PIATA_MARE_RESIDENTIAL_ZONE),
        new UrbanZone("1b5e", "Bloc B4", UrbanZoneTypes.RESIDENTIAL.toString(), "1b1", [], undefined, BLOC_4_PIATA_MARE_RESIDENTIAL_ZONE),
        new UrbanZone("1b5f", "Parculet Piata Mare", UrbanZoneTypes.PARK.toString(), "1b1", [], undefined, PIATA_MARE_PARK_ZONE),
      ], undefined, PIATA_CRAIOVITA_COMPLEX),
      new Complex("1b6", "Orizont", "1b", [
        new UrbanZone("1b6a", "Bloc I5", "Residential", "1b1", [
          new UtilityCost("1b6a1", 56, 62, 70, 10, "Ron", new Date('15 Jan 2023 00:00:00 GMT'), "Month"),
          new UtilityCost("1b6a2", 56, 62, 70, 10, "Ron", new Date('15 Feb 2023 00:00:00 GMT'), "Month"),
          new UtilityCost("1b6a3", 56, 62, 70, 10, "Ron", new Date('15 Mar 2023 00:00:00 GMT'), "Month"),
        ]),
        new UrbanZone("1b6b", "Frizerie", "Commercial", "1b1", [
          new UtilityCost("1b6b1", 26, 62, 70, 10, "Ron", new Date('15 Jun 2023 00:00:00 GMT'), "Month"),
          new UtilityCost("1b6b2", 36, 62, 70, 10, "Ron", new Date('15 Jul 2023 00:00:00 GMT'), "Month"),
          new UtilityCost("1b6b3", 36, 62, 70, 10, "Ron", new Date('15 Aug 2023 00:00:00 GMT'), "Month"),
        ]),
        new UrbanZone("1b6c", "Magazin la Scari", "Commercial", "1b1", []),
      ], undefined, ORIZONT_COMPLEX),
      new UrbanZone("1b7", "Cornitoiu Park", UrbanZoneTypes.PARK.toString(), "1b", [], undefined, CORNITOIU_PARK_ZONE),
      new UrbanZone("1b8", "Cornitoiu Park", UrbanZoneTypes.PARK.toString(), "1b", [], undefined, CRAIOVITA_PARK_PROMENADA_PARK_ZONE),
    ], undefined, CRAIOVITA_NEIGHBORHOOD),
    new Neighborhood("1c", "George Enescu", "1", [], undefined, GEORGE_ENESCU_NEIGHBORHOOD),
    new Neighborhood("1d", "Severinului", "1", [], undefined, SEVERINULUI_NEIGHBORHOOD),
    new Neighborhood("1e", "Brazda lui Novac", "1", [], undefined, BRAZDA_LUI_NOVAC_NEIGBORHOOD),
    new Neighborhood("1f", "Zona Industrial Cernele", "1", [
      new UrbanZone("1f1", "Fabrica de Bere Heineken", UrbanZoneTypes.INDUSTRIAL.toString(), "1f", [], undefined, FABRICA_HEINEKEN_INDUSTRIAL_ZONE),
      new UrbanZone("1f2", "Fabrica Softronic", UrbanZoneTypes.INDUSTRIAL.toString(), "1f", [], undefined, FABRICA_SOFTRONIC_INDUSTRIAL_ZONE),
      new UrbanZone("1f3", "Jumbo", UrbanZoneTypes.COMMERCIAL.toString(), "1f", [], undefined, JUMBO_COMMERCIAL_ZONE),
      new UrbanZone("1f4", "CEZ", UrbanZoneTypes.BUSINESS.toString(), "1f", [], undefined, CEZ_BUISNESS_ZONE),
      new UrbanZone("1f5", "Depoul Rat pt Autobuze", UrbanZoneTypes.ADMINISTRATIVE.toString(), "1f", [], undefined, RAT_ADMINISTRATION_ZONE),
      new UrbanZone("1f6", "Depoul Rat pt Tramvaie", UrbanZoneTypes.ADMINISTRATIVE.toString(), "1f", [], undefined, DEPOU_RAT_ADMINISTRATION_ZONE),
    ], undefined, CERNELE_INDUSTRIAL_NEIGHBORHOOD),
  ], CRAIOVA_NW_SECTOR),
  new Sector('2', 'Zona North-East', [], CRAIOVA_NE_SECTOR),
  new Sector('3', 'Zona South-East', [], CRAIOVA_SE_SECTOR),
  new Sector('4', 'Zona South-West', [], CRAIOVA_SW_SECTOR),
]
