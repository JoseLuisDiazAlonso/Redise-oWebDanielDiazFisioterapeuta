/**En este archivo vamos a darle funcionalidad al botón del menú que nos permitirá abrir y cerrar el menú en formato móvil */

const nav = document.querySelector('.nav');
const toggle = nav.querySelector('.nav__toggle');
const menu = nav.querySelector('#nav-menu');
const desktop = window.matchMedia('(min-width: 768px)');

function setOpen (open) {
    nav.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
}

const isOpen = () => nav.classList.contains('is-open');

//Abrir y cerrar con el botón
toggle.addEventListener('click', () => setOpen(!isOpen()));

//Cerramos al pulsar un enlace
menu.addEventListener('click', (e) => {
    if(e.target.closest('a')) setOpen(false);
});

//Cerrar con Escape y devolver el foco al botón
document.addEventListener('keydown', (e) => {
    if(e.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
    }
});

//Cerrar al hacer clic fuera del menú
document.addEventListener('click', (e) => {
    if(isOpen() && !nav.contains(e.target)) setOpen(false);
});

