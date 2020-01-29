const ipRegex = require('ip-regex');
const tlds = require('tlds');
const normalizeUrl = require('normalize-url');

const urlRegex = options => {
    options = {
        strict: true,
        ...options
    };

    const protocol = `(?:(?:[a-z]+:)?//)${options.strict ? '' : '?'}`;
    const auth = '(?:\\S+(?::\\S*)?@)?';
    const ip = ipRegex.v4().source;
    const host = '(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)';
    const domain = '(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*';
    const tld = `(?:\\.${options.strict ? '(?:[a-z\\u00a1-\\uffff]{2,})' : `(?:${tlds.sort((a, b) => b.length - a.length).join('|')})`})\\.?`;
    const port = '(?::\\d{2,5})?';
    const path = '(?:[/?#][^\\s"]*)?';
    const regex = `((?:${protocol}|www\\.)${auth}(?:localhost|${ip}|${host}${domain}${tld})${port}${path})`;

    return options.exact ? new RegExp(`(?:^${regex}$)`, 'i') : new RegExp(regex, 'ig');
};

const parseUrls = (string) => {
    return string.split(urlRegex({
        strict: false
    })).map((value, index) => {
        let obj = {};
        if (index % 2) {
            obj = {
                type: "link",
                text: value,
                url: normalizeUrl(value)
            }
        } else {
            obj = {
                type: "text",
                text: value
            }
        }
        return obj
    })
}

const formatText = (parsedEmoteString) => {
    return parsedEmoteString.map((value) => {
        let result;
        if(value.type === "text") {
            result = getAsString(value.text);
        }
        if(value.type === "emote") {
            const datajson = { src: `http://static-cdn.jtvnw.net/emoticons/v1/${value.id}/3.0`, title: value.name }
            result = `<div data-for="emote" style="height: 1em;vertical-align: middle;display: inline-flex;align-items: center;justify-content: center;"><img data-for="emote" data-tip=${JSON.stringify(datajson)} class="emoticon" src="https://static-cdn.jtvnw.net/emoticons/v1/${value.id}/1.0" alt="${value.name}" /></div>`
        }
        return result;
    }).join('');
}

const getAsString = (string) => {
    return string.replace(urlRegex({strict: false}), match => `<a target='_blank' style='color: white;vertical-align: middle;' href='${normalizeUrl(match)}'>${match}</a>`);
}

module.exports = {
    urlRegex,
    parseUrls,
    getAsString,
    formatText
}