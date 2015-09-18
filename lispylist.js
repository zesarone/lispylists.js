

var list = function (arr) {
    /*
     * a Lisp aproach to a list implementation for javascript
     */
    var pair = function (a, b) {
        var cons = function (a, b) {
            var p = function (p) {
                return p ? a : b;
            };
            p.head = function () {
                return this(true);
            };
            p.rest = function (x) {
                return this(false);
            };
            p.toString = function () {
                return '( ' + p.head() + ' , ' + p.rest() + ' )';
            }
            p.map = function (fn) {
                if (nil.equal(p.rest()))
                    return fn(p.head());
                else
                    return pair(fn(p.head()), p.rest().map(fn));
            };
            p.forEach = function (fn) {
                if (!nil.equal(p)) {
                    fn(p.head());
                    p.rest().forEach(fn);
                }
            };
            p.merge = function (modifier, append){
                if (nil.equal(p.rest()))
                    return modifier(p.head());
                else
                    return append( modifier( p.head() ), p.rest().merge( modifier, append));
            };
            p.reverse = function () {
                if (nil.equal(p))
                    return p;
                else
                    return pair(p.rest().reverse(), p.head());
            };
            return p;
        };
        return new cons(a, b);
    };
    var nil = pair(null, null);
    nil.toString = function () {
        return 'nil';
    };
    nil.equal = function (a) {
        return this === a;
    };

    var worker = function (arr, i) {
        if (i + 1 === arr.length)
            return pair(arr[i], nil);
        else
            return pair(arr[i], worker(arr, i + 1));
    };
    return pair(arr[0], worker(arr, 1));
};





