

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

//var string = function (o) {
//    var builder = function (s) {
//        if (s.length === 0)
//            return '';
//        else
//            return pair(s.charAt(0), builder(s.substring(1, s.length)));
//    }
//    var str = function (s) {
//        function v() {
//            return s;
//        }
//        v.toString = function () {
//            var t ='';
//            v().forEach(function(e){t += e+'';});
//            console.log(t);
//            return t;
////            return v().toString();
//        };
//        return v;
//    };
//    return str(builder(o));
//
//}
//
//var asta = string("hejsan hejsan hejsan");
//console.log(asta);

var reader = function (s, breakChars, i) {

}

var parseList = function (s, i) {
//	if(s.charAt(i) === '(')
//        pair(
}

var nr = list(['ett', 'två', 'tre', 'fyra']);
var apanr = nr.map(function (e) {
    return 'apa nr: ' + e;
});
var bananr = '';
nr.forEach(function (e) {
    bananr += e + ' ';
});

l1 = list(["en", "listen", "övning", "på", "closures", "!"]);

document.getElementsByTagName('body')[0].innerHTML =
        nr + '<br/>' +
        nr.merge(function(e){return 'test'+e},function(head,rest){return head + ', ' + rest}) + '<br/>' +
        nr.reverse() + '<br/>' +
        apanr + '<br/>' +
        bananr + '<br/>lista: ' + l1;






