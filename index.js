// [...new Set(Array.prototype.map.call(document.querySelectorAll('a'), e => e.href))].filter(e => e.includes('www.gdcdsy.com')).map(e => e.split('www.gdcdsy.com')[1])
const links = [...new Set(Array.prototype.map.call(document.querySelectorAll('a'), e => e.href))]
    .filter(e => e.includes('www.gdcdsy.com'))
    .forEach(e => {
        window.open(e, '_blank');
    })
