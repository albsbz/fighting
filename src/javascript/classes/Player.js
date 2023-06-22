import CriticalHitCombo from './CriticalHitCombo';

export default class Player {
    critical;

    inBlock;

    fighter;

    health;

    name;

    constructor(fighter, name) {
        this.name = name;
        this.health = fighter.health;
        this.hitCritical = new CriticalHitCombo();
        this.inBlock = 0;
        this.fighter = fighter;
    }
}
