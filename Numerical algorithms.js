"use strict"

// Рандомизация массива
function randomizeArray(array) {
	var maxI = array.length;
	for (var i = 0; i <= maxI - 1; ++i) {
		// Выбираем элемент для i-ой позиции в массиве
		var j = Math.floor(Math.random()  * (maxI - i)) + i; // Псевдослучайное число между i и max_i - 1 включительно
		// Меняем местами значения array[i] и array[j]
		var tmp = array[i];
		array[i] = array[j];
		array[j] = tmp;
	}

	return array;
}

for (var i = 0; i < 10; ++i)
	console.log(randomizeArray([1,2,3,4,5]));


// Наибольший общий делитель
function GCD(a, b) {
	while (b != 0) {
		var remainder = a % b; // остаток
		// НОД(А, В) = НОД(В, остаток)
		a = b;
		b = remainder;
	}

	return a;
}

console.log(GCD(4851, 3003));


// Нахождение простых множителей
function findFactors(number) {
	var factors = [];

	// Проверяем делимость на 2
	while (number % 2 == 0) {
		factors.push(2);
		number = number / 2;
	}

	// Ищем нечетные множители
	var i = 3;
	var maxFactor = Math.sqrt(number);

	while (i <= maxFactor) {
		// Проверяем делимость на i
		while (number % i == 0) {
			// i является множителем. Добавляем его в список
			factors.push(i)
			// Делим число на i
			number = number / i
			// Устанавливаем новую верхнюю границу
			maxFactor = Math.sqrt(number);
		}
		// Проверяем следующий возможный нечетный множитель
		i += 2;
	}

	// Если от числа что-то осталось, остаток тоже множитель
	if (number > 1)
		factors.push(number);

	return factors;
}

console.log(findFactors(127))


// Находим простые числа между 2 и maxNumber (включительно) (Решето Эратосфена)
function findPrimes(maxNumber) {
	// Определяем массив для чисел
	var isComposite = new Array(maxNumber + 1);

	// Исключаем числа, кратные 2
	for (var i = 4; i <= maxNumber; i += 2) {
		isComposite[i] = true;
	}

	// Исключаем числа, кратные найденным простым числам
	var nextPrime = 3;
	var stopAt = Math.sqrt(maxNumber);

	while (nextPrime <= stopAt) {
		// Исключаем числа, кратные данному простому числу
		for (var i = nextPrime * 2; i <= maxNumber; i += nextPrime) {
			isComposite[i] = true;
		}

		// Переходим к следующему простому числу, пропуская четные числа
		nextPrime += 2;
		while ( (nextPrime <= maxNumber) && (isComposite[nextPrime]) ) {
			nextPrime += 2;
		}
	}

	// Заносим простые числа в массив
	var primes = []
	for (var i = 2; i <= maxNumber; ++i)
		if (!isComposite[i])
			primes.push(i);

	// Возвращаем простые числа
	return primes;
}

console.log(findPrimes(127));


// Проверка на простоту (с помощью теоремы Ферма)
function isPrime(p, maxTests) {
	// Проводим проверку maxTests раз
	for (var test = 1; test <= maxTests; ++test) {
		// Выбираем случайное число между 1 и p
		var n = Math.floor(Math.random() * (p - 1)) + 1;
		if ((Math.pow(n, p - 1) % p) != 1)
			return false;
	}

	// Возможно число простое
	// С вероятностью 1/2^maxTests число не является простым
	return true;
}

console.log(isPrime(13, 10));


// Численное интегрирование
// Формула прямоугольников
function useRectangleRule(func, xMin, xMax, numIntervals) {
	// Вычисляем ширину прямоугольника
	var dx = (xMax - xMin) / numIntervals;

	// Добавляем области прямоугольников
	var totalArea = 0;
	var x = xMin;
	for (var i = 1; i <= numIntervals; ++i) {
		totalArea += (dx * func(x));
		x += dx;
	}

	return totalArea;
}

function f(x) {
	return 1 + x + Math.sin(2 * x);
}

console.log(useRectangleRule(f, 0, 5, 10));


// Формула трапеций
function useTrapezoidRule(func, xMin, xMax, numIntervals) {
	// Вычисляем ширину трапеции
	var dx = (xMax - xMin) / numIntervals;

	// Добавляем области трапеций
	var totalArea = 0;
	var x = xMin;
	for (var i = 1; i <= numIntervals; ++i) {
		totalArea += (dx * ( func(x) + func(x + dx) ) / 2);
		x += dx;
	}

	return totalArea;
}

console.log(useTrapezoidRule(f, 0, 5, 10));
