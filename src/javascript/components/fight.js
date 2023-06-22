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
        const players = [
            new Player(firstFighter, 'one', {
                attack: controls.PlayerOneAttack,
                block: controls.PlayerOneBlock,
                critical: controls.PlayerOneCriticalHitCombination
            }),
            new Player(secondFighter, 'two', {
                attack: controls.PlayerTwoAttack,
                block: controls.PlayerTwoBlock,
                critical: controls.PlayerTwoCriticalHitCombination
            })
        ];

        function keyUpHandler(e) {
            players.forEach((_, idx) => {
                const player = players[idx];
                if (e.code === player.controls.block) {
                    player.inBlock = false;
                }
                if (player.controls.critical.includes(e.code)) {
                    player.hitCritical.unpress(player.controls.critical.indexOf(e.code));
                }
            });
        }
        function keyDownHandler(e) {
            if (e.repeat) return;
            players.forEach((_, idx) => {
                const player = players[idx];
                const oponent = players[Math.abs(1 - idx)];

                if (e.code === player.controls.attack) {
                    if (!player.inBlock) {
                        oponent.health -= getDamage(player, oponent);
                    }
                }
                if (e.code === player.controls.block) {
                    player.inBlock = true;
                }
                if (player.controls.critical.includes(e.code)) {
                    if (!player.inBlock) {
                        const isCritical = player.hitCritical.press(player.controls.critical.indexOf(e.code));
                        if (isCritical) {
                            oponent.health -= +player.fighter.attack * 2;
                        }
                    }
                }

                document.getElementById(`${idx ? 'right' : 'left'}-fighter-indicator`).style.width = `${
                    (player.health / player.fighter.health) * 100
                }%`;

                if (oponent.health < 1) {
                    document.removeEventListener('keyup', keyUpHandler);
                    document.removeEventListener('keydown', keyDownHandler);
                    resolve(player);
                }
            });
        }

        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);
    });
}
