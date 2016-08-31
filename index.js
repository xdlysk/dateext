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


    function diff(self, date2, format, trim) {
        if (!date2 || !(date2 instanceof Date)) {
            throw "error date2";
        }
        var date1Time = self.getTime();
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
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        if (trim) {
            return format.replace(/^(0+[^\d]+)+/, '');
        }
        return format;
    };

    function format(self, fmt) {
        if (!fmt) {
            return self.toString();
        }
        var o = {
            "M+": self.getMonth() + 1,
            "d+": self.getDate(),
            "h+": self.getHours(),
            "m+": self.getMinutes(),
            "s+": self.getSeconds(),
            "q+": Math.floor((self.getMonth() + 3) / 3),
            "f": self.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (self.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

            }
        }

        return fmt;
    };

    function addMilliseconds(self, milliseconds) {
        var m = self.getTime() + milliseconds;
        return new Date(m);
    };
    function addSeconds(self, second) {
        return self.addMilliseconds(second * 1000);
    };
    function addMinutes(self, minute) {
        return self.addSeconds(minute * 60);
    };
    function addHours(self, hour) {
        return self.addMinutes(60 * hour);
    };

    function addDays(self, day) {
        return self.addHours(day * 24);
    };

    function addMonths(self, month) {
        var addMonth = month % 12;
        var addYear = parseInt(month / 12);

        var now = self;
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

        var day = self.getDate();

        var theLastDayOfMonth = Date.prototype.theLastDayOfMonth(new Date(newyear, newmonth, 1));
        if (theLastDayOfMonth < day) {
            day = theLastDayOfMonth;
        }

        var result = new Date(newyear, newmonth, day, self.getHours(), self.getMinutes(), self.getSeconds(), self.getMilliseconds());

        return result;
    };

    function addYears(self, year) {
        return new Date(self.getFullYear() + year, self.getMonth(), self.getDate(), self.getHours(), self.getMinutes(), self.getSeconds(), self.getMilliseconds());
    };

    function isLeapYear(self, year) {
        if (!year) {
            year = self.getFullYear();
        }
        if (year % 100 === 0) {
            return year % 400 === 0;
        } else {
            return year % 4 === 0;
        }
    };

    function isTheLastDayOfMonth(self, date) {
        var month, day;
        if (!date) {
            date = self;
        }
        month = self.getMonth() + 1;
        day = self.getDate();
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

    function theLastDayOfMonth(self, date) {
        if (!date) {
            date = self;
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

    extend("diff", true, function (date2, format, trim) {
        return diff(this, date2, format, trim);
    });

    extend("format", true, function (fmt) {
        return format(this, fmt);
    });

    extend("addMilliseconds", true, function (milliseconds) {
        return addMilliseconds(this, milliseconds);
    });

    extend("addSeconds", true, function (seconds) {
        return addSeconds(this, seconds);
    });

    extend("addMinutes", true, function (minutes) {
        return addMinutes(this, minutes);
    });

    extend("addHours", true, function (hours) {
        return addHours(this, hours);
    });


    extend("addDays", true, function (days) {
        return addDays(this, days);
    });

    extend("addMonths", true, function (months) {
        return addMonths(this, months);
    });

    extend("addYears", true, function (years) {
        return addYears(this, years);
    });

    extend("isLeapYear", true, function (year) {
        return isLeapYear(this, year);
    });

    extend("isTheLastDayOfMonth", true, function (date) {
        return isTheLastDayOfMonth(this, date);
    });

    extend("theLastDayOfMonth", true, function (date) {
        return theLastDayOfMonth(this, date);
    });
})();

module.exports = {};