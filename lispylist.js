

var list = function (arr) {
    /*
     * a Lisp aproach to a list implementation for javascript
     */

    var listBuilder = function (arr, i) {
        if (i + 1 === arr.length)
            return pair(arr[i], nil);
        else
            return pair(arr[i], listBuilder(arr, i + 1));
    };
    
    return arr.length > 0 ? listBuilder(arr, 0) : nil;
};

var pair = function (a, b) {
    var cons = function (a, b) {
        var p = function (p) {
            return p ? a : b;
        };
        p.head = function () {
            return this(true);
        };
        p.rest = function () {
            return this(false);
        };
        p.toString = function () {
            return '( ' + p.head() + ' , ' + p.rest() + ' )';
        };
        p.len = function () {
            if(p === nil)
                return 0;
            else
                return p.rest() === nil ? 1 : 1 + p.rest().len();
        };
        p.get = function (i) {
            if(i <= 0){
                return p.head();
            }else if(p.rest() === nil){
                return nil;
            }else
                return p.rest().get(i - 1);
        };
        p.append = function(l) {
            if(p.rest() === nil)
                return pair(p.head(),l);
            else
                return pair(p.head(),p.rest().append(l));                
        }
        p.map = function (fn) {
            return p.merge(fn, pair);
        };
        p.fold = function (fn) {
            return p.merge(function (e) {
                return e;
            }, fn);
        }
        p.forEach = function (fn) {
            if (!nil.equal(p)) {
                fn(p.head());
                p.rest().forEach(fn);
            }
        };
        p.merge = function (modifier, append) {
            if (nil.equal(p.rest()))
                return modifier(p.head());
            else
                return append(modifier(p.head()), p.rest().merge(modifier, append));
        };
        p.reverse = function () {
            if (nil.equal(p))
                return p;
            else
                return pair(p.rest().reverse(), p.head());
        };
        p.normalize = function(){
            //todo
        };
        p.sort = function(cmp){ //quick-sort
            var pivot = p.head();            
            var left=nil,right=nil;
            cmp = cmp === undefined ? function(a,b){return a < b;}: cmp;       
            var partion = function(l){
                if(cmp(l.head(), pivot))
                    left = pair(l.head(),left);
                else
                    right = pair(l.head(),right);    
                if(l.rest() !== nil) 
                    partion(l.rest()); 
            };            
            if(p.len() > 1){
                partion(p.rest());    
                return left.sort().append(pair(pivot,nil)).append(right.sort());                        
            }else{
                return p;
            }
        };
        return p;
    };
    return cons(a, b);
};

var nil = pair(null, null);
nil.toString = function () {
    return 'nil';
};
nil.equal = function (a) {
    return this === a;
};




