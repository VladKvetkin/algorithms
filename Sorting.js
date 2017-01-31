"use strict";

// СОРТИРОВКИ

// Сортировка вставкой
/*
	Основная идея:
	Выбор элемента из списка ввода и его вставка
	в соответствующую позицию отсортированного списка вывода,
	который изначально пуст.
*/
function insertionSort(values) {
	for (var i = 0; i < values.length; ++i) {
		var value = values[i];

		// Ищем позицию для вставки в отсортированную часть массива
		for (var j = i - 1; j >= 0 && values[j] > value; --j)
			values[j + 1] = values[j];

		values[j + 1] = value;
	}

	return values;
}

console.log(insertionSort([7, 5, 6, 1, 3, 2, 8, 0]));


// Сортировка выбором
/*
	Основная идея:
	Найти в списке ввода наибольший элемент и добавить его в
	конец отсортированного списка
	Или искать наименьший элеменет и перемещать его в начало
	отсортированного списка
*/
function selectionSort(values) {
	for (var i = 0; i < values.length; ++i) {
		var index = i;

		for (var j = i + 1; j < values.length; ++j)
			if (values[index] > values[j])
				index = j;

		var tmp = values[i];
		values[i] = values[index];
		values[index] = tmp;
	}

	return values;
}

console.log(selectionSort([7, 5, 6, 1, 3, 2, 8, 0]));


// Пузырьковая сортировка
/*
	Предполагается следующее:
	Если массив не отсортирован, любые два смежных элемента в нем
	находятся в неправильном положении.
*/
function bubbleSort(values) {
	// Повторяем пока не отсортируем массив
	var notSorted = true;

	while (notSorted) {
		// Предполагаем, что неправильных пар нет
		notSorted = false;
		// Ищем смежные элементы массива, стоящие в неправильном порядке
		for (var i = 1; i < values.length; ++i) {
			// Проверяем, стоят ли элементы i и i - 1 в правильном порядке
			if (values[i] < values[i - 1]) {
				// Меняем их местами
				var tmp = values[i];
				values[i] = values[i - 1];
				values[i - 1] = tmp;

				// Массив еще не отсортирован
				notSorted = true;
			}
		}
	}

	return values;
}

console.log(bubbleSort([7, 5, 6, 1, 3, 2, 8, 0]));


// Пирамидальная сортировка
/*
	Подходит для работы с полными бинарными деревьями в массиве.
	В ней используется структура данных, называемая кучей.
*/

// Превращает массив в кучу
function makeHeap(values) {
	// Добавляем элемент в кучу (по одному)
	for (var i = 0; i < values.length; ++i) {
		// Начинаем с нового элемента и работаем до корня
		var index = i;
		while (index != 0) {
			// Находим индекс родительской записи
			var parent = Math.floor((index - 1) / 2);

			// Если дочерняя запись меньше или равна родительской,
			// мы закончили и выходим из цикла while
			if (values[index] <= values[parent])
				break;

			// Меняем местами родительскую и дочернюю записи
			var tmp = values[index];
			values[index] = values[parent];
			values[parent] = tmp;

			// Переходим к родительской записи
			index = parent;
		}
	}

	return values;
}

console.log(makeHeap([7, 1, 10, 4, 6, 9, 2, 11, 3, 5, 12, 8]));


