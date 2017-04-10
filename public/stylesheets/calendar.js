var cal_days_labels = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

var cal_months_labels = ['Janvier', 'Fevrier', 'Mars', 'Avril',
    'Mai', 'Juin', 'Juiller', 'Aout', 'Septembre',
    'Octobre', 'Novembre', 'Decembre'
];

var cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

var today = new Date();
var month = today.getMonth();
var year = today.getFullYear();
// new Calendar(month, year).getCalendar;



//------------------------------------------------------------------------------------------------------------------------------------

// // Constructor
// function Calendar(month, year){
//  this.month = month;
//  this.year = year;
// }

// Calendar.prototype.getCalendar = function(){
// compensate for leap year

if (month == 1) { // February only!
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        monthLength = 29;
    }
}

// find number of days in month
var monthLength = cal_days_in_month[month];

// get first day of month
var firstDay = new Date(year, month, 1);
var startingDay = firstDay.getDay();

var div1 = document.getElementById('Calendar_title');
div1.id = 'my_calendar_title';
var div2 = document.getElementById('caleandar_head');
var div3 = document.getElementById('caleandar');
var table = document.createElement('table');
table.id = 'my_calendar';

var tr_head = document.createElement("tr");
var p_title = document.createElement('p');
p_title.id = 'my_calendar_title';




//Calendar title
var monthName = cal_months_labels[month];
p_title.innerHTML = monthName + " " + year;
div1.appendChild(p_title);



for (var i = 0; i < cal_days_labels.length; i++) {
    var td_head = document.createElement('td');
    td_head.innerHTML = cal_days_labels[i];
    tr_head.appendChild(td_head);
}
table.appendChild(tr_head);
div2.appendChild(table);

// fill in the days
var day = 1;
var tableau = [];
var mini_tableau = [];
// this loop is for weeks (rows)
for (var i = 0; i < 10; i++) {
    var tr = document.createElement('tr');
    tableau[i] = [];
    // this loop is for week days (cells)
    for (var j = 0; j < cal_days_labels.length; j++) {
        var td_body = document.createElement('td');
        //td_body.dataset.column = j;
        //tr.appendChild(td_body);
        //tableau[i][j] = td_body;
        td_body.id = 'td_main_table';
        td_body.addEventListener('click', function(){
            mini_tableau[5][5].innerHTML = '0';                 
        });
        var mini_table = document.createElement('table');
        mini_table.id = 'my_mini_table';

        // creating the mini table 
        for (var k = 0; k < 6; k++) {
            var tr_mini_table = document.createElement('tr');
           // tr_mini_table.dataset.coloum = k;
            mini_tableau[k] = [];
            for (var l = 0; l < 6; l++) {

                var td_mini_table = document.createElement('td');
                td_mini_table.dataset.column = l;
                tr_mini_table.appendChild(td_mini_table);
                mini_tableau[k][l] = td_mini_table;

                if (k == 0 && l == 0) {
                    td_mini_table.colSpan = "6";
                    td_mini_table.classList.add('first_row_mini_table');
                    break;
                }
            }
            mini_table.appendChild(tr_mini_table);

        }

        td_body.appendChild(mini_table);
        /*      td_body.dataset.row = j;
              tableau[i][j] = td_body;*/
        tr.appendChild(td_body);

        if (day <= monthLength && (i > 0 || j >= startingDay)) {
            mini_tableau[0][0].innerHTML = day;
            mini_tableau[5][5].innerHTML = '0';
            day++;
        }
        else {
            td_body.innerHTML = '';
        }

    }


    // stop making rows if we've run out of days
    if (day > monthLength) {
        td_body.innerHTML = '';
        tableau[i][j] = td_body;
        break;
    }
    else {
        tableau[i][j] = td_body;
    }
    table.appendChild(tr);
}
div3.appendChild(table);


div3.addEventListener('click', function(e) {
  //  alert(event.target.dataset.column);

    //   for (var i = 0; i < 6; i++) {
    //         for (var j = 0; i < 6; i++) {
    // if (!mini_tableau[5][5].style.color) {

    // var color_find = document.querySelector('.color_find');
    //       mini_tableau[5][the_column].innerHTML = '5';

    //          }
    //     //   }

    //   }
});


//---------------------------------------------------------------------------------------------------------------------------


document.querySelector('#next_button').addEventListener('click', function() {

});


document.querySelector('#prec_button').addEventListener('click', function() {

    // new Calendar(month--, year).getCalendar;
    // alert("hello");

});
