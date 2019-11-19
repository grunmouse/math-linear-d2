	var Vector = function Vector2(x, y){
		if(x instanceof Array){
			var ox = x;
			y = x[1];
			x = x[0];
		}
		else if(x.x){
			y=x.y;
			x=x.x;
		}
		
		var me = this,
			sq = x*x + y*y,
			abs = Math.sqrt(sq);
			
		if(isNaN(sq)){
			throw new Error('Invalid arguments '+[x,y].join());
		}
		me.x=x;
		me.y=y;
		me.sq = sq;
		me.abs = abs;
		me.cosA = x/abs;
		me.cosB = y/abs;
		
	};
	
	var v_add = Vector.add = function(a, b){
			return new Vector(a.x+b.x, a.y+b.y);
		},
		v_sub = Vector.sub = function(a, b){
			return new Vector(a.x-b.x, a.y-b.y);
		},
		v_mul = Vector.mul = function(a, val){
			return new Vector(a.x*val, a.y*val);
		},
		v_div = Vector.div = function(a, val){
			return new Vector(a.x/val, a.y/val);
		},
		v_smul = Vector.smul = function(a, b){
			return a.x*b.x+a.y*b.y;
		},
		v_pmul = Vector.pmul = function(a, b){
			return a.x*b.y - a.y*b.x;
		},
		v_angle = Vector.angle = function(a, b){
			return Math.acos(v_smul(a, b)/a.abs/b.abs);
		},
		v_proj = Vector.proj = function(to, a){
			return v_smul(a, to)/to.abs
		}
		;


	Vector.prototype = {
		constructor:Vector,
		unlazy:function(){
			var me = this;
			return me;
		},
		isEqual:function(b){
			var me = this;
			return me === b || (me.x === b.x && me.y === b.y);
		},
		clone:function(){
			return new Vector(this.x, this.y);
		},
		neg:function(){
			return new Vector(-this.x, -this.y);
		},
		ort:function(){
			return new Vector(this.cosA, this.cosB);
		},
		toArray:function(){
			return [this.x, this.y];
		},
		toString:function(){
			return '{'+this.toArray().join(',')+'}';
		},
		
		swap:function(){
			return new Vector(this.y, this.x);
		},
		/*toColumn: function(){
			return new Column(this.toArray());
		},
		toRow: function(){
			return new Row(this.toArray());
		},*/
		add:function(b){
			return v_add(this, b);
		},
		sub:function(b){
			return v_sub(this, b);
		},
		mul:function(val){
			return v_mul(this, val);
		},
		div:function(val){
			return v_div(this, val);
		},
		smul:function(b){
			return v_smul(this, b);
		},
		pmul:function(b){
			return v_pmul(this, b);
		},
		angle:function(b){
			return v_angle(this, b);
		},
		/*toBasis: function(basis){
			return basis.toBasis(this);
		},
		fromBasis: function(basis){
			return Basis.fromBasis(this, basis);
		},*/
		proj: function(a){
			return v_proj(this, a);
		}/*,
		spin: function(axis, angle){
			return v_spin(this, axis, angle)
		}*/
		
		,map:function(callback){
			let x = callback(this.x, this.y, 0, this);
			let y = callback(this.y, this.x, 1, this);
			return new Vector(x, y);
		}
	};
	
	Vector.O = new Vector(0, 0);
	Vector.i = new Vector(1, 0);
	Vector.j = new Vector(0, 1);
	
module.exports = Vector;