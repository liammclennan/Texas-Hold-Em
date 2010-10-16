
module('parsing');

test('parse one card', function() {
	var input = 'Kc';
	var parser = new InputParser(input);
	same(parser.parse(), [new Player(['Kc'])]);
});

test('parse a hand', function() {
	var input = 'Kc 2c As Kd';
	var parser = new InputParser(input);
	same([new Player(['Kc', '2c', 'As', 'Kd'])], parser.parse(input));
});

test('parse a round', function() {
	var input = 'Kc 9s Ks Kd 9d 3c 6d\r\n';
	input += '9c Ah Ks Kd 9d 3c 6d\r\n';
	input += 'Ac Qc Ks Kd 9d 3c\r\n';
	input += '9h 5s\r\n';
	input += '4d 2d Ks Kd 9d 3c 6d\r\n';
	input += '7s Ts Ks Kd 9d';
	var parser = new InputParser(input);
	
	var hands = parser.parse();
	
	same(new Player(['Kc','9s','Ks','Kd','9d','3c','6d']).card_literals, hands[0].card_literals);
	same(new Player(['9h','5s']), hands[3]);
	same(new Player(['7s','Ts','Ks','Kd','9d']), hands[5]);
	
});
