// =======================
// script.js
// =======================

// Counter Animation
const counters = document.querySelectorAll('.counter');
counters.forEach(counter => {
  counter.innerText = '0';
  const updateCounter = () => {
    const target = +counter.getAttribute('data-target');
    const current = +counter.innerText;
    const increment = target / 100;
    if (current < target) {
      counter.innerText = `${Math.ceil(current + increment)}`;
      setTimeout(updateCounter, 20);
    } else {
      counter.innerText = target;
    }
  };
  updateCounter();
});

// Portfolio Filter
const filterButtons = document.querySelectorAll('#filters .btn');
const projectCards = document.querySelectorAll('#projectGrid > div');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('#filters .btn.active')?.classList.remove('active');
    button.classList.add('active');

    const category = button.getAttribute('data-filter');
    projectCards.forEach(card => {
      if (category === 'all' || card.classList.contains(category)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Chatbot Logic
document.addEventListener("DOMContentLoaded", () => {
  const chatbot = document.getElementById('chatbot');
  const chatbotBody = chatbot.querySelector('.chatbot-body');
  const chatbotHeader = chatbot.querySelector('.chatbot-header');

  // Toggle visibility
  chatbotHeader.addEventListener('click', () => {
    chatbot.classList.toggle('active');
  });

  // Load HTML UI
  chatbotBody.innerHTML = `
    <div class="chat-log">
      <p>Hello! 👋 I'm your virtual assistant.</p>
      <p>Try asking me:</p>
      <ul>
        <li>Tell me about your Data Analytics projects</li>
        <li>What web & design work do you do?</li>
        <li>What services do you offer?</li>
        <li>How can I contact you?</li>
      </ul>
    </div>
    <div class="chatbot-input">
      <input type="text" id="userInput" placeholder="Type your question..." />
      <button id="sendBtn">Send</button>
    </div>
  `;

  const sendBtn = chatbot.querySelector('#sendBtn');
  const userInput = chatbot.querySelector('#userInput');
  const chatLog = chatbot.querySelector('.chat-log');

  const getBotResponse = (message) => {
    const msg = message.toLowerCase();

    if (msg.includes('data') || msg.includes('analytics') || msg.includes('dashboard')) {
      return "I've worked on interactive dashboards, predictive modeling, and business reporting using tools like Excel, Power BI, and Python.";
    }

    if (msg.includes('web') || msg.includes('design') || msg.includes('website')) {
      return "I design and develop responsive websites using HTML, CSS, JavaScript, Bootstrap, and modern UI libraries.";
    }

    if (msg.includes('services') || msg.includes('offer') || msg.includes('provide')) {
      return "My services include Data Analysis, Web Development, Digital Marketing Strategy, Branding, and Photography.";
    }

    if (msg.includes('contact') || msg.includes('email') || msg.includes('reach')) {
      return "You can contact me via the form below or reach out on LinkedIn, WhatsApp, or Email — links are in the footer!";
    }

    return "🤖 Sorry, I didn't understand that. Please try rephrasing your question.";
  };

  const addToChat = (sender, text) => {
    chatLog.innerHTML += `<p><strong>${sender}:</strong> ${text}</p>`;
    chatLog.scrollTop = chatLog.scrollHeight;
  };

  const handleSend = () => {
    const question = userInput.value.trim();
    if (question) {
      addToChat('You', question);
      const response = getBotResponse(question);
      addToChat('Bot', response);
      userInput.value = '';
    }
  };

  sendBtn.addEventListener('click', handleSend);
  userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
  });
});

// Debugging logs for chatbot functionality
console.log('Chatbot script loaded');

// Check if chatbot elements exist
if (chatbot) {
  console.log('Chatbot element found:', chatbot);
} else {
  console.error('Chatbot element not found');
}

if (chatbotBody) {
  console.log('Chatbot body element found:', chatbotBody);
} else {
  console.error('Chatbot body element not found');
}

if (chatbotHeader) {
  console.log('Chatbot header element found:', chatbotHeader);
} else {
  console.error('Chatbot header element not found');
}

// Log event listener attachment
chatbotHeader.addEventListener('click', () => {
  console.log('Chatbot header clicked');
  chatbot.classList.toggle('active');
});

// Log user input and responses
sendBtn.addEventListener('click', () => {
  console.log('Send button clicked');
  const question = userInput.value.trim();
  console.log('User input:', question);
  if (question) {
    const response = getBotResponse(question);
    console.log('Bot response:', response);
  }
});

// Dark Mode Toggle using Bootstrap's JavaScript utilities
const toggleThemeButton = document.getElementById('toggleTheme');
const themeIcon = document.querySelector('.theme-icon');

// Initialize theme on page load
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-bs-theme', savedTheme);
themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

// Toggle theme on button click
toggleThemeButton.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-bs-theme');
  console.log('Current theme:', currentTheme);

  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.body.setAttribute('data-bs-theme', newTheme);
  console.log('New theme set:', newTheme);

  themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  console.log('Theme icon updated to:', themeIcon.textContent);

  localStorage.setItem('theme', newTheme);
  console.log('Theme saved to localStorage:', newTheme);
});

// Chatbot functionality
const chatbotToggle = document.querySelector('.chatbot-toggle');
const chatbotBody = document.querySelector('.chatbot-body');

chatbotToggle.addEventListener('click', () => {
  chatbotBody.classList.toggle('d-none');
});

chatbotBody.innerHTML = `
  <div class="p-3">
    <p><strong>Chatbot:</strong> Hi! How can I assist you today?</p>
    <div class="input-group mt-3">
      <input type="text" id="chatInput" class="form-control" placeholder="Type your question...">
      <button id="sendBtn" class="btn btn-primary">Send</button>
    </div>
    <div id="chatOutput" class="mt-3"></div>
  </div>
`;

const sendBtn = document.getElementById('sendBtn');
const chatInput = document.getElementById('chatInput');
const chatOutput = document.getElementById('chatOutput');

sendBtn.addEventListener('click', () => {
  const userInput = chatInput.value.trim();
  if (userInput) {
    chatOutput.innerHTML += `<p><strong>You:</strong> ${userInput}</p>`;
    chatOutput.innerHTML += `<p><strong>Chatbot:</strong> I'm here to help, but my responses are limited for now. Please ask something else!</p>`;
    chatInput.value = '';
  }
});

// Modal Functions
function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = "block";
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
        modal.style.display = "none";
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
  const modals = document.querySelectorAll('.modal');
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});

// Navigation and Contact Form
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const contactForm = document.querySelector('form');

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      navLinks.forEach((nav) => nav.classList.remove('active'));
      event.target.classList.add('active');
    });
  });

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission
    contactForm.reset(); // Clear the form fields
    alert('Message sent successfully!'); // Optional: Notify the user
  });
});

