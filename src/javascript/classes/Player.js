import CriticalHitCombo from './CriticalHitCombo';

export default class Player {
    hitCritical;

    inBlock;

    fighter;

    health;

    name;

    controls;

    constructor(fighter, name, controls) {
        this.name = name;
        this.health = fighter.health;
        this.hitCritical = new CriticalHitCombo();
        this.inBlock = false;
        this.fighter = fighter;
        this.controls = controls;
    }
}
