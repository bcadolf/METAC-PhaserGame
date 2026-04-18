import { Shield, Weapon } from '../classes/Equipment';

export const EQUIP_LIBRARY = {
  shields: {
    // Same names hold the same energy, version * 5 = durability
    STARTER: () => new Shield('s_01', 'Factory Line Energy Skin v1', 15, 5),
    BASIC: () => new Shield('s_02', 'Energy Skin v2.0', 15, 10),
    ROOKIE: () => new Shield('s_03', 'Energy Forcefield v1.6', 32, 8),
  },
  weapons: {
    STARTER: () => new Weapon('w_01', 'Factory Pulsar v1', 5, 3, 3, 1000),
  },
};
