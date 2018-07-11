class Player {
  constructor() {
    this.health = 20;
  }

  playTurn(warrior) {
    const space = warrior.feel();
    if (space.isEmpty()) {
      if (this.isInjured(warrior) && !this.isLosingHealth(warrior))
        warrior.rest();
      else
        warrior.walk();
    }
    else if (this.isEnemyInSight(space)) {
      if (this.isAboutToDie(warrior))
        warrior.walk("backward");
      else
        warrior.attack();
    }
    else if (this.isPrisonerInSight(space))
      warrior.rescue();


    this.health = warrior.health();
  }

  isEnemyInSight(space) {
    if (space.isUnit())
      return space.getUnit().isEnemy();
    return false;
  }

  isAboutToDie(warrior) {
    var lostHealth = this.health - warrior.health();
    return (warrior.health() - lostHealth) <= 0;
  }

  isPrisonerInSight(space) {
    if (space.isUnit())
      return space.getUnit().isBound();
    return false;
  }

  isInjured(warrior) {
    return warrior.health() < 20;
  }

  isLosingHealth(warrior) {
    return warrior.health() < this.health;
  }
}
