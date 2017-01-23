"use strict"

var list = {
	value: null, // Ограничитель
	next: {
		value: 31,
		next: {
			value: 72,
			next: {
				value: 9,
				next: null,
			},
		},
	},
}


// ОДНОНАПРАВЛЕННЫЙ СВЯЗНЫЙ СПИСОК

// Передвижение по списку
function iterate(list) {
	while (list != null) {
		console.log(list.value);
		list = list.next;
	}
}

console.log(iterate(list));


// Нахождение ячеек
function findCell(list, target) {
	while (list != null) {
		if (list.value == target) return list;
		list = list.next;
	}

	return null;
}

console.log(findCell(list, 9));


// Нахождение ячейки предшествующей целевой с ограничителем
function findCellBefore(top, target) {
	// Поиск искомого значения
	while (top.next != null) {
		if (top.next.value == target) return top;
		top = top.next;
	}

	return null;
}

console.log(findCellBefore(list, 31));


// Добавление ячейки в начало списка
function addAtBeginning(top, newCell) {
	newCell.next = top.next;
	top.next = newCell;
}

console.log(addAtBeginning(list, {value: 5}));


// Добавление ячеек в конец списка
function addAtEnd(top, newCell) {
	// Находим последнюю ячейку
	while (top.next != null)
		top = top.next;

	// Добавляем новую ячейку в конец
	top.next = newCell;
	newCell.next = null;
}

console.log(addAtEnd(list, {value: 10}));


// Вставка ячеек
function insertCell(afterMe, newCell) {
	newCell.next = afterMe.next;
	afterMe.next= newCell;
}

console.log(insertCell(list.next, {value: 1}))


// Удаление ячеек
function deleteAfter(afterMe) {
	afterMe.next = afterMe.next.next;
}

console.log(deleteAfter(list))


// Копирование списка
function copyList(list) {
	// Ограничитель нового списка
	var newList = {
		value: null,
		next: null
	};

	// Отслеживаем последний добавленный элемент
	var lastAdded = newList;

	// Пропускаем ограничитель
	var oldCell = list.next;

	// Копируем элементы
	while (oldCell != null) {
		// Создаем новый элемент
		lastAdded.next = {
			value: null,
			next: null
		};

		// Переходим к новому элементу
		lastAdded = lastAdded.next;

		// Устанавливаем значение нового элемента
		lastAdded.value = oldCell.value;

		// Готовимся копировать следующую ячейку
		oldCell = oldCell.next;
	}

	// Заканчиваем ячейкой null
	lastAdded.next = null;

	// Возвращаем ограничитель нового списка
	return newList;
}

console.log(copyList(list));


// Сортировка вставкой
function insertionSort(input) {
	// Устанавливаем ограничитель списка вывода
	var sentinel = {
		value: null,
		next: null
	};

	// Пропускаем ограничитель списка ввода
	input = input.next;

	// Повторяем до тех пор, пока не вставим все элементы в новый список
	while (input != null) {
		// Берем следующую ячейку для добавления в список
		var nextCell = input;
		// Заменяем input на input.next для следующего прохождения цикла
		input = input.next;

		// Смотрим, куда добавить следующий элемент в список вывода.
		var afterMe = sentinel;
		while ( (afterMe.next != null) && (afterMe.next.value < nextCell.value) ){
			afterMe = afterMe.next;
		}

		// Вставляем элемент в список вывода
		nextCell.next = afterMe.next;
		afterMe.next = nextCell;
	}

	// Возвращаем отсортированный список
	return sentinel;
}

console.log(insertionSort(list));


// Сортировка методом выбора
function selectionSort(input) {
	// Устанавливаем ограничитель для списка вывода
	var sentinel = {
		value: null,
		next: null
	};

	// Повторяем до тех пор, пока список ввода не будет пуст
	while (input.next != null) {
		// Находим наибольший элемент в списке ввода
		// Ячейка afterMe предшествует ячейке с наибольшим элементом
		var bestAfterMe = input;
		var bestValue = bestAfterMe.next.value;

		// Начинаем искать следующий элемент
		var afterMe = input.next;
		while (afterMe.next != null) {
			if (afterMe.next.value > bestValue) {
				bestAfterMe = afterMe;
				bestValue = afterMe.next.value;
			}
			afterMe = afterMe.next;
		}

		// Удаляем лучшую ячейку из списка ввода
		var bestCell = bestAfterMe.next;
		bestAfterMe.next = bestCell.next;

		// Добавляем лучшую ячейку в начало списка вывода
		bestCell.next = sentinel.next;
		sentinel.next = bestCell;
	}

	// Возвращаем отсортированный список
	return sentinel;
}

console.log(selectionSort(list));
