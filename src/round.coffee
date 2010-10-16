
class Round
    constructor: (@input) ->

    result: () ->
        parser = new InputParser @input
        players = parser.parse()
        game = new PlayerCollection(players)
        output = ""
        for player in players
            output += player.to_string()
            if player.best_hand().name == game.winner().best_hand().name
                output += " (winner)"
            output += "\n"
        output