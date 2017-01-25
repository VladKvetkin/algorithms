"use strict"

// Одномерные массивы


// Нахождение элементов
function indexOf(array, target) {
	for (var i = 0; i < array.length; ++i) {
		if (array[i] == target) return i;
	}

	return -1;
}

console.log(indexOf([1, 2, 3, 4, 5], 1));


// Нахождение минимума
function findMinimum(array) {
	var minimum = array[0];

	for (var i = 1; i < array.length; ++i)
		if (array[i] < minimum) minimum = array[i];

	return minimum;
}

console.log(findMinimum([1, 2, 3, 4, 0]));


// Нахождение максимума
function findMaximum(array) {
	var maximum = array[0];

	for (var i = 1; i < array.length; ++i)
		if (array[i] > maximum) maximum = array[i];

	return maximum;
}

console.log(findMaximum([1, 2, 3, 4, 5]));


// Нахождение среднего арефметического
function findAverage(array) {
	var total = 0;

	for (var i = 0; i < array.length; ++i)
		total += array[i];

	return total / array.length;
}

console.log(findAverage([1, 2, 3, 4, 5]));


// Нахождение срединного значений
function findMedian(array) {
	for (var i = 0; i < array.length; ++i) {
		// Находим кол-во элементов больших и меньших, чем array[i]
		var numLarger = 0, numSmaller = 0;

		for (var j = 0; j < array.length; ++j) {
			if (array[j] < array[i]) numSmaller++;
			if (array[j] > array[i]) numLarger++;
		}

		if (numSmaller == numLarger)
			return array[i];
	}
}

console.log(findMedian([1, 3, 4, 7, 8, 8, 9]));


// Вставка элементов
function insertItem(array, value, position) {
	// Смещаем элементы после целевой позиции
	// Чтобы освободить место для нового элемента

	for (var i = array.length ; i >= position + 1; --i)
		array[i] = array[i - 1];

	// Вставляем новый элемент
	array[position] = value;
}

console.log(insertItem([1, 2, 3, 4, 5], 0, 0));
