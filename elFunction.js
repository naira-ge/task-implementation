import {DomElement, DivElement, SpanElement, PElement, UlElement, LiElement} from './elementDOM'

let el = (tagName, props, children) => {
    switch (tagName){
        case 'div':
            return new DivElement(tagName, props, children);
        break;
        case 'span':
            return new SpanElement(tagName, props, children);
        break;
        case 'p':
            return new PElement(tagName, props, children);
        break;
        case 'ul':
            return new UlElement(tagName, props, children);
        break;
        case 'li':
            return new LiElement(tagName, props, children);
        break;
        default:
            return new DomElement(tagName, props, children);
    }
}

export default el;