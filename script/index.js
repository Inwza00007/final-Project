const mockUser = {
    username: "Poramin",  
    password: "Sudsanguan",
    email: "Poramin@gmail.com"
};




if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
}

 
// Add ripple effect to button
document.querySelector('button[type="submit"]').addEventListener('mousedown', function(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size/2;
    const y = e.clientY - rect.top - size/2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
        background: rgba(255,255,255,0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
});

function createJWT(payload, secret, expireSec = 20) {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const body = btoa(JSON.stringify({
        ...payload,
        exp: Date.now() + expireSec * 1000,  
    }));
    const signature = btoa(`${header}.${body}.${secret}`);
    return `${header}.${body}.${signature}`;  
}

document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === mockUser.username && password === mockUser.password) {  
        const token = createJWT({ username: mockUser.username }, "mysecret", 20);

        localStorage.setItem("token", token);
        localStorage.setItem("username", username);  
        localStorage.setItem("password", password);

        alert("Login successful");
        window.location.href = "home.html";
    } else {
        alert("Invalid username or password");  
    }
});