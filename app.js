if (process.env.NODE_ENV != 'production'){
  require('dotenv').config()
}
//Connect to mysql database
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const session = require('express-session');
const passport = require('passport');
const local = require('passport-local');
const flash = require('express-flash');
const initializePassport = require('./passport-config');
const method_override = require('method-override');
var device = require('express-device');

app.use(method_override('_method'));

initializePassport(
  passport,
  email => email_password_list.find(user => user.email === email),
  id => email_password_list.find(user => user.employee_id === id)
)

// const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false})); 

const mysql = require('mysql');
port = process.env.PORT || 3000;
app.listen(port);
app.use(express.static(__dirname + '/'));
app.use(flash());
app.use(session({
secret: process.env.SESSION_SECRET,
resave: false,
saveUninitialized: false
})); 
app.use(device.capture());
device.enableViewRouting(app);
device.enableDeviceHelpers(app);

app.use(passport.initialize());
app.use(passport.session());
app.engine('ejs', require('ejs').renderFile);
app.use(cookieParser());


app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
var today = new Date();
if (today.getHours() == 0){
 today += (60 * 60 * 1000);
}
var start = Math.floor(today.getTime() / (3600 * 24 * 1000));

var DailySchedule,
    WeeklySchedule,
    TreatmentList,
    Orders,
    hairdresser_specialtimes,
    store_specialtimes,
    all_hairdressers,
    weekday_schedule, 
    hairdresser_treatment,
    email_password_list,
    OpenClose,
    hairdresser_id,
    timeHour,
    timeMinute,
    user_id,
    store_id,
    Hairdresser,
    store_name,
    timestring,
    Name,
    date;