// Удаление элемента из кучи и восстановление ее основного свойства
function removeTopItem(values) {
	// Сохраняем верхний элемент, чтобы вернуться к нему позднее
	var result = values[0];

	// Перемещаем последний элемент к корню
	values[0] = values[values.length - 1];

	// Восстанавливаем свойство кучи
	var index = 0;

	while (true) {
		// Находим индексы дочерних элементов
		var child1 = 2 * index + 1;
		var child2 = 2 * index + 2;

		// Если индекс дочерней записи выпадает из дерева,
		// используем индекс родительской записи
		if (child1 >= values.length) child1 = index;
		if (child2 >= values.length) child2 = index;

		// Если свойство кучи выполнено, мы закончили и выходим из цикла while
		if ((values[index] >= values[child1]) &&
				(values[index] >= values[child2]))
			break;

		// Получаем индекс дочерней записи с большим значением
		var swapChild;
		if (values[child1] > values[child2])
			swapChild = child1;
		else
			swapChild = child2;

		// Меняем местами с большим дочерним элементом
		var tmp = values[index];
		values[index] = values[swapChild];
		values[swapChild] = tmp;

		// Переходим на дочернюю ветку
		index = swapChild;

	}

	// Возвращаем значение, которое удалили из корня
	return result;
}

console.log(removeTopItem(makeHeap([7, 1, 10, 4, 6, 9, 2, 11, 3, 5, 12, 8])));


// Пирамидальная сортировка
function heapSort(values) {
	// Преобразовываем массив в кучу
	makeHeap(values);

	for (var i = values.length - 1; i >= 0; --i) {
		// Меняем местами корневой и последний элементы
		var tmp = values[0];
		values[0] = values[i];
		values[i] = tmp;

		removeTopItem(values);
	}

	return values;
}

//console.log(heapSort([7, 5, 6, 1, 3, 2, 8, 0])); // НЕ РАБОТАЕТ. НУЖНО РАЗОБРАТЬСЯ



// Быстрая сортировка
function quickSort(values, start, end) {
	// Если в массиве не более одного элемента, значит, он отсортирован.
	if (start >= end)
		return;

	// Используем первый элемент как разделяющий
	var divider = values[start];

	// Перемещаем те элементы, которые меньше разделяющего
	// в начало массива, а те, которые больше или равны ему, - в конец
	var lo = start;
	var hi = end;

	while (start < end) { // Пока границы не сомкнутся

		while ((values[end] >= divider) && (start < end))
			end--; // Сдвигаем правую границу пока элемент end больше divider

		if (start != end) { // Если границы не сомкнулись
			values[start] = values[end]; // Перемещаем элемент end на место разрешающего
			start++; // Сдвигаем левую границу вправо
		}

		while ((values[start] <= divider) && (start < end))
			start++; // Сдвигаем левую границу пока элемент start меньше divider

		if (start != end) { // Если границы не сомкнулись
			values[end] = values[start]; // Перемещаем элемент start на место end
			end--; // Сдвигаем правую границу вправо
		}
	}

	values[start] = divider; // Ставим разрещающий элемент на место
	divider = start;
	start = lo;
	end = hi;

	if (start < divider) // Рекурсивно вызываем сортировку для левой и правой части массива
		quickSort(values, start, divider - 1);

	if (end > divider)
		quickSort(values, divider + 1, end);

	return values;
}

console.log(quickSort([7, 5, 6, 1, 3, 2, 8, 0], 0, 7));


// Сортировка подсчетом
/*
	Подобную сортировку удобно использовать в том случае,
	если сортировать приходится целые числа, лежащие в относительно
	небольшом диапазоне.
*/
function countingSort(values, maxValue) {
	// Создаем массив счетчиков
	var counts = new Array(maxValue);

	for (var i = 0; i <= maxValue; ++i)
		counts[i] = 0;

	// Считаем кол-во элементов для каждого значения
	for (var i = 0; i < values.length; ++i)
		// Прибавляем 1 к счетчику данного значения
		counts[values[i]]++;

	// Копируем значения в исходный массив
	var index = 0;
	for (var i = 0; i <= maxValue; ++i) {
		// Копируем значение i в массив counts[i] раз
		for (var j = 1; j <= counts[i]; ++j) {
			values[index] = i;
			index++;
		}
	}

	return values;
}

console.log(countingSort([7, 5, 6, 1, 3, 2, 8, 0], Math.max.apply(null, [7, 5, 6, 1, 3, 2, 8, 0])));
