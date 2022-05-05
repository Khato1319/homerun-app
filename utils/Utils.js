function makeTitle(slug) {
    var words = slug.split('-');

    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }

    return words.join(' ');
}

export default function slugConverter(string) {
    const slug = string.trim().replace(/\s+/g, '-').toLowerCase();
    const displayName = makeTitle(slug);
    if (string.toLowerCase() === string) {
        return displayName
    }
    return slug;
}