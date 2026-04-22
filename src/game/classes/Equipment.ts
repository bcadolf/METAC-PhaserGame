export abstract class Equipment {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public durability: number,
    public isBroken: boolean = false,
  ) {}
}

export class Shield extends Equipment {
  public currentEnergy: number;
  private maxCycles: number;

  constructor(
    id: string,
    name: string,
    public maxEnergy: number,
    durability: number,
    public price: number,
  ) {
    super(id, name, 'Protects METAC from destruction.', durability);

    this.maxEnergy = maxEnergy;
    this.currentEnergy = maxEnergy;
    this.maxCycles = durability * maxEnergy;
    this.price = price;
  }

  recharge(amount: number) {
    this.maxCycles -= amount;

    const chargesLeft = Math.min(this.maxEnergy, this.maxCycles);

    this.currentEnergy = Math.min(chargesLeft, this.currentEnergy + amount);
  }

  useEnergy(amount: number) {
    let leftOver = false;
    this.currentEnergy -= amount;
    console.log('Current Energy: ' + this.currentEnergy);

    if (this.currentEnergy < 0) {
      this.currentEnergy = 0;
      leftOver = true;
    }

    if (this.maxCycles <= 0 && this.currentEnergy <= 0) {
      this.maxCycles = 0;
      this.handleBreak();
    }

    return leftOver;
  }

  private handleBreak() {
    this.currentEnergy = 0;
    this.maxEnergy = 0;
    this.isBroken = true;
  }
}

export class Weapon extends Equipment {
  private totalUses: number;

  constructor(
    id: string,
    name: string,
    durability: number,
    public range: number,
    public damage: number,
    public attackSpeed: number,
    public price: number,
  ) {
    super(id, name, 'Item used for combat.', durability);

    this.totalUses = Math.round(durability / (damage / 100));
  }

  attack() {
    if (this.isBroken) {
      return 0;
    }

    this.burnUses(1);

    return this.damage;
  }

  private burnUses(uses: number) {
    this.totalUses -= uses;

    if (this.totalUses <= 0) {
      this.totalUses = 0;
      this.isBroken = true;
    }
  }
}
