(function () {
  const fontLink = document.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&family=Poppins:wght@300;400;500;600;700&display=swap';
  document.head.appendChild(fontLink);

  const host = document.createElement('div');
  document.body.appendChild(host);
  const shadow = host.attachShadow({ mode: 'open' });

  const style = document.createElement('style');
  style.textContent = `
    * {
      font-family: "Poppins", sans-serif;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      list-style-type: none;
      text-decoration: none;
    }

    #chatbot-toggler {
      position: fixed;
      bottom: 30px;
      right: 35px;
      border: none;
      height: 50px;
      width: 50px;
      cursor: pointer;
      border-radius: 50%;
      background: rgb(96, 96, 241);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    #chatbot-toggler span {
      color: white;
      position: absolute;
      font-family: 'Material Symbols Outlined';
      font-size: 1.4rem;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    #chatbot-toggler .icon-open {
      opacity: 1;
      transform: scale(1);
    }

    #chatbot-toggler .icon-close {
      opacity: 0;
      transform: scale(0.5);
    }

    .chatbot-popup {
      position: fixed;
      bottom: 95px;
      right: 35px;
      width: 420px;
      background: #fff;
      overflow: hidden;
      border-radius: 15px;
      box-shadow: 0 0 128px rgba(0,0,0,0.1), 0 32px 64px -48px rgba(0,0,0,0.5);
      z-index: 9998;
      opacity: 0;
      pointer-events: none;
      transform: translateY(20px) scale(0.95);
      transform-origin: bottom right;
      transition: opacity 0.3s ease, transform 0.3s ease;
    }

    .chat-header {
      display: flex;
      align-items: center;
      background-color: rgb(194, 194, 236);
      padding: 15px 22px;
      justify-content: space-between;
    }

    .chat-header .header-info {
      display: flex;
      gap: 10px;
      align-items: center;
    }

    .header-info .chatbot-logo {
      height: 35px;
      width: 35px;
      padding: 6px;
      fill: rgb(0, 0, 255);
      background-color: #fff;
      flex-shrink: 0;
      border-radius: 50%;
    }

    .header-info .logo-text {
      color: rgb(0, 0, 0);
      font-size: 1.31rem;
      font-weight: 600;
    }

    .chat-header #close-chat {
      border: none;
      color: white;
      height: 40px;
      width: 40px;
      font-size: 1.9rem;
      margin-right: -10px;
      padding-top: 2px;
      cursor: pointer;
      border-radius: 50%;
      background: none;
      transition: 0.3s ease;
      font-family: 'Material Symbols Outlined';
    }

    .chat-header #close-chat:hover {
      background: rgb(4, 4, 69);
    }

    .chat-body {
      padding: 25px 22px;
      display: flex;
      gap: 20px;
      overflow-y: auto;
      flex-direction: column;
      height: 460px;
      margin-bottom: 82px;
      scrollbar-width: thin;
      scrollbar-color: #ccccf5 transparent;
    }

    .chat-body .message {
      display: flex;
      align-items: center;
      gap: 11px;
    }

    .chat-body .user-message {
      flex-direction: column;
      align-items: flex-end;
    }

    .chat-body .bot-message .bot-avatar {
      height: 35px;
      width: 35px;
      padding: 6px;
      fill: rgb(255, 255, 255);
      background-color: rgb(0, 0, 255);
      flex-shrink: 0;
      margin-bottom: 2px;
      align-self: flex-end;
      border-radius: 50%;
    }

    .chat-body .message .message-text {
      padding: 12px 16px;
      max-width: 75%;
      font-size: 0.95rem;
    }

    .chat-body .bot-message .message-text {
      background: rgba(194, 194, 235, 0.508);
      border-radius: 13px 13px 13px 3px;
    }

    .chat-body .user-message .message-text {
      background: rgb(102, 102, 240);
      border-radius: 13px 13px 3px 13px;
      color: #fff;
    }

    .chat-body .user-message .attachment {
      width: 50%;
      margin-top: -7px;
      border-radius: 13px 13px 3px 13px;
    }

    .chat-body .bot-message.thinking .message-text {
      padding: 2px 16px;
    }

    .thinking-indicator {
      display: flex;
      gap: 4px;
      padding-block: 15px;
    }

    .thinking-indicator .dot {
      height: 7px;
      width: 7px;
      opacity: 0.7;
      border-radius: 50%;
      background: rgb(102, 102, 240);
      animation: dotPulse 1.8s ease-in-out infinite;
    }

    .thinking-indicator .dot:nth-child(1) { animation-delay: 0.2s; }
    .thinking-indicator .dot:nth-child(2) { animation-delay: 0.3s; }
    .thinking-indicator .dot:nth-child(3) { animation-delay: 0.4s; }

    @keyframes dotPulse {
      0%, 44% { transform: translateY(0); }
      28% { opacity: 0.4; transform: translateY(-4px); }
      44% { opacity: 0.2; }
    }

    .chat-footer {
      position: absolute;
      bottom: 0;
      background: white;
      padding: 15px 22px 20px;
      width: 100%;
    }

    .chat-footer .chat-form {
      display: flex;
      align-items: center;
      background: white;
      outline: 1px solid rgba(194, 194, 235, 0.508);
      border-radius: 32px;
    }

    .chat-footer .chat-form:focus-within {
      outline: 2px solid rgba(194, 194, 235, 0.508);
    }

    .chat-form .message-input {
      border: none;
      outline: none;
      height: 47px;
      width: 100%;
      resize: none;
      font-size: 0.95rem;
      padding: 15px 0 13px 18px;
      border-radius: inherit;
      overflow: hidden;
      font-family: "Poppins", sans-serif;
    }

    .chat-form .chat-controls {
      display: flex;
      align-items: center;
      align-self: flex-end;
      padding-right: 6px;
      height: 47px;
      gap: 3px;
    }

    .chat-form .chat-controls button {
      height: 35px;
      width: 35px;
      border: none;
      cursor: pointer;
      font-size: 1.15rem;
      background-color: aliceblue;
      color: rgb(102, 102, 240);
      border-radius: 50%;
      transition: 0.3s ease;
      font-family: 'Material Symbols Outlined';
    }

    .chat-form .chat-controls #send-message {
      color: white;
      background: rgb(102, 102, 240);
      display: none;
    }

    .chat-form .message-input:valid ~ .chat-controls #send-message {
      display: block;
    }

    .chat-form .chat-controls button:hover {
      background: rgb(102, 102, 240);
      color: white;
    }

    .chat-form .file-upload-wrapper {
      height: 35px;
      width: 35px;
      position: relative;
    }

    .chat-form .file-upload-wrapper :where(img, button) {
      position: absolute;
    }

    .chat-form .file-upload-wrapper img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
    }

    .chat-form .file-upload-wrapper #file-cancel {
      color: red;
      background: white;
    }

    .chat-form .file-upload-wrapper :where(img, #file-cancel),
    .chat-form .file-upload-wrapper.file-uploaded #file-upload {
      display: none;
    }

    .chat-form .file-upload-wrapper.file-uploaded img,
    .chat-form .file-upload-wrapper.file-uploaded:hover #file-cancel {
      display: block;
    }

    @media (max-width: 520px) {
      #chatbot-toggler {
        right: 20px;
        bottom: 20px;
      }
      .chatbot-popup {
        right: 0;
        bottom: 0;
        height: 100%;
        border-radius: 0;
        width: 100%;
      }
      .chatbot-popup .chat-header {
        padding: 12px 15px;
      }
      .chat-body {
        height: 80vh;
        padding: 25px 15px;
      }
      .chat-footer {
        padding: 10px 15px 15px;
      }
    }
  `;

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <button id="chatbot-toggler">
      <span class="material-symbols-outlined">mode_comment</span>
    </button>

    <div class="chatbot-popup">
      <div class="chat-header">
        <div class="header-info">
          <svg class="chatbot-logo" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
            <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"/>
          </svg>
          <h2 class="logo-text">MntLabsAI</h2>
        </div>
        <button id="close-chat" class="material-symbols-outlined">keyboard_arrow_down</button>
      </div>

      <div class="chat-body">
        <div class="message bot-message">
          <svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
            <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"/>
          </svg>
          <div class="message-text">Hey there <br> What are we doing today?</div>
        </div>
      </div>

      <div class="chat-footer">
        <form action="#" class="chat-form">
          <textarea placeholder="Message..." class="message-input" required></textarea>
          <div class="chat-controls">
            <button type="button" class="material-symbols-outlined">sentiment_satisfied</button>
            <div class="file-upload-wrapper">
              <input type="file" accept="image/*" id="file-input" hidden>
              <img src="#" alt="">
              <button type="button" id="file-upload" class="material-symbols-outlined">attach_file</button>
              <button type="button" id="file-cancel" class="material-symbols-outlined">close</button>
            </div>
            <button type="submit" id="send-message" class="material-symbols-outlined">arrow_upward</button>
          </div>
        </form>
      </div>
    </div>
  `;

  shadow.appendChild(style);
  shadow.appendChild(wrapper);


  const API_URL = "https://mntlabs.mahamule-ntshangase1533.workers.dev";

  // all queries scoped to shadow so they never touch the host page
  const $ = (sel) => shadow.querySelector(sel);

  const messageInput = $('.message-input');
  const chatBody = $('.chat-body');
  const sendMessageButton = $('#send-message');
  const fileInput = $('#file-input');
  const fileUploadWrapper = $('.file-upload-wrapper');
  const chatbotToggler = $('#chatbot-toggler');
  const closeChat = $('#close-chat');
  const chatPopup = $('.chatbot-popup');
  const iconOpen = $('.icon-open');
  const iconClose = $('.icon-close');

  const userData = {
    message: null,
    file: { data: null, mime_type: null }
  };

  const createMessageElement = (content, ...classes) => {
    const div = document.createElement('div');
    div.classList.add('message', ...classes);
    div.innerHTML = content;
    return div;
  };

  const generateBotResponse = async (incomingMessageDiv) => {
    const messageElement = incomingMessageDiv.querySelector('.message-text');
    const userContent = userData.file.data
      ? [
          { type: "text", text: userData.message },
          { type: "image_url", image_url: { url: `data:${userData.file.mime_type};base64,${userData.file.data}` } }
        ]
      : userData.message;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({
        model: "openai/gpt-4o",
        messages: [
          { role: "system", content: "You are a helpful assistant for MNTLabs." },
          { role: "user", content: userContent }
        ]
      })
    };
    try {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || 'Something went wrong');
      const apiResponseText = data.choices[0].message.content.replace(/\*\*(.*?)\*\*/g, '$1').trim();
      messageElement.innerText = apiResponseText;
    } catch (error) {
      messageElement.innerText = error.message;
      messageElement.style.color = '#ff0000';
    } finally {
      userData.file = {};
      incomingMessageDiv.classList.remove('thinking');
      chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
    }
  };

  const handleOutgoingMessage = (e) => {
    e.preventDefault();
    userData.message = messageInput.value.trim();
    messageInput.value = '';

    const messageContent = `<div class="message-text"></div>
      ${userData.file.data ? `<img src="data:${userData.file.mime_type};base64,${userData.file.data}" class="attachment"/>` : ''}`;
    const outgoingMessageDiv = createMessageElement(messageContent, 'user-message');
    outgoingMessageDiv.querySelector('.message-text').textContent = userData.message;
    chatBody.appendChild(outgoingMessageDiv);
    chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });

    setTimeout(() => {
      const botContent = `
        <svg class="bot-avatar" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 1024 1024">
          <path d="M738.3 287.6H285.7c-59 0-106.8 47.8-106.8 106.8v303.1c0 59 47.8 106.8 106.8 106.8h81.5v111.1c0 .7.8 1.1 1.4.7l166.9-110.6 41.8-.8h117.4l43.6-.4c59 0 106.8-47.8 106.8-106.8V394.5c0-59-47.8-106.9-106.8-106.9zM351.7 448.2c0-29.5 23.9-53.5 53.5-53.5s53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5-53.5-23.9-53.5-53.5zm157.9 267.1c-67.8 0-123.8-47.5-132.3-109h264.6c-8.6 61.5-64.5 109-132.3 109zm110-213.7c-29.5 0-53.5-23.9-53.5-53.5s23.9-53.5 53.5-53.5 53.5 23.9 53.5 53.5-23.9 53.5-53.5 53.5zM867.2 644.5V453.1h26.5c19.4 0 35.1 15.7 35.1 35.1v121.1c0 19.4-15.7 35.1-35.1 35.1h-26.5zM95.2 609.4V488.2c0-19.4 15.7-35.1 35.1-35.1h26.5v191.3h-26.5c-19.4 0-35.1-15.7-35.1-35.1zM561.5 149.6c0 23.4-15.6 43.3-36.9 49.7v44.9h-30v-44.9c-21.4-6.5-36.9-26.3-36.9-49.7 0-28.6 23.3-51.9 51.9-51.9s51.9 23.3 51.9 51.9z"/>
        </svg>
        <div class="message-text">
          <div class="thinking-indicator">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>`;
      const incomingMessageDiv = createMessageElement(botContent, 'bot-message', 'thinking');
      chatBody.appendChild(incomingMessageDiv);
      chatBody.scrollTo({ top: chatBody.scrollHeight, behavior: 'smooth' });
      generateBotResponse(incomingMessageDiv);
    }, 600);
  };

  let isOpen = false;
  const toggleChat = () => {
    isOpen = !isOpen;
    chatPopup.style.opacity = isOpen ? '1' : '0';
    chatPopup.style.pointerEvents = isOpen ? 'all' : 'none';
    chatPopup.style.transform = isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)';
    chatbotToggler.style.opacity = isOpen ? '0' : '1';
    chatbotToggler.style.pointerEvents = isOpen ? 'none' : 'all';
    chatbotToggler.style.transform = isOpen ? 'scale(0.5)' : 'scale(1)';
  };

  chatbotToggler.addEventListener('click', toggleChat);
  closeChat.addEventListener('click', toggleChat);

  messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) handleOutgoingMessage(e);
  });

  sendMessageButton.addEventListener('click', (e) => handleOutgoingMessage(e));
  $('#file-upload').addEventListener('click', () => fileInput.click());

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      fileUploadWrapper.querySelector('img').src = e.target.result;
      fileUploadWrapper.classList.add('file-uploaded');
      userData.file = {
        data: e.target.result.split(',')[1],
        mime_type: file.type
      };
      fileInput.value = '';
    };
    reader.readAsDataURL(file);
  });

  $('#file-cancel').addEventListener('click', () => {
    fileUploadWrapper.querySelector('img').src = '#';
    fileUploadWrapper.classList.remove('file-uploaded');
    userData.file = { data: null, mime_type: null };
  });
})();
