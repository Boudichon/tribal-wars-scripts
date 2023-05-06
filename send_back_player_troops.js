javascript: (() => {
    const tbody = $("table#units_home tbody")[0];

    let rowCount = tbody.children.length - 2;

    var players = [];
    var selectedPlayers = [];
    const regex = /\(([^()]+)\)[^(]*\(([^()]+)\)/;

    for (let row = 1; row <= rowCount; row++) {
        var player = $(tbody.children[row].children[1]).find("a")[0]?.innerText;
        if (player) {
            const matches = player.match(regex);
            const result = matches ? matches[1] : null;
            if (result && !players.includes(result)) {
                players.push(result);
            }
        }
    }

    // Show modal
    $("body").append('<div id="boudi_modal" class="popup_box_container"><div class="popup_box show" id="popup_box_popup_boudi_AM" style="max-width: 90%;"><a class="popup_box_close tooltip-delayed" id="boudi_modal_close" href="javascript:;" data-title="Close :: keyboard shortcut: <b>Esc</b>">&nbsp;</a><div class="popup_box_content" id="boudi_modalContent"><p>Check the players to send back troops:</p><table class="vis" id="boudi_table"><tbody></tbody></table></br><button id="boudi_continue" class="btn">Continue</button></div></div><div class="fader"></div></div>');

    players.forEach((player) => {
        var playerRow = `<tr><td><label for="boudi_${player}">${player}</label></td><td><input type="checkbox" id="boudi_${player}" class="boudi_player_input" name="${player}" value="0"></td></tr>`;
        $("#boudi_table").append(playerRow);
    });

    $("#boudi_modal_close").click(function () {
        $("#boudi_modal").remove();
    });

    $('#boudi_continue').click(function () {
        var selectedPlayers = $('.boudi_player_input:checked').map(function () {
            return this.name;
        }).get();

        for (let row = 1; row <= rowCount; row++) {
            var player = $(tbody.children[row].children[1]).find("a")[0]?.innerText;
            if (player) {
                const matches = player.match(regex);
                const result = matches ? matches[1] : null;
                if (result && selectedPlayers.includes(result)) {
                    $(tbody.children[row].children[0]).find("input").prop("checked", true);
                    continue;
                }
            }
            $(tbody.children[row].children[0]).find("input").prop("checked", false);
        }
        
        $('#boudi_modal_close').trigger('click');
    });
})();
