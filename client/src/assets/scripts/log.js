module.exports = function (data) {
	var str = ""
	if (data.hasOwnProperty('x')) {
		str = 'position: (' + data.x + ',' + data.y + ',' + data.z + ')'
	} else if (data.error) {
		str = 'Error: ' + JSON.stringify(data.error)
	} else {
		str = JSON.stringify(data)
	}

	if (data.hasOwnProperty('message')) {
		str = data.message + '; ' + str
	}
	$('#log').prepend(str + '<br />')
}