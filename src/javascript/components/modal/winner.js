import createElement from '../../helpers/domHelper';
import showModal from './modal';

export default function showWinnerModal(player) {
    // call showModal function

    const bodyElement = createElement({
        tagName: 'span',
        className: 'modal-body'
    });
    bodyElement.innerText = `${player.fighter.name} win`;

    showModal({
        title: `Congratulations player ${player.name}!`,
        bodyElement,
        onClose: () => {
            document.getElementById('root').dispatchEvent(new Event('restartApp'));
        }
    });
}
