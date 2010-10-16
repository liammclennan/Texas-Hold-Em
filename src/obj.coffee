
# simple helper method to return the keys of an object
tx = {
	keys: (obj) ->
		property_names = []
		for property_name of obj
			property_names.push property_name if obj.hasOwnProperty property_name
		property_names
}