
# Represents a playing card
class Card

	@suits: ['h','s','d','c']

	# sorted in ascending order
	@indexes: ['1','2','3','4','5','6','7','8','9','T','J','Q','K','A']

	constructor: (card_literal) ->
		@index = card_literal[0]
		@suit = card_literal[1]
		
	to_string: () ->
		"card: #{@index} of #{@suit}\n"
		
	literal: () ->
		"#{@index}#{@suit}"
		
	# does this card beat other card?
	greater_than: (other_card) ->
		my_power = Card.indexes.indexOf @index
		other_power = Card.indexes.indexOf other_card.index
		my_power > other_power


