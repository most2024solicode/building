const images = [
    'banana.avif', 'orange.webp', 'apple.webp', 'kiwi.jpg', 
    'ananas.jpg', 'dla7a.webp', 'grape.png', 'avocado.png'
  ];
  const pairs = [...images, ...images];
  pairs.sort(() => Math.random() - 0.5);
  
  const windows = document.querySelectorAll('.window');
  let firstClick = null;
  let secondClick = null;
  let lock = false;
  let score = 0;
  let tries = 0;
  let timer = 0;
  let timerInterval;
  let gameStarted = false; // حالة اللعبة
  let matches = []; // مصفوفة لتخزين الصور المتشابهة
  
  // تحديث النقاط
  function updateScore() {
    document.getElementById('score').textContent = score;
  }
  
  // تحديث المحاولات
  function updateTries() {
    document.getElementById('tries').textContent = tries;
  }
  
  // تحديث العداد الزمني
  function updateTimer() {
    document.getElementById('timer').textContent = timer;
  }
  
  // تشغيل العداد الزمني
  function startTimer() {
    timerInterval = setInterval(() => {
      timer++;
      updateTimer();
    }, 1000);
  }
  
  // توقف العداد الزمني
  function stopTimer() {
    clearInterval(timerInterval);
  }
  
  // التحقق من الفوز
  function checkWin() {
    const matchedWindows = document.querySelectorAll('.matched');
    if (matchedWindows.length === windows.length) {
      stopTimer(); // إيقاف العداد عند الفوز
  
      // إظهار رسالة الفوز
      const winMessage = document.getElementById('win-message');
      const finalTime = document.getElementById('final-time');
      const finalScore = document.getElementById('final-score');
      const finalTries = document.getElementById('final-tries');
  
      finalTime.textContent = timer; // الوقت النهائي
      finalScore.textContent = score; // النقاط النهائية
      finalTries.textContent = tries; // عدد المحاولات النهائية
  
      winMessage.style.display = 'block'; // إظهار الرسالة
  
      // إخفاء الرسالة بعد 5 ثواني
      setTimeout(() => {
        winMessage.style.display = 'none'; // إخفاء الرسالة بعد 5 ثواني
      }, 5000); // 5000 ملي ثانية = 5 ثواني
  
      alert(`مبروك! فزتي باللعبة في ${timer} ثواني مع ${tries} محاولات.`);
    }
  }
  
  // عرّف الصور لكل نافذة
  windows.forEach((window, index) => {
    window.dataset.image = pairs[index];
  });
  
  // تعامل مع النقر
  windows.forEach((window) => {
    window.addEventListener('click', () => {
      if (lock || window.classList.contains('matched')) return;
  
      // تشغيل العداد عند أول نقرة
      if (!gameStarted) {
        gameStarted = true;
        startTimer();
      }
  
      // كشف الصورة
      window.style.backgroundImage = `url('./images/${window.dataset.image}')`;
  
      if (!firstClick) {
        firstClick = window;
        tries++;
        updateTries();
      } else {
        secondClick = window;
        lock = true;
        tries++;
        updateTries();
  
        if (firstClick.dataset.image === secondClick.dataset.image) {
          // مطابقة
          firstClick.classList.add('matched');
          secondClick.classList.add('matched');
          score += 10; // زيادة النقاط
          matches.push(firstClick.dataset.image); // إضافة الصورة المتشابهة
          updateScore();
  
          // إضافة تأثير النجوم
          addStars(firstClick);
          addStars(secondClick);
  
          resetClicks();
          checkWin(); // التحقق من الفوز
        } else {
          // خطأ
          setTimeout(() => {
            firstClick.style.backgroundImage = 'url("./images/blank.jpg")'; // إعادة الصورة الفارغة
            secondClick.style.backgroundImage = 'url("./images/blank.jpg")';
            resetClicks();
          }, 2000); // تأخير 2 ثانية قبل إخفاء الصور
        }
      }
    });
  });
  
  // إعادة الضبط
  function resetClicks() {
    [firstClick, secondClick, lock] = [null, null, false];
  }
  
  // زر عرض الصور المتشابهة
  document.getElementById('show-matches-btn').addEventListener('click', () => {
    windows.forEach((window) => {
      if (matches.includes(window.dataset.image)) {
        window.style.backgroundImage = `url('./images/${window.dataset.image}')`; // عرض الصور المتشابهة
      }
    });
  });
  
  // إضافة نجمات عند التطابق
