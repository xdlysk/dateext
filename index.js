(function () {
    function extend(name, proto, func) {
        if (proto) {
            if ('function' !== typeof Date.prototype[name]) {
                Date.prototype[name] = func;
            } else {
                if (console) {
                    console.log("extend method " + name + "has already exists");
                }
            }
        } else {
            if ('function' !== typeof Date[name]) Date[name] = func;
        }
    }


    function diff(date2, format) {
        if (!date2 || !(date2 instanceof Date)) {
            throw "error date2";
        }
        var date1Time = this.getTime();
        var date2Time = date2.getTime();

        if (!format) {
            format = "d.H:mm:ss";
        }
        var days = parseInt((date2Time - date1Time) / (24 * 3600 * 1000));
        var daysleavems = (date2Time - date1Time) % (24 * 3600 * 1000);
        var hours = parseInt(daysleavems / (3600 * 1000));
        var hoursleavems = daysleavems % (3600 * 1000);
        var minutes = parseInt(hoursleavems / (60 * 1000));
        var minutesleavems = hoursleavems % (60 * 1000);
        var seconds = parseInt(minutesleavems / (1000));

        var o = {
            "d+": days,
            "H+": hours,
            "m+": minutes,
            "s+": seconds
        };
        for (var k in o)
            if (new RegExp("(" + k + ")").test(format))
                format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return format.replace(/^(0+[^\d]+)+/, '');
    };

    function format(fmt) {
        if (!fmt) {
            return this.toString();
        }
        var o = {
            "M+": this.getMonth() + 1,
            "d+": this.getDate(),
            "h+": this.getHours(),
            "m+": this.getMinutes(),
            "s+": this.getSeconds(),
            "q+": Math.floor((this.getMonth() + 3) / 3),
            "f": this.getMilliseconds()
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };

    function addMilliseconds(milliseconds) {
        var m = this.getTime() + milliseconds;
        return new Date(m);
    };
    function addSeconds(second) {
        return this.addMilliseconds(second * 1000);
    };
    function addMinutes(minute) {
        return this.addSeconds(minute * 60);
    };
    function addHours(hour) {
        return this.addMinutes(60 * hour);
    };

    function addDays(day) {
        return this.addHours(day * 24);
    };

    function addMonths(month) {
        var addMonth = month % 12;
        var addYear = parseInt(month / 12);

        var now = this;
        var newyear = now.getFullYear() + addYear;

        var newmonth = addMonth + now.getMonth() + 1;

        if (newmonth > 12) {
            newyear++;
            newmonth = newmonth - 12;
        } else if (newmonth < 1) {
            newyear--;
            newmonth = 12 + newmonth;
        }
        newmonth = newmonth - 1;

        var day = this.getDate();

        var theLastDayOfMonth = Date.prototype.theLastDayOfMonth(new Date(newyear, newmonth, 1));
        if (theLastDayOfMonth < day) {
            day = theLastDayOfMonth;
        }

        var result = new Date(newyear, newmonth, day, this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());

        return result;
    };

    function addYears(year) {
        return new Date(this.getFullYear() + year, this.getMonth(), this.getDate(), this.getHours(), this.getMinutes(), this.getSeconds(), this.getMilliseconds());
    };

    function isLeapYear(year) {
        if (!year) {
            year = this.getFullYear();
        }
        if (year % 100 === 0) {
            return year % 400 === 0;
        } else {
            return year % 4 === 0;
        }
    };

    function isTheLastDayOfMonth(date) {
        var month, day;
        if (!date) {
            date = this;
        }
        month = this.getMonth() + 1;
        day = this.getDate();
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return day === 31;
            case 4:
            case 6:
            case 9:
            case 11:
                return day === 30;
            case 2:
                return date.isLeapYear() ? (day === 29) : (day === 28);
            default:
                throw "error month";
        }
    };

    function theLastDayOfMonth(date) {
        if (!date) {
            date = this;
        }
        var month = date.getMonth() + 1;
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
            case 4:
            case 6:
            case 9:
            case 11:
                return 30;
            case 2:
                return date.isLeapYear() ? 29 : 28;
            default:
                throw "error month";
        }
    };

    extend("diff", true, function (date2, format) {
        return diff(date2, format);
    });

    extend("format", true, function (fmt) {
        return format(fmt);
    });

    extend("addMilliseconds", true, function (milliseconds) {
        return addMilliseconds(milliseconds);
    });

    extend("addSeconds", true, function (seconds) {
        return addSeconds(seconds);
    });

    extend("addMinutes", true, function (minutes) {
        return addMinutes(minutes);
    });

    extend("addHours", true, function (hours) {
        return addHours(hours);
    });


    extend("addDays", true, function (days) {
        return addDays(days);
    });

    extend("addMonths", true, function (months) {
        return addMonths(months);
    });

    extend("addYears", true, function (years) {
        return addYears(years);
    });

    extend("isLeapYear", true, function (year) {
        return isLeapYear(year);
    });

    extend("isTheLastDayOfMonth", true, function (date) {
        return isTheLastDayOfMonth(date);
    });
    
    extend("theLastDayOfMonth", true, function (date) {
        return theLastDayOfMonth(date);
    });
})();