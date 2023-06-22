import controls from '../../constants/controls';
import Player from '../classes/Player';

export function getBlockPower(fighter) {
    // return block power
    return +fighter.defense * (Math.random() + 1);
}
export function getHitPower(fighter) {
    // return hit power
    return +fighter.attack * (Math.random() + 1);
}
export function getDamage(attacker, defender) {
    // return damage
    const hitPower = getHitPower(attacker.fighter);
    const blockPower = defender.inBlock ? getBlockPower(defender.fighter) : 0;
    const damage = hitPower - blockPower;
    return damage > 0 ? damage : 0;
}

export async function fight(firstFighter, secondFighter) {
    return new Promise(resolve => {
        // resolve the promise with the winner when fight is over
        const playerOne = new Player(firstFighter, 'one');
        const playerTwo = new Player(secondFighter, 'two');

        function keyUpHandler(e) {
            if (e.code === controls.PlayerOneBlock) {
                playerOne.inBlock = false;
            }
            if (e.code === controls.PlayerTwoBlock) {
                playerTwo.inBlock = false;
            }
            if (controls.PlayerOneCriticalHitCombination.includes(e.code)) {
                playerOne.hitCritical.unpress(controls.PlayerOneCriticalHitCombination.indexOf(e.code));
            }
            if (controls.PlayerTwoCriticalHitCombination.includes(e.code)) {
                playerOne.hitCritical.unpress(controls.PlayerTwoCriticalHitCombination.indexOf(e.code));
            }
        }
        function keyDownHandler(e) {
            if (e.repeat) return;
            if (e.code === controls.PlayerOneAttack) {
                if (!playerOne.inBlock) {
                    playerTwo.health -= getDamage(playerOne, playerTwo);
                }
            }
            if (e.code === controls.PlayerTwoAttack) {
                if (!playerTwo.inBlock) {
                    playerOne.health -= getDamage(playerTwo, playerOne);
                }
            }
            if (e.code === controls.PlayerOneBlock) {
                playerOne.inBlock = true;
            }
            if (e.code === controls.PlayerTwoBlock) {
                playerTwo.inBlock = true;
            }
            if (controls.PlayerOneCriticalHitCombination.includes(e.code)) {
                const criticalHit = playerOne.hitCritical.press(
                    controls.PlayerOneCriticalHitCombination.indexOf(e.code)
                );
                if (criticalHit) {
                    playerTwo.health -= +playerOne.fighter.attack * 2;
                }
            }
            if (controls.PlayerTwoCriticalHitCombination.includes(e.code)) {
                const criticalHit = playerTwo.hitCritical.press(
                    controls.PlayerTwoCriticalHitCombination.indexOf(e.code)
                );
                if (criticalHit) {
                    playerOne.health -= +playerTwo.fighter.attack * 2;
                }
            }
            document.getElementById('left-fighter-indicator').style.width = `${
                (playerOne.health / playerOne.fighter.health) * 100
            }%`;
            document.getElementById('right-fighter-indicator').style.width = `${
                (playerTwo.health / playerTwo.fighter.health) * 100
            }%`;
            if (playerTwo.health < 1) {
                document.removeEventListener('keyup', keyUpHandler);
                document.removeEventListener('keydown', keyDownHandler);
                resolve(playerOne);
            }
            if (playerOne.health < 1) {
                document.removeEventListener('keyup', keyUpHandler);
                document.removeEventListener('keydown', keyDownHandler);
                resolve(playerTwo);
            }
        }

        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);
    });
}
