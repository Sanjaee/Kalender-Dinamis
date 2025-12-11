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
var monthNames = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];
var monthFullNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Custom Events - Event penting tahun 2026
// Format: bulan (0-11): { tanggal: "Nama Event" }
// Catatan: Tanggal untuk hari libur keagamaan (Imlek, Nyepi, Idulfitri, dll) adalah prediksi
var calendarEventsFiltered = {
  0: {
    // January
    1: "Tahun Baru Masehi", // Tanggal Merah
  },
  1: {
    // February
    17: "Tahun Baru Imlek 2577", // Tanggal Merah
  },
  2: {
    // March
    3: "Hari Raya Nyepi Tahun Baru Saka 1948", // Tanggal Merah
  },
  3: {
    // April
    3: "Wafat Yesus Kristus (Jumat Agung)", // Tanggal Merah
    5: "Paskah", // **Catatan:** Paskah adalah hari Minggu, namun karena Jumat Agung sudah libur, biasanya tidak disebutkan lagi sebagai hari libur terpisah. Saya menyertakannya karena terkait. // Tidak ada Awal Puasa Ramadan yang dihitung sebagai libur nasional atau cuti bersama.
  },
  4: {
    // May
    1: "Hari Buruh Internasional / Hari Raya Idulfitri 1447 H", // Tanggal Merah & Idulfitri Cuti Bersama
    2: "Hari Raya Idulfitri 1447 H (Hari 2)", // Cuti Bersama
    3: "Hari Raya Waisak 2570 BE", // Tanggal Merah
    14: "Kenaikan Isa Almasih", // Tanggal Merah
  },
  5: {
    // June
    1: "Hari Lahir Pancasila", // Tanggal Merah
  },
  6: {
    // July
    17: "Hari Raya Iduladha 1447 H (Hari Raya Qurban)", // Tanggal Merah
  },
  7: {
    // August
    7: "Tahun Baru Islam 1448 H (1 Muharram)", // Tanggal Merah
    17: "Hari Kemerdekaan Republik Indonesia", // Tanggal Merah
  },
  8: {
    // September
    4: "Maulid Nabi Muhammad SAW 1448 H", // Tanggal Merah
  },
  9: {
    // October
    // Tidak ada tanggal merah atau cuti bersama di bulan ini
  },
  10: {
    // November
    // Tidak ada tanggal merah atau cuti bersama di bulan ini
  },
  11: {
    // December
    25: "Hari Raya Natal", // Tanggal Merah
    26: "Cuti Bersama Natal", // Cuti Bersama
  },
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

  var html = '<div class="calendar-mini-title">' + monthNames[month] + "</div>";
  html += '<table class="calendar-mini-table"><thead><tr>';
  var days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  for (var i = 0; i < 7; i++) {
    var dayClass = i === 0 ? "sun" : "";
    html += '<th class="' + dayClass + '">' + days[i] + "</th>";
  }
  html += "</tr></thead><tbody>";

  var date = 1;
  var nextMonthDate = 1;

  for (var i = 0; i < 6; i++) {
    html += "<tr>";
    for (var j = 0; j < 7; j++) {
      var cellClass = j === 0 ? "sun" : "";
      if (i === 0 && j < startingDayOfWeek) {
        html +=
          '<td class="' +
          cellClass +
          '">' +
          (prevMonthDays - startingDayOfWeek + j + 1) +
          "</td>";
      } else if (date <= daysInMonth) {
        html += '<td class="' + cellClass + '">' + date + "</td>";
        date++;
      } else {
        html += '<td class="' + cellClass + '">' + nextMonthDate + "</td>";
        nextMonthDate++;
      }
    }
    html += "</tr>";
    if (date > daysInMonth && nextMonthDate > 7) break;
  }
  html += "</tbody></table>";
  container.innerHTML = html;
}

function createMainCalendar(
  year,
  month,
  containerId,
  monthTitleId,
  yearId,
  tbodyId,
  prevMiniId,
  nextMiniId
) {
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

  tbody.innerHTML = "";

  var today = now.getDate();
  var currentMonth = now.getMonth();
  var currentYear = now.getFullYear();

  // Previous month days
  var prevMonth = new Date(year, month, 0);
  var prevMonthDays = prevMonth.getDate();

  var date = 1;
  var nextMonthDate = 1;

  // Get events for this month
  var events = calendarEventsFiltered[month] || {};

  for (var i = 0; i < 6; i++) {
    var row = document.createElement("tr");
    for (var j = 0; j < 7; j++) {
      var cell = document.createElement("td");
      if (i === 0 && j < startingDayOfWeek) {
        cell.textContent = prevMonthDays - startingDayOfWeek + j + 1;
        cell.className = "other-month";
      } else if (date <= daysInMonth) {
        cell.textContent = date;
        var cellClasses = [];
        if (j === 0) cellClasses.push("sun");
        if (date === today && month === currentMonth && year === currentYear) {
          cellClasses.push("today");
        }
        if (events[date]) {
          cellClasses.push("event-day");
          var eventDiv = document.createElement("div");
          eventDiv.className = "calendar-event";
          eventDiv.textContent = events[date];
          cell.appendChild(eventDiv);
        }
        cell.className = cellClasses.join(" ");
        date++;
      } else {
        cell.textContent = nextMonthDate;
        cell.className = "other-month";
        nextMonthDate++;
      }
      row.appendChild(cell);
    }
    tbody.appendChild(row);
    if (date > daysInMonth && nextMonthDate > 7) break;
  }

  // Populate calendar-notes with events
  // Use containerId parameter instead of reconstructing from monthFullNames
  var calendarContainer = document.getElementById(containerId);
  var notesContainer = calendarContainer
    ? calendarContainer.querySelector(".calendar-notes")
    : null;
  if (notesContainer && events) {
    // Get all event dates and sort them
    var eventDates = Object.keys(events)
      .map(function (d) {
        return parseInt(d, 10);
      })
      .sort(function (a, b) {
        return a - b;
      });

    // Get existing lines from HTML (don't clear them)
    var existingLines = notesContainer.querySelectorAll(".calendar-notes-line");
    var maxLines = existingLines.length; // Use number of lines already in HTML
    
    // Clear content of existing lines first
    for (var j = 0; j < existingLines.length; j++) {
      existingLines[j].textContent = "";
    }
    
    // Fill existing lines with events
    var lineCount = 0;
    if (eventDates.length > 0) {
      for (var i = 0; i < eventDates.length && lineCount < maxLines; i++) {
        var eventDate = eventDates[i];
        var eventText = events[eventDate];
        if (eventText && existingLines[lineCount]) {
          existingLines[lineCount].textContent = eventDate + " - " + eventText;
          lineCount++;
        }
      }
    }
    // Remaining lines will stay empty (as they are in HTML)
  }
}

