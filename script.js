
                // Digital clock
                function updateClock() {
                    const now = new Date();
                    const h = String(now.getHours()).padStart(2, '0');
                    const m = String(now.getMinutes()).padStart(2, '0');
                    const s = String(now.getSeconds()).padStart(2, '0');
                    document.getElementById('digitalClock').textContent = `${h}:${m}:${s}`;
                }
                setInterval(updateClock, 1000);
                updateClock();
        // Variables
        let isPlaying = false;
        let charIndex = 0;
        let particles = [];
        const colors = ['#64b5f6', '#ffffff', '#e1f5fe'];
        const titleText = "Giáng Sinh Vui Vẻ Nhé!";
        const titleElement = document.getElementById('typingTitle');

        // Typing effect
        function typeWriter() {
            if (charIndex < titleText.length) {
                titleElement.innerHTML += titleText.charAt(charIndex) ;
                charIndex++;
                setTimeout(typeWriter, 50);
            } else {
                setTimeout(() => titleElement.classList.remove('typing-cursor'), 2000);
            }
        } 

        // Snow setup
        function setupSnow() {
            createSnowflakes('snowStage', 50);
            createSnowflakes('snowMain', 50);
        }

        function createSnowflakes(containerId, count) {
            const container = document.getElementById(containerId);
            if (!container) return;
            
            for (let i = 0; i < count; i++) {
                const flake = document.createElement('div');
                flake.className = 'snowflake';
                flake.innerHTML = '❄';
                flake.style.left = Math.random() * 100 + '%';
                flake.style.fontSize = (Math.random() * 10 + 10) + 'px';
                flake.style.animationDuration = (Math.random() * 5 + 5) + 's';
                flake.style.animationDelay = Math.random() * 2 + 's';
                container.appendChild(flake);
            }
        }

        // Envelope handling
        let opened = false;
        function handleOpen() {
            if (opened) return;
            opened = true;

            const env = document.getElementById('env');
            const card = document.getElementById('card');
            //const audio = document.getElementById('audio');

            env.classList.add('open');
            //audio.play().catch(e => console.log('Audio play failed:', e));

            setTimeout(() => {
                card.classList.add('expanded');
                setTimeout(() => {
                    card.classList.add('unfold');
                    setTimeout(() => {
                        showMainContent();
                    }, 3500);
                }, 500);
            }, 800);
        }

        function showMainContent() {
            const stage = document.getElementById('stage');
            const mainContent = document.getElementById('mainContent');
            const audio = document.getElementById('bgMusic');

            stage.classList.add('zoom-out-effect');
            
            setTimeout(() => {
                stage.style.display = 'none';
                mainContent.classList.add('active');
                
                // Start background music
                audio.volume = 0.5;
                audio.play().then(() => {
                    document.getElementById('musicToggle').innerHTML = '<i class="fas fa-pause"></i>';
                    document.getElementById('musicWave').classList.remove('paused');
                    isPlaying = true;
                }).catch(e => console.log("Cần tương tác thêm để phát nhạc"));

                // Start typing effect
                setTimeout(typeWriter, 1000);

                // Activate reveal animations
                setTimeout(() => {
                    document.querySelectorAll('.reveal').forEach(el => {
                        el.classList.add('active');
                    });
                }, 500);

                // Fire confetti
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
                });
            }, 1200);
        }

        // Music player controls
        const bgMusic = document.getElementById('bgMusic');
        const musicBtn = document.getElementById('musicToggle');
        const musicWave = document.getElementById('musicWave');

        if (musicBtn) {
            musicBtn.addEventListener('click', () => {
                if (isPlaying) {
                    bgMusic.pause();
                    musicBtn.innerHTML = '<i class="fas fa-play"></i>';
                    musicWave.classList.add('paused');
                } else {
                    bgMusic.play();
                    musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
                    musicWave.classList.remove('paused');
                }
                isPlaying = !isPlaying;
            });
        }

        // 3D Tilt effect
        const card = document.getElementById('tiltCard');
        document.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768 || !card) return;

            const x = (window.innerWidth / 2 - e.pageX) / 25;
            const y = (window.innerHeight / 2 - e.pageY) / 25;
            
            card.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
        });

        // Lightbox
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightboxImg');
        const closeBtn = document.getElementById('lightboxClose');
        
        document.querySelectorAll('.photo-item img').forEach(img => {
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
            });
        });

        const closeLightbox = () => lightbox.classList.remove('active');
        
        if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if(e.target === lightbox) closeLightbox();
            });
        }

        // Scroll reveal observer
        const observerOptions = {
            threshold: 0.15
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));