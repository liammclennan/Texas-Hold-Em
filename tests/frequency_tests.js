
module('frequencies');

test('simple frequency', function() {
	var hand = new Player(['Kc', '2c', 'As', 'Kd']);
	same(hand.frequency_distribution(), {K: 2, '2': 1, A: 1});
});

test('larger frequency', function() {
	var hand = new Player(['9c', 'Ah', 'Ks', 'Kd', '9d', '3c', '6d']);
	same(hand.frequency_distribution(), {K: 2, '9': 2, A: 1, '3': 1, '6': 1});
});
