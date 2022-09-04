var urlAM = '//' + location.host + location.pathname + "?village=" + game_data.village.id + "&screen=main&mode=accountmanager";
$.ajax({ url: urlAM, success: function(data) {
	var AMHtml = $.parseHTML(data);
	var nextConstruction = $(AMHtml).find(".vis :contains('Next construction order')").parent();
	var changeTemplate = $(AMHtml).find(".vis :contains('Change template')").parent();

	$("body").append('<div id="boudi_modal_next_construction" class="popup_box_container"><div class="popup_box show" id="popup_box_popup_boudi_AM" style="max-width: 90%;"><a class="popup_box_close tooltip-delayed" id="boudi_modal_next_construction_close" href="javascript:;" data-title="Close :: keyboard shortcut: <b>Esc</b>">&nbsp;</a><div class="popup_box_content" id="boudi_modalContent"></div></div><div class="fader"></div></div>');

	$("#boudi_modalContent").append(changeTemplate);
	$("#boudi_modalContent").append(nextConstruction);

	$("#boudi_modal_next_construction_close").click(function() {
		$("#boudi_modal_next_construction").remove();
	});
}});
