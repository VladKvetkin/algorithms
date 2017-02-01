"use strict"

/*
	Поиск
	Находим индекс целевого элемента в отсортированном массиве
	Если элемента в массиве нет, возвращаем -1
*/


// Линейный (исчерпывающий) поиск
function linearSearch(values, target) {
	for (var i = 0; i < values.length; ++i) {
		if (values[i] == target) return i;

		if (values[i] > target) return -1;
	}

	return -1;
}

console.log(linearSearch([7, 8, 1, 2, 0, 9, 5].sort(function(a, b) {
	return a - b;
}), 0));


// Бинарный поиск
function binarySearch(values, target) {
	var min = 0;
	var max = values.length - 1;

	while (min <= max) {
		// Находим разделяющий элемент
		var mid = Math.floor((min + max) / 2);

		// Проверяем, в какой половине вести поиск - левой или правой
		if (target < values[mid]) max = mid - 1;
		else if (target > values[mid]) min = mid + 1;
		else return mid;
	}

	return -1;
}

console.log(binarySearch([7, 8, 1, 2, 0, 9, 5].sort(function(a, b) {
	return a - b;
}), 9));



// Интерполяционный поиск
function interpolationSearch(values, target) {
	var mid, min = 0, max = values.length - 1;

	while (values[min] < target && values[max] > target) {
		mid = min + Math.floor( ((target - values[min]) * (max - min)) / (values[max] - values[min]) );

		if (values[mid] < target) min = mid + 1;
		else if (values[mid] > target) max = mid - 1;
		else return mid;
	}

	if (values[min] == target) return min;
	else if (values[max] == target) return max;
	else return -1;
}

console.log(interpolationSearch([7, 8, 1, 2, 0, 9, 5].sort(function(a, b) {
	return a - b;
}), 8));
