
module('card');

test('construction', function() {
	var two_clubs = new Card('2c');
	equals(two_clubs.index, '2');
	equals(two_clubs.suit, 'c');
});

test('to string', function() {
	var two_clubs = new Card('2c');
	equals(two_clubs.to_string(), "card: 2 of c\n");
});

test('A greater than 2', function() {
	var first = new Card('2c');
	var second = new Card('As');
	ok(second.greater_than(first));
});

test('7 greater than 6', function() {
	var first = new Card('6h');
	var second = new Card('7c');
	ok(second.greater_than(first));
});

test('T greater than 8', function() {
	var first = new Card('8c');
	var second = new Card('Td');
	ok(second.greater_than(first));
});	

test('J greater than Q', function() {
	var first = new Card('Qh');
	var second = new Card('Js');
	ok(!second.greater_than(first));
});
