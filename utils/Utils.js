const slugToText = (slug) => {
    let words = slug.split('-');

    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }

    return words.join(' ');
}

const textToSlug = (string) => {
    return string.trim().replace(/\s+/g, '-').toLowerCase();
}

export {textToSlug, slugToText}