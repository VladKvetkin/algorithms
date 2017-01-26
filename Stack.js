"use strict"

// Стек на основе связного списка

var list = {
	value: null,
	next: {
		value: 1,
		next: {
			value: 2,
			next: {
				value: 3,
				next: {
					value: 4,
					next: null
				}
			}
		}
	}
}


// Вставка элемента в стек на основе связного списка
function listPush(sentinel, newValue) {
	// Создаем ячейку для записи нового значения
	var newCell = {
		value: newValue,
		next: null
	};

	// Добавляем новую ячейку в связный список
	newCell.next = sentinel.next;
	sentinel.next = newCell;
}

console.log(listPush(list, 0));


// Удаление элемента из стека на основе связного списка
function listPop(sentinel) {
	// Проверяем есть ли элемент для удаления
	if (sentinel.next == null)
		throw new Error("Стек пуст");

	// Получаем значение верхней ячейки
	var result = sentinel.next.value;

	// Удаляем верхнюю ячейку из связного списка
	sentinel.next = sentinel.next.next;

	return result;
}

console.log(listPop(list));


// Реверсирование массива
function reverseArray(values) {
	var stack = [];

	for (var i = 0; i < values.length; ++i)
		stack.push(values[i])

	for (var i = 0; i < values.length; ++i)
		values[i] = stack.pop();

	return values;
}

console.log(reverseArray([1, 2, 3, 4, 5]));
