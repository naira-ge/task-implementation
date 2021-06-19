export class DomElement {
    constructor(tagName, props, children = []) {

    // check there are only two parameters tagName and children
    if (Array.isArray(props)) {
        children = props;
        props = {};
    }

    // check null and undefined
    if(typeof children === "undefined" && (typeof children === "object" || !children)) return;

    if(typeof children === 'string' || !Array.isArray(children)) {
        this.children = [children]
    } else {
        this.children = children;
    }
    
    // tagName, props, children data is saved to this instantiated object
    this.tagName = tagName;
    this.props = props || {};

    this.key = props ? props.key: undefined; 
    
    // define count to be used in the diff algorithm
    let count = 0;
    
    this.children.forEach(child => {
        if (child instanceof DomElement) {
        count += child.count;
        } else {
        child = '' + child;
        }
        count++;
    })

    // Set a count for each node
        this.count = count;
    }

    draw () {
        const $el = document.createElement(this.tagName);
        const props = this.props;

    // Loop through all the attributes, then set the attributes
    for (let [key, val] of Object.entries(props)) {
        $el.setAttribute(key, val);
    }

    // append all children 
    this.children.forEach(child => {
        // recursive loop to build dom tree, check child nodes are text nodes
        let childEl = (child instanceof DomElement) ? child.draw() : document.createTextNode(child);
        $el.appendChild(childEl);

    })

    return $el;
}

}

export class DivElement extends DomElement {
    constructor(props) {
        super(tagName, props, children)
    }

    draw(){
        super.draw();

        for (let [key, val] of Object.entries(props)) {
            $el.setAttribute(key, val);
        }
    }
}

export class SpanElement extends DomElement {
    constructor(props) {
        super(tagName, props, children)
    }

    draw(){
        super.draw();
    }
}

export class PElement extends DomElement {
    constructor(props) {
        super(tagName, props, children)
    }
    
    draw(){
        super.draw();
    }
}
export class UlElement extends DomElement {
    constructor(props) {
        super(tagName, props, children)
    }
    
    draw(){
        super.draw();
    }
}
export class LiElement extends DomElement {
    constructor(props) {
        super(tagName, props, children)
    }
    
    draw(){
        super.draw();
    }
}