var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'DoubleBay1997',
    database: 'OleDB',
    timezone: 'utc'
    });
    
    con.connect(function(err) {
    if (err) 
    {console.log("error");
    throw err;}
    console.log("Connected!");
    });

    function DateListEmployee(arr){
      var datelist = new Array;
      var d = new Date();
      var weekday = d.toString().toLowerCase().substr(0,3);
      var weekdays = new Array(arr.length);

      for (var i = 0; i < arr.length; i++){
        if (arr[i].toString().length < 4){
          arr[i] = "0" + arr[i];
        }
        if (arr[i].toString().substr(0,2) == arr[i].toString().substr(2,4) || arr[i] == 0){
          weekdays[i] = 0;
        }
        else {
              var temp = {start_time: arr[i].toString().substr(0,2), end_time: arr[i].toString().substr(2,4)};
              weekdays[i] = temp;
        }
      }
      var dates = new Array(56);
      if (weekday == "mon"){
        for (var i = 0; i < 8; i++){
         for (var j = 0; j < 7; j++){
           var date = new Date();
           dates[7*i+j] = new Date(date.setDate(date.getDate() + 7*i+j));
           var datestring = dates[7*i+j].getDate() + "." + (dates[7*i+j].getMonth() + 1) + "." + dates[7*i+j].getFullYear();

           if (weekdays[j] != 0){
           datelist.push({datum: datestring, start_time: weekdays[j].start_time, end_time: weekdays[j].end_time});
         }
         else {
          datelist.push({datum: datestring, start_time: 0, end_time: 0});}
        }
        }
      }
      else if (weekday == "tue"){
        for (var i = 0; i < 8; i++){
         for (var j = 0; j < 7; j++){
            var date = new Date();
            dates[7*i+j] = new Date(date.setDate(date.getDate() + 7*i+j));
            var datestring = dates[7*i+j].getDate() + "." + (dates[7*i+j].getMonth() + 1) + "." + dates[7*i+j].getFullYear();
 
            if (weekdays[(j+1)%7] != 0){
            datelist.push({datum: datestring, start_time: weekdays[(j+1)%7].start_time, end_time: weekdays[(j+1)%7].end_time});
          }
          else {
           datelist.push({datum: datestring, start_time: 0, end_time: 0});}
         }
         }
        
      }
      else if (weekday == "wed"){
        for (var i = 0; i < 8; i++){
         for (var j = 0; j < 7; j++){
            var date = new Date();
            dates[7*i+j] = new Date(date.setDate(date.getDate() + 7*i+j));
            var datestring = dates[7*i+j].getDate() + "." + (dates[7*i+j].getMonth() + 1) + "." + dates[7*i+j].getFullYear();
 
            if (weekdays[(j+2)%7] != 0){
            datelist.push({datum: datestring, start_time: weekdays[(j+2)%7].start_time, end_time: weekdays[(j+2)%7].end_time});
          }
          else {
           datelist.push({datum: datestring, start_time: 0, end_time: 0});}
         
         }
        }
      }
      else if (weekday == "thu"){
        for (var i = 0; i < 8; i++){
         for (var j = 0; j < 7; j++){
            var date = new Date();
            dates[7*i+j] = new Date(date.setDate(date.getDate() + 7*i+j));
            var datestring = dates[7*i+j].getDate() + "." + (dates[7*i+j].getMonth() + 1) + "." + dates[7*i+j].getFullYear();
 
            if (weekdays[(j+3)%7] != 0){
            datelist.push({datum: datestring, start_time: weekdays[(j+3)%7].start_time, end_time: weekdays[(j+3)%7].end_time});
          }else {
            datelist.push({datum: datestring, start_time: 0, end_time: 0});}
         }
        }
      }
      else if (weekday == "fri"){
        for (var i = 0; i < 8; i++){
         for (var j = 0; j < 7; j++){
            var date = new Date();
            dates[7*i+j] = new Date(date.setDate(date.getDate() + 7*i+j));
            var datestring = dates[7*i+j].getDate() + "." + (dates[7*i+j].getMonth() + 1) + "." + dates[7*i+j].getFullYear();
 
            if (weekdays[(j+4)%7] != 0){
            datelist.push({datum: datestring, start_time: weekdays[(j+4)%7].start_time, end_time: weekdays[(j+4)%7].end_time});
          }else {
            datelist.push({datum: datestring, start_time: 0, end_time: 0});}
         }
        }
      }
      else if (weekday == "sat"){
        for (var i = 0; i < 8; i++){
         for (var j = 0; j < 7; j++){
            var date = new Date();
            dates[7*i+j] = new Date(date.setDate(date.getDate() + 7*i+j));
            var datestring = dates[7*i+j].getDate() + "." + (dates[7*i+j].getMonth() + 1) + "." + dates[7*i+j].getFullYear();
 
            if (weekdays[(j+5)%7] != 0){
            datelist.push({datum: datestring, start_time: weekdays[(j+5)%7].start_time, end_time: weekdays[(j+5)%7].end_time});
          }else {
            datelist.push({datum: datestring, start_time: 0, end_time: 0});}
         }
        }
      }
      else if (weekday == "sun"){
        for (var i = 0; i < 8; i++){
         for (var j = 0; j < 7; j++){
            var date = new Date();
            dates[7*i+j] = new Date(date.setDate(date.getDate() + 7*i+j));
            var datestring = dates[7*i+j].getDate() + "." + (dates[7*i+j].getMonth() + 1) + "." + dates[7*i+j].getFullYear();
 
            if (weekdays[(j+6)%7] != 0){
            datelist.push({datum: datestring, start_time: weekdays[(j+6)%7].start_time, end_time: weekdays[(j+6)%7].end_time});
          }else {
            datelist.push({datum: datestring, start_time: 0, end_time: 0});}
         }
        }
      }
      return datelist
           

            
      
    }
    con.query("SELECT store_id, employee_id,mgr, employee_email, pass_word FROM hairdressers", function (err, result, fields) {
      if (err){throw err};
      result = JSON.parse(JSON.stringify(result));
      email_password_list = new Array(result.length);
      for (var i = 0; i < result.length; i++){
        email_password_list[i] = {store_id: result[i].store_id, employee_id: result[i].employee_id, email: result[i].employee_email, password: result[i].pass_word, admin: result[i].mgr};
      } });
     

    // Change open/close times of particular dates
  function ChangeTimesEmployee(original,date, changes){
    

          var datum = new Date(date);
          var datestring = datum.getDate() + "." + (datum.getMonth() + 1) + "." + datum.getFullYear();
          var l = Math.floor(datum.getTime() / (3600 * 24 * 1000)) - start+1;
          

           original.splice(l,1,{datum: datestring, start_time: changes.start_time.toString(), end_time: changes.end_time.toString()});

          // original[l].start_time = changes.start_time;
          // original[l].end_time   = changes.end_time.toString();

  }
  function ChangeTimesStore(original,date, changes){

      var datum = new Date(date);
      var l = Math.floor(datum.getTime() / (3600 * 24 * 1000)) - start;
      

       original.splice(l,1,{start_time: changes.start_time.toString(), end_time: changes.end_time.toString()});


}
    // Create array of open/close times for store based on weekday open/close times
  function DateListStore() {
            var datelist = new Array;
            
            var weekday = today.toString().toLowerCase().substr(0,3);
            var arr = [weekday_schedule[0].mon, weekday_schedule[0].tue, weekday_schedule[0].wed, weekday_schedule[0].thu, weekday_schedule[0].fri, weekday_schedule[0].sat, weekday_schedule[0].sun]; 

            var weekdays = new Array(arr.length);

            for (var i = 0; i < arr.length; i++){
              if (arr[i].toString().length < 4){
                arr[i] = "0" + arr[i];
              }
              if (arr[i].toString().substr(0,2) == arr[i].toString().substr(2,4)){
                weekdays[i] = 0;
              }
              else {
                var temp = {start_time: arr[i].toString().substr(0,2), end_time: arr[i].toString().substr(2,4)};
                    weekdays[i] = temp;
              }
            }

                 if (weekday == "mon"){
              for (var i = 0; i < 8; i++){
               for (var j = 0; j < 7; j++){
                 datelist.push(weekdays[j]);
               }
              }
            }
            else if (weekday == "tue"){
              for (var i = 0; i < 8; i++){
               for (var j = 0; j < 7; j++){
                 datelist.push(weekdays[(j+1)%7]);
               }
              }
            }
            else if (weekday == "wed"){
              for (var i = 0; i < 8; i++){
               for (var j = 0; j < 7; j++){
                 datelist.push(weekdays[(j+2)%7]);
               }
              }
            }
            else if (weekday == "thu"){
              for (var i = 0; i < 8; i++){
               for (var j = 0; j < 7; j++){
                 datelist.push(weekdays[(j+3)%7]);
               }
              }
            }
            else if (weekday == "fri"){
              for (var i = 0; i < 8; i++){
               for (var j = 0; j < 7; j++){
                 datelist.push(weekdays[(j+4)%7]);
               }
              }
            }
            else if (weekday == "sat"){
              for (var i = 0; i < 8; i++){
               for (var j = 0; j < 7; j++){
                 datelist.push(weekdays[(j+5)%7]);
               }
              }
            }
            else if (weekday == "sun"){
              for (var i = 0; i < 8; i++){
               for (var j = 0; j < 7; j++){
                 datelist.push(weekdays[(j+6)%7]);
               }
              }
            }
            return datelist
  }
  function Sort(arr){
      var len = arr.length;
      
     for (var i = len-1; i>=0; i--){
       for(var j = 1; j<=i; j++){
          var day1 = new Date(arr[j-1].datum);
          var num1 = Math.floor(day1.getTime() / (3600 * 24 * 1000));
          var day2 = new Date(arr[j].datum);
          var num2 = Math.floor(day2.getTime() / (3600 * 24 * 1000));
  
          var hour1 = arr[j-1].time_hour;
          var hour2 = arr[j].time_hour;
  
          var min1 = arr[j-1].time_min;
          var min2 = arr[j].time_min;
  
         if(num1 > num2 || (num1 == num2 && hour1 > hour2) || (num1 == num2 && hour1 == hour2 && min1 > min2)){
             var temp = arr[j-1];
             arr[j-1] = arr[j];
             arr[j] = temp;
          }
       }
     }
     for (var i = 0; i < len; i++){
  
      var day1 = new Date(arr[0].datum);
      var num1 = Math.floor(day1.getTime() / (3600 * 24 * 1000));
         if (num1 - start < 0){
          arr.shift();
         }
         else {
             return arr
         }
     }
     return arr
  }
  function RelevantSchedule(id){
    var relevant = new Array();
    
for (var i = 0; i < DailySchedule.length; i++){
    if (id == DailySchedule[i][0]){
        relevant = (DailySchedule[i]); break;
    }
}

var len = relevant.length;
for (var i = len-1; i>=0; i--){
     for(var j = 1; j <= i; j++){
        var day1 = new Date(relevant[j-1].datum);
        var num1 = Math.floor(day1.getTime() / (3600 * 24 * 1000));
        var day2 = new Date(relevant[j].datum);
        var num2 = Math.floor(day2.getTime() / (3600 * 24 * 1000));
       if(num2 < num1){
           var temp = relevant[j-1];
           relevant[j-1] = relevant[j];
           relevant[j] = temp;
        }
     }
   }
   for (var i = 0; i < len; i++){

var day1 = new Date(relevant[0].datum);
var num1 = Math.floor(day1.getTime() / (3600 * 24 * 1000));
   if (num1 - start < 0){
    relevant.shift();
   }
   else {
       return relevant
   }
}
return relevant
}
function RelevantOrders(id){
    var relevant = new Array();

for (var i = 0; i < Orders.length; i++){
    if (id == Orders[i].employee_id){
        relevant.push(Orders[i]);
    }
}
return relevant
}
function SortAndDeleteOpenClose(){
  
  var len = OpenClose.length;
 for (var i = len-1; i>=0; i--){
   for(var j = 1; j <= i; j++){
      var day1 = new Date(OpenClose[j-1].datum);
      var num1 = Math.floor(day1.getTime() / (3600 * 24 * 1000));
      var day2 = new Date(OpenClose[j].datum);
      var num2 = Math.floor(day2.getTime() / (3600 * 24 * 1000));
     if(num2 <= num1){
         var temp = OpenClose[j-1];
         OpenClose[j-1] = OpenClose[j];
         OpenClose[j] = temp;
      }
   }
 }
 for (var i = 0; i < OpenClose.length; i++){
  var day1 = new Date(OpenClose[i].datum);
      var num1 = Math.floor(day1.getTime() / (3600 * 24 * 1000));
      var diff = num1 - start;
      
      if (diff < 0){
          OpenClose.shift();
      }
      else {return;}
 }
}
function checkAuthenticated(req,res,next) {
  if (req.isAuthenticated() && req.params.admin_id == user_id){
    return next()
  }
  else if (req.isAuthenticated() && req.params.admin_id != user_id){
    return res.send("You do not have access to this page");
  }
  res.redirect('/login');
}
function checkNotAuthenticated(req,res,next) {
  if (!req.isAuthenticated()){
    return next()
  }
  
  res.redirect('/'+req.params.admin_id);
}
function IsAdmin(id){
  return email_password_list.find(user => user.employee_id == id).admin
}
function checkIsAdmin(req,res,next){
  if (IsAdmin(req.params.admin_id)){
    return next()
  }
  return res.send("You do not have access to this page");
}
function reformat(dat){
  var day = dat.substring(3,5);
  var month = dat.substring(0,2);
  var year = dat.substring(6,10);
  return year+"-"+month+"-"+day
}
app.get('/login', checkNotAuthenticated, function (req, res) {
  // throw new Error('BROKEN') // Express will catch this on its own.
  res.render('login');
});
app.post('/login',checkNotAuthenticated, 
  passport.authenticate('local', {
  // successRedirect: '/10',
  failureRedirect:'/login',
  failureFlash: true
  }), (req,res) => {
      var useer = email_password_list.find(user => user.email === req.body.email);
          user_id = useer.employee_id;
          store_id = useer.store_id;

      if (store_id){
          // Get employees from given stores, save in variable
 con.query("SELECT employee_id,mgr, employee_email, pass_word, first_name, last_name, mon, tue, wed, thu, fri, sat, sun FROM hairdressers WHERE store_id = "+store_id+"", function (err, result, fields) {
  if (err){throw err};
  if (result){
  result = JSON.parse(JSON.stringify(result));
  all_hairdressers = new Array(result.length);
  email_password_list = new Array(result.length);
  DailySchedule    = new Array(result.length);
  weekly_schedule_employee    = new Array(result.length);
  WeeklySchedule = new Array(result.length);
  for (var i = 0; i < result.length; i++){
    email_password_list[i] = {employee_id: result[i].employee_id, email: result[i].employee_email, password: result[i].pass_word, admin: result[i].mgr};
    all_hairdressers[i] = {employee_id: result[i].employee_id, first_name: result[i].first_name, last_name: result[i].last_name};
    if (result[i].mon != null && result[i].mon.length == 3){result[i].mon = "0" + result[i].mon;}
    else if (result[i].mon == null) {result[i].mon = "0000";}
    if (result[i].tue != null && result[i].tue.length == 3){result[i].tue = "0" + result[i].tue;}
    else if (result[i].tue == null) {result[i].tue = "0000";}
    if (result[i].wed != null && result[i].wed.length == 3){result[i].wed = "0" + result[i].wed;}
    else if (result[i].wed == null) {result[i].wed = "0000";}
    if (result[i].thu != null && result[i].thu.length == 3){result[i].thu = "0" + result[i].thu;}
    else if (result[i].thu == null) {result[i].thu = "0000";}
    if (result[i].fri != null && result[i].fri.length == 3){result[i].fri = "0" + result[i].fri;}
    else if (result[i].fri == null) {result[i].fri = "0000";}
    if (result[i].sat != null && result[i].sat.length == 3){result[i].sat = "0" + result[i].sat;}
    else if (result[i].sat == null) {result[i].sat = "0000";}
    if (result[i].sun != null && result[i].sun.length == 3){result[i].sun = "0" + result[i].sun;}
    else if (result[i].sun == null) {result[i].sun = "0000";}
    WeeklySchedule[i] = {employee_id: result[i].employee_id, mon_start: result[i].mon.substr(0,2), mon_end: result[i].mon.substr(2,4), tue_start: result[i].tue.substr(0,2), tue_end: result[i].tue.substr(2,4), wed_start: result[i].wed.substr(0,2), wed_end: result[i].wed.substr(2,4), thu_start: result[i].thu.substr(0,2), thu_end: result[i].thu.substr(2,4), fri_start: result[i].fri.substr(0,2), fri_end: result[i].fri.substr(2,4), sat_start: result[i].sat.substr(0,2), sat_end: result[i].sat.substr(2,4), sun_start: result[i].sun.substr(0,2), sun_end: result[i].sun.substr(2,4)};

    weekly_schedule_employee[i] = new Array(7);
    weekly_schedule_employee[i][0] = result[i].mon;
    weekly_schedule_employee[i][1] = result[i].tue;
    weekly_schedule_employee[i][2] = result[i].wed;
    weekly_schedule_employee[i][3] = result[i].thu;
    weekly_schedule_employee[i][4] = result[i].fri;
    weekly_schedule_employee[i][5] = result[i].sat;
    weekly_schedule_employee[i][6] = result[i].sun;
    DailySchedule[i] = DateListEmployee(weekly_schedule_employee[i]);
    DailySchedule[i].unshift(result[i].employee_id);
    
  }
}}
);

  // Get week schedule for that store
  con.query("SELECT mon, tue, wed, thu, fri, sat, sun FROM stores WHERE  store_id = "+store_id+"", function (err, result, fields) {
  if (err){throw err}; 
  if (result){
    var i = 0;
    if (result[i].mon != null && result[i].mon.length == 3){result[i].mon = "0" + result[i].mon;}
    else if (result[i].mon == null || result[i].mon.substr(0,2) == result[i].mon.substr(2,4)) {result[i].mon = "0000";}
    if (result[i].tue != null && result[i].tue.length == 3){result[i].tue = "0" + result[i].tue;}
    else if (result[i].tue == null|| result[i].tue.substr(0,2) == result[i].tue.substr(2,4)) {result[i].tue = "0000";}
    if (result[i].wed != null && result[i].wed.length == 3){result[i].wed = "0" + result[i].wed;}
    else if (result[i].wed == null|| result[i].wed.substr(0,2) == result[i].wed.substr(2,4)) {result[i].wed = "0000";}
    if (result[i].thu != null && result[i].thu.length == 3){result[i].thu = "0" + result[i].thu;}
    else if (result[i].thu == null|| result[i].thu.substr(0,2) == result[i].thu.substr(2,4)) {result[i].thu = "0000";}
    if (result[i].fri != null && result[i].fri.length == 3){result[i].fri = "0" + result[i].fri;}
    else if (result[i].fri == null|| result[i].fri.substr(0,2) == result[i].fri.substr(2,4)) {result[i].fri = "0000";}
    if (result[i].sat != null && result[i].sat.length == 3){result[i].sat = "0" + result[i].sat;}
    else if (result[i].sat == null|| result[i].sat.substr(0,2) == result[i].sat.substr(2,4)) {result[i].sat = "0000";}
    if (result[i].sun != null && result[i].sun.length == 3){result[i].sun = "0" + result[i].sun;}
    else if (result[i].sun == null|| result[i].sun.substr(0,2) == result[i].sun.substr(2,4)) {result[i].sun = "0000";}
  weekday_schedule = JSON.parse(JSON.stringify(result));
  OpenClose = DateListStore(weekday_schedule);
  weekday_schedule = weekday_schedule[0];
  var weekday_schedule1 = {store_id: store_id, mon_start: weekday_schedule.mon.substr(0,2), mon_end: weekday_schedule.mon.substr(2,4), tue_start: weekday_schedule.tue.substr(0,2), tue_end: weekday_schedule.tue.substr(2,4), wed_start: weekday_schedule.wed.substr(0,2), wed_end: weekday_schedule.wed.substr(2,4), thu_start: weekday_schedule.thu.substr(0,2), thu_end: weekday_schedule.thu.substr(2,4), fri_start: weekday_schedule.fri.substr(0,2), fri_end: weekday_schedule.fri.substr(2,4), sat_start: weekday_schedule.sat.substr(0,2), sat_end: weekday_schedule.sat.substr(2,4), sun_start: weekday_schedule.sun.substr(0,2), sun_end: weekday_schedule.sun.substr(2,4)}
  weekday_schedule = weekday_schedule1;
  SortAndDeleteOpenClose();}
  });

  con.query("SELECT treatment, price, duration from treatment_list WHERE  store_id = "+store_id+"", function (err, result, fields) {
    if (err){throw err};
    if (result){
    TreatmentList = JSON.parse(JSON.stringify(result));}
    // console.log(TreatmentList);
    });
  
   // Get days with unusual start/end times
   con.query("SELECT employee_id, datum, start_time, end_time FROM hairdresser_specialtimes WHERE store_id = "+store_id+"", function (err, result, fields) {
    if (err){throw err};if (result){
    result = JSON.parse(JSON.stringify(result));
    
    var today = new Date();
    var start = Math.floor(today.getTime() / (3600 * 24 * 1000));
    var l = all_hairdressers.length;
       hairdresser_specialtimes = new Array(l);
      for (var j = 0; j < l; j++){
        hairdresser_specialtimes[j] = new Array();
        hairdresser_specialtimes[j].push(all_hairdressers[j].employee_id);
        for (var i = 0; i < result.length; i++){
          var lastdate = new Date(result[i].datum);
        var end = Math.floor(lastdate.getTime() / (3600 * 24 * 1000));
        if (end - start > 0){
          var temp = {datum: result[i].datum, start_time: result[i].start_time, end_time: result[i].end_time};
        if (hairdresser_specialtimes[j][0] == result[i].employee_id)
        {
          hairdresser_specialtimes[j].push(temp);
        }}
      }
    
    }
     //console.log(DailySchedule);
    for (var i = 0; i < l; i++){ if (hairdresser_specialtimes[i].length > 1){
      for (var j = 1; j < hairdresser_specialtimes[i].length; j++){
       ChangeTimesEmployee(DailySchedule[i],hairdresser_specialtimes[i][j].datum, hairdresser_specialtimes[i][j]);
    }}
    }
  }
    });

     // Get days with abnormal open/close times for store
  con.query("SELECT datum, open_time, close_time FROM store_specialtimes WHERE store_id = "+store_id+"", function (err, result, fields) {
    if (err){throw err};
   
    result = JSON.parse(JSON.stringify(result));
    if (result){
 
       store_specialtimes = new Array();
        for (var i = 0; i < result.length; i++){
          var temp = {datum: result[i].datum, start_time: result[i].open_time, end_time: result[i].close_time};
          store_specialtimes.push(temp);
    
    }if (store_specialtimes.length > 0){
      for (var j = 0; j < store_specialtimes.length; j++){
       ChangeTimesStore(OpenClose,store_specialtimes[j].datum, store_specialtimes[j]);

    }}
    var date = new Date();
    var dates = new Array(OpenClose.length);
    var OpenClose1 = new Array(OpenClose.length);
    for (var i = 0; i < OpenClose.length; i++){
      dates[i] = new Date();
      dates[i].setDate(date.getDate() + i);
      if (OpenClose[i] != 0){
      OpenClose1[i] = {datum: dates[i], open_time: parseInt(OpenClose[i].start_time), close_time: parseInt(OpenClose[i].end_time)};}
      else {
        OpenClose1[i] = {datum: dates[i], open_time: 0, close_time: 0};}
    }
    OpenClose = OpenClose1;}
    });
  // Get treatment list for that store
  con.query("SELECT employee_id, treatment_name FROM hairdresser_treatment WHERE  store_id = "+store_id+"", function (err, result, fields) {
  if (err){throw err};
  hairdresser_treatment = JSON.parse(JSON.stringify(result));

  });
  
  // Get earlier orders for that store
  con.query("SELECT employee_id, datum, time_hour, time_minute, duration, treatment, customer_name, customer_phone, customer_email FROM orders WHERE  store_id = "+store_id+"", function (err, result, fields) {
  if (err){throw err};
  if (result){
  Orders = JSON.parse(JSON.stringify(result));
  var today = new Date();
  var start = Math.floor(today.getTime() / (3600 * 24 * 1000));
  for (var i = 0; i < Orders.length; i++){
    var dat = new Date(Orders[i].datum);
    var end = Math.floor(dat.getTime() / (3600 * 24 * 1000));
    
    if (end - start < 0){
      Orders.splice(i,1);
    }
  }
  res.redirect('/'+user_id);}
  });

  }}
);

