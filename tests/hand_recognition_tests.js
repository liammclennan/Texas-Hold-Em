
module('hand recognition');

test('not a pair', function() {
	var hand = new Player(['Qc', '2c', 'As', 'Kd']);
	ok(!hands.pair.is_match(hand));
	
	var hand2 = new Player(['3s', '4d', '1c', '5c', 'Tc', '9d']);
	ok(!hands.pair.is_match(hand2));
});

test('pair of Queens', function() {
	var hand = new Player(['Qc', '2c', 'Qs', 'Kd']);
	ok(hands.pair.is_match(hand));
});

test('two pairs', function() {
	var hand = new Player(['9c', '9h', 'Ks', 'Kd', '9d', '3c', '6d']);
	ok(hands.pair.is_match(hand));
	ok(hands.two_pair.is_match(hand));
});

test('not two pairs', function() {
	var hand = new Player(['9c', 'Th', 'Ks', 'Qd', '9d', '3c', '6d']);
	ok(hands.pair.is_match(hand));
	ok(!hands.two_pair.is_match(hand));
});

test('three of a kind', function() {
	var hand = new Player(['9c', '9h', 'Ks', 'Qd', '9d', '3c', '6d']);
	ok(hands.three_of_a_kind.is_match(hand));
});

test('not three of a kind', function() {
	var hand = new Player(['9c', 'Th', 'Ks', 'Qd', '9d', '3c', '6d']);
	ok(!hands.three_of_a_kind.is_match(hand));
});

test('straight', function() {
	var hand = new Player(['9c', '8h', '7s', 'Td', 'Jd', '3c', '2d']);
	ok(hands.straight.is_match(hand));
	
	var hand2 = new Player(['9c', '1h', '6s', '5d', '4d', '3c', '2d']);
	ok(hands.straight.is_match(hand2));
	
	var hand3 = new Player(['9c', '1h', '6s', 'Qd', '4d', '3c', '2d']);
	ok(!hands.straight.is_match(hand3));
	
	var hand4 = new Player(['9c', '5h', '6s', 'Qd', '4d', '3c', '2d']);
	ok(hands.straight.is_match(hand4));
	
	var hand5 = new Player(['Tc', 'Ah', 'Ks', 'Qd', '4d', '3c', 'Jd']);
	ok(hands.straight.is_match(hand5));
	
	var hand6 = new Player(['9c', 'Ah', 'Ks', 'Qd', '4d', '3c', 'Jd']);
	ok(!hands.straight.is_match(hand6));
	
	var hand7 = new Player(['Tc', '3h', 'Ks', 'Qd', '4d', '3c', 'Jd']);
	ok(!hands.straight.is_match(hand7));
});

test('flush', function() {
	var hand = new Player(['9c', '8h', '7s', 'Td', 'Jd', '3c', '2d']);
	ok(!hands.flush.is_match(hand));
	
	var hand = new Player(['9d', '8d', '7s', 'Td', 'Jd', '3c', '2d']);
	ok(hands.flush.is_match(hand));
});

test('full house', function() {
	var hand = new Player(['Tc', '8h', '9s', 'Td', '8d', '8c', '2d']);
	ok(hands.full_house.is_match(hand));
	
	var hand = new Player(['Tc', '8h', '9s', 'Td', '8d', '1c', '2d']);
	ok(!hands.full_house.is_match(hand));
	
	var hand = new Player(['1c', '1h', '9s', 'Jd', '8d', 'Jc', 'Jd']);
	ok(hands.full_house.is_match(hand));
	
	var hand = new Player(['1c', '1h', '9s', 'Jd', '1d', 'Jc', '7d']);
	ok(hands.full_house.is_match(hand));
});

test('four of a kind', function() {
	var hand = new Player(['8c', '8h', '9s', 'Td', '8d', '8c', '2d']);
	ok(hands.four_of_a_kind.is_match(hand));
	
	var hand = new Player(['8c', '4h', '9s', 'Td', '8d', '8c', '2d']);
	ok(!hands.four_of_a_kind.is_match(hand));
	
	var hand = new Player(['8c', 'Kh', '9s', 'Kd', '8d', 'Kc', 'Kd']);
	ok(hands.four_of_a_kind.is_match(hand));	
});

test('straight flush', function() {
	var hand = new Player(['9c', '8c', 'Tc', 'Jc', 'Qc', '3c', '6d']);
	ok(hands.straight_flush.is_match(hand));
	
	var hand = new Player(['9c', '8h', 'Tc', 'Jc', 'Qc', '3c', '6d']);
	ok(!hands.straight_flush.is_match(hand));
	
	var hand = new Player(['1c', '8h', 'Tc', 'Jc', 'Qc', 'Kc', '9c']);
	ok(hands.straight_flush.is_match(hand));
});

test('royal flush', function() {
	var hand = new Player(['Kc', 'Ac', 'Tc', 'Jc', 'Qc', '3d', '6h']);
	ok(hands.royal_flush.is_match(hand));
	
	var hand = new Player(['Kc', 'Ac', 'Ts', 'Jc', 'Qc', '3d', '6h']);
	ok(!hands.royal_flush.is_match(hand));
	
	var hand = new Player(['Kc', 'Ac', '9c', 'Jc', 'Qc', '3d', '6h']);
	ok(!hands.royal_flush.is_match(hand));
});

test('high cards', function() {
	var hand = new Player(['Kc', 'Ac', 'Tc', 'Jc', 'Qc', '3d', '6h']);
	ok(hands["3"].is_match(hand));
	ok(!hands["2"].is_match(hand));
	ok(!hands["9"].is_match(hand));
	ok(hands["T"].is_match(hand));
	ok(hands.J.is_match(hand));
});

