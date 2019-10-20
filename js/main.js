$(document).ready(function () {
	// Chose color
	$('#colorSelector .colorItem').on('click', function () {
		let img = $('#imgHolder img');
		let path = $(this).attr('data-path');
		$(img).fadeOut(200, function () {
			$(img).attr('src', path);
			$(img).fadeIn(200);
		});

	});

	let modelPrice = 0;
	let modelSpecs = '';

	//Making full string with car price
	function calculatePrice() {
		modelPrice = +$('input[name=engine]:checked', '#autoForm').val();
		modelPrice += +$('input[name=transmission]:checked', '#autoForm').val();
		modelPrice += +$('input[name=package]:checked', '#autoForm').val();

		$('#modelPrice').text(addSpace(modelPrice) + 'рублей');
	}

	//Making full string with car info
	function compileSpecs() {
		modelSpecs = $('input[name=engine]:checked + label', '#autoForm').text();
		modelSpecs += ', ' + $('input[name=transmission]:checked + label', '#autoForm').text();
		modelSpecs += ', ' + $('input[name=package]:checked + label', '#autoForm').text();

		$('#modelSpecs').text(modelSpecs);
	}


	//Getting price in $
	let currencyExchangeUrl = 'https://www.cbr-xml-daily.ru/daily_json.js';
	let rubUsdRate = 0;
	//Query on CB server
	$.ajax({
		url: currencyExchangeUrl,
		cache: false,
		success: function (json) {
			json = JSON.parse(json);
			// console.log(json);
			rubUsdRate = json.Valute.USD.Value;
			calculateUSD();
		}
	});

	//Convert from rub to usd
	function calculateUSD() {
		let modelPriceUSD = modelPrice / rubUsdRate;
		$('#modelPriceUSD').text(' $ ' + addSpace(modelPriceUSD.toFixed(0)));
	}

	//Adding space on price
	function addSpace(str) {
		str += '';
		x = str.split('.');
		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';
		let rgx = /(\d+)(\d{3})/;

		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ' ' + '$2');
		}
		return x1 + x2;
	}

	//When page load
	calculatePrice();
	compileSpecs();


	//Changing info on input change
	$('#autoForm input').on('change', function () {
		calculatePrice();
		compileSpecs();
		calculateUSD();
	});
});