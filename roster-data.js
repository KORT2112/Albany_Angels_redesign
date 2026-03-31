/**
 * roster-data.js
 * Albany Angels — shared weekly roster data and utilities.
 * Used by: roster.html, booking.html
 *
 * Update the `roster` object each week to refresh both pages.
 */
(function (root) {
  'use strict';

  /* ── Image map ─────────────────────────────── */
  var imageMap = {
    ALLY:      './assets/girls/ally/hero.jpg',
    ALEXA:     './assets/girls/alexa/hero.jpg',
    ALYSSA:    './assets/girls/alyssa/hero.jpeg',
    AMORA:     './assets/girls/amora/hero.jpg',
    ANGEL:     './assets/girls/angel/hero.jpg',
    ANNA:      './assets/girls/anna/hero.png',
    ANNIE:     './assets/girls/annie/hero.jpg',
    ARABELLA:  './assets/girls/arabella/hero.jpg',
    ARI:       './assets/girls/ari/hero.jpeg',
    ARIA:      './assets/girls/aria/hero.jpg',
    ARIANNA:   './assets/girls/arianna/hero.jpg',
    ARIES:     './assets/girls/aries/hero.png',
    ASIA:      './assets/girls/asia/hero.jpg',
    BECKY:     './assets/girls/becky/hero.jpg',
    BELLA:     './assets/girls/bella/hero.jpg',
    BIANCA:    './assets/girls/bianca/hero.jpg',
    BIBI:      './assets/girls/bibi/hero.jpg',
    BRIANNA:   './assets/girls/brianna/hero.jpg',
    CAPRII:    './assets/girls/caprii/hero.jpg',
    CHANTELLE: './assets/girls/chantelle/hero.png',
    COURTNEY:  './assets/girls/courtney/hero.jpg',
    DAME:      './assets/girls/dame/hero.jpg',
    ELSA:      './assets/girls/elsa/hero.jpg',
    EMMA:      './assets/girls/emma/hero.jpg',
    FRANCIS:   './assets/girls/francis/hero.png',
    GIA:       './assets/girls/gia/hero.jpg',
    HANNAH:    './assets/girls/hannah/hero.jpg',
    HARPER:    './assets/girls/harper/hero.jpg',
    IRIS:      './assets/girls/iris/hero.jpg',
    ISABELLA:  './assets/girls/isabella/hero.jpg',
    ISLA:      './assets/girls/isla/hero.jpg',
    JADE:      './assets/girls/jade/hero.jpg',
    JASMINE:   './assets/girls/jasmine/hero.jpg',
    KATIE:     './assets/girls/katie/hero.png',
    KRYSTAL:   './assets/girls/krystal/hero.png',
    LACIE:     './assets/girls/lacie/hero.jpeg',
    LILITH:    './assets/girls/lilith/hero.jpg',
    LOLA:      './assets/girls/lola/hero.jpg',
    LUIZA:     './assets/girls/luiza/hero.jpeg',
    MADDISON:  './assets/girls/maddison/hero.jpg',
    MARIE:     './assets/girls/marie/hero.jpg',
    MEA:       './assets/girls/mea/hero.jpg',
    MEGAN:     './assets/girls/megan/hero.jpg',
    MEL:       './assets/girls/mel/hero.png',
    MELENA:    './assets/girls/melena/hero.jpg',
    MELISSA:   './assets/girls/melissa/hero.jpg',
    MILA:      './assets/girls/mila/hero.jpg',
    MILEY:     './assets/girls/miley/hero.png',
    NATALYA:   './assets/girls/natalya/hero.jpg',
    NATAYLA:   './assets/girls/natalya/hero.jpg',
    PEACHES:   './assets/girls/peaches/hero.jpg',
    SERENA:    './assets/girls/serena/hero.jpg',
    SHANAYA:   './assets/girls/shanaya/hero.jpeg',
    TAYLOR:    './assets/girls/taylor/hero.jpg',
    VICTORIA:  './assets/girls/victoria/hero.jpg',
    YUZUKI:    './assets/girls/yuzuki/hero.jpeg',
    ZARA:      './assets/girls/zara/hero.jpg',
    ZOE:       './assets/girls/zoe/hero.jpg'
  };

  /* ── Profile map ───────────────────────────── */
  var profileMap = {
    ALLY:      'ally.html',
    ALEXA:     'alexa.html',
    ALYSSA:    'alyssa.html',
    AMORA:     'amora.html',
    ANGEL:     'angel.html',
    ANNA:      'anna.html',
    ANNIE:     'annie.html',
    ARABELLA:  'arabella.html',
    ARI:       'ari.html',
    ARIA:      'aria.html',
    ARIANNA:   'arianna.html',
    ARIES:     'aries.html',
    ASIA:      'asia.html',
    BECKY:     'becky.html',
    BELLA:     'bella.html',
    BIANCA:    'bianca.html',
    BIBI:      'bibi.html',
    BRIANNA:   'brianna.html',
    CAPRII:    'caprii.html',
    CHANTELLE: 'chantelle.html',
    COURTNEY:  'courtney.html',
    DAME:      'dame.html',
    ELSA:      'elsa.html',
    EMMA:      'emma.html',
    FRANCIS:   'francis.html',
    GIA:       'gia.html',
    HANNAH:    'hannah.html',
    HARPER:    'harper.html',
    IRIS:      'iris.html',
    ISABELLA:  'isabella.html',
    ISLA:      'isla.html',
    JADE:      'jade.html',
    JASMINE:   'jasmine.html',
    KATIE:     'katie.html',
    KRYSTAL:   'krystal.html',
    LACIE:     'lacie.html',
    LILITH:    'lilith.html',
    LOLA:      'lola.html',
    LUIZA:     'luiza.html',
    MADDISON:  'maddison.html',
    MARIE:     'marie.html',
    MEA:       'mea.html',
    MEGAN:     'megan.html',
    MEL:       'mel.html',
    MELENA:    'melena.html',
    MELISSA:   'melissa.html',
    MILA:      'mila.html',
    MILEY:     'miley.html',
    NATALYA:   'natalya.html',
    NATAYLA:   'natalya.html',
    PEACHES:   'peaches.html',
    SERENA:    'serena.html',
    SHANAYA:   'shanaya.html',
    TAYLOR:    'taylor.html',
    VICTORIA:  'victoria.html',
    YUZUKI:    'yuzuki.html',
    ZARA:      'zara.html',
    ZOE:       'zoe.html'
  };

  /* ── Sensual-massage-only set ──────────────── */
  var sensualOnly = new Set([
    'NATALYA','NATAYLA','ZOE','ZARA','HANNAH','VICTORIA',
    'ALEXA','BRIANNA','MELISSA','MILEY','BIBI','ELSA','HARPER'
  ]);

  /* ── Weekly roster ─────────────────────────── *
   * Each day: { label, date, isoDate, girls: [[NAME, 'START-END'], ...] }
   * Time format: integers or decimals, 10-11 = AM, 1-9 = PM, 12 = noon
   * Update isoDate and date fields when the week rolls over.
   */
  var roster = {
    monday: {
      label:   'Monday',
      date:    '30th March',
      isoDate: '2026-03-30',
      girls: [
        ['IRIS','10-2'], ['ALLY','10-3'], ['ISLA','10-4'], ['ANNA','10-6'],
        ['BECKY','11-2'], ['ANGEL','11-5'], ['ARI','11-6.30'], ['ARIES','12-9'],
        ['YUZUKI','2-10'], ['ZOE','4-9'], ['HANNAH','4-10'], ['BIANCA','5-10']
      ]
    },
    tuesday: {
      label:   'Tuesday',
      date:    '31st March',
      isoDate: '2026-03-31',
      girls: [
        ['IRIS','10-4'], ['ISLA','10-4'], ['LILITH','10-4'], ['ANNA','10-6'],
        ['JADE','10-6'], ['VICTORIA','10-6'], ['COURTNEY','10-6'], ['MARIE','11-3'],
        ['ANGEL','11-5'], ['JASMINE','11-6'], ['ARI','11-6.30'], ['BIANCA','11-10'],
        ['ARIA','11.30-5'], ['MELENA','12-6'], ['PEACHES','12-5'], ['ARIES','12.30-9'],
        ['ALYSSA','2-9'], ['CHANTELLE','3-8'], ['YUZUKI','5-10'], ['AMORA','6-10']
      ]
    },
    wednesday: {
      label:   'Wednesday',
      date:    '1st April',
      isoDate: '2026-04-01',
      girls: [
        ['IRIS','10-2'], ['COURTNEY','10-2'], ['BIBI','10-2'], ['LILITH','10-4'],
        ['LOLA','10-8'], ['ARIA','11-5'], ['ARI','11-6.30'], ['BIANCA','11-10'],
        ['JADE','12-4'], ['PEACHES','12-5'], ['ALYSSA','12-8'], ['EMMA','1.30-6'],
        ['SERENA','4-10'], ['HANNAH','4-10'], ['MEGAN','6-10']
      ]
    },
    thursday: {
      label:   'Thursday',
      date:    '2nd April',
      isoDate: '2026-04-02',
      girls: [
        ['BIBI','10-2'], ['JADE','10-4'], ['VICTORIA','10-4'], ['LILITH','10-4'],
        ['LOLA','10-8'], ['ANGEL','11-5'], ['JASMINE','11-6'], ['ARIA','11-6.30'],
        ['ARI','11-6.30'], ['PEACHES','12-5'], ['ARIES','12.30-9'], ['CHANTELLE','3-8'],
        ['HANNAH','4-10'], ['BIANCA','5-10'], ['YUZUKI','5-10']
      ]
    },
    friday: {
      label:   'Friday',
      date:    '3rd April',
      isoDate: '2026-04-03',
      girls: [
        ['BIBI','10-2'], ['JADE','10-8'], ['LOLA','10-8'], ['ARIA','11.30-5'],
        ['PEACHES','12-5'], ['DAME','12-5.30'], ['YUZUKI','2-8'], ['EMMA','2-7'],
        ['GIA','2-10'], ['ALYSSA','3-9'], ['VICTORIA','3-9'], ['ELSA','4-10']
      ]
    },
    saturday: {
      label:   'Saturday',
      date:    '4th April',
      isoDate: '2026-04-04',
      girls: [
        ['ISLA','10-1'], ['GIA','10-3'], ['ALYSSA','10-4'], ['VICTORIA','10-8'],
        ['ANGEL','11-5'], ['LILITH','12-8'], ['FRANCIS','12-6'], ['SERENA','4-10']
      ]
    },
    sunday: {
      label:   'Sunday',
      date:    '5th April',
      isoDate: '2026-04-05',
      girls: [
        ['FRANCIS','12-6'], ['ZOE','1-7'], ['CHANTELLE','3-8'], ['VICTORIA','3-9']
      ]
    }
  };

  /* ── Time utilities ────────────────────────── */

  /**
   * Parse a single time component (e.g. '10', '11.30', '6', '2.30') to minutes since midnight.
   * isEnd: true for end times (1-11 → PM), false for start times (10-11 → AM, 1-9 → PM)
   */
  function parseTimePart(part, isEnd) {
    var normalized = String(part).trim();
    var hours, minutes;

    if (normalized.indexOf('.') !== -1) {
      var halves = normalized.split('.');
      hours   = parseInt(halves[0], 10);
      minutes = parseInt((halves[1] || '0').slice(0, 2).padEnd(2, '0'), 10);
    } else {
      hours   = parseInt(normalized, 10);
      minutes = 0;
    }

    var h24;
    if (isEnd) {
      // End times: 12 → noon, 1–11 → PM
      if (hours === 12)                    h24 = 12;
      else if (hours >= 1 && hours <= 11)  h24 = hours + 12;
      else                                 h24 = hours;
    } else {
      // Start times: 10–11 → AM, 12 → noon, 1–9 → PM
      if (hours === 12)       h24 = 12;
      else if (hours >= 10)   h24 = hours;
      else                    h24 = hours + 12;
    }

    return h24 * 60 + minutes;
  }

  /**
   * Parse a roster time string like '10-2', '11.30-5', '2-10' into
   * { startMins, endMins } — both as minutes since midnight.
   */
  function parseRosterEntry(timeStr) {
    var dash = timeStr.indexOf('-');
    return {
      startMins: parseTimePart(timeStr.slice(0, dash), false),
      endMins:   parseTimePart(timeStr.slice(dash + 1), true)
    };
  }

  /**
   * Convert minutes-since-midnight to a display string like "2:30 PM".
   */
  function minsToDisplay(mins) {
    var h  = Math.floor(mins / 60);
    var m  = mins % 60;
    var period = h < 12 ? 'AM' : 'PM';
    var h12 = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return h12 + ':' + (m < 10 ? '0' : '') + m + ' ' + period;
  }

  /**
   * Format a raw roster time string like '11.30-5' into "11:30 AM – 5:00 PM".
   */
  function formatTimeRange(raw) {
    var dash  = raw.indexOf('-');
    var start = parseTimePart(raw.slice(0, dash), false);
    var end   = parseTimePart(raw.slice(dash + 1), true);
    return minsToDisplay(start) + '\u2013' + minsToDisplay(end);
  }

  /**
   * Generate time slot values (minutes since midnight) between startMins and endMins
   * at the given interval (default 30 mins).
   */
  function generateSlots(startMins, endMins, intervalMins) {
    var interval = intervalMins || 30;
    var slots = [];
    for (var t = startMins; t < endMins; t += interval) {
      slots.push(t);
    }
    return slots;
  }

  /* ── Gallery images per girl ─────────────── */
  var galleryMap = {
    ALYSSA:  ['gallery-01.jpeg','gallery-02.jpeg','gallery-03.jpeg','gallery-04.jpg','gallery-06.jpeg'],
    ARI:     ['gallery-01.jpeg','gallery-03.jpeg','gallery-04.jpeg','gallery-05.jpeg','gallery-06.jpeg'],
    ARIA:    ['gallery-01.jpg'],
    BIBI:    ['gallery-01.jpg','gallery-02.jpg'],
    ELSA:    ['gallery-01.jpg','gallery-02.jpg','gallery-03.jpg','gallery-04.jpg','gallery-05.jpg','gallery-06.jpg','gallery-07.jpg'],
    HANNAH:  ['gallery-01.jpg','gallery-02.jpg','gallery-03.jpg'],
    IRIS:    ['gallery-01.jpg'],
    JADE:    ['gallery-01.jpg','gallery-03.jpg'],
    LILITH:  ['gallery-01.jpg','gallery-02.jpg','gallery-03.jpg','gallery-05.jpg','gallery-06.jpg','gallery-07.jpg','gallery-08.jpg','gallery-09.jpg'],
    MEGAN:   ['gallery-01.jpg'],
    MELISSA: ['gallery-01.jpg','gallery-02.jpg','gallery-03.jpg','gallery-05.jpg'],
    MILEY:   ['gallery-01.png','gallery-02.png','gallery-03.png','gallery-04.jpeg','gallery-05.webp'],
    NATALYA: ['gallery-01.jpg','gallery-02.jpg','gallery-03.jpg','gallery-04.jpg','gallery-05.jpg','gallery-06.jpg','gallery-07.jpg','gallery-08.jpg'],
    PEACHES: ['gallery-01.jpg','gallery-02.jpg'],
    SERENA:  ['gallery-01.jpg','gallery-02.jpg','gallery-04.jpg','gallery-05.jpg','gallery-06.jpg','gallery-09.jpg','gallery-10.jpg','gallery-11.jpg','gallery-12.jpg','gallery-13.jpg'],
    VICTORIA:['gallery-01.jpg','gallery-02.jpg','gallery-03.jpg','gallery-04.jpg','gallery-05.jpg','gallery-06.jpg'],
    YUZUKI:  ['gallery-01.jpeg','gallery-02.jpeg','gallery-03.jpeg','gallery-04.jpeg'],
    ZARA:    ['gallery-01.jpg','gallery-02.jpg','gallery-03.jpg','gallery-05.jpg','gallery-4.jpg'],
    ZOE:     ['gallery-01.png','gallery-02.png','gallery-03.jpg','gallery-04.png','gallery-05.png','gallery-06.png','gallery-07.jpg','gallery-08.jpg','gallery-09.jpg']
  };

  /* ── Export ────────────────────────────────── */
  root.RosterData = {
    imageMap:         imageMap,
    galleryMap:       galleryMap,
    profileMap:       profileMap,
    sensualOnly:      sensualOnly,
    roster:           roster,
    parseRosterEntry: parseRosterEntry,
    formatTimeRange:  formatTimeRange,
    generateSlots:    generateSlots,
    minsToDisplay:    minsToDisplay
  };

}(window));
