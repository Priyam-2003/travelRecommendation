const navLinks = document.querySelectorAll('.nav-links li');
const sections = document.querySelectorAll('section .Home, section .About, section .Contact');
sections.forEach(sec => {
    if(sec.classList.contains('Home')) {
        sec.classList.remove('deactive');
    } else {
        sec.classList.add('deactive');
    }
});
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        const targetId = link.id;
        sections.forEach(sec => {
            if(sec.classList.contains(targetId)) {
                sec.classList.remove('deactive');
            } else {
                sec.classList.add('deactive');
            }
        });
    });
});

