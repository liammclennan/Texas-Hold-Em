
# Reads the contents of a text file
class FileReader
	constructor: (@filename) ->
	
	read: ->		
		f = new File(@filename)
		f.Open('r')
		f.Read 1000000
