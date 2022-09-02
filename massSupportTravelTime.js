javascript: (() => {
	$("#village_troup_list tbody tr td").each(function() {
		var duration = $(this).attr('title');
		
		if(!duration) {
			duration = $(this).data('title');
		}
		
		if(duration) {
			$(this).append(duration.substr(9));
		}
	});
})();
