function cookie() {}

cookie.parse = function(str) {
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
    var value = encodeURIComponent(val);
    var str = name + '=' + value;

    if (null != options.maxAge) str += '; Max-Age=' + Math.floor(options.maxAge - 0);
    if (options.domain) str += '; Domain=' + options.domain;
    if (options.path) str += '; Path=' + options.path;
    if (options.expires) str += '; Expires=' + options.expires.toUTCString();
    if (options.httpOnly) str += '; HttpOnly';
    if (options.secure) str += '; Secure';

    if (options.priority) {
        switch (typeof options.priority === 'string' ? options.priority.toLowerCase() : options.priority) {
            case 'low': str += '; Priority=Low'; break;
            case 'medium': str += '; Priority=Medium'; break;
            case 'high': str += '; Priority=High'; break;
        }
    }

    if (options.sameSite) {
        switch (typeof options.sameSite === 'string' ? options.sameSite.toLowerCase() : options.sameSite) {
            case true: str += '; SameSite=Strict'; break;
            case 'lax': str += '; SameSite=Lax'; break;
            case 'strict': str += '; SameSite=Strict'; break;
            case 'none': str += '; SameSite=None'; break;
        }
    }

    return str;
}
