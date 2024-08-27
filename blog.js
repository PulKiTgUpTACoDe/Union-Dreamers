const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right');
const sidebarWrapper = document.querySelector('.sidebar-wrapper');
const openSidebarButton = document.querySelector('.open-sidebar');
const closeSidebarButton = document.querySelector('.close-sidebar');
const sidebar = document.querySelector('.sidebar');
const sidebarButtonHolder = document.querySelector('.sidebar-button-holder');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }
        else{
            entry.target.classList.remove('show');
        }
    })
});

hiddenElements.forEach((el) => observer.observe(el));

openSidebarButton.addEventListener('click', ()=>{
    sidebar.style.transform = 'translateX(0)';
    sidebarWrapper.style.transform = 'translateX(0)';
    sidebarButtonHolder.style.display = 'none';
    console.log(123);
    
})

closeSidebarButton.addEventListener('click', ()=>{
    sidebarWrapper.style.transform = 'translateX(-100%)';
    sidebar.style.transform = 'translateX(-100%)';
    sidebarButtonHolder.style.display = 'block';
})