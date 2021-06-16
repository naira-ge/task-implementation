const [
    FULFILLED,
    REJECTED,
    PENDING
] = [true, false, void 0];
  

export default class Promifill {
    get state () {
        return PENDING;
    }
    
    get value () {
        return void 0;
    }

    get settled () {
        return false;
    }

    defineProperty =
        (target, propName, propValue) => {
        Object.defineProperty(target, propName, { value: propValue });
    };


constructor(executor) {
    if (typeof executor !== "function") {
        throw new TypeError(`Promise resolver must be a function`);
    }

//validating the input parameters
const isIterable =
(subject) => subject != null &&
    typeof subject[Symbol.iterator] == "function";

const validateIterable =
  (subject) => {
    if (isIterable(subject)) {
    return;
}
    throw new TypeError(`Cannot read property 'Symbol(Symbol.iterator)' of ${Object.prototype.toString.call(subject)}.`);
};

const isThenable =
(subject) => subject && typeof subject.then == "function";


    defineProperty(this, "observers", []);

const resolve =
    (value) => {
    if (this.settled) {
        return;
    }

    defineProperty(this, "settled", true);

    defineProperty(this, "value", value);
    defineProperty(this, "state", FULFILLED); 
    };

const reject =
    (reason) => {
    if (this.settled) {
        return;
    }

    defineProperty(this, "settled", true);

    defineProperty(this, "value", reason);
    defineProperty(this, "state", REJECTED);
    };

try {
        executor(resolve, reject);
    } catch (error) {
        reject(error);
    }
};

then (onfulfill, onreject) {
    return new this.constructor((resolve, reject) => {
    const internalOnfulfill =
    (value) => {
        try {
        resolve(
            typeof onfulfill == "function"
            ? onfulfill(value)
            : value
        );
        } catch (error) {
            reject(error);
        }
    };
  
    const internalOnreject =
    (reason) => {
        try {
            if (typeof onreject == "function") {
            resolve(onreject(reason));
        } else {
            reject(reason);
        }
        } catch (error) {
            reject(error);
        }
    };
  
    this.observers.push({
        onfulfill: internalOnfulfill,
        onreject: internalOnreject
    });
    });
}

catch (onreject) {
    return this.then(null, onreject);
};


finally (oncomplete) {
    const chainedPromise = new this.contructor((resolve, reject) => {
      const internalOncomplete =
        () => {
        try {
            oncomplete();
            if (this.state === FULFILLED) {
            resolve(this.value);
            } else {
            reject(this.value);
            }
        } catch (error) {
            reject(error);
        }
        };

        if (this.state === PENDING) {
        this.observers.push({
            onfulfill: internalOncomplete,
            onreject: internalOncomplete
        });
        } 
    });

    this.chain.push(chainedPromise);
    return chainedPromise;
}

  then (onfulfill, onreject) {
};

all (iterable) {
    return new Promifill((resolve, reject) => {
    validateIterable(iterable);

    let iterableSize = 0;
    const values = [];

    for (let item of iterable) {
        ((entry, index) => {
        Promifill.resolve(entry)
            .then(
            (value) =>
                add(value, index),
            reject
            );
        })(item, iterableSize++);
      }
    });
  }

}

