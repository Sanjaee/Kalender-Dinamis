/* Steve jobs' book */

function updateDepth(book, newPage) {

	var page = book.turn('page'),
		pages = book.turn('pages'),
		depthWidth = 16*Math.min(1, page*2/pages);

		newPage = newPage || page;

	// Front cover depth (page 1-4)
	if (newPage > 4) {
		$('.sj-book .p1 .depth').css({
			width: depthWidth,
			left: 20 - depthWidth
		});
	} else {
		$('.sj-book .p1 .depth').css({width: 0});
	}

	// Back cover depth (page 4)
	depthWidth = 16*Math.min(1, (pages-page)*2/pages);

	if (newPage <= 16) {
		$('.sj-book .p4 .depth').css({
			width: depthWidth,
			right: 20 - depthWidth
		});
	} else {
		$('.sj-book .p4 .depth').css({width: 0});
	}

}

function loadPage(page) {

	$.ajax({url: 'pages/page' + page + '.html'}).
		done(function(pageHtml) {
			var processedHtml = pageHtml.replace('samples/steve-jobs/', '');
			$('.sj-book .p' + page).html(processedHtml);
			
			// Execute calendar scripts after page is loaded
			if (page >= 5 && page <= 16) {
				setTimeout(function() {
					initCalendarPage(page);
				}, 100);
			}
		});

}

function initCalendarPage(page) {
	// Check if calendar helper is loaded
	if (typeof createMainCalendar === 'function') {
		renderCalendar(page);
	} else {
		// Wait for script to load
		setTimeout(function() {
			if (typeof createMainCalendar === 'function') {
				renderCalendar(page);
			} else {
				initCalendarPage(page);
			}
		}, 100);
	}
}

function renderCalendar(page) {
	var now = new Date();
	var year = now.getFullYear();
	var month = page - 5; // 5=Jan(0), 6=Feb(1), 7=Mar(2), etc.
	
	var monthNames = ['january', 'february', 'march', 'april', 'may', 'june', 
	                  'july', 'august', 'september', 'october', 'november', 'december'];
	var monthName = monthNames[month];
	
	if (typeof createMainCalendar === 'function') {
		createMainCalendar(
			year, month,
			'calendar-' + monthName,
			'month-title-' + monthName,
			'year-' + monthName,
			'tbody-' + monthName,
			'mini-prev-' + monthName,
			'mini-next-' + monthName
		);
	}
}

function addPage(page, book) {

	var id, pages = book.turn('pages');

	if (!book.turn('hasPage', page)) {

		var element = $('<div />',
			{'class': 'own-size',
				css: {width: 600, height: 750}
			}).
			html('<div class="loader"></div>');

		if (book.turn('addPage', element, page)) {
			loadPage(page);
		}

	}
}

// Slider functions removed - no longer needed

function zoomHandle(e) {

	if ($('.sj-book').data().zoomIn)
		zoomOut();
	else if (e.target && $(e.target).hasClass('zoom-this')) {
		zoomThis($(e.target));
	}

}

function zoomThis(pic) {

	var	position, translate,
		tmpContainer = $('<div />', {'class': 'zoom-pic'}),
		transitionEnd = $.cssTransitionEnd(),
		tmpPic = $('<img />'),
		zCenterX = $('#book-zoom').width()/2,
		zCenterY = $('#book-zoom').height()/2,
		bookPos = $('#book-zoom').offset(),
		picPos = {
			left: pic.offset().left - bookPos.left,
			top: pic.offset().top - bookPos.top
		},
		completeTransition = function() {
			$('#book-zoom').unbind(transitionEnd);

			if ($('.sj-book').data().zoomIn) {
				tmpContainer.appendTo($('body'));

				$('body').css({'overflow': 'hidden'});
				
				tmpPic.css({
					margin: position.top + 'px ' + position.left+'px'
				}).
				appendTo(tmpContainer).
				fadeOut(0).
				fadeIn(500);
			}
		};

		$('.sj-book').data().zoomIn = true;

		$('.sj-book').turn('disable', true);

		$(window).resize(zoomOut);
		
		tmpContainer.click(zoomOut);

		tmpPic.load(function() {
			var realWidth = $(this)[0].width,
				realHeight = $(this)[0].height,
				zoomFactor = realWidth/pic.width(),
				picPosition = {
					top:  (picPos.top - zCenterY)*zoomFactor + zCenterY + bookPos.top,
					left: (picPos.left - zCenterX)*zoomFactor + zCenterX + bookPos.left
				};


			position = {
				top: ($(window).height()-realHeight)/2,
				left: ($(window).width()-realWidth)/2
			};

			translate = {
				top: position.top-picPosition.top,
				left: position.left-picPosition.left
			};

			$('.samples .bar').css({visibility: 'hidden'});
			
		
			$('#book-zoom').transform(
				'translate('+translate.left+'px, '+translate.top+'px)' +
				'scale('+zoomFactor+', '+zoomFactor+')');

			if (transitionEnd)
				$('#book-zoom').bind(transitionEnd, completeTransition);
			else
				setTimeout(completeTransition, 1000);

		});

		tmpPic.attr('src', pic.attr('src'));

}

function zoomOut() {

	var transitionEnd = $.cssTransitionEnd(),
		completeTransition = function(e) {
			$('#book-zoom').unbind(transitionEnd);
			$('.sj-book').turn('disable', false);
			$('body').css({'overflow': 'auto'});
		};

	$('.sj-book').data().zoomIn = false;

	$(window).unbind('resize', zoomOut);

	$('.zoom-pic').remove();
	$('#book-zoom').transform('scale(1, 1)');
	$('.samples .bar').css({visibility: 'visible'});

	if (transitionEnd)
		$('#book-zoom').bind(transitionEnd, completeTransition);
	else
		setTimeout(completeTransition, 1000);
}


// Slider functions removed

function isChrome() {

	// Chrome's unsolved bug
	// http://code.google.com/p/chromium/issues/detail?id=128488

	return navigator.userAgent.indexOf('Chrome')!=-1;

}