
class PlayerCollection
	constructor: (@hands) -> 	# [player_hand]
	
	winner: () ->
		_(@hands).max((player_hand) -> hand_order.indexOf(player_hand.best_hand()))
		
	index: (player_hand) ->
		hand_order.indexOf(player_hand.best_hand())