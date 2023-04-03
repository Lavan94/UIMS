class Sector {
  constructor(
    id: string,
    name: string,
    children: Neighborhood []
  ) {}
}

class Neighborhood {
  constructor(
    id: string,
    name: string,
    parentId: string,
    children: (Complex | UrbanZone) []
  ) {}
}

class Complex {
  constructor(
    id: string,
    name: string,
    parentId: string,
    children: UrbanZone[]
  ) {}
}

class UrbanZone {
  constructor(
    id: string,
    owner: Owner,
    type: string,
    parentId: string,
    utilityCosts: UtilityCost[]
  ) {}
}
