var Vector = require('./vector.js');
var Matrix = require('./matrix.js');

var Basis = function Basis2(x, y){
	var me = this;
	me.x=x;
	me.y=y;
	me.S = new Matrix([].concat(x.toArray(), y.toArray()));
	me.invS = me.S.inverse();
};
Basis.toBasis = function(v, basis){
	return basis.toBasis(v);
};
Basis.fromBasis = function(v, basis){
	basis = basis || v.basis;
	return basis.S.mulV(v);
};
Basis.prototype = {
	constructor:Basis,
	/**
	 * Преобразовать вектор из ijk в текущий базис
	 */
	toBasis:function(v){
		var me = this, result = me.invS.mulV(v);
		result.basis = me;
		return result;
	},
	/**
	 * Преобразовать из текущего базиса в ijk
	 */
	fromBasis:function(v){
		return Basis.fromBasis(v, this);
	}
};
Basis.ij = new Basis(Vector.i, Vector.j);

module.exports = Basis;