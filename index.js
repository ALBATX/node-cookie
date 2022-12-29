var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;

function isDate(val) {
    return Object.prototype.toString.call(val) === '[object Date]' || val instanceof Date;
}

function cookie() {}

cookie.parse = function(str) {
    if (typeof str !== 'string') return;

    var obj = {};

    var index = 0;
    while (index < str.length) {
        var eqIdx = str.indexOf('=', index);
        if (eqIdx === -1) break;

        var endIdx = str.indexOf(';', index);

        if (endIdx === -1) endIdx = str.length;
        else if (endIdx < eqIdx) {
            index = str.lastIndexOf(';', eqIdx - 1) + 1;
            continue;
        }

        var key = str.slice(index, eqIdx).trim();

        if (undefined === obj[key]) {
            var val = str.slice(eqIdx + 1, endIdx).trim();
            if (val.charCodeAt(0) === 0x22) val = val.slice(1, -1);

            try {
                obj[key] = val.indexOf('%') !== -1 ? decodeURIComponent(val) : val;
            } catch (e) {
                obj[key] = val;
            }
        }

        index = endIdx + 1;
    }

    return obj;
}

cookie.serialize = function(name, val, options) {
    var opt = options || {};

    if (!fieldContentRegExp.test(name)) throw new TypeError('argument name is invalid');

    var value = encodeURIComponent(val);

    if (value && !fieldContentRegExp.test(value)) throw new TypeError('argument val is invalid');

    var str = name + '=' + value;

    if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) throw new TypeError('option maxAge is invalid');
        str += '; Max-Age=' + Math.floor(maxAge);
    }

    if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) throw new TypeError('option domain is invalid');
        str += '; Domain=' + opt.domain;
    }

    if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) throw new TypeError('option path is invalid');
        str += '; Path=' + opt.path;
    }

    if (opt.expires) {
        var expires = opt.expires
        if (!isDate(expires) || isNaN(expires.valueOf())) throw new TypeError('option expires is invalid');
        str += '; Expires=' + expires.toUTCString()
    }

    if (opt.httpOnly) str += '; HttpOnly';
    if (opt.secure) str += '; Secure';

    if (opt.priority) {
        var priority = typeof opt.priority === 'string' ? opt.priority.toLowerCase() : opt.priority;

        switch (priority) {
            case 'low': str += '; Priority=Low'; break;
            case 'medium': str += '; Priority=Medium'; break;
            case 'high': str += '; Priority=High'; break;
            default: throw new TypeError('option priority is invalid');
        }
    }

    if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === 'string' ? opt.sameSite.toLowerCase() : opt.sameSite;

        switch (sameSite) {
            case true: str += '; SameSite=Strict'; break;
            case 'lax': str += '; SameSite=Lax'; break;
            case 'strict': str += '; SameSite=Strict'; break;
            case 'none': str += '; SameSite=None'; break;
            default: throw new TypeError('option sameSite is invalid');
        }
    }

    return str;
}
