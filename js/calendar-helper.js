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

// Custom Events - Event penting tahun 2026
// Format: bulan (0-11): { tanggal: "Nama Event" }
// Catatan: Tanggal untuk hari libur keagamaan (Imlek, Nyepi, Idulfitri, dll) adalah prediksi
var calendarEvents = {
	0: { // January
		1: "Tahun Baru Masehi",
		5: "Hari Ulang Tahun PDI Perjuangan",
		10: "Hari Lingkungan Hidup Indonesia",
		21: "Hari Jadi Kota Jakarta"
	},
	1: { // February
		17: "Tahun Baru Imlek 2577",
		5: "Hari Ulang Tahun Himpunan Mahasiswa Islam (HMI)",
		14: "Hari Kasih Sayang (Valentine's Day)",
		20: "Hari Kemerdekaan Pers Nasional"
	},
	2: { // March
		3: "Hari Raya Nyepi Tahun Baru Saka 1948",
		11: "Hari Surat Perintah Sebelas Maret (Supersemar)",
		21: "Hari Puisi Dunia",
		29: "Hari Musik Nasional"
	},
	3: { // April
		3: "Wafat Yesus Kristus (Jumat Agung)",
		5: "Paskah",
		1: "Awal Puasa Ramadan 1447 H",
		21: "Hari Kartini",
		24: "Peringatan Konferensi Asia-Afrika (KAA)"
	},
	4: { // May
		1: "Hari Buruh Internasional / Hari Raya Idulfitri 1447 H",
		2: "Hari Raya Idulfitri 1447 H (Hari 2)",
		3: "Hari Raya Waisak 2570 BE",
		14: "Kenaikan Isa Almasih",
		20: "Hari Kebangkitan Nasional"
	},
	5: { // June
		1: "Hari Lahir Pancasila",
		17: "Hari Jadi Kota Jakarta",
		21: "Hari Musik Dunia",
		22: "Hari Ulang Tahun Kota Jakarta",
		29: "Hari Keluarga Berencana Nasional (Harganas)"
	},
	6: { // July
		5: "Hari Bank Indonesia",
		17: "Hari Raya Iduladha 1447 H (Hari Raya Qurban) / Hari Koperasi Nasional",
		23: "Hari Anak Nasional",
		29: "Hari Bhakti Adhyaksa (Kejaksaan)"
	},
	7: { // August
		7: "Tahun Baru Islam 1448 H (1 Muharram)",
		5: "Hari Dharma Wanita Nasional",
		14: "Hari Pramuka",
		17: "Hari Kemerdekaan Republik Indonesia",
		24: "Hari Televisi Nasional"
	},
	8: { // September
		1: "Hari Polisi Wanita (Polwan)",
		8: "Hari Aksara Internasional",
		4: "Maulid Nabi Muhammad SAW 1448 H",
		24: "Hari Tani Nasional",
		30: "Hari Peringatan G30S/PKI"
	},
	9: { // October
		1: "Hari Kesaktian Pancasila",
		5: "Hari Tentara Nasional Indonesia (TNI)",
		16: "Hari Pangan Sedunia",
		28: "Hari Sumpah Pemuda",
		30: "Hari Keuangan Nasional"
	},
	10: { // November
		10: "Hari Pahlawan",
		12: "Hari Kesehatan Nasional",
		25: "Hari Guru Nasional",
		29: "Hari KORPRI"
	},
	11: { // December
		3: "Hari Penyandang Disabilitas Internasional",
		25: "Hari Raya Natal",
		26: "Cuti Bersama Natal",
		31: "Malam Tahun Baru"
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
	
	// Populate calendar-notes with events
	var monthName = monthFullNames[month].toLowerCase();
	var notesContainer = document.querySelector('#calendar-' + monthName + ' .calendar-notes');
	if (notesContainer && events) {
		// Get all event dates and sort them
		var eventDates = Object.keys(events).map(function(d) { return parseInt(d, 10); }).sort(function(a, b) { return a - b; });
		
		if (eventDates.length > 0) {
			// Clear existing lines
			notesContainer.innerHTML = '';
			
			// Create event list
			for (var i = 0; i < eventDates.length; i++) {
				var eventDate = eventDates[i];
				var eventText = events[eventDate];
				var eventLine = document.createElement('div');
				eventLine.className = 'calendar-notes-line';
				eventLine.textContent = eventDate + ' - ' + eventText;
				notesContainer.appendChild(eventLine);
			}
			
			// Fill remaining lines if less than 3 events
			while (notesContainer.children.length < 3) {
				var emptyLine = document.createElement('div');
				emptyLine.className = 'calendar-notes-line';
				notesContainer.appendChild(emptyLine);
			}
		}
	}
}