app.delete('/logout', (req,res) => {
  req.logOut();
  user_id = null;
  res.redirect( '/login');

});
    // Export content from this (node) file and db to frontend
    app.get('/:store_id/order',  (req,res,next) => {
      store_id = req.params.store_id;
      // Get employees from given stores, save in variable
 con.query("SELECT employee_id,mgr, employee_email, pass_word, first_name, last_name, mon, tue, wed, thu, fri, sat, sun FROM hairdressers WHERE store_id = "+store_id+"", function (err, result, fields) {
  if (err){throw err};
  result = JSON.parse(JSON.stringify(result));
  
  all_hairdressers = new Array(result.length);
  email_password_list = new Array(result.length);
  DailySchedule    = new Array(result.length);
  weekly_schedule_employee    = new Array(result.length);
  WeeklySchedule = new Array(result.length);
  for (var i = 0; i < result.length; i++){
    email_password_list[i] = {employee_id: result[i].employee_id, email: result[i].employee_email, password: result[i].pass_word, admin: result[i].mgr};
    all_hairdressers[i] = {employee_id: result[i].employee_id, first_name: result[i].first_name, last_name: result[i].last_name};
    if (result[i].mon.length == 3){result[i].mon = "0" + result[i].mon;}
    if (result[i].tue.length == 3){result[i].tue = "0" + result[i].tue;}
    if (result[i].wed.length == 3){result[i].wed = "0" + result[i].wed;}
    if (result[i].thu.length == 3){result[i].thu = "0" + result[i].thu;}
    if (result[i].fri.length == 3){result[i].fri = "0" + result[i].fri;}
    if (result[i].sat.length == 3){result[i].sat = "0" + result[i].sat;}
    if (result[i].sun.length == 3){result[i].sun = "0" + result[i].sun;}
    WeeklySchedule[i] = {employee_id: result[i].employee_id, mon_start: result[i].mon.substr(0,2), mon_end: result[i].mon.substr(2,4), tue_start: result[i].tue.substr(0,2), tue_end: result[i].tue.substr(2,4), wed_start: result[i].wed.substr(0,2), wed_end: result[i].wed.substr(2,4), thu_start: result[i].thu.substr(0,2), thu_end: result[i].thu.substr(2,4), fri_start: result[i].fri.substr(0,2), fri_end: result[i].fri.substr(2,4), sat_start: result[i].sat.substr(0,2), sat_end: result[i].sat.substr(2,4), sun_start: result[i].sun.substr(0,2), sun_end: result[i].sun.substr(2,4)};

    weekly_schedule_employee[i] = new Array(7);
    weekly_schedule_employee[i][0] = result[i].mon;
    weekly_schedule_employee[i][1] = result[i].tue;
    weekly_schedule_employee[i][2] = result[i].wed;
    weekly_schedule_employee[i][3] = result[i].thu;
    weekly_schedule_employee[i][4] = result[i].fri;
    weekly_schedule_employee[i][5] = result[i].sat;
    weekly_schedule_employee[i][6] = result[i].sun;
    DailySchedule[i] = DateListEmployee(weekly_schedule_employee[i]);
    DailySchedule[i].unshift(result[i].employee_id);
    
  }
}
);

  // Get week schedule for that store
  con.query("SELECT mon, tue, wed, thu, fri, sat, sun FROM stores WHERE  store_id = "+store_id+"", function (err, result, fields) {
  if (err){throw err}; 
  if (result[0].mon.length == 3){result[0].mon = "0" + result[0].mon;}
  if (result[0].tue.length == 3){result[0].tue = "0" + result[0].tue;}
  if (result[0].wed.length == 3){result[0].wed = "0" + result[0].wed;}
  if (result[0].thu.length == 3){result[0].thu = "0" + result[0].thu;}
  if (result[0].fri.length == 3){result[0].fri = "0" + result[0].fri;}
  if (result[0].sat.length == 3){result[0].sat = "0" + result[0].sat;}
  if (result[0].sun.length == 3){result[0].sun = "0" + result[0].sun;}
  weekday_schedule = JSON.parse(JSON.stringify(result));
  OpenClose = DateListStore(weekday_schedule);
  weekday_schedule = weekday_schedule[0];
  var weekday_schedule1 = {store_id: 3, mon_start: weekday_schedule.mon.substr(0,2), mon_end: weekday_schedule.mon.substr(2,4), tue_start: weekday_schedule.tue.substr(0,2), tue_end: weekday_schedule.tue.substr(2,4), wed_start: weekday_schedule.wed.substr(0,2), wed_end: weekday_schedule.wed.substr(2,4), thu_start: weekday_schedule.thu.substr(0,2), thu_end: weekday_schedule.thu.substr(2,4), fri_start: weekday_schedule.fri.substr(0,2), fri_end: weekday_schedule.fri.substr(2,4), sat_start: weekday_schedule.sat.substr(0,2), sat_end: weekday_schedule.sat.substr(2,4), sun_start: weekday_schedule.sun.substr(0,2), sun_end: weekday_schedule.sun.substr(2,4)}
  weekday_schedule = weekday_schedule1;
  SortAndDeleteOpenClose();
  });

  con.query("SELECT treatment, price, duration from treatment_list WHERE  store_id = "+store_id+"", function (err, result, fields) {
    if (err){throw err};
    TreatmentList = JSON.parse(JSON.stringify(result));
    // console.log(TreatmentList);
    });
  
   // Get days with unusual start/end times
   con.query("SELECT employee_id, datum, start_time, end_time FROM hairdresser_specialtimes WHERE store_id = "+store_id+"", function (err, result, fields) {
    if (err){throw err};
    result = JSON.parse(JSON.stringify(result));

    var l = all_hairdressers.length;
       hairdresser_specialtimes = new Array(l);
      for (var j = 0; j < l; j++){
        hairdresser_specialtimes[j] = new Array();
        hairdresser_specialtimes[j].push(all_hairdressers[j].employee_id);
        for (var i = 0; i < result.length; i++){
          var lastdate = new Date(result[i].datum.toLocaleString('en-US', {
            timeZone: 'Europe/Oslo'
          }));
        var end = Math.floor(lastdate.getTime() / (3600 * 24 * 1000));
        if (end - start > 0){
          var temp = {datum: result[i].datum, start_time: result[i].start_time, end_time: result[i].end_time};
        if (hairdresser_specialtimes[j][0] == result[i].employee_id)
        {
          hairdresser_specialtimes[j].push(temp);
        }}
      }
    
    }
     //console.log(DailySchedule);
    for (var i = 0; i < l; i++){ if (hairdresser_specialtimes[i].length > 1){
      for (var j = 1; j < hairdresser_specialtimes[i].length; j++){
       ChangeTimesEmployee(DailySchedule[i],hairdresser_specialtimes[i][j].datum, hairdresser_specialtimes[i][j]);
    }}
    }
    
    });

     // Get days with abnormal open/close times for store
  con.query("SELECT datum, open_time, close_time FROM store_specialtimes WHERE store_id = "+store_id+"", function (err, result, fields) {
    if (err){throw err};
   
    result = JSON.parse(JSON.stringify(result));
 
       store_specialtimes = new Array();
        for (var i = 0; i < result.length; i++){
          var temp = {datum: result[i].datum, start_time: result[i].open_time, end_time: result[i].close_time};
          store_specialtimes.push(temp);
    
    }if (store_specialtimes.length > 0){
      for (var j = 0; j < store_specialtimes.length; j++){
       ChangeTimesStore(OpenClose,store_specialtimes[j].datum, store_specialtimes[j]);

    }}
    
    var dates = new Array(OpenClose.length);
    var OpenClose1 = new Array(OpenClose.length);
    for (var i = 0; i < OpenClose.length; i++){
      dates[i] = new Date();
      dates[i].setDate(today.getDate() + i);
      if (OpenClose[i] != 0){
      OpenClose1[i] = {datum: dates[i], open_time: parseInt(OpenClose[i].start_time), close_time: parseInt(OpenClose[i].end_time)};}
      else {
        OpenClose1[i] = {datum: dates[i], open_time: 0, close_time: 0};}
    }
    OpenClose = OpenClose1;
    SortAndDeleteOpenClose();
    });
  // Get treatment list for that store
  con.query("SELECT employee_id, treatment_name FROM hairdresser_treatment WHERE  store_id = "+store_id+"", function (err, result, fields) {
  if (err){throw err};
  hairdresser_treatment = JSON.parse(JSON.stringify(result));

  });
  
  // Get earlier orders for that store
  con.query("SELECT employee_id, datum, time_hour, time_minute, duration, treatment, customer_name, customer_phone, customer_email FROM orders WHERE  store_id = "+store_id+"", function (err, result, fields) {
  if (err){throw err};
  Orders = JSON.parse(JSON.stringify(result));
  
  for (var i = 0; i < Orders.length; i++){
    var dat = new Date(Orders[i].datum);
    var end = Math.floor(dat.getTime() / (3600 * 24 * 1000));
    
    if (end - start < 0){
      Orders.splice(i,1);
    }
  }
  if (req.device.type == "phone"){
    res.render("main_phone", {store_id:store_id, all_hairdressers: all_hairdressers, DailySchedule: DailySchedule, OpenClose: OpenClose,Treatment_Hairdresser: hairdresser_treatment, TreatmentList: TreatmentList, Orders: Orders});
      
  }
  else{
  res.render("main", {store_id:store_id, all_hairdressers: all_hairdressers, DailySchedule: DailySchedule, OpenClose: OpenClose,Treatment_Hairdresser: hairdresser_treatment, TreatmentList: TreatmentList, Orders: Orders});
  }
  });
    });

    app.get('/thankyou',(req,res,next)=>{
if (store_id && Name && date && timestring){
  var dresser; 

  con.query("SELECT first_name, last_name FROM hairdressers WHERE employee_id = "+Hairdresser+"", function (err, result, fields) {
    if (err){throw err};
    result = JSON.parse(JSON.stringify(result));
    dresser = result[0].first_name + " " + result[0].last_name;
  });
  con.query("SELECT store_name FROM stores WHERE store_id = "+store_id+"", function (err, result, fields) {
    if (err){throw err};
    result = JSON.parse(JSON.stringify(result));
             store_name = result[0].store_name;
             date = date.substr(8,10)+"."+date.substr(5,2)+"."+date.substr(0,4);

    res.render('thankyou',{store_name: store_name, name: Name, date: date, time:timestring, Hairdresser: dresser});});}
        // res.send('Thank you for your order!');
    });

    app.get('/',(req,res,next)=>{
      res.render('welcome');
    });
    app.get('/stores',(req,res,next)=>{
      con.query("SELECT mon, tue, wed, thu, fri, sat, sun FROM stores WHERE  store_id =5", function (err, result, fields) {
        if (err){throw err}; 
        if (result[0].mon.length == 3){result[0].mon = "0" + result[0].mon;}
        if (result[0].tue.length == 3){result[0].tue = "0" + result[0].tue;}
        if (result[0].wed.length == 3){result[0].wed = "0" + result[0].wed;}
        if (result[0].thu.length == 3){result[0].thu = "0" + result[0].thu;}
        if (result[0].fri.length == 3){result[0].fri = "0" + result[0].fri;}
        if (result[0].sat.length == 3){result[0].sat = "0" + result[0].sat;}
        if (result[0].sun.length == 3){result[0].sun = "0" + result[0].sun;}
        weekday_schedule = JSON.parse(JSON.stringify(result));
        weekday_schedule = weekday_schedule[0];
        var weekday_schedule1 = {store_id: 5, mon_start: weekday_schedule.mon.substr(0,2)+":00", mon_end: weekday_schedule.mon.substr(2,4)+":00", tue_start: weekday_schedule.tue.substr(0,2)+":00", tue_end: weekday_schedule.tue.substr(2,4)+":00", wed_start: weekday_schedule.wed.substr(0,2)+":00", wed_end: weekday_schedule.wed.substr(2,4)+":00", thu_start: weekday_schedule.thu.substr(0,2)+":00", thu_end: weekday_schedule.thu.substr(2,4)+":00", fri_start: weekday_schedule.fri.substr(0,2)+":00", fri_end: weekday_schedule.fri.substr(2,4)+":00", sat_start: weekday_schedule.sat.substr(0,2)+":00", sat_end: weekday_schedule.sat.substr(2,4)+":00", sun_start: weekday_schedule.sun.substr(0,2)+":00", sun_end: weekday_schedule.sun.substr(2,4)+":00"}
        if(parseInt(weekday_schedule1.mon_start)>= parseInt(weekday_schedule1.mon_end)){
          weekday_schedule1.mon_start = "Closed"; weekday_schedule1.mon_end = "";
        }
        if(parseInt(weekday_schedule1.tue_start)>= parseInt(weekday_schedule1.tue_end)){
          weekday_schedule1.tue_start = "Closed"; weekday_schedule1.tue_end = "";
        }
        if(parseInt(weekday_schedule1.wed_start)>= parseInt(weekday_schedule1.wed_end)){
          weekday_schedule1.wed_start = "Closed"; weekday_schedule1.wed_end = "";
        }
        if(parseInt(weekday_schedule1.thu_start)>= parseInt(weekday_schedule1.thu_end)){
          weekday_schedule1.thu_start = "Closed"; weekday_schedule1.thu_end = "";
        }
        if(parseInt(weekday_schedule1.fri_start)>= parseInt(weekday_schedule1.fri_end)){
          weekday_schedule1.fri_start = "Closed"; weekday_schedule1.fri_end = "";
        }
        if(parseInt(weekday_schedule1.sat_start)>= parseInt(weekday_schedule1.sat_end)){
          weekday_schedule1.sat_start = "Closed"; weekday_schedule1.sat_end = "";
        }
        if(parseInt(weekday_schedule1.sun_start)>= parseInt(weekday_schedule1.sun_end)){
          weekday_schedule1.sun_start = "Closed"; weekday_schedule1.sun_end = "";
        }
        weekday_schedule = weekday_schedule1;
        });
      
        con.query("SELECT treatment, price, duration from treatment_list WHERE  store_id = 5", function (err, result, fields) {
          if (err){throw err};
          TreatmentList = JSON.parse(JSON.stringify(result));
          // console.log(TreatmentList);
          if (weekday_schedule && TreatmentList){
          res.render('store', {id: 5, WeekdaySchedule: weekday_schedule, TreatmentList: TreatmentList});
          }
        
    });
  });
    // Import data from frontend and send back to form
    app.post('/:store_id/order', (req,res,next) => {
            store_id = req.params.store_id;
        var Treatment = req.body.Treatment;
            Hairdresser = req.body.Hairdresser;
        Treatment = Treatment.replace("'", "\\'");
        var Duration = req.body.Duration;
            date = req.body.Date;
        var Time = req.body.Time;
            Name = req.body.Name;
        var Email = req.body.Email;
        var Phone = req.body.Phone;
        
            timeHour = Time.substring(0,2);
            timeMinute = parseInt(Time.substring(3,5))/20;
            timestring = timeHour+":"+timeMinute*2+"0";

        var sql = "INSERT INTO orders (store_id,employee_id,treatment, duration,time_hour,time_minute,datum, customer_name, customer_email, customer_phone) VALUES ("+store_id+","+Hairdresser+",'"+Treatment+"',"+Duration+","+timeHour+","+timeMinute+",STR_TO_DATE('"+date+"','%Y-%m-%d'),'"+Name+"','"+Email+"','"+Phone+"' )";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });
    res.send({redirect:'thankyou'});
});