function addStars(window) {
    const numberOfStars = 5; // تحديد عدد النجوم

    for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

      // تحديد موقع النجمة عشوائيًا فوق النافذة
      const x = Math.random() * 100 - 50; // التوزيع العشوائي على محور X
      const y = Math.random() * 20 - 10; // التوزيع العشوائي على محور Y
    star.style.left = `${x}%`;
    star.style.top = `${y}%`;

    window.appendChild(star);
    }
}
//  

// Khassna ndiro listeners bach b3d l-click tban fullscreen
windows.forEach((window) => {
  window.addEventListener('click', () => {
    const fullscreenContainer = document.getElementById('fullscreen-container');
    const fullscreenImage = document.getElementById('fullscreen-image');
    fullscreenImage.src = `./images/${window.dataset.image}`;
    fullscreenContainer.classList.add('active');
    // L-container ykhdem f fullscreen 2 seconds
    setTimeout(() => {
      fullscreenContainer.classList.remove('active');
      fullscreenImage.src = ''; // Tkhawi l-src bach maysarash chi glitch
    }, 2000);
  });
});



const testWindow = document.querySelector('.window.test');
const lines = testWindow.querySelector('.lines');

testWindow.addEventListener('click', () => {
  // Nchof wach class active déjà mzyoda, bach ma tkhdemch bzzaf
  if (!lines.classList.contains('active')) {
    lines.classList.add('active');
  }
});



// Jab ga3 l-windows li f .left w .right
const leftWindows = document.querySelectorAll('.left .window');
const rightWindows = document.querySelectorAll('.right .window');

// Function li katsn3a .lines w katzidha f l-window
function addLinesToWindow(windows) {
  windows.forEach((window) => {
    const linesDiv = document.createElement('div');
    linesDiv.className = 'lines';

    // Sn3a l-lines dakhil .lines
    for (let i = 1; i <= 4; i++) {
      const line = document.createElement('div');
      line.className = `line-${i}`;
      linesDiv.appendChild(line);
    }

    // Zda l-lines f window
    window.appendChild(linesDiv);
  });
}

// Zida l-lines l-windows f .left w .right
addLinesToWindow(leftWindows);
addLinesToWindow(rightWindows);



// إضافة class 'active' لكل نافذة عند النقر عليها
windows.forEach((window) => {
  window.addEventListener('click', () => {
    const lines = window.querySelector('.lines');
    if (lines && !lines.classList.contains('active')) {
      lines.classList.add('active');
    }
  });
});
  function showImageWithDelay() {
    const imgElement = document.getElementById("fullscreen-image");

    // تعيين المصدر ديال الصورة
    imgElement.src = "path_to_your_image.jpg"; // غير هادي بالطريق ديال الصورة ديالك

    // دير تأخير ديال 2 ثواني قبل ما تبان الصورة
    setTimeout(() => {
      const container = document.getElementById("fullscreen-container");
      container.style.display = "block"; // أو أي تغييرات أخرى بغيتها على container
    }, 2000); // 2000ms = 2 ثواني
  }

  // عيط للوظيفة مثلا فـ event ديال click
  document.getElementById("someButton").addEventListener("click", showImageWithDelay);

  function addLinesToWindow(windows) {
    windows.forEach((window) => {
      const linesDiv = document.createElement('div');
      linesDiv.classList.add('lines');  // Add the lines class for styling
  
      for (let i = 1; i <= 4; i++) {
        const lineDiv = document.createElement('div');
        lineDiv.classList.add(`line-${i}`);  // Add classes for each line
        linesDiv.appendChild(lineDiv);
      }
  
      window.appendChild(linesDiv);  // Append the linesDiv to the window
    });
  }
  
  // Apply the lines to the windows in both the left and right sections
  addLinesToWindow(leftWindows);
  addLinesToWindow(rightWindows);
  
  
  
  // teseeeeeeeeeeeeeeeeest 
  
  
  