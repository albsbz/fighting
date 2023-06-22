import createElement from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
    const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
    const fighterElement = createElement({
        tagName: 'div',
        className: `fighter-preview___root ${positionClassName}`
    });

    if (fighter) {
        Object.entries(fighter)
            .slice(1)
            .reverse()
            .forEach(([property, value]) => {
                let element;
                if (property === 'source') {
                    element = createElement({
                        tagName: 'img',
                        className: 'fighter-image',
                        attributes: {
                            src: fighter.source
                        }
                    });
                    fighterElement.append(element);
                } else if (property === 'name') {
                    element = createElement({
                        tagName: 'div',
                        className: `fighter-${property}`
                    });
                    element.innerText = value;
                } else {
                    element = createElement({
                        tagName: 'div',
                        className: 'fighter-property__container'
                    });
                    const propertyDescription = createElement({
                        tagName: 'div',
                        className: 'fighter-property__property-description'
                    });
                    propertyDescription.innerText = `${property}: ${value}`;
                    element.appendChild(propertyDescription);
                    const barContainer = createElement({
                        tagName: 'div',
                        className: 'fighter-property__barcontainer'
                    });
                    const bar = createElement({
                        tagName: 'div',
                        className: `fighter-bar`,
                        attributes: {
                            style: `width:${+value}%`
                        }
                    });
                    barContainer.appendChild(bar);
                    element.appendChild(barContainer);
                }
                fighterElement.append(element);
            });
    }

    // // todo: show fighter info (image, name, health, etc.)
    return fighterElement;
}

export function createFighterImage(fighter) {
    const { source, name } = fighter;
    const attributes = {
        src: source,
        title: name,
        alt: name
    };
    const imgElement = createElement({
        tagName: 'img',
        className: 'fighter-preview___img',
        attributes
    });

    return imgElement;
}
