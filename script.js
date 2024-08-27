const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right');
const sidebarWrapper = document.querySelector('.sidebar-wrapper');
const openSidebarButton = document.querySelector('.open-sidebar');
const closeSidebarButton = document.querySelector('.close-sidebar');
const sidebar = document.querySelector('.sidebar');
const sidebarButtonHolder = document.querySelector('.sidebar-button-holder');

const rootStyles = getComputedStyle(document.documentElement);
// let primaryBackground = rootStyles.getPropertyValue('--primary-background')

const toggleBtn = document.querySelector('.toggleMode');


let lightMode = true;
const handleToggleMode = ()=>{
    if(lightMode){
        document.documentElement.style.setProperty('--primary-background', 'hsl(0,0%,0%)');
        document.documentElement.style.setProperty('--secondary-background-color', 'hsl(29, 100%, 95%)');
        document.documentElement.style.setProperty('--primary-font-color', 'hsl(29, 100%, 95%)');
        document.documentElement.style.setProperty('--secondary-font-color', 'hsl(0, 0%, 60%)');
        document.querySelector('.main button').style.color = 'black';
        lightMode = !lightMode;
    } else{
        document.documentElement.style.setProperty('--primary-background', 'hsl(29, 100%, 95%)');
        document.documentElement.style.setProperty('--secondary-background-color', 'hsl(0, 0%, 0%)');
        document.documentElement.style.setProperty('--primary-font-color', 'hsl(0, 0%, 0%)');
        document.documentElement.style.setProperty('--secondary-font-color', 'hsl(0, 0%, 100%)');
        document.querySelector('.main button').style.color = 'white';
        lightMode = !lightMode;
    }
}

toggleBtn.addEventListener('click', handleToggleMode);

// const socials = document.querySelector('social-links');

// function isClickable(element){
//     const computedStyle = window.getComputedStyle(element);
//     if(computedStyle.visibility !== 'visible' || computedStyle.display === 'none'){
//         return false;
//     }

//     const rect = element.getBoundingClientRect();
//     const elementAtPoint = document.elementFromPoint(rect.x +rect.width / 2, rect.y + rect.height / 2);
//     return elementAtPoint === element;
// }
// if(isClickable(openSidebarButton)){
//     console.log('clickable');
// }
// else{
//     console.log('unclickable');
// }


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

const handleOnMouseMove = e => {
    const { currentTarget: target } = e;

    const rect = target.getBoundingClientRect(),
        x = e.clientX - rect.left,
        y = e.clientY - rect.top;

    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
}

for(const card of document.querySelectorAll('.course-content')){
    card.onmousemove = e => handleOnMouseMove(e);
}

hiddenElements.forEach((el) => observer.observe(el));

openSidebarButton.addEventListener('click', ()=>{
    sidebar.style.transform = 'translateX(0)';
    sidebarWrapper.style.transform = 'translateX(0)';
    sidebarButtonHolder.style.display = 'none';
})

closeSidebarButton.addEventListener('click', ()=>{
    sidebarWrapper.style.transform = 'translateX(-100%)';
    sidebar.style.transform = 'translateX(-100%)';
    sidebarButtonHolder.style.display = 'block';
})