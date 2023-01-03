javascript: (() => {
	if (window.hasCalculatedTotalTroops){
		return;
	}
	
	window.hasCalculatedTotalTroops = true;
	const tbody = $("form#withdraw_selected_units_village_info table.vis tbody")[0];
	
	let rowCount = tbody.children.length - 2;
	let columnCount = tbody.children[0].children.length - 2;
	
	let rowContent = [];
	
	for (let col = 0; col <= columnCount; col++) {
		if (col == 0) {
			rowContent.push("Total troops: ");
		} else {
			let total = 0;
			for (let row = 1; row <= rowCount; row++) {
				total += Number(tbody.children[row].children[col].innerHTML);
			}
			rowContent.push("" + total);
		}
	}
	
	$(tbody.children).eq(rowCount).after("<tr>" + rowContent.map((x, i) => (i == 0 ? "<td>" : "<td style=\"text-align:center\">") + x + "</td>").join('') + "</tr>");
})();
