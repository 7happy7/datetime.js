class datetime extends Date {
    constructor(loc={}) {
        super();
        this.locale = Object.assign({
            en: {
                A: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                a: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                B: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                b: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
            }
        }, loc)
    }

    add({year=0, month=0, days=0, hours=0, mins=0, secs=0}={}) {
        !year || this.setYear(this.getYear() + year);
        !month || this.setMonth(this.getMonth() + month);
        !days || this.setDate(this.getDate() + days);
        !hours || this.setHours(this.getHours() + hours);
        !mins || this.setMinutes(this.getMinutes() + mins);
        !secs || this.setSeconds(this.getSeconds() + secs);
    }

    strftime(s, l="en") {
        var a = {
            y: this.getFullYear(),
            m: this.getMonth() + 1,
            d: this.getDate(),
            a: this.getDay(),
            H: this.getHours(),
            M: this.getMinutes(),
            S: this.getSeconds(),
            MS: this.getMilliseconds(),
            _utc: this.getTimezoneOffset() / -60
        }
    
        var b = Math.floor((this - new Date(a.y,0,1)) / 24 / 60 / 60 / 1000 + 1);
        var loc = {
            "0": ["Africa/Casablanca", "Atlantic/Reykjavik", "Europe/London", "Etc/GMT"],
            "1": ["Europe/Berlin", "Europe/Paris", "Africa/Lagos", "Europe/Budapest", "Europe/Warsaw", "Africa/Windhoek"],
            "2": ["Europe/Istanbul", "Europe/Kiev", "Africa/Cairo", "Asia/Damascus", "Asia/Amman", "Africa/Johannesburg", "Asia/Jerusalem", "Asia/Beirut"],
            "3": ["Asia/Baghdad", "Europe/Minsk", "Asia/Riyadh", "Africa/Nairobi"],
            "4": ["Europe/Moscow", "Asia/Tbilisi", "Asia/Yerevan", "Asia/Dubai", "Asia/Baku", "Indian/Mauritius"],
            "5": ["Asia/Tashkent", "Asia/Karachi"],
            "6": ["Asia/Almaty", "Asia/Dhaka", "Asia/Yekaterinburg"],
            "7": ["Asia/Bangkok", "Asia/Novosibirsk"],
            "8": ["Asia/Krasnoyarsk", "Asia/Ulaanbaatar", "Asia/Shanghai", "Australia/Perth", "Asia/Singapore", "Asia/Taipei"],
            "9": ["Asia/Irkutsk", "Asia/Seoul", "Asia/Tokyo"],
            "10": ["Australia/Hobart", "Asia/Yakutsk", "Australia/Brisbane", "Pacific/Port_Moresby", "Australia/Sydney"],
            "11": ["Asia/Vladivostok", "Pacific/Guadalcanal"],
            "12": ["Etc/GMT-12", "Pacific/Fiji", "Asia/Magadan", "Pacific/Auckland"],
            "13": ["Pacific/Tongatapu", "Pacific/Apia"],
            "-12": ["Etc/GMT+12"],
            "-11": ["Etc/GMT+11"],
            "-10": ["Pacific/Honolulu"],
            "-9": ["America/Anchorage"],
            "-8": ["America/Santa_Isabel", "America/Los_Angeles"],
            "-7": ["America/Chihuahua", "America/Phoenix", "America/Denver"],
            "-6": ["America/Guatemala", "America/Chicago", "America/Regina", "America/Mexico_City"],
            "-5": ["America/Bogota", "America/Indiana/Indianapolis", "America/New_York"],
            "-4.5": ["America/Caracas"],
            "-4": ["America/Halifax", "America/Asuncion", "America/La_Paz", "America/Cuiaba", "America/Santiago"],
            "-3.5": ["America/St_Johns"],
            "-3": ["America/Sao_Paulo", "America/Godthab", "America/Cayenne", "America/Argentina/Buenos_Aires", "America/Montevideo"],
            "-2": ["Etc/GMT+2"],
            "-1": ["Atlantic/Cape_Verde", "Atlantic/Azores"],
            "3.5": ["Asia/Tehran"],
            "4.5": ["Asia/Kabul"],
            "5.5": ["Asia/Colombo", "Asia/Kolkata"],
            "5.75": ["Asia/Kathmandu"],
            "6.5": ["Asia/Yangon"],
            "9.5": ["Australia/Darwin", "Australia/Adelaide"]
        };
        var dict = {
            d: ("0" + a.d).slice(-2),
            m: ("0" + a.m).slice(-2),
            y: String(a.y).slice(-2),
            Y: String(a.y),
            H: ("0" + a.H).slice(-2),
            I: ("0" + (a.H % 12)).slice(-2),
            p: a.H < 12 ? "AM" : "PM",
            M: ("0" + a.M).slice(-2),
            S: ("0" + a.S).slice(-2),
            f: ("00" + a.MS + "000").slice(-6),
            A: (this.locale[l] && this.locale[l].A ? this.locale[l].A : this.locale.en.A)[a.a],
            a: (this.locale[l] && this.locale[l].a ? this.locale[l].a : this.locale.en.a)[a.a],
            B: (this.locale[l] && this.locale[l].B ? this.locale[l].B : this.locale.en.B)[a.m - 1],
            b: (this.locale[l] && this.locale[l].b ? this.locale[l].b : this.locale.en.b)[a.m - 1],
            w: String(a.a),
            j: ("00" + b).slice(-3),
            z: (a._utc < 0 ? "-" : "+") + ("0" + Math.floor(a._utc * (a._utc < 0 ? -1 : 1))).slice(-2) + ("0" + (a._utc % 1 * 60)).slice(-2),
            Z: loc[String(a._utc)].join(", "),
            "%": "%"
        };
        dict.c = dict.a + " " + dict.b + " " + dict.d + " " + dict.H + ":" + dict.M + ":" + dict.S + " " + dict.Y;
        dict.x = dict.Y + "/" + dict.m + "/" + dict.d;
        dict.X = dict.H + ":" + dict.M + ":" + dict.S;
    
        return s.replace(/%([a-zA-Z%])/g, function(a, b) {
            return dict[b] || a;
        });
    }
}
