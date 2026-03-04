document.addEventListener("DOMContentLoaded", () => {
    AOS.init();
    
    // Мереке күні: 6 наурыз 2026
    const eventDate = new Date('March 6, 2026 12:00:00').getTime();

    // Таймер логикасы
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = eventDate - now;
        
        if (distance < 0) {
            clearInterval(timer);
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    }, 1000);
});

// RSVP жіберу және сурет жасау
async function sendRSVP(answer) {
    const nameInput = document.getElementById('guestName');
    const name = nameInput.value.trim();

    if (!name) {
        alert('Есіміңізді енгізіңіз');
        return;
    }

    alert('Рахмет! Шақырту қағазы дайындалуда, 3-5 секунд күте тұрыңыз...');
    generateInvitation(name);
}

function generateInvitation(name) {
    const container = document.createElement('div');
    
    // Шақырту суретінің дизайны
    Object.assign(container.style, {
        width: '600px',
        height: '800px',
        backgroundImage: 'url("photo.jpeg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        border: '15px solid #F7DC6F',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '40px',
        position: 'fixed',
        left: '-9999px',
        top: '0',
        color: '#5D4037',
        fontFamily: "'Times New Roman', serif"
    });

    container.innerHTML = `
        <div style="background: rgba(255, 255, 255, 0.85); padding: 40px; border-radius: 20px; width: 80%;">
            <h1 style="color: #B7950B; font-size: 32px; margin-bottom: 20px;">"Анаға апарар жол"</h1>
            <p style="font-size: 22px;">Құрметті <b>${name}</b>!</p>
            <p style="font-size: 18px; line-height: 1.5;">Сізді көктемнің көрікті мерекесі – Аналар күніне арналған салтанатты кешіміздің қадірлі қонағы болуға шақырамыз!</p>
            <div style="margin: 20px auto; width: 50%; border-top: 2px solid #FBC02D;"></div>
            <p style="font-size: 20px;"><b>6 НАУРЫЗ | 12:00</b><br>Мәжіліс залы</p>
            <p style="margin-top: 30px; font-style: italic; font-size: 18px;">Ізгі ниетпен, тәрбие орталығы</p>
        </div>
    `;

    document.body.appendChild(container);

    html2canvas(container, { useCORS: true }).then(canvas => {
        const imgData = canvas.toDataURL('image/jpeg', 0.9);
        const invitationImg = document.getElementById('invitation-image');
        const downloadLink = document.getElementById('download-link');
        const invContainer = document.getElementById('invitation-container');

        if (invitationImg) invitationImg.src = imgData;
        if (downloadLink) downloadLink.href = imgData;
        
        invContainer.style.display = 'block';
        invContainer.scrollIntoView({ behavior: 'smooth' });

        document.body.removeChild(container);
    }).catch(err => {
        console.error("Қате шықты:", err);
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const musicControl = document.getElementById("music-control");
    const backgroundMusic = document.getElementById("background-music");
    const musicIcon = document.getElementById("music-icon");

    // 1. Музыканы іске қосу функциясы
    const playMusic = () => {
        // Егер музыка ойнап тұрмаса және пайдаланушы қолмен өшірмеген болса
        if (backgroundMusic.paused && !musicControl.classList.contains('manual-paused')) {
            backgroundMusic.play().then(() => {
                musicControl.classList.add("playing");
                musicIcon.innerText = "⏸"; // Пауза белгісі
            }).catch(error => {
                // Автоматты қосылуға браузер рұқсат бермесе, келесі әрекетті күтеді
                console.log("Браузер әрекетті күтуде...");
            });
        }
    };

    // 2. Өздігінен ойнауға әрекет жасау (Бет жүктелгенде)
    playMusic();

    // 3. Кез келген "Click" немесе "Scroll" немесе "Touch" әрекеттері арқылы ойнату
    // { once: true } - бұл оқиға тек бір рет қана орындалады
    ['click', 'scroll', 'touchstart', 'wheel'].forEach(evt => 
        window.addEventListener(evt, playMusic, { once: true })
    );

    // 4. Батырманы қолмен басқандағы логика (Play/Pause)
    musicControl.addEventListener("click", (e) => {
        e.stopPropagation(); // Батырманы басқанда window click оқиғасы жүрмеуі үшін
        
        if (backgroundMusic.paused) {
            musicControl.classList.remove('manual-paused');
            playMusic();
        } else {
            musicControl.classList.add('manual-paused');
            backgroundMusic.pause();
            musicControl.classList.remove("playing");
            musicIcon.innerText = "▶"; // Ойнату белгісі
        }
    });
});