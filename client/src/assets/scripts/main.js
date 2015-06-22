window.log = require('./log')
window.checkBoard = function() {
	var element = $('#board-ready')
	$.getJSON('/board', function (data) {
		element.text('robot online').removeClass('label-warning').addClass('label-success')
	}).fail(function () {
		element.text('board not found, waiting').removeClass('label-success').addClass('label-warning')
		setTimeout(checkBoard, 5000)
	})
}

$(document).ready(function() {
	$('.btn[data-url!=""]').on('click', function (e) {
		var target = $(e.target),
		    url = target.data('url')
		$.getJSON(url, function(data) {
			if (!data.success) {
				log(data)
			}
			console.log(Object.keys(data))
			if (Object.keys(data).length > 1) {
				log(data)
			}
		}).fail(function() {
			log('failed to send: ' + url)
		})

	})

	checkBoard()
})