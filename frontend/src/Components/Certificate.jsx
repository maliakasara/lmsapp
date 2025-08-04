import React, { useEffect } from 'react';
import VanillaTilt from 'vanilla-tilt';

const Certificate = () => {
  useEffect(() => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('current-date').textContent = today.toLocaleDateString('en-US', options);

    VanillaTilt.init(document.getElementById('certificate'), {
      max: 5,
      speed: 400,
      glare: true,
      'max-glare': 0.2,
    });

    const colors = ['#d4af37', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6', '#f1c40f', '#1abc9c', '#e67e22'];
    const shapes = ['circle', 'square', 'triangle'];

    function createConfetti() {
      const confettiCount = 200;
      const container = document.body;

      for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
          const confetti = document.createElement('div');
          confetti.className = 'confetti';

          const color = colors[Math.floor(Math.random() * colors.length)];
          const shape = shapes[Math.floor(Math.random() * shapes.length)];
          const size = Math.random() * 10 + 5;

          const certificateRect = document.getElementById('certificate').getBoundingClientRect();
          const startX = certificateRect.left + certificateRect.width / 2;
          const startY = certificateRect.top + certificateRect.height / 2;

          const angle = Math.random() * Math.PI * 2;
          const velocity = Math.random() * 10 + 15;
          const velocityX = Math.cos(angle) * velocity;
          const velocityY = Math.sin(angle) * velocity;

          confetti.style.backgroundColor = color;
          confetti.style.width = `${size}px`;
          confetti.style.height = `${size}px`;
          confetti.style.position = 'fixed';
          confetti.style.left = `${startX}px`;
          confetti.style.top = `${startY}px`;
          confetti.style.opacity = '1';
          confetti.style.pointerEvents = 'none';

          if (shape === 'circle') {
            confetti.style.borderRadius = '50%';
          } else if (shape === 'triangle') {
            confetti.style.width = '0';
            confetti.style.height = '0';
            confetti.style.backgroundColor = 'transparent';
            confetti.style.borderLeft = `${size / 2}px solid transparent`;
            confetti.style.borderRight = `${size / 2}px solid transparent`;
            confetti.style.borderBottom = `${size}px solid ${color}`;
          }

          container.appendChild(confetti);

          let posX = startX;
          let posY = startY;
          let rotation = 0;
          const rotationSpeed = Math.random() * 10 - 5;
          const gravity = 0.2;
          let opacityValue = 1;

          const animateConfetti = () => {
            if (opacityValue <= 0) {
              confetti.remove();
              return;
            }

            posX += velocityX;
            posY += velocityY + gravity;
            rotation += rotationSpeed;
            opacityValue -= 0.005;

            confetti.style.left = `${posX}px`;
            confetti.style.top = `${posY}px`;
            confetti.style.transform = `rotate(${rotation}deg)`;
            confetti.style.opacity = opacityValue;

            requestAnimationFrame(animateConfetti);
          };

          requestAnimationFrame(animateConfetti);
        }, Math.random() * 500);
      }
    }

    setTimeout(createConfetti, 500);
    const btn = document.getElementById('celebrate');
    btn.addEventListener('click', createConfetti);
    return () => {
      btn.removeEventListener('click', createConfetti);
    };
  }, []);

  return (
<div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 px-4 py-6 font-['Montserrat'] text-[#2c3e50] dark:text-white">

  {/* Title */}
  <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Certificate</h1>

  {/* Certificate Card */}
  <div
    id="certificate"
    className="bg-white dark:bg-gray-900 w-full max-w-3xl sm:p-10 p-6 rounded-xl border-4 border-[#d4af37] shadow-2xl relative overflow-hidden"
  >
    {/* Border Decoration */}
    <div className="absolute inset-0 border-pattern pointer-events-none z-10"
      style={{
        border: "12px solid transparent",
        borderImage: "url(\"data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,0 L100,0 L100,100 L0,100 L0,0 Z M10,10 L10,90 L90,90 L90,10 L10,10 Z' fill='%23d4af37'/%3E%3C/svg%3E\") 30 stretch"
      }}
    ></div>

    <div className="text-center mb-8 relative z-20">
      <h2 className="text-2xl sm:text-4xl md:text-5xl font-['Playfair_Display'] mb-2">
        Certificate of Course Completion
      </h2>
      <div className="w-24 sm:w-32 h-1 bg-[#d4af37] mx-auto mb-4"></div>
      <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg">This certificate is proudly presented to</p>
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 mb-4">Zahid Hydri</h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
        For successfully completing the course with excellence and commitment. Your dedication to learning and growth is truly commendable. We applaud your achievement and wish you continued success!
      </p>
    </div>

    {/* Signature and Date */}
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10 relative z-20">
      <div className="signature text-xl sm:text-2xl font-[cursive] text-center sm:text-left">
        <p>Instructor</p>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Course Mentor</p>
      </div>
      <div className="text-center sm:text-right">
        <p className="text-gray-600 dark:text-gray-400">Date</p>
        <p className="font-semibold text-sm sm:text-base" id="current-date"></p>
      </div>
    </div>

    {/* Button */}
    <div className="mt-8 text-center relative z-20">
      <button
        id="celebrate"
        className="bg-[#d4af37] hover:bg-[#c19b2e] text-white font-bold py-3 px-6 rounded-full transition duration-300 transform hover:scale-105 focus:outline-none text-sm sm:text-base"
      >
        Celebrate Zahid's Achievement!
      </button>
    </div>

    {/* Seal */}
    <svg className="seal absolute bottom-6 right-6 sm:bottom-8 sm:right-8 w-20 sm:w-24 h-20 sm:h-24 opacity-80 z-20" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="45" fill="none" stroke="#d4af37" strokeWidth="2" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#d4af37" strokeWidth="1" />
      <path d="M50,10 L50,90 M10,50 L90,50" stroke="#d4af37" strokeWidth="1" />
      <circle cx="50" cy="50" r="20" fill="none" stroke="#d4af37" strokeWidth="1" />
      <text x="50" y="54" textAnchor="middle" fontFamily="serif" fontSize="10" fill="#d4af37">
        CERTIFIED
      </text>
    </svg>
  </div>
</div>

  );
};

export default Certificate;
