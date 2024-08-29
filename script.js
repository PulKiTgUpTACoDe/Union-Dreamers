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


// Show login/signup page

function showPage() {
    document.querySelector('.box').style.display = 'flex';
    document.querySelector('.overlay').style.display = 'block';
    sidebarWrapper.style.display = 'none';
    document.body.classList.add('no-scroll');
}

function hidePage() {
    document.querySelector('.box').style.display = 'none';
    document.querySelector('.overlay').style.display = 'none';
    sidebarWrapper.style.display = 'default';
    document.body.classList.remove('no-scroll');

     // Clear all input fields within the .box
     const inputs = document.querySelectorAll('.box input');
     inputs.forEach(input => {
         input.value = '';  // Clear the input field
     });
}

// Toggle between login and signup forms

document.querySelector('.signup-link').addEventListener('click', () => {
    document.querySelector('.forms').classList.add('show-signup');
});

document.querySelector('.login-link').addEventListener('click', () => {
    document.querySelector('.forms').classList.remove('show-signup');
});

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

// chatbot

function showChatbot() {
    document.querySelector('.msg').style.display = 'none';  // Hides element with class "msg"
    document.querySelector('.chatbot-container').style.display = 'flex';  // Shows element with class "chatbot-container"
}

function hideBot() {
    document.querySelector('.msg').style.display = 'flex';
    document.querySelector('.chatbot-container').style.display = 'none';

     // Clear all input fields within the .box
     const inputs = document.querySelectorAll('user-input');
     inputs.forEach(input => {
         input.value = '';  // Clear the input field
     });
}

function showWelcomeMessage() {
    var chatOutput = document.getElementById("chat-output");
    var welcomeMessage = "<p><strong>Bot:</strong> Welcome to Union Dreamers! How can I assist you today?</p>";
    chatOutput.innerHTML += welcomeMessage;
}

