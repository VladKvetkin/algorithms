"use strict"

// ДЕРЕВЬЯ


// Бинарное дерево
function BinaryNode(value) {
	this.value = value;
	this.leftChild;
	this.rightChild;

	// Прямой обход
	this.traversePreorder = function() {
		console.log(this.value);
		if (this.leftChild != null)
			this.traversePreorder.call(this.leftChild);

		if (this.rightChild != null)
			this.traversePreorder.call(this.rightChild);
	}

	// Симметричный обход
	this.traverseInorder = function() {
		if (this.leftChild != null)
			this.traverseInorder.call(this.leftChild);

		console.log(this.value);

		if (this.rightChild != null)
			this.traverseInorder.call(this.rightChild);
	}

	// Обратный обход
	this.traversePostorder = function() {
		if (this.leftChild != null)
			this.traversePostorder.call(this.leftChild);

		if (this.rightChild != null)
			this.traversePostorder.call(this.rightChild);

		console.log(this.value);
	}

	// Обход в ширину
	this.traverseDepthFirst = function() {
		// Создаем очередь для хранения дочерних вершин при дальнейшей обработке
		var children = [];

		// Помещаем корень в очередь
		children.unshift(this);

		// Обрабатываем очередь, пока она не станет пустой
		while (children.length != 0) {
			// Получаем следующую вершину в очереди
			var node = children.pop();

			// Обрабатываем вершину
			console.log(node.value);

			// Добавляем дочернюю вершину в очередь
			if (node.leftChild != null)
				children.unshift(node.leftChild);

			if (node.rightChild != null)
				children.unshift(node.rightChild);
		}
	}

	// Добавление вершины к упорядоченному поддереву вершины
	this.addNode = function(newValue) {
		// Сравниваем новое знанчеи со значением вершины
		if (newValue < this.value) {
			// Если новое значение меньше, размещаем его в левом поддереве
			if (this.leftChild == undefined)
				this.leftChild = new BinaryNode(newValue);
			else
				this.leftChild.addNode(newValue);
		} else {
			// Если новое значение не меньше, размещаем его в правом поддереве
			if (this.rightChild == undefined)
				this.rightChild = new BinaryNode(newValue);
			else
				this.rightChild.addNode(newValue);
		}
	}

	// Находим вершину с целевым значением
	this.findNode = function(target) {
		// Если мы нашли целевое значение, возвращаем эту вершину
		if (target == this.value) return this;

		// Смотрим, где целевое значение - в левом или правом поддереве
		if (target < this.value) {
			// Ищем в левом поддереве
			if (this.leftChild == undefined) return null;
			return this.leftChild.findNode(target);
		} else {
			// Ищем в правом поддереве
			if (this.rightChild == undefined) return null;
			return this.rightChild.findNode(target);
		}
	}
}

var root = new BinaryNode(4)
var node1 = new BinaryNode(1)
var node2 = new BinaryNode(2)
var node3 = new BinaryNode(3)
var node5 = new BinaryNode(5)
var node6 = new BinaryNode(6)
var node7 = new BinaryNode(7)
var node8 = new BinaryNode(8)
root.leftChild = node2;
root.rightChild = node5;
node2.leftChild = node1;
node2.rightChild = node3;
node5.rightChild = node7;
node7.leftChild = node6;
node7.rightChild = node8;


root.traversePreorder();
console.log('-----------------------------');
root.traverseInorder();
console.log('-----------------------------');
root.traversePostorder();
console.log('-----------------------------');
root.traverseDepthFirst();
console.log('-----------------------------');
root.addNode(9)
console.dir(root);
console.log('-----------------------------');
console.log(root.findNode(9));
