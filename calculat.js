$( function() {
	$(".cute-slider").each(function(index, element){
		var min = parseInt($(element).attr("min-slider"));
		var max = parseInt($(element).attr("max-slider"));
		var select = $(element).find(".cute-slider-value");
		var slider = $(element).find(".cute-slider-body" );
		var slider = $(slider).slider({
			min: min,
			max: max,
			value: select.val(),
			slide: function( event, ui ) {
				select.val(ui.value);
				select.change();
			}
		});
		$( select ).change( function() {
			var get = parseInt($(this).val());
			if (Number.isNaN(get) || get<min)	get=min;
			if (get>max)	get = max;
			slider.slider( "value", parseInt(get));
			$(this).val(get)
		});
		$(select).val(min);
	})
	$(".nice-block input").change(function(){
		GenerateResult();
	})
	GenerateResult();




	$("body").on("click", ".call-nice-pop" , function(){
		$(".nice-pop-m").addClass("active");
	})
	$("body").on("click", ".nice-pop-close" , function(){
		$(".nice-pop-m").removeClass("active");
	})
} );
function GenerateResult(){
	var resMas={}
	$(".nice-block:not(.nice-dissable) input").each(function(index, element){
		if ($(element).attr("nice-var")) {
			if ($(element).attr('type')=="radio" || $(element).attr('type')=="checkbox" ) {
				if ($(element).prop( "checked" )) {
					resMas[$(element).attr("nice-var")]={value:parseInt($(element).val()) , type:$(element).attr("nice-type")}
				}
			}else{
				resMas[$(element).attr("nice-var")]=parseInt($(element).val())
			}
		}
	})
	$("*[nice-if-var]").each(function(index, element){
		if (!$(element).attr("nice-if-value")) return;
		var helper = JSON.parse("["+$(element).attr("nice-if-value")+"]")
		if(helper.indexOf(resMas[$(element).attr("nice-if-var")]["type"])>-1){
			$(element).removeClass("nice-dissable");
		}else{
			$(element).addClass("nice-dissable");
		}
	})
	var resMas={}
		$(".nice-block:not(.nice-dissable) input").each(function(index, element){
		if ($(element).attr("nice-var")) {
			if ($(element).attr('type')=="radio" || $(element).attr('type')=="checkbox" ) {
				if ($(element).prop( "checked" )) {
					resMas[$(element).attr("nice-var")]={value:+$(element).val() , type:$(element).attr("nice-type")}
				}
			}else{
				resMas[$(element).attr("nice-var")]=parseInt($(element).val())
				if ($(element).attr("nice-topping")) {
					resMas[$(element).attr("nice-var")]*=parseInt($(element).attr("nice-topping"))
				}
			}
		}
	})
	console.log(resMas);
	var curs=$(".result-block .price spec").attr("nice-curs")
	
	
	if (resMas["depth"]) {
		var result=Math.ceil((resMas["type"]["value"]+(resMas["height"]*resMas["depth"]+resMas["height"]*resMas["width"])*resMas["glass-type"]["value"]/1000000)*curs*10)/10
	}else{
		resMas["type"] = resMas["type"] || {};
		var result=Math.ceil((resMas["type"]["value"]+resMas["height"]*resMas["width"]*resMas["glass-type"]["value"]/1000000)*curs*10)/10
	}
	
	

	resMas["type"]=resMas["type"]["type"]
	resMas["glass-type"]=resMas["glass-type"]["type"]
	$(".hidden-result").val(JSON.stringify(resMas))
	$(".result-block .price spec").text(result.toLocaleString('ru-RU'))

}
