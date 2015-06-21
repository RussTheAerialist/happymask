module.exports = function (str) {
	console.log(str)
	$('#log').prepend(JSON.stringify(str) + '<br />')
}