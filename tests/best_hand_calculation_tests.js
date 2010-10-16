
module('best hand calculation');

test('hand order', function() {
	equals(hand_order.length, 23);
	for (var i = 0; i < hand_order.length; i++) {
		var name = hand_order[i].name;
	}
	var hand = hand_order[22];
});

test('pair', function() {
	var input = 'Kc 2c As Kd';
	equals(hands.pair.name, new Player(['Kc', '2c', 'As', 'Kd']).best_hand().name);		
});

test('Two Pair', function() {
	var hand = new Player(['9c', 'Ah', 'Ks', 'Kd', '9d', '3c', '6d']);
	equals(hands.two_pair.name, hand.best_hand().name);		
});

test('Full House', function() {
	var hand = new Player(['9c', '9h', 'Ks', 'Kd', '9d', '3c', '6d']);
	equals(hands.full_house.name, hand.best_hand().name);		
});

test('Three of a kind', function() {
	var hand = new Player(['9c', '9h', 'Js', 'Kd', '9d', '3c', '6d']);
	equals(hands.three_of_a_kind.name, hand.best_hand().name);		
});

test('Straight', function() {
	var hand = new Player(['9c', 'Th', 'Js', 'Kd', 'Qd', '3c', '6d']);
	equals(hands.straight.name, hand.best_hand().name);		
});

test('Flush', function() {
	var hand = new Player(['Tc', 'Th', 'Ac', 'Kc', 'Qc', '3c', '6d']);
	equals(hands.flush.name, hand.best_hand().name);		
});

test('Four of a kind', function() {
	var hand = new Player(['Tc', 'Th', 'Ac', 'Tc', 'Qc', 'Tc', '6d']);
	equals(hands.four_of_a_kind.name, hand.best_hand().name);		
});

test('Straight Flush', function() {
	var hand = new Player(['Tc', 'Jc', '1c', 'Kc', 'Qc', '9c', '6d']);
	equals(hands.straight_flush.name, hand.best_hand().name);		
});

test('Royal Flush', function() {
	var hand = new Player(['Tc', 'Jc', 'Ac', 'Kc', 'Qc', '3c', '6d']);
	equals(hands.royal_flush.name, hand.best_hand().name);		
});

test('high Q', function() {
	var hand = new Player(['3s', '4s', 'Tc', 'Jc', 'Qc', '2d', '6h']);
	equals(hands.Q.name, hand.best_hand().name);
});

test('high 9', function() {
	var hand = new Player(['3s', '4d', '1c', '5c', '7c', '9d']);
	equals(hands['9'].name, hand.best_hand().name);
});

test('compare high cards', function() {
	var hand = new Player(['3s', '4d', '1c', '5c', '7c', '9d']);
	var hand2 = new Player(['3s', '4d', '1c', '5c', 'Tc', '9d']);
	equals(hand2.best_hand().name, hands.T.name);
	
	var hand_collection = new PlayerCollection([hand,hand2]);
	same(hand_collection.winner().card_literals, hand2.card_literals);
	
	var hand3 = new Player(['3s', '4d', '1c', 'Kc', '7c', '9d']);
	var coll_2 = new PlayerCollection([hand3, hand2, hand]);
	same(hand3.card_literals, coll_2.winner().card_literals);
});

test('high card v pair', function() {
	var hand = new Player(['3s', '4d', '1c', 'Ac', '7c', '9d']);
	var hand2 = new Player(['3s', '4d', '1c', '3c', 'Tc', '9d']);
	var hand_collection = new PlayerCollection([hand,hand2]);
	same(hand_collection.winner().card_literals, hand2.card_literals);
});

test('pair v two pair', function() {
	var hand = new Player(['4s', '4d', '1c', 'Ac', '7c', 'Ad']);
	var hand2 = new Player(['3s', '4d', '1c', '3c', 'Tc', '9d']);
	var hand_collection = new PlayerCollection([hand,hand2]);
	same(hand_collection.winner().card_literals, hand.card_literals);
});

test('two pair v 3 of a kind', function() {
	var hand = new Player(['4s', '4d', '1c', 'Ac', '7c', 'Ad']);
	var hand2 = new Player(['3s', '4d', '1c', '3c', '3c', '9d']);
	var hand_collection = new PlayerCollection([hand,hand2]);
	same(hand_collection.winner().card_literals, hand2.card_literals);
});


test('pair v straight', function() {
	var pair = new Player(['4s', '4d', '1c', 'Ac', '7c', 'Ad']);
	var straight = new Player(['3s', '4d', '5c', '6s', '7h', '9d']);
	var hand_collection = new PlayerCollection([pair,straight]);
	same(hand_collection.winner().to_string(), straight.to_string());
});

test('flush v straight', function() {
	var flush = new Player(['4s', '4s', '1s', 'As', '7s', 'Ad']);
	var straight = new Player(['3s', '4d', '5c', '6s', '7h', '9d']);
	var hand_collection = new PlayerCollection([flush,straight]);
	same(hand_collection.winner().to_string(), flush.to_string());
});

test('flush v full house', function() {
	var flush = new Player(['4s', '4s', '1s', 'As', '7s', 'Ad']);
	var full_house = new Player(['3s', '3d', '5c', '6s', '6h', '6d']);
	var hand_collection = new PlayerCollection([flush,full_house]);
	same(hand_collection.winner().to_string(), full_house.to_string());
});

test('four of a kind v full house', function() {
	var four_of_a_kind_player = new Player(['4s', '4s', '4d', 'As', '4s', 'Ad']);
	var full_house = new Player(['3s', '3d', '5c', '6s', '6h', '6d']);
	var hand_collection = new PlayerCollection([four_of_a_kind_player,full_house]);
	same(hand_collection.winner().to_string(), four_of_a_kind_player.to_string());
});

test('four of a kind v straight flush', function() {
	var four_of_a_kind_player = new Player(['4s', '4s', '4d', 'As', '4s', 'Ad']);
	var straight_flush_player = new Player(['3s', '1s', '2s', '6s', '5s', '4s']);
	var hand_collection = new PlayerCollection([four_of_a_kind_player,straight_flush_player]);
	same(hand_collection.winner().to_string(), straight_flush_player.to_string());
});

test('royal flush v straight flush', function() {
	var royal_flush_player = new Player(['As', '9s', 'Ks', 'Js', 'Ts', 'Qs']);
	var straight_flush_player = new Player(['3s', '1s', '2s', '6s', '5s', '4s']);
	var hand_collection = new PlayerCollection([royal_flush_player,straight_flush_player]);
	same(hand_collection.winner().best_hand().name, royal_flush_player.best_hand().name);
});




