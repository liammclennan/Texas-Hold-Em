
module('hand');

test('make a hand', function() {
	var hand = new Player(['Kc', '2c', 'As', 'Kd']);
	same(['Kc', '2c', 'As', 'Kd'], hand.card_literals, 'make equals');
});

test('parse cards', function() {
	var hand = new Player(['Kc', '2c', 'As', 'Kd']);
	var hand2 = new Player(['9c', 'Ah', 'Ks', 'Kd', '9d', '3c', '6d']);
});

test('hand ordering', function() {
	var hand = new Player(['Kc', '2c', 'As', 'Kd']);
	same(_(hand.cards).map(function(card) { return card.literal();}), ['2c','Kc','Kd','As'], 'new hands are not sorted correctly');
	
	var hand2 = new Player(['9c', 'Ah', 'Ks', 'Kd', '9d', '3c', '6d']);
	same(_(hand2.cards).map(function(card) { return card.literal();}), ['3c','6d','9c','9d','Ks','Kd','Ah'], 'new hands are not sorted correctly');
});

test('has an index', function() {
	var hand = new Player(['Jc', '2c', 'As', 'Qd']);
	ok(hand.has_an_index('J'));
	ok(hand.has_an_index('2'));
	ok(hand.has_an_index('A'));
	ok(hand.has_an_index('Q'));
	
	ok(!hand.has_an_index('K'));
	ok(!hand.has_an_index('1'));
	ok(!hand.has_an_index('0'));
	ok(!hand.has_an_index('3'));
});

test('hands', function() {
	var count = 0;
	for (var key in hands) {
		count++;
	}
	equals(count, 23);
});