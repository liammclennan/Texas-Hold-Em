# load jslib modules
LoadModule('jsstd')
LoadModule('jsio')

# load all of the scripts
Exec('./output/obj.js') 
Exec('./lib/underscore-min.js')
Exec('./output/file_reader.js')
Exec('./output/input_parser.js')
Exec('./output/card.js')
Exec('./output/player.js')
Exec('./output/player_collection.js')
Exec('./output/round.js')

fr = new FileReader "input.txt"
round = new Round(fr.read())
Print round.result()
