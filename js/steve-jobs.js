/* Steve jobs' book */

function updateDepth(book, newPage) {
	// Depth effect removed - no cover pages
}

function loadPage(page) {

	$.ajax({url: 'pages/page' + page + '.html'}).
		done(function(pageHtml) {
			var processedHtml = pageHtml.replace('samples/steve-jobs/', '');
			$('.sj-book .p' + page).html(processedHtml);
			
			// Execute calendar scripts after page is loaded
			if (page >= 1 && page <= 12) {
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
	var month = page - 1; // 1=Jan(0), 2=Feb(1), 3=Mar(2), etc.
	
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
				css: {width: 600, height: 830}
			}).
			html('<div class="loader" style="background: none; border: 3px solid #f3f3f3; border-top: 3px solid #d32f2f; border-radius: 50%; width: 30px; height: 30px; animation: spin 1s linear infinite; position: absolute; top: 50%; left: 50%; margin-left: -15px; margin-top: -15px;"></div>');

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