javascript: (() => {
	const tbody = $("form#withdraw_selected_units_village_info table.vis tbody")[0];
	
	let rowCount = tbody.children.length - 2;
	let columnCount = tbody.children[0].children.length - 2;
	
	let rowContent = [];
	
	$("#units_select_all").trigger("click");
	
	var scoutCol = 5;
	
	setTimeout(() => {
		for (let col = 0; col <= columnCount; col++) {
			if (col !== scoutCol) {
				for (let row = 1; row <= rowCount; row++) {
					$(tbody.children[row].children[col]).find("input").val(0);
				}
			}
		}
	}, 100);
})();
