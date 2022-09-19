javascript: (() => {
	if (typeof DEBUG !== 'boolean') DEBUG = false;
	
	var ptRatio = 1.3;
	var minPoints = 0;
	var maxPoints = 0;

	var mapOverlay;
	if ('TWMap' in window) mapOverlay = TWMap;

	var scriptConfig = {
		scriptData: {
			prefix: 'mapRatioOnly',
			name: 'Map ratio only',
			version: 'v1.0',
			author: 'Boudichon',
			authorUrl: '',
			helpLink: '',
		},
		translations: {
			en_DK: {
				'Map ratio only': 'Map ratio only',
				Help: 'Help',
				'There has been an error!': 'There has been an error!',
				'Redirecting...': 'Redirecting...',
				'Reset Filters': 'Reset Filters',
			},
		},
		allowedMarkets: [],
		allowedScreens: ['map'],
		allowedModes: [],
		isDebug: DEBUG,
		enableCountApi: true,
	};

	$.getScript('https://twscripts.dev/scripts/twSDK.js', async function () {
		twSDK.init(scriptConfig);
		const scriptInfo = twSDK.scriptInfo();
		const isValidScreen = twSDK.checkValidLocation('screen');

		(async function () {
			if (isValidScreen) {
				try {
					const content = `
						<div class="ra-mb15">
							<input id="boudi_points_ratio" type="number" value="30" style="width: 40px;" />%
							<a href="javascript:void(0);" id="raResetFiltersBtn" class="btn" style="margin-left: 2px">
								Update points ratio
							</a>
						</div>
					`;
					twSDK.renderFixedWidget(content, 'raMapBarbsOnly', 'ra-map-barbs-only');

					$(".ra-map-barbs-only-footer").remove();

					filterBarbs();

					handleResetFilters();
				} catch (error) {
					UI.ErrorMessage(twSDK.tt('There has been an error!'));
					console.error(`${scriptInfo} Error: `, error);
				}
			} else {
				UI.InfoMessage(twSDK.tt('Redirecting...'));
				twSDK.redirectTo('map');
			}
		})();

		function filterBarbs() {
			mapOverlay.mapHandler._spawnSector = mapOverlay.mapHandler.spawnSector;
			TWMap.mapHandler.spawnSector = spawnSectorReplacer;
			mapOverlay.villages = TWMap.villages;
			const currentPoints = Number(game_data.player.points.replace(/\./g, ''));
			minPoints = currentPoints / ptRatio;
			maxPoints = currentPoints * ptRatio;
			const villagesData = mapOverlay.villages;

			for (key in villagesData) {
				if (villagesData.hasOwnProperty(key)) {
					const currentVillage = villagesData[key];
					doMapFiltering(currentVillage);
				}
			}
		}

		function spawnSectorReplacer(data, sector) {
			mapOverlay.mapHandler._spawnSector(data, sector);
			var beginX = sector.x - data.x;
			var endX = beginX + mapOverlay.mapSubSectorSize;
			var beginY = sector.y - data.y;
			var endY = beginY + mapOverlay.mapSubSectorSize;
			for (var x in data.tiles) {
				var x = parseInt(x, 10);
				if (x < beginX || x >= endX) {
					continue;
				}
				for (var y in data.tiles[x]) {
					var y = parseInt(y, 10);

					if (y < beginY || y >= endY) {
						continue;
					}
					var xCoord = data.x + x;
					var yCoord = data.y + y;
					var v = mapOverlay.villages[xCoord * 1000 + yCoord];
					if (v) {
						doMapFiltering(v);
					}
				}
			}
		}

		function doMapFiltering(village) {
			if (village.owner != 0) {
				var owner = TWMap.players[village.owner];
				var points = Number(owner.points.replace(/\./g, ''));
				
				if (points < minPoints || points > maxPoints) {
					hideVillage(village);
				}
			}
		}
		
		function hideVillage(village) {
			jQuery('#map_container > div:first-child').css({
				opacity: '0.1',
			});
			jQuery(`[id="map_village_${village.id}"]`).css({
				opacity: '0.1',
			});
			jQuery(`[id="map_icons_${village.id}"]`).css({
				opacity: '0.1',
			});
			jQuery(`[id="map_cmdicons_${village.id}_0"]`).css({
				opacity: '0.1',
			});
			jQuery(`[id="map_cmdicons_${village.id}_1"]`).css({
				opacity: '0.1',
			});
			jQuery(`[id="map_cmdicons_${village.id}_2"]`).css({
				opacity: '0.1',
			});
			jQuery('#map_village_undefined').css({
				opacity: '0.1',
			});
			jQuery('img[src="/graphic/map/reserved_player.png"]').css({
				opacity: '0.1',
			});
			jQuery('img[src="/graphic/map/reserved_team.png"]').css({
				opacity: '0.1',
			});
			jQuery('img[src="/graphic/map/return.png"]').css({
				opacity: '0.1',
			});
			jQuery('img[src="/graphic/map/attack.png"]').css({
				opacity: '0.1',
			});
			/*jQuery('#map canvas').css({
				display: 'none',
			});*/
		}

		function handleResetFilters() {
			jQuery('#raResetFiltersBtn').click(function (e) {
				e.preventDefault();

				var mapOverlay = TWMap;
				mapOverlay.mapHandler.spawnSector = mapOverlay.mapHandler._spawnSector;
				mapOverlay.villages = TWMap.villages;
				mapOverlay.reload();
				ptRatio = ($('#boudi_points_ratio').val() / 100) + 1;
				filterBarbs();
			});
		}
	});
})();
