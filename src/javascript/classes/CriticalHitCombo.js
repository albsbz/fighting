const MIN_TIME_BETWEEN_CRITICAL_HITS = 10000;

export default class CriticalHitCombo {
    lastHitTimestamp = 0;

    pressedButtons = [false, false, false];

    press(buttonIdx) {
        const now = Date.now();
        const pressedButtons = [...this.pressedButtons];
        pressedButtons[buttonIdx] = true;
        this.pressedButtons = pressedButtons;
        const comboPressed = this.pressedButtons.filter(i => i).length === 3;
        const timeEnoughFromLastHit = now - this.lastHitTimestamp >= MIN_TIME_BETWEEN_CRITICAL_HITS;
        const criticalHit = comboPressed && timeEnoughFromLastHit;
        if (criticalHit) {
            this.lastHitTimestamp = now;
            this.pressedButtons = [false, false, false];
        }
        return criticalHit;
    }

    unpress(buttonIdx) {
        this.pressedButtons[buttonIdx] = false;
    }
}
