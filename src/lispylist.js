

var list = function (arr) {
    /*
     * a Lisp aproach to a list implementation in javascript
     */
    var listBuilder = (arr, i) =>
        (i + 1 === arr.length) ?
            pair(arr[i], nil) :
            pair(arr[i], listBuilder(arr, i + 1))

    return arr.length > 0 ? listBuilder(arr, 0) : nil;
};

var pair = function (a, b) {
    var p = (p) => p ? a : b

    p.head = function () { return this(true) }

    p.rest = function () { return this(false) }

    p.equal = function (a) { return this === a }

    p.isNil = function () { return this === nil }

    p.toString = () => '( ' + p.head() + ' . ' + p.rest() + ' )'

    p.len = () => p.isNil() ? 0 : p.rest().isNil() ? 1 : 1 + p.rest().len()

    p.get = (i) =>
        (i <= 0) ?
            p.head() :
            (
                (p.rest().isNil()) ?
                    nil :
                    p.rest().get(i - 1)
            )

    p.append = (l) =>
        (p.isNil()) ?
            l :
            (
                (p.rest().isNil()) ?
                    pair(p.head(), l) :
                    pair(p.head(), p.rest().append(l))
            )

    p.map = (fn) => p.merge(fn, pair)

    p.fold = (fn) => p.merge((e) => e, fn)

    p.forEach = (fn) => {
        if (!p.isNil()) {
            fn(p.head())
            p.rest().forEach(fn)
        }
    };

    p.merge = (modifierFn, concatFn) =>
        (nil.equal(p)) ?
            nil :
            (
                (nil.equal(p.rest())) ?
                    modifierFn(p.head()) :
                    concatFn(
                        modifierFn(p.head()),
                        p.rest().merge(modifierFn, concatFn))
            )

    p.reverse = () =>
        (p.rest().isNil()) ?
            p :
            p.rest().reverse().append(list([p.head()]))

    p.flatten = () => {
        // if (p.head()) {
        //     //todo
        // }
    }
    p.sort = (cmp) => { //quick-sort
        let pivot = p.head();
        let left = nil, right = nil;
        cmp = !cmp ? (a, b) => a < b : cmp //defaults to numerical less then 
        let partion = (l) => {
            if (cmp(l.head(), pivot))
                left = pair(l.head(), left)
            else
                right = pair(l.head(), right)
            if (!l.rest().isNil())
                partion(l.rest())
        }
        if (!p.isNil() && !p.rest().isNil()) {
            partion(p.rest())
            return left.sort(cmp).append(pair(pivot, nil)).append(right.sort(cmp))
        } else {
            return p
        }
    }
    return p
}

var nil = pair(null, null)
nil.toString = () => 'nil'





