/* Calendar Helper Functions */

/**
 * CARA MENAMBAHKAN CUSTOM EVENT/HARI RAYA:
 * 
 * Edit variabel calendarEvents di bawah ini.
 * Format: bulan (0-11): { tanggal: "Nama Event" }
 * 
 * Contoh:
 * 0: { // January
 *     1: "New Year's Day",
 *     15: "Hari Raya"
 * },
 * 1: { // February
 *     17: "TAHUN BARU IHLEK 2577 KONGALI",
 *     14: "Valentine's Day"
 * }
 * 
 * Event akan otomatis muncul di kalender dengan warna merah
 */

// Month names
var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
var monthFullNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// Custom Events - bisa diubah sesuai kebutuhan per bulan
// Format: bulan (0-11): { tanggal: "Nama Event" }
var calendarEvents = {
	0: { // January
		1: "New Year's Day"
		// Tambahkan event lain di sini, contoh:
		// 15: "Hari Raya",
		// 25: "Event Lain"
	},
	1: { // February
		17: "TAHUN BARU IHLEK 2577 KONGALI"
		// Tambahkan event lain di sini, contoh:
		// 14: "Valentine's Day"
	},
	2: { // March
		// Tambahkan event di sini
	},
	3: { // April
		// Tambahkan event di sini
	},
	4: { // May
		// Tambahkan event di sini
	},
	5: { // June
		// Tambahkan event di sini
	},
	6: { // July
		// Tambahkan event di sini
	},
	7: { // August
		// Tambahkan event di sini
	},
	8: { // September
		// Tambahkan event di sini
	},
	9: { // October
		// Tambahkan event di sini
	},
	10: { // November
		// Tambahkan event di sini
	},
	11: { // December
		// Tambahkan event di sini
	}
};

function createMiniCalendar(containerId, year, month) {
	var container = document.getElementById(containerId);
	if (!container) return;
	
	var firstDay = new Date(year, month, 1);
	var lastDay = new Date(year, month + 1, 0);
	var daysInMonth = lastDay.getDate();
	var startingDayOfWeek = firstDay.getDay();
	
	var prevMonth = new Date(year, month, 0);
	var prevMonthDays = prevMonth.getDate();
	
	var html = '<div class="calendar-mini-title">' + monthNames[month] + '</div>';
	html += '<table class="calendar-mini-table"><thead><tr>';
	var days = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
	for (var i = 0; i < 7; i++) {
		var dayClass = i === 0 ? 'sun' : '';
		html += '<th class="' + dayClass + '">' + days[i] + '</th>';
	}
	html += '</tr></thead><tbody>';
	
	var date = 1;
	var nextMonthDate = 1;
	
	for (var i = 0; i < 6; i++) {
		html += '<tr>';
		for (var j = 0; j < 7; j++) {
			var cellClass = j === 0 ? 'sun' : '';
			if (i === 0 && j < startingDayOfWeek) {
				html += '<td class="' + cellClass + '">' + (prevMonthDays - startingDayOfWeek + j + 1) + '</td>';
			} else if (date <= daysInMonth) {
				html += '<td class="' + cellClass + '">' + date + '</td>';
				date++;
			} else {
				html += '<td class="' + cellClass + '">' + nextMonthDate + '</td>';
				nextMonthDate++;
			}
		}
		html += '</tr>';
		if (date > daysInMonth && nextMonthDate > 7) break;
	}
	html += '</tbody></table>';
	container.innerHTML = html;
}

function createMainCalendar(year, month, containerId, monthTitleId, yearId, tbodyId, prevMiniId, nextMiniId) {
	var now = new Date();
	
	// Set year
	var yearEl = document.getElementById(yearId);
	if (yearEl) yearEl.textContent = year;
	
	// Set month title
	var monthTitleEl = document.getElementById(monthTitleId);
	if (monthTitleEl) monthTitleEl.textContent = monthNames[month];
	
	// Mini calendars removed - no longer needed
	
	// Main calendar
	var firstDay = new Date(year, month, 1);
	var lastDay = new Date(year, month + 1, 0);
	var daysInMonth = lastDay.getDate();
	var startingDayOfWeek = firstDay.getDay();
	
	var tbody = document.getElementById(tbodyId);
	if (!tbody) return;
	
	tbody.innerHTML = '';
	
	var today = now.getDate();
	var currentMonth = now.getMonth();
	var currentYear = now.getFullYear();
	
	// Previous month days
	var prevMonth = new Date(year, month, 0);
	var prevMonthDays = prevMonth.getDate();
	
	var date = 1;
	var nextMonthDate = 1;
	
	// Get events for this month
	var events = calendarEvents[month] || {};
	
	for (var i = 0; i < 6; i++) {
		var row = document.createElement('tr');
		for (var j = 0; j < 7; j++) {
			var cell = document.createElement('td');
			if (i === 0 && j < startingDayOfWeek) {
				cell.textContent = prevMonthDays - startingDayOfWeek + j + 1;
				cell.className = 'other-month';
			} else if (date <= daysInMonth) {
				cell.textContent = date;
				var cellClasses = [];
				if (j === 0) cellClasses.push('sun');
				if (date === today && month === currentMonth && year === currentYear) {
					cellClasses.push('today');
				}
				if (events[date]) {
					cellClasses.push('event-day');
					var eventDiv = document.createElement('div');
					eventDiv.className = 'calendar-event';
					eventDiv.textContent = events[date];
					cell.appendChild(eventDiv);
				}
				cell.className = cellClasses.join(' ');
				date++;
			} else {
				cell.textContent = nextMonthDate;
				cell.className = 'other-month';
				nextMonthDate++;
			}
			row.appendChild(cell);
		}
		tbody.appendChild(row);
		if (date > daysInMonth && nextMonthDate > 7) break;
	}
}

