$(document).ready(function() {
	$('#prev').on('click', function() {
		var page = $(this).data('page');
		var query = $(this).data('query');

		if (+page > 1) {
			page -= 1;
			var link = "?page=" + page + "&query=" + query;
			window.location.replace(link);
		}
	});
	
	$('#next').on('click', function() {
		var page = $(this).data('page');
		var query = $(this).data('query');
		var total = Math.floor($(this).data('total'));

		if (+page < +total) {
			page += 1;
			var link = "?page=" + page + "&query=" + query;
			window.location.replace(link);
		}
	});
});