app.get('/:admin_id', checkAuthenticated, (req,res) => {
  var id = req.params.admin_id;
  var vool = false;

  for (var i = 0; i < all_hairdressers.length; i++){
    if (all_hairdressers[i].employee_id == id){
      vool = true;
      break;
    }
  }
  if (!vool){
    res.send("error");
  }
  else{
    var relevantSchedule = RelevantSchedule(id);
    var relevantOrders   = RelevantOrders(id);
        relevantOrders   = Sort(relevantOrders);
        Orders           = Sort(Orders);}

if (IsAdmin(id)){
   res.render("startpage", {Orders: Orders, OpenClose: OpenClose, DailySchedule: DailySchedule, id: id,
  relevantOrders: relevantOrders,relevantSchedule: relevantSchedule, all_hairdressers: all_hairdressers});
  }
  else{
    res.render("startpage_normal", {Orders: Orders, OpenClose: OpenClose, DailySchedule: DailySchedule, id: id,
   relevantOrders: relevantOrders,relevantSchedule: relevantSchedule, all_hairdressers: all_hairdressers});
   }

});

app.get('/:admin_id/nextapps', checkAuthenticated, (req,res) =>{
var id = req.params.admin_id;
var relevantOrders   = RelevantOrders(id);
    relevantOrders   = Sort(relevantOrders);

res.render("nextapps",{relevantOrders:relevantOrders, id: id});
});

