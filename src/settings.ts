import { getCurrentWindow } from '@tauri-apps/api/window';

interface ChatService {
  id: string;
  name: string;
  url: string;
  icon: string;
}

const API_SERVICES_URL = 'https://ai-pet-prompts-api.code123.in/api/services';
const DEFAULT_FALLBACK_URL = 'https://kimi.moonshot.cn/';

const serviceList = document.getElementById('service-list');
const customUrlInput = document.getElementById('custom-url') as HTMLInputElement;

let selectedUrl = localStorage.getItem('ai-pet-chat-url') || DEFAULT_FALLBACK_URL;
let remoteServices: ChatService[] = [];

const normalize = (u: string) => u.replace(/\/$/, '').toLowerCase();

async function savePreference(url: string) {
  if (!url.startsWith('http')) {
    alert('请输入有效的 http/https 网址');
    return;
  }
  localStorage.setItem('ai-pet-chat-url', url);
  selectedUrl = url;
  renderServices();
}

async function fetchServices() {
  try {
    const res = await fetch(API_SERVICES_URL);
    const json = await res.json();
    if (json.success && Array.isArray(json.data)) {
      remoteServices = json.data;
    }
  } catch (err) {
    console.error('Failed to fetch services from API:', err);
    // Fallback to minimal Kimi if API fails
    remoteServices = [{ id: 'kimi', name: 'Kimi (Moonshot)', url: 'https://kimi.moonshot.cn/', icon: 'https://www.moonshot.cn/favicon.ico' }];
  }
  renderServices();
}

function renderServices() {
  if (!serviceList) return;
  serviceList.innerHTML = '';
  
  remoteServices.forEach(s => {
    const isSelected = normalize(selectedUrl) === normalize(s.url);
    const card = document.createElement('div');
    card.className = `service-card ${isSelected ? 'selected' : ''}`;
    card.innerHTML = `
      <img src="${s.icon}" class="service-icon" onerror="this.src='https://api.iconify.design/material-symbols:chat-outline.svg'">
      <div class="service-info">
        <span class="service-name">${s.name}</span>
        <span class="service-url">${s.url}</span>
      </div>
      <div class="check-icon">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
      </div>
    `;

    card.addEventListener('click', async () => {
      await savePreference(s.url);
      customUrlInput.value = ''; 
    });

    serviceList.appendChild(card);
  });
  
  // Update custom input if current choice isn't in remote list
  const isPreset = remoteServices.some(s => normalize(s.url) === normalize(selectedUrl));
  if (!isPreset && selectedUrl !== DEFAULT_FALLBACK_URL) {
    customUrlInput.value = selectedUrl;
  }
}

customUrlInput?.addEventListener('keydown', async (e) => {
  if (e.key === 'Enter') {
    const val = customUrlInput.value.trim();
    if (val) {
      await savePreference(val);
    }
  }
});

// Start
fetchServices();
