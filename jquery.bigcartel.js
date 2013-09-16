(function($) {

    $.fn.bigcartel = function(options) {

    	var api = 'http://api.bigcartel.com/';
    	var settings = $.extend({
            store     : 'labrecords',
            complete	: null,
            wrapper 	: 'div',
            css			  : 'bc-product',
            headers   : 'h3',
            currency  : '£'
        }, options);

        return this.each( function() {
        	var url = api + settings.store + '/products.js';
            $.ajax({
            	url : url,
            	context : this,
            	dataType : 'jsonp',
            	error : function(data){
            		console.log(data, this);
            	},
            	success : function(data){
            		render(data, this);
            	}
            });
        });


        function render(products, container){
            $.each(products, function(){
            	var template = $('<' + settings.wrapper + ' />');
            	template.addClass(settings.css).attr('id', this.permalink);

            	var link = $('<a />').attr({
            		href : 'http://' + settings.store + '.bigcartel.com' + this.url,
            		title : this.name,
            		rel : 'external'
            	}).html(this.name);

            	template.append($('<' + settings.header + ' class="product-title" />').html(link));
            	template.append($('<div class="description" />').html(this.description));
            	template.append($('<div class="price" />').html(settings.currency + parseFloat(this.price).toFixed(2) ));
            	template.append($('<div class="image" />').html($('<img />').attr({
            		src : this.images[0].url,
            		width : this.images[0].width,
            		height : this.images[0].height,
            		alt : this.name
            	})));

            	var cats = $('<ul class="categories" />');
            	$.each(this.categories,function(){
            		var category_link = $('<a />').attr({
            			href : 'http://' + settings.store + '.bigcartel.com' + this.url,
            			title : this.name,
            			class : this.permalink
            		}).html(this.name);
            		cats.append($('<li />').html(category_link));
            	});
            	template.append(cats);

            	$(container).append(template);
            });
        }

        if($.isFunction( settings.complete)){
        	settings.complete.call(this);
    	}

    }

}(jQuery));