app.get('/:admin_id/nextappsall', checkAuthenticated, checkIsAdmin, (req,res) =>{
      Orders            = Sort(Orders);
  
  res.render("nextappsall", {Orders:Orders, all_hairdressers: all_hairdressers});
  
  
  });

app.get('/:admin_id/nextdays', checkAuthenticated, (req,res) =>{
    var id = req.params.admin_id;
    var relevantSchedule = RelevantSchedule(id);
    
    res.render("nextdays",{relevantSchedule:relevantSchedule, id: id});
    });
    
app.get('/:admin_id/nextdaysall', checkAuthenticated, checkIsAdmin, (req,res) =>{
      var id = req.params.admin_id;


      res.render("nextdaysall", {OpenClose: OpenClose, id:id});
      
      
      });
    

app.get('/:admin_id/employees/new',checkAuthenticated, checkIsAdmin, (req,res) =>{
  res.render('addemployee', {TreatmentList: TreatmentList, weekday_schedule: weekday_schedule, id: req.params.admin_id});
});
app.post('/:admin_id/employees/new', checkAuthenticated, checkIsAdmin, (req,res) => {
  var Hairdresser = req.body.Hairdresser;
  var Treatments = req.body.Treatments;
  var Weekdays = req.body.Weekdays;

var sql = "INSERT INTO hairdressers(store_id,first_name, last_name, employee_email, employee_phone, mon,tue,wed,thu,fri,sat,sun) VALUES ("+store_id+",'"+Hairdresser.first_name+"','"+Hairdresser.last_name+"','"+Hairdresser.email+"',"+Hairdresser.phone+","+Weekdays[0][0]+Weekdays[0][1]+","+Weekdays[1][0]+Weekdays[1][1]+","+Weekdays[2][0]+Weekdays[2][1]+","+Weekdays[3][0]+Weekdays[3][1]+","+Weekdays[4][0]+Weekdays[4][1]+","+Weekdays[5][0]+Weekdays[5][1]+","+Weekdays[6][0]+Weekdays[6][1]+")";
con.query(sql, function (err, result) {
  if (err) throw err;
});

var idd = "SELECT MAX(employee_id) as maxid FROM hairdressers";
var id;

con.query(idd, function (err, result) {
  if (err) throw err;
  id =  JSON.parse(JSON.stringify(result))[0].maxid;
  for (var i = 0; i < Treatments.length; i++){
    sql = 'INSERT INTO hairdresser_treatment (store_id,employee_id,treatment_name) VALUES ('+store_id+','+id+',"'+Treatments[i]+'")';
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
    }
    res.send({redirect: '/'+req.params.admin_id+'/employees'});
});

});

