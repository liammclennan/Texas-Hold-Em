
# Represents the cards that a player is dealt in a round
class Player
	constructor: (@card_literals) ->
		@cards = _(_(@card_literals).map((card_literal) -> new Card(card_literal))).sortBy((card) -> Card.indexes.indexOf(card.index))
		@frequencies = {}
		this.increment_frequency card for card in @cards
	
	frequency_distribution: () ->
		@frequencies
	
	increment_frequency: (card) ->
		@frequencies[card.index] = 0 if not @frequencies[card.index]?
		@frequencies[card.index] = @frequencies[card.index] + 1
	
	best_hand: () ->
		for i in [hand_order.length-1..0] by -1
			hand = hand_order[i]
			if hand.is_match this
				return hand
		
	count_of_index: (index) ->
		@frequencies[index]
		
	count_of_suit: (suit) ->
		cards_in_suit = _(@cards).select((card) -> card.suit == suit)
		cards_in_suit.length

	distinct_card_indexes: () ->
		tx.keys(@frequencies)
	
	has_an_index: (index) ->
		this.count_of_index(index) > 0

	has_a_card: (card) ->	# { index: '1', suit: 's' }
		if card.index? and card.suit?
			if _(@cards).any((c) -> c.index == card.index and c.suit == card.suit)
				return true

	has_at_least: (options) -> # { count: 2, index: '4' } || { count: 2, suit: 'd' }
		if options.count? and options.index? and this.count_of_index(options.index) >= options.count
			return true
		
		if options.count? and options.suit?
			if this.count_of_suit(options.suit) >= options.count
				return true
		
	to_string: () ->
		result = ""
		for i in [@cards.length-1..0] by -1
			result += @cards[i].literal() + ' '
		if hand_order.indexOf(@best_hand()) > hand_order.indexOf(hands.pair)
		    result += @best_hand().name
		result

hands = 
	pair: 
		name: 'Pair',
		is_match: (player_hand) ->
			_(player_hand.distinct_card_indexes()).any (k) -> 
				player_hand.has_at_least({count:2, index: k})
			
	two_pair:
		name: 'Two Pair',
		is_match: (player_hand) ->
			count = _(player_hand.distinct_card_indexes()).select((k) -> 
				player_hand.has_at_least({count:2, index: k})
			).length
			count > 1
			
	three_of_a_kind:
		name: 'Three Of A Kind',
		is_match: (player_hand) ->
			_(player_hand.distinct_card_indexes()).any (k) -> 
				player_hand.has_at_least({count:3, index: k})
			
	straight:
		name: 'Straight',
		is_match: (player_hand) ->
			for position in [0..Card.indexes.length-1]
				index = Card.indexes[position]
				continue if position + 4 > Card.indexes.length-1
				other_required_indexes = Card.indexes[position+1..position+4]
				if player_hand.has_an_index(index) and _(other_required_indexes).all((card_index) -> 
					player_hand.has_an_index(card_index)
				)
					return true
			false
	
	flush:
		name: 'Flush',
		is_match: (player_hand) ->		
			_(Card.suits).any (suit) -> 
				player_hand.has_at_least({count:5, suit: suit})
			
	full_house:
		name: 'Full House',
		is_match: (player_hand) ->
			[three_of_a_kind_found, pair_found] = [false,false]
			for card_index, frequency of player_hand.frequency_distribution()
				if frequency > 2
					three_of_a_kind_found = true
					continue				
				pair_found = true if frequency > 1
			return three_of_a_kind_found and pair_found
			
	four_of_a_kind:
		name: 'Four Of A Kind',
		is_match: (player_hand) ->
			_(player_hand.distinct_card_indexes()).any (k) -> 
				player_hand.has_at_least({count:4, index: k})
	
	# five sequential cards in the same suit
	straight_flush:
		name: 'Straight Flush',
		is_match: (player_hand) ->
			for suit in Card.suits
				for position in [0..Card.indexes.length-1]
					index = Card.indexes[position]
					continue if position + 4 > Card.indexes.length-1
					other_required_indexes = Card.indexes[position+1..position+4]
					if player_hand.has_a_card({index:index, suit:suit}) and _(other_required_indexes).all((card_index) -> 
						player_hand.has_a_card({index: card_index, suit: suit})
					)
						return true
			false
	
	royal_flush:
		name: 'Royal Flush',
		is_match: (player_hand) ->
			for suit in Card.suits
				if player_hand.has_a_card({index: 'T', suit: suit})  and player_hand.has_a_card({index: 'J', suit: suit}) and player_hand.has_a_card({index: 'Q', suit: suit}) and player_hand.has_a_card({index: 'K', suit: suit}) and player_hand.has_a_card({index: 'A', suit: suit})
					return true
			false

# add a hand for each card index 1,2,...K,A
for index in Card.indexes
	hands[index] = { 
		name: index, 
		is_match: (player_hand) ->
			player_hand.has_an_index index
	}
	
hand_order = [hands["1"],hands["2"],hands["3"],hands["4"],hands["5"],hands["6"],hands["7"],hands["8"],hands["9"],hands.T, hands.J, hands.Q, hands.K, hands.A,hands.pair, hands.two_pair, hands.three_of_a_kind, hands.straight, hands.flush, hands.full_house, hands.four_of_a_kind, hands.straight_flush, hands.royal_flush]
