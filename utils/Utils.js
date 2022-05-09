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

const hashCode = (string) =>  {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        let char = string.charCodeAt(i);
        hash = ((hash<<5)-hash)+char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

export {textToSlug, slugToText, hashCode}