app.get('/:admin_id/employees',checkAuthenticated, checkIsAdmin,(req,res) => {

res.render('employees_admin', {id: req.params.admin_id});
});

app.get('/:admin_id/employees/employee_info/edit_individual_date',checkAuthenticated, checkIsAdmin,(req,res) => {

  var admin_id = req.params.admin_id;
  res.render('edit_individual_dates', {id: admin_id, all_hairdressers: all_hairdressers});
  });

app.post('/:admin_id/employees/employee_info/edit_individual_date',checkAuthenticated, checkIsAdmin,(req,res) => {
    var admin_id = req.params.admin_id;
    var Hairdresser = parseInt(req.body.Hairdresser);
    var Start = parseInt(req.body.Start);
    var End = parseInt(req.body.End);
    var date = new Date(req.body.Date);
    

    var datestring = date.getFullYear()  + "-" + (date.getMonth()+1) + "-" + date.getDate();
    var sql = "INSERT INTO hairdresser_specialtimes(store_id,employee_id, datum, start_time, end_time ) VALUES ("+store_id+",'"+Hairdresser+"','"+datestring+"','"+Start+"',"+End+")";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });

    res.send({redirect: '/'+admin_id+'/employees/employee_info/edit_individual_date_success'});
    });
app.get('/:admin_id/employees/employee_info/edit_individual_date_success',checkAuthenticated, checkIsAdmin,(req,res) => {

  var admin_id = req.params.admin_id;
  res.render('edit_individual_dates_success', {id: admin_id, all_hairdressers: all_hairdressers});

    });

