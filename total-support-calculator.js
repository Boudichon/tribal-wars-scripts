javascript: (() => {
	const tbodys = $("tbody:has(>tr>th:has(>img[src*='spear.png'],>a>img[src*='spear.png']))");
	
	tbodys.each(function(index, tbody) {
		if($(tbody).data("hasTotal")) return;
		
		$(tbody).data("hasTotal", true);
		
		const isLastRowValid = !isNaN(tbody.children[tbody.children.length-1].children[1].innerHTML.trim());
		const isLastColValid = !isNaN(tbody.children[1].children[tbody.children[1].children.length-1].innerHTML.trim());
		const style = $(tbody.children[1].children[1]).attr("style");
		
		let rowCount = tbody.children.length - (isLastRowValid ? 1 : 2);
		let columnCount = tbody.children[0].children.length - (isLastColValid ? 1 : 2);
		
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
		
		$(tbody.children).eq(rowCount).after("<tr>" + rowContent.map((x, i) => (i == 0 ? "<td>" : "<td style=\"" + style + "\"" + (x == "0" ? "class=\"hidden\"" : "") + ">") + x + "</td>").join('') + "</tr>");
	});
})();
