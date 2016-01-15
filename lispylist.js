

var list = function (arr) {
    /*
     * a Lisp aproach to a list implementation in javascript
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
        p.equal = function (a) {
            return this === a;
        };
        p.toString = function () {
            return '( ' + p.head() + ' , ' + p.rest() + ' )';
        };
        p.len = function () {
            if(nil.equal(p))
                return 0;
            else
                return nil.equal(p.rest()) ? 1 : 1 + p.rest().len();
        };
        p.get = function (i) {
            if(i <= 0){
                return p.head();
            }else if(nil.equal(p.rest())){
                return nil;
            }else
                return p.rest().get(i - 1);
        };
        p.append = function(l) {
            if(nil.equal(p))
                return l;            
            if(nil.equal(p.rest()))
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
        p.merge = function (modifierFn, concatFn) {
            if(nil.equal(p))
                return nil;
            else if (nil.equal(p.rest()))
                return modifierFn(p.head());
            else
                return concatFn(modifierFn(p.head()), p.rest().merge(modifierFn, concatFn));
        };
        p.reverse = function () {            
            if (nil.equal(p.rest()))
                return p;
            else
                return p.rest().reverse().append( list([p.head()]) );
        };
        p.normalize = function(){
            //todo
        };
        p.sort = function(cmp){ //quick-sort
            var pivot = p.head();            
            var left=nil,right=nil;
            cmp = cmp === undefined ? function(a,b){return a < b;}: cmp; //defaults to numerical less then 
            var partion = function(l){
                if(cmp(l.head(), pivot))
                    left = pair(l.head(),left);
                else
                    right = pair(l.head(),right);    
                if(!nil.equal(l.rest())) 
                    partion(l.rest()); 
            };            
            if(!nil.equal(p) && !nil.equal(p.rest())){
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