app.get('/:admin_id/store_info',checkAuthenticated, checkIsAdmin,(req,res) => {

      res.render('store_info', {id: req.params.admin_id});
      });
app.get('/:admin_id/store_info/edit_individual_date',checkAuthenticated, checkIsAdmin,(req,res) => {

        var admin_id = req.params.admin_id;
        res.render('edit_individual_store_hours', {id: admin_id});
        });
      
app.post('/:admin_id/store_info/edit_individual_date',checkAuthenticated, checkIsAdmin,(req,res) => {
          var admin_id = req.params.admin_id;
          var Start = parseInt(req.body.Start);
          var End = parseInt(req.body.End);
          var date = new Date(req.body.Date);
      
          var datestring = date.getFullYear()  + "-" + (date.getMonth()+1) + "-" + date.getDate();
          var sql = "INSERT INTO store_specialtimes(store_id,datum, open_time, close_time ) VALUES ("+store_id+",'"+datestring+"','"+Start+"',"+End+")";
          con.query(sql, function (err, result) {
            if (err) throw err;
          });
      
          res.send({redirect: '/'+admin_id+'/store_info/edit_individual_date_success'});
          });

app.get('/:admin_id/store_info/edit_individual_date_success',checkAuthenticated, checkIsAdmin,(req,res) => {

            var admin_id = req.params.admin_id;
            res.render('edit_individual_store_hours_success', {id: admin_id});
          
              });

app.get('/:admin_id/employees/employee_info/edit_work_hours',checkAuthenticated, checkIsAdmin,(req,res) => {

  var admin_id = req.params.admin_id;
  res.render('edit_work_hours', {WeeklySchedule: WeeklySchedule,weekday_schedule: weekday_schedule, id: admin_id, all_hairdressers: all_hairdressers});
  });
app.get('/:admin_id/employees/employee_info/edit_work_hours_success',checkAuthenticated, checkIsAdmin,(req,res) => {

    var admin_id = req.params.admin_id;
    res.render('edit_work_hours_success', {WeeklySchedule: WeeklySchedule,weekday_schedule: weekday_schedule, id: admin_id, all_hairdressers: all_hairdressers});
    });