function submitChat() {
    var userInput = document.getElementById("user-input").value;
    var chatOutput = document.getElementById("chat-output");

    // Add user input to chat
    var userHtml = "<p><strong>You:</strong> " + userInput + "</p>";
    chatOutput.innerHTML += userHtml;

    // Generate bot response
    var botResponse = getBotResponse(userInput);
    var botHtml = "<p><strong>Bot:</strong> " + botResponse + "</p>";
    chatOutput.innerHTML += botHtml;

    // Clear user input field
    document.getElementById("user-input").value = "";

    // Scroll to the bottom of the chat
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

function getBotResponse(input) {
    // Simple keyword-based responses
    input = input.toLowerCase();
    
        if (input.includes("what is union dreamers") || input.includes("about your website")) {
            return "Union Dreamers is a platform dedicated to spreading education by providing various resources and learning modules.";
        } else if (input.includes("features") || input.includes("what can i do here")) {
            return "You can explore interactive learning modules, participate in discussion forums, and get career guidance.";
        } else if (input.includes("future plans") || input.includes("future")) {
            return "We plan to partner with educational institutions, introduce AI-driven learning experiences, and expand our resource library.";
        } else if (input.includes("business potential")) {
            return "Union Dreamers has great business potential with plans for monetization through subscriptions, premium content, and partnerships.";
        } else if (input.includes("contact") || input.includes("reach out")) {
            return "You can contact us via our contact form on the website, or email us at info@uniondreamers.com.";
        } 
        if (input.includes("what is union dreamers") || input.includes("about your website") || input.includes("union dreamers")) {
            return "Union Dreamers is a platform dedicated to spreading education by providing various resources and learning modules.";
        } else if (input.includes("how do i sign up") || input.includes("sign up") || input.includes("register")) {
            return "You can sign up by clicking the 'Sign Up' button on the homepage and filling out the registration form with your details. Once registered, you can access all our resources.";
        } else if (input.includes("is the content free") || input.includes("free content") || input.includes("pricing")) {
            return "Most of the content on Union Dreamers is free. However, we also offer premium content that requires a subscription. We strive to make education as accessible as possible.";
        } else if (input.includes("what subjects do you cover") || input.includes("subjects") || input.includes("topics")) {
            return "We cover a wide range of subjects, including science, technology, engineering, mathematics, humanities, and more. Our resource library is constantly growing to include new topics.";
        } else if (input.includes("can i contribute content") || input.includes("contribute") || input.includes("submit content")) {
            return "Yes, we encourage educators and experts to contribute to our platform. You can submit your content through our 'Contribute' section after signing up as a content creator.";
        } else if (input.includes("how can i track my progress") || input.includes("track progress") || input.includes("progress")) {
            return "Once you're signed in, you can track your learning progress through your dashboard. You'll see completed modules, ongoing courses, and your overall progress.";
        } else if (input.includes("do you offer certificates") || input.includes("certificates") || input.includes("certificate")) {
            return "Yes, upon completing certain courses and modules, you can receive certificates. These certificates can be added to your portfolio or LinkedIn profile.";
        } else if (input.includes("what is your refund policy") || input.includes("refund policy") || input.includes("refund")) {
            return "We offer a 30-day refund policy for any premium subscriptions. If you're not satisfied with our services, you can request a refund within this period.";
        } else if (input.includes("how can i contact support") || input.includes("contact support") || input.includes("support")) {
            return "You can reach our support team via the 'Contact Us' page, or by emailing support@uniondreamers.com. We're here to help with any issues you might encounter.";
        } else if (input.includes("can i access content offline") || input.includes("offline access") || input.includes("offline")) {
            return "Currently, no. But we're working on it";
        } else if (input.includes("what are the benefits of premium subscription") || input.includes("premium subscription") || input.includes("premium")) {
            return "A premium subscription gives you access to exclusive content, live webinars, advanced learning modules, and personalized mentorship. It’s a great way to enhance your learning experience.";
        } else if (input.includes("do you have partnerships with schools") || input.includes("partnerships") || input.includes("schools")) {
            return "We are actively working on partnerships with educational institutions to provide accredited courses and expand our reach. Stay tuned for updates on this!";
        } else if (input.includes("how can i volunteer") || input.includes("volunteer") || input.includes("mentor")) {
            return "If you're interested in volunteering or becoming a mentor, you can sign up through our 'Volunteer' section. We welcome passionate individuals who want to make a difference in others' educational journeys.";
        } else if (input.includes("is there a mobile app") || input.includes("mobile app") || input.includes("app")) {
            return "Currently, no. But we're working on it. You can download it from the Google Play Store or Apple App Store once available.";
        } else if (input.includes("how often is new content added") || input.includes("new content") || input.includes("updates")) {
            return "We add new content regularly, with updates occurring weekly. Our goal is to keep the platform fresh and relevant with the latest educational resources.";
        } else if (input.includes("what makes union dreamers different") || input.includes("difference") || input.includes("unique")) {
            return "Union Dreamers stands out because of our focus on community-driven learning, personalized content, and accessibility. We aim to create an inclusive platform where everyone can learn and grow.";
        } else if (input.includes("how do i reset my password") || input.includes("reset password") || input.includes("forgot password")) {
            return "You can reset your password by clicking the 'Forgot Password' link on the login page. You'll receive an email with instructions on how to reset it.";
        } else if (input.includes("is there a community or forum") || input.includes("community") || input.includes("forum")) {
            return "Yes, we have an active community forum where learners can discuss topics, ask questions, and share knowledge. You can join the forum by signing up on our website.";
        } else if (input.includes("what kind of mentorship do you offer") || input.includes("mentorship") || input.includes("mentor")) {
            return "Our mentorship program pairs you with experienced professionals who provide personalized guidance based on your learning goals. You can sign up for mentorship through your dashboard.";
        } else if (input.includes("how can i give feedback") || input.includes("feedback") || input.includes("review")) {
            return "We value your feedback! You can provide feedback through the 'Contact Us' page or by filling out the feedback form available in your account settings.";
        } else if (input.includes("can i suggest new features") || input.includes("suggest features") || input.includes("new features")) {
            return "Absolutely! We welcome suggestions from our users. You can suggest new features or content through the 'Suggest a Feature' section on our website.";
        } else if (input.includes("do you offer scholarships") || input.includes("scholarships") || input.includes("financial aid")) {
            return "Yes, we offer scholarships and financial aid for certain courses and premium content. You can find more information in the 'Scholarships' section of our website.";
        } else if (input.includes("what are the technical requirements") || input.includes("technical requirements") || input.includes("requirements")) {
            return "Our platform is accessible on most modern web browsers and devices. For the best experience, we recommend using the latest version of Chrome, Firefox, Safari, or Edge.";
        } else if (input.includes("can i collaborate with other learners") || input.includes("collaborate") || input.includes("projects")) {
            return "Yes, we encourage collaboration! Our platform includes features that allow you to work on projects with other learners. You can find collaboration opportunities in the 'Projects' section.";
        } else if (input.includes("how can i keep up with the latest updates") || input.includes("latest updates") || input.includes("news")) {
            return "You can stay updated by subscribing to our newsletter or following us on social media. We regularly share news, updates, and new content announcements.";
        } else if (input.includes("do you have a referral program") || input.includes("referral program") || input.includes("referral")) {
            return "Yes, we have a referral program where you can invite friends to join Union Dreamers. You'll earn rewards for every successful referral. Check out the 'Referral Program' section for more details.";
        } else if (input.includes("can i integrate my progress with linkedin") || input.includes("linkedin") || input.includes("integrate")) {
            return "Yes, you can connect your Union Dreamers account with LinkedIn to showcase your completed courses, certificates, and learning achievements.";
        } else if (input.includes("are there any offline events") || input.includes("offline events") || input.includes("workshops")) {
            return "We occasionally host offline events and workshops in various locations. You can check our 'Events' page for upcoming events near you.";
        } else if (input.includes("how do you ensure quality of content") || input.includes("quality of content") || input.includes("quality")) {
            return "We have a rigorous content review process that involves experts in various fields. Additionally, user feedback helps us maintain and improve the quality of our content.";
        } else if (input.includes("what security measures are in place") || input.includes("security measures") || input.includes("security")) {
            return "We take data security seriously and implement industry-standard measures to protect your information. Our privacy policy details how we handle and safeguard your data.";
        } else if (input.includes("how can educators or institutions partner") || input.includes("partnerships") || input.includes("educators")) {
            return "Educators or institutions interested in partnering with us can reach out via our 'Partnerships' page. We’re always looking to collaborate with like-minded organizations.";
        } else if (input.includes("is there a limit to courses") || input.includes("limit courses") || input.includes("how many courses")) {
            return "There’s no limit to the number of courses you can enroll in. You can explore and learn at your own pace across a variety of subjects.";
        } else if (input.includes("do you offer content for beginners") || input.includes("content for beginners") || input.includes("beginners")) {
            return "Yes, we have a wide range of content suitable for beginners. Our resources are categorized by difficulty level, so you can start with the basics and progress as you learn.";
        } else if (input.includes("how do i report a problem") || input.includes("report a problem") || input.includes("report issue")) {
            return "If you encounter any issues, you can report them through the 'Report a Problem' section, or by contacting our support team directly. We’ll address the problem as quickly as possible.";
        } else {
            return "I'm sorry, I didn't understand your question. Could you please rephrase it or ask something else about Union Dreamers?";
        }
    
}

document.addEventListener("DOMContentLoaded", function() {
    showWelcomeMessage();
});

var map = L.map('map').setView([51.505, -0.09], 13); // Set your location and zoom level here

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([51.505, -0.09]).addTo(map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
