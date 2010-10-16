
# Returns an array of PlayerHand
class InputParser
	constructor: (@content) -> 
	
	parse: -> 
		_.map(@content.split('\r\n'), (line) => 
			this.convert_line_to_player_hand(line)		
		)
		
	convert_line_to_player_hand: (line) ->
		new Player _.select(line.split(' '), (element) -> element.length == 2)
		