app.post('/:admin_id/employees/employee_info/edit_work_hours',checkAuthenticated, checkIsAdmin, (req,res) => {
    var admin_id = req.params.admin_id;
    var Hairdresser = req.body.Hairdresser;
    var Weekdays = req.body.Weekdays;
  var sql = "UPDATE hairdressers SET mon = "+Weekdays[0][0]+Weekdays[0][1]+", tue = "+Weekdays[1][0]+Weekdays[1][1]+", wed = "+Weekdays[2][0]+Weekdays[2][1]+", thu = "+Weekdays[3][0]+Weekdays[3][1]+", fri = "+Weekdays[4][0]+Weekdays[4][1]+", sat = "+Weekdays[5][0]+Weekdays[5][1]+", sun = "+Weekdays[6][0]+Weekdays[6][1]+" WHERE employee_id = "+Hairdresser+"";
  con.query(sql, function (err, result) {
    if (err) throw err;
  });

  res.send({redirect: '/'+admin_id+'/employees/employee_info/edit_work_hours_success'});
  });


  // Edit store opening hours routes
  app.get('/:admin_id/store_info/edit_opening_hours',checkAuthenticated, checkIsAdmin,(req,res) => {

    var admin_id = req.params.admin_id;
    res.render('edit_opening_hours', {WeeklySchedule: weekday_schedule, id: admin_id});
    });
  app.get('/:admin_id/store_info/edit_opening_hours_success',checkAuthenticated, checkIsAdmin,(req,res) => {
    con.query("SELECT mon, tue, wed, thu, fri, sat, sun FROM stores WHERE  store_id = 3", function (err, result, fields) {
      if (err){throw err}; 
      if (result[0].mon.length == 3){result[0].mon = "0" + result[0].mon;}
      if (result[0].tue.length == 3){result[0].tue = "0" + result[0].tue;}
      if (result[0].wed.length == 3){result[0].wed = "0" + result[0].wed;}
      if (result[0].thu.length == 3){result[0].thu = "0" + result[0].thu;}
      if (result[0].fri.length == 3){result[0].fri = "0" + result[0].fri;}
      if (result[0].sat.length == 3){result[0].sat = "0" + result[0].sat;}
      if (result[0].sun.length == 3){result[0].sun = "0" + result[0].sun;}
      weekday_schedule = JSON.parse(JSON.stringify(result));
      weekday_schedule = weekday_schedule[0];
      var weekday_schedule1 = {store_id: 3, mon_start: weekday_schedule.mon.substr(0,2), mon_end: weekday_schedule.mon.substr(2,4), tue_start: weekday_schedule.tue.substr(0,2), tue_end: weekday_schedule.tue.substr(2,4), wed_start: weekday_schedule.wed.substr(0,2), wed_end: weekday_schedule.wed.substr(2,4), thu_start: weekday_schedule.thu.substr(0,2), thu_end: weekday_schedule.thu.substr(2,4), fri_start: weekday_schedule.fri.substr(0,2), fri_end: weekday_schedule.fri.substr(2,4), sat_start: weekday_schedule.sat.substr(0,2), sat_end: weekday_schedule.sat.substr(2,4), sun_start: weekday_schedule.sun.substr(0,2), sun_end: weekday_schedule.sun.substr(2,4)}
      weekday_schedule = weekday_schedule1;});
  
      var admin_id = req.params.admin_id;
      res.render('edit_opening_hours_success', {WeeklySchedule: weekday_schedule, id: admin_id});
      });
  
  app.post('/:admin_id/store_info/edit_opening_hours',checkAuthenticated, checkIsAdmin, (req,res) => {
      var admin_id = req.params.admin_id;
      var Weekdays = req.body.Weekdays;
    var sql = "UPDATE stores SET mon = "+Weekdays[0][0]+Weekdays[0][1]+", tue = "+Weekdays[1][0]+Weekdays[1][1]+", wed = "+Weekdays[2][0]+Weekdays[2][1]+", thu = "+Weekdays[3][0]+Weekdays[3][1]+", fri = "+Weekdays[4][0]+Weekdays[4][1]+", sat = "+Weekdays[5][0]+Weekdays[5][1]+", sun = "+Weekdays[6][0]+Weekdays[6][1]+" WHERE store_id = "+store_id+"";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  
    res.send({redirect: '/'+admin_id+'/store_info/edit_opening_hours_success'});
    });

    app.get('/:admin_id/store_info/edit_treatments',checkAuthenticated, checkIsAdmin,(req,res) => {

      var admin_id = req.params.admin_id;
      res.render('edit_treatments', {TreatmentList: TreatmentList, id: admin_id});
      });

      app.post('/:admin_id/store_info/edit_treatments',checkAuthenticated, checkIsAdmin, (req,res) => {
        var admin_id = req.params.admin_id;
        var TreatmentList = req.body.TreatmentList;
        
        var sql = "DELETE FROM treatment_list WHERE store_id = "+store_id+"";
       con.query(sql, function (err, result) {
        if (err) throw err;
      });

      for (var i = 0; i < TreatmentList.length; i++){
        var $new_value = TreatmentList[i].treatment.replace("'","\'"); 
        sql = "INSERT INTO treatment_list(store_id,treatment,price,duration) VALUES (?,?,?,?)";
      
      con.query(sql,[store_id,$new_value, TreatmentList[i].price, TreatmentList[i].duration] , function (err, result) {
        if (err) throw err;
      });}
    
      res.send({redirect: '/'+admin_id+'/store_info'});
      });

  app.get('/:admin_id/employees/employee_info/edit_treatments',checkAuthenticated, checkIsAdmin,(req,res) => {


    var admin_id = req.params.admin_id;
    res.render('edit_treatments_hairdresser', {TreatmentList: TreatmentList, all_hairdressers: all_hairdressers, Treatment_Hairdresser: hairdresser_treatment, id: admin_id});
    });

    app.get('/:admin_id/employees/employee_info/edit_treatments_success',checkAuthenticated, checkIsAdmin,(req,res) => {


      var admin_id = req.params.admin_id;
      res.render('edit_treatments_hairdresser_success', {TreatmentList: TreatmentList, all_hairdressers: all_hairdressers, Treatment_Hairdresser: hairdresser_treatment, id: admin_id});
      });
    app.post('/:admin_id/employees/employee_info/edit_treatments',checkAuthenticated, checkIsAdmin, (req,res) => {
      var admin_id = req.params.admin_id;
      var TreatmentList = req.body.TreatmentList;
      var Hairdresser = req.body.Hairdresser;

      
      var sql = "DELETE FROM hairdresser_treatment WHERE employee_id = "+Hairdresser+"";
     con.query(sql, function (err, result) {
      if (err) throw err;
    });

    for (var i = 0; i < TreatmentList.length; i++){
      var $new_value = TreatmentList[i];
      sql = "INSERT INTO hairdresser_treatment(store_id,treatment_name,employee_id) VALUES (?,?,?)";
    
    con.query(sql,[store_id,$new_value, Hairdresser] , function (err, result) {
      if (err) throw err;
    });}
  
    res.send({redirect: '/'+admin_id+'/employees/employee_info/edit_treatments_success'});
    });

app.get('/new_password/:email',(req,res) => {
var email = req.params.email;
var v = false;

for (var i = 0; i < email_password_list.length; i++){
  if (email_password_list[i].email == email){
    v = true; break;
  }
}
if (v){
res.render('new_password',{email: email});}
else {
  res.send("There is no account for this email address.");
}
});
app.post('/new_password/:email', async (req,res) => {
  var password = req.body.Password;
  var email = req.params.email;

   try {
  const hashed = await bcrypt.hash(password, 10);

var sql = "UPDATE hairdressers SET pass_word = '"+hashed+"' WHERE employee_email = '"+email+"'";
con.query(sql, function (err, result) {
  if (err) throw err;
});
res.send({redirect: '/login'});}
catch{
res.send({redirect: '/new_password/'+email});
}

});

app.get('/:admin_id/add_order', checkAuthenticated, (req,res) => {
  if (IsAdmin(req.params.admin_id)){
  res.render("addorder", {store_id: store_id,id:req.params.admin_id, all_hairdressers: all_hairdressers, DailySchedule: DailySchedule, OpenClose: OpenClose,Treatment_Hairdresser: hairdresser_treatment, TreatmentList: TreatmentList, Orders: Orders});
  }
  else{
    res.render("addorder_normal", {store_id: store_id, id:req.params.admin_id, all_hairdressers: all_hairdressers, DailySchedule: DailySchedule, OpenClose: OpenClose,Treatment_Hairdresser: hairdresser_treatment, TreatmentList: TreatmentList, Orders: Orders});
    }
});
app.post('/:admin_id/add_order', checkAuthenticated, (req,res,next) => {
  var Treatment = req.body.Treatment;
  Treatment = Treatment.replace("'", "\\'");
  var Hairdresser = req.body.Hairdresser;
  var Duration = req.body.Duration;
  var date = req.body.Date;
  var Time = req.body.Time;
  var Name = req.body.Name;
  var Email = req.body.Email;
  var Phone = req.body.Phone;

  for (var i = 0; i < all_hairdressers.length; i++){
      if (Hairdresser == all_hairdressers[i].first_name + " " + all_hairdressers[i].last_name){
              hairdresser_id = all_hairdressers[i].employee_id;
      }}
      if (!hairdresser_id){
        hairdresser_id = Hairdresser;
      }
      timeHour = Time.substring(0,2);
      timeMinute = parseInt(Time.substring(3,5))/20;


  var sql = "INSERT INTO Orders (store_id,employee_id,treatment, duration,time_hour,time_minute,datum, customer_name, customer_email, customer_phone) VALUES ("+store_id+","+hairdresser_id+",'"+Treatment+"',"+Duration+","+timeHour+","+timeMinute+",STR_TO_DATE('"+date+"','%Y-%m-%d'),'"+Name+"','"+Email+"','"+Phone+"' )";
con.query(sql, function (err, result) {
if (err) throw err;
});

  res.send({redirect: '/'+req.params.admin_id+'/add_order_success'});
});
app.get('/:admin_id/add_order_success', checkAuthenticated, (req,res) => {
  if (IsAdmin(req.params.admin_id)){
    res.render("addorder_success", {store_id: store_id,id:req.params.admin_id, all_hairdressers: all_hairdressers, DailySchedule: DailySchedule, OpenClose: OpenClose,Treatment_Hairdresser: hairdresser_treatment, TreatmentList: TreatmentList, Orders: Orders});
    }
    else{
      res.render("addorder_success_normal", {store_id: store_id,id:req.params.admin_id, all_hairdressers: all_hairdressers, DailySchedule: DailySchedule, OpenClose: OpenClose,Treatment_Hairdresser: hairdresser_treatment, TreatmentList: TreatmentList, Orders: Orders});
      }
});