let currentMode = 'encode';

function simpleHash(str) {
    let hash = 0;
    for (let c of str) {
        hash = ((hash << 5) - hash) + c.charCodeAt(0);
        hash |= 0;
    }
    return Math.abs(hash) % 256;
}

function encryptText(text, password) {
    const key = simpleHash(password);
    return [...text]
        .map(c => (c.charCodeAt(0) ^ key).toString(2).padStart(8, '0'))
        .join(' ');
}

function decryptBinary(binary, password) {
    const key = simpleHash(password);
    return binary
        .trim()
        .split(/\s+/)
        .map(b => String.fromCharCode(parseInt(b, 2) ^ key))
        .join('');
}

function getPasswordStrength(pwd) {
    if (!pwd) return 'None';
    if (pwd.length < 4) return 'Weak';
    if (pwd.length < 8) return 'Medium';
    return 'Strong';
}

function convert() {
    const input = inputText.value.trim();
    const password = passwordInput.value.trim();

    if (!input || !password) {
        showNotification('Input & password required!', true);
        return;
    }

    let result;
    if (currentMode === 'encode') {
        result = encryptText(input, password);
    } else {
        try {
            result = decryptBinary(input, password);
        } catch {
            showNotification('Invalid binary or password', true);
            return;
        }
    }

    output.textContent = result;
    updateStats(result.length, result.replace(/\s/g,'').length, getPasswordStrength(password));
}

function setMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
    clearAll();
}

function togglePassword() {
    passwordInput.type =
        passwordInput.type === 'password' ? 'text' : 'password';
}

function copyOutput() {
    navigator.clipboard.writeText(output.textContent);
    showNotification('Copied!');
}

function clearAll() {
    inputText.value = '';
    passwordInput.value = '';
    output.textContent = 'Your encrypted/decrypted result will appear here...';
    updateStats(0,0,'None');
}

function updateStats(chars, binary, strength) {
    charCount.textContent = chars;
    binaryCount.textContent = binary;
    strengthEl.textContent = strength;
}

function showNotification(msg, error=false) {
    notification.textContent = msg;
    notification.classList.toggle('error', error);
    notification.classList.add('show');
    setTimeout(()=>notification.classList.remove('show'),3000);
}

/* DOM Shortcuts */
const inputText = document.getElementById('inputText');
const passwordInput = document.getElementById('password');
const output = document.getElementById('output');
const charCount = document.getElementById('charCount');
const binaryCount = document.getElementById('binaryCount');
const strengthEl = document.getElementById('strength');
const notification = document.getElementById('notification');
