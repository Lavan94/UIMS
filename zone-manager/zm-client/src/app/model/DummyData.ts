export const SECTORS = [
  new Sector('1', 'Zona Nord', [
    new Neighborhood("1a", "Brazda lui Novac", "1", [
      new Complex("1a1", "Complexul Baba Novac", "1a", []),
      new UrbanZone("1a2", "Bloc A25", "Residential", "1a", [])
    ]),
    new Neighborhood("1b", "Severinului", "1", [
      new Complex("1b1", "Complexul Groapa", "1b", [
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
      new UrbanZone("1b4", "Bloc H3", "Residential", "1b", [])
    ]),
    new Neighborhood("1c", "Craiovita Noua", "1", []),
    new Neighborhood("1d", "Craiovita Veche", "1", []),
    new Neighborhood("1e", "George Enescu", "1", []),
  ]),
  new Sector('2', 'Zona Vest', []),
  new Sector('3', 'Zona Sud', []),
  new Sector('4', 'Zona Est', []),
]
