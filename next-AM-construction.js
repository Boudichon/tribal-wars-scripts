var urlAM = '//' + location.host + location.pathname + "?village=" + game_data.village.id + "&screen=main&mode=accountmanager";
	$.ajax({ url: urlAM, success: function(data) {
		var AMHtml = $.parseHTML(data);
		var nextConstruction = $(AMHtml).find(".vis :contains('Next construction order')").parent();
		$("body").append('<div id="boudi_modal_next_construction" class="popup_box_container"><div class="popup_box show" id="popup_box_popup_boudi_AM" style="max-width: 90%;"><a class="popup_box_close tooltip-delayed" id="boudi_modal_next_construction_close" href="javascript:;" data-title="Close :: keyboard shortcut: <b>Esc</b>">&nbsp;</a><div class="popup_box_content" id="boudi_modalContent"></div></div><div class="fader"></div></div>');
		$("#boudi_modalContent").append('<div class="vis"><h4>Current template</h4><p class="vis_item" id="boudi_current_template"></p></div>');
		$("#boudi_current_template").append($(AMHtml).find("[name='template'] option:selected").text());
		$("#boudi_modalContent").append(nextConstruction);
		
		$("#boudi_modal_next_construction_close").click(function() {
			$("#boudi_modal_next_construction").remove();
		});
	}});
