var powNeg1 = require('@rakov/math-neg1pow');
var Vector = require('./vector.js');
var {sin, cos} = Math;

/**
 * @interface Matrix
 *
 * @property {integer} rows - количество строк
 * @property {integer} cols - количество столбцов
 *
 * @method index(row, col) - получить значение элемента
 * @param {Integer} row - строка
 * @param {Integer} col - столбец
 * @return {Number}
 *
 * @method transpone() - транспонировать
 * @return {Matrix}
 *
 * @method row(index)
 * @param {Integer} index
 * @return {Matrix}
 *
 * @method column(index)
 * @param {Integer} index
 * @return {Matrix}
 *
 * @method mul(b) - умножение матрицы на другую матрицу
 * @param {Matrix} b
 * @return {Matrix}
 *
 * @method add(b) - сложение матриц с другой матрицей
 * @param {Matrix} b
 * @return {Matrix}
 *
 * @method mulV(v) - умножение матрицы на вектор (интерпретируется как столбец) и преобразование результата в вектор
 * @param {Vector} v
 * @return {Vector}
 *
 */
 
/**
 * @interface SquareMatrix
 *
 * @method det() - детерминант матрицы
 * @return {Number}
 *
 * @method inverse() - обратная матрица
 * @return {Matrix}
 */
	var Matrix = function Matrix2x2(data){
		var me = this;
		me.data = data;
	};
	var range = Matrix.range = 2,
		m_index = Matrix.index = function(row, col){
			//порядок выбран так, чтобы столбцы не разрывались
			return row + col*range;
		},
		transponeIndex4 = function(index){
			var i = index % range,
				j = (index-i)/range;
			return i*range+j;
		},
		m_mul = Matrix.mul = function(a, b){
			let [
				a11, a12, 
				a21, a22
			] = a.data;
			let [
				b11, b12, 
				b21, b22
			] = b.data;
			let c = [
				a11*b11 + a12*b21, a11*b12 + a12*b22,
				a21*b11 + a22*b21, a21*b12 + a22*b22
			];
			let data = new Matrix(c);
			
			if(a instanceof Row){
				if(b instanceof Column){
					data = data.index(0,0);
				}	
				else{
					data = data.row(0);
				}
			}
			else if(b instanceof Column){
				data = data.column(0);
			}
			return data;
		};
		
	Matrix.prototype = {
		constructor:Matrix,
		index: function(row, col){
			return this.data[m_index(row, col)];
		},
		inverse: function(){
			let [
				a, b, 
				c, d
			] = this.data;
			var me = this,
				det = me.det();
			let data = [
				d/det, -b/det,
				-c/det, a/det
			];
			return new Matrix(data);
		},
		det: function(){
			let [
				a, b, 
				c, d
			] = this.data;
			return a*d - b*c;
		},
		row: function(index){
			return new Row([this.index(index, 0), this.index(index, 1)]);
		},
		column: function(index){
			return new Column([this.index(0, index), this.index(1, index)]);
		},
		rows:range,
		cols:range,
		transpone: function(){
			let [
				a, b, 
				c, d
			] = this.data;
			return new Matrix([
				a, c,
				b, d
			]);
		},
		mul: function(b){
			return m_mul(this, b);
		},
		add: function(b){
			return new Matrix(this.data.map((a, i)=>(a + b[i])));
		},
		mulV:function(v){
			return this.mul(new Matrix.Column(v.toArray())).toVector();
		},
		for2D:function(){
			var data = this.data;
			/*
				| a c 0 |
				| b d 0 |	=> [a, b, c, d, 0, 0]
				| 0 0 1 |
				Третья строка игнорируется
			*/
			return this.data.concat([0, 0]);
		}
	};
	
	var Column = Matrix.Column = function Column3(data){
		Matrix.call(this, data);
	};
	Column.prototype = {
		constructor:Column,
		index: function(row, col){
			return this.data[row];
		},
		toVector:function(){
			return new Vector(this.data);
		},
		rows:range,
		cols:1,
		transpone: function(){
			return new Row(this.data);
		}
	};
	var Row = Matrix.Row = function Row3(data){
		Matrix.call(this, data);
	};
	Row.prototype = {
		constructor:Row,
		index: function(row, col){
			return this.data[col];
		},
		toVector:function(){
			return new Vector(this.data);
		},
		rows:1,
		cols:range,
		transpone: function(){
			return new Column(this.data);
		},
		mul: function(b){
			return m_mul(this, b);
		}
	};

	Matrix.RotZ = function(angle){
		var c = cos(angle), s = sin(angle);
		return new Matrix([
			c, -s,
			s, c
		]);
	};
	
	Matrix.E = Matrix.I2 = new Matrix([
		1,0,
		0,1
	]);

module.exports = Matrix;