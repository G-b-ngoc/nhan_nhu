document.addEventListener('DOMContentLoaded', () => {
    // Các phần tử DOM
    const introScreen = document.getElementById('intro-screen');
    const mainScreen = document.getElementById('main-screen');
    const btnStart = document.getElementById('btn-start');
    const wishText = document.getElementById('wish-text');
    const bgMusic = document.getElementById('bg-music');
    const btnMusic = document.getElementById('btn-music');
    
    const btnEnergy = document.getElementById('btn-energy');
    const btnHug = document.getElementById('btn-hug');
    const btnParty = document.getElementById('btn-party');
    const btnSecret = document.getElementById('btn-secret');
    const btnReplay = document.getElementById('btn-replay');
    
    const secretModal = document.getElementById('secret-modal');
    const btnCloseModal = document.getElementById('btn-close-modal');
    const floatingContainer = document.getElementById('floating-container');

    // Nội dung lời chúc
    const wishContent = `Tuần này thật bận rộn! ☀️
    <br><br>
    Nếu nay có mệt mỏi một chút thì cũng đừng suy nghĩ quá nhiều nhé =)).<br><br>
    cố lênnn!`;

    let isPartyMode = false;
    let partyInterval;

    // 1. Chuyển cảnh & Hiệu ứng đánh máy
    btnStart.addEventListener('click', () => {
        // Pháo hoa mini lúc mới vào
        fireworks();
        
        // Chuyển màn hình
        introScreen.classList.remove('active');
        setTimeout(() => {
            mainScreen.classList.remove('hidden');
            mainScreen.classList.add('active');
            typeWriterEffect(wishContent, wishText, 30); // Tốc độ đánh máy
        }, 500);
    });

    function typeWriterEffect(text, element, speed) {
        element.innerHTML = '';
        let i = 0;
        let isTag = false;
        let textVal = "";

        function type() {
            if (i < text.length) {
                textVal += text.charAt(i);
                element.innerHTML = textVal;
                
                // Xử lý để in thẻ <br> không bị lỗi
                if (text.charAt(i) === '<') isTag = true;
                if (text.charAt(i) === '>') isTag = false;

                i++;
                if (isTag) {
                    type(); // Đánh máy qua tag HTML nhanh chóng
                } else {
                    setTimeout(type, speed);
                }
            }
        }
        type();
    }

    // 2. Nút "Nạp thêm năng lượng"
    const quotes = ["Hằng xinh gái 🌟", "Hằng cố lên! 🎭", "Tự tin lên, siêu nhân! 🦸", "Cười lên cái coi! 😁", "Xinh gái/Đẹp trai nhất vùng! ✨"];
    btnEnergy.addEventListener('click', (e) => {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        createFloatingElement(randomQuote, e.clientX, e.clientY, '#ff6b6b');
    });

    // 3. Nút "Gửi một chiếc ôm"
    btnHug.addEventListener('click', (e) => {
        createFloatingElement("🫂 Ôm một cái lấy may nè!", e.clientX, e.clientY, '#ff9a9e');
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createFloatingElement("💖", e.clientX + (Math.random() * 60 - 30), e.clientY + (Math.random() * 30), null, true);
            }, i * 100);
        }
    });

    function createFloatingElement(text, x, y, color, isEmoji = false) {
        const el = document.createElement('div');
        el.className = 'floating-item';
        el.innerHTML = text;
        el.style.left = `${x}px`;
        el.style.top = `${y - 20}px`;
        if (color && !isEmoji) el.style.color = color;
        if (isEmoji) el.style.fontSize = '2rem';
        
        floatingContainer.appendChild(el);
        setTimeout(() => el.remove(), 3000);
    }

    // 4. Nút "Bật chế độ vui vẻ" (Pháo hoa)
    btnParty.addEventListener('click', () => {
        isPartyMode = !isPartyMode;
        if (isPartyMode) {
            btnParty.innerText = "Tắt chế độ vui vẻ 🛑";
            btnParty.style.background = "#ff9a9e";
            partyInterval = setInterval(() => {
                confetti({
                    particleCount: 50,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#ff9a9e', '#a1c4fd', '#fecfef']
                });
                confetti({
                    particleCount: 50,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#ff9a9e', '#a1c4fd', '#fecfef']
                });
            }, 1000);
        } else {
            btnParty.innerText = "Bật chế độ vui vẻ 🎉";
            btnParty.style.background = "";
            clearInterval(partyInterval);
        }
    });

    function fireworks() {
        const duration = 2000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) { return Math.random() * (max - min) + min; }

        const interval = setInterval(function() {
            const timeLeft = animationEnd - Date.now();
            if (timeLeft <= 0) return clearInterval(interval);
            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

    // 5. Nút "Lời nhắn bí mật"
    btnSecret.addEventListener('click', () => {
        secretModal.classList.remove('hidden');
        secretModal.classList.add('active');
    });

    btnCloseModal.addEventListener('click', () => {
        secretModal.classList.remove('active');
        setTimeout(() => secretModal.classList.add('hidden'), 400);
    });

    // 6. Nhạc nền
    let isPlaying = false;
    btnMusic.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            btnMusic.innerText = "🎵 Bật nhạc";
        } else {
            bgMusic.play().catch(e => console.log("Trình duyệt chặn autoplay"));
            btnMusic.innerText = "🔇 Tắt nhạc";
        }
        isPlaying = !isPlaying;
    });

    // 7. Chơi lại từ đầu
    btnReplay.addEventListener('click', () => {
        mainScreen.classList.remove('active');
        setTimeout(() => {
            mainScreen.classList.add('hidden');
            introScreen.classList.add('active');
            wishText.innerHTML = "";
            if (isPartyMode) btnParty.click(); // Tắt pháo hoa nếu đang bật
        }, 500);
    });
});