// Set current year in footer
document.getElementById('currentYear').textContent = new Date().getFullYear();

function calculateAge() {
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);
    
    // Validate inputs
    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        showError('Please enter valid day, month, and year');
        return;
    }
    
    // Validate date
    const inputDate = new Date(year, month - 1, day);
    if (inputDate.getDate() !== day || 
        inputDate.getMonth() !== month - 1 || 
        inputDate.getFullYear() !== year) {
        showError('Please enter a valid date');
        return;
    }
    
    const today = new Date();
    const birthDate = new Date(year, month - 1, day);
    
    // Check if birthdate is in the future
    if (birthDate > today) {
        showError('Birthdate cannot be in the future');
        return;
    }
    
    // Calculate age in years, months, days
    let ageYears = today.getFullYear() - birthDate.getFullYear();
    let ageMonths = today.getMonth() - birthDate.getMonth();
    let ageDays = today.getDate() - birthDate.getDate();
    
    // Adjust for negative months or days
    if (ageDays < 0) {
        ageMonths--;
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        ageDays += lastDayOfMonth;
    }
    
    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }
    
    // Calculate next birthday
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) {
        nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysUntilNextBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
    
    // Calculate total time lived
    const diffTime = Math.abs(today - birthDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
    // Calculate life progress (assuming 80 years lifespan)
    const lifeProgress = Math.min((ageYears / 80) * 100, 100);
    
    // Get day of week
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const birthDayOfWeek = daysOfWeek[birthDate.getDay()];
    
    // Get zodiac sign
    const zodiacSign = getZodiacSign(month, day);
    
    // Get life milestone
    const lifeMilestone = getLifeMilestone(ageYears);
    
    // Display results
    document.getElementById('ageResult').textContent = `You are ${ageYears} years, ${ageMonths} months, and ${ageDays} days old`;
    
    // Life progress bar
    document.getElementById('lifeProgress').style.width = `${lifeProgress}%`;
    document.getElementById('progressText').textContent = `You've lived ${lifeProgress.toFixed(1)}% of an estimated 80-year lifespan`;
    
    // Time lived counters (with animation)
    animateValue('yearsLived', 0, ageYears, 1000);
    animateValue('monthsLived', 0, ageYears * 12 + ageMonths, 1000);
    animateValue('daysLived', 0, diffDays, 1000);
    animateValue('hoursLived', 0, diffHours, 1000);
    
    // Additional info
    document.getElementById('nextBirthday').textContent = `${daysUntilNextBirthday} days (${formatDate(nextBirthday)})`;
    document.getElementById('zodiacSign').textContent = zodiacSign;
    document.getElementById('birthDay').textContent = birthDayOfWeek;
    document.getElementById('lifeMilestone').textContent = lifeMilestone;
    
    // Show result container
    document.getElementById('result').style.display = 'block';
}

function showError(message) {
    alert(message);
}

function formatDate(date) {
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function getZodiacSign(month, day) {
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius ♒";
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces ♓";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries ♈";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus ♉";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini ♊";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer ♋";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo ♌";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo ♍";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra ♎";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio ♏";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius ♐";
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return "Capricorn ♑";
    return "Unknown";
}

function getLifeMilestone(age) {
    if (age < 1) return "Newborn 👶";
    if (age < 5) return "Toddler 🧒";
    if (age < 13) return "Child 🧑";
    if (age < 20) return "Teenager 🎒";
    if (age < 30) return "Young Adult 💼";
    if (age < 40) return "Adult 🏡";
    if (age < 50) return "Middle-Aged 🧑‍💻";
    if (age < 65) return "Experienced 👨‍🔬";
    return "Senior 👴";
}

function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start).toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

function shareOnTwitter() {
    const ageText = document.getElementById('ageResult').textContent;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out my age: ${ageText} - Calculate yours at `);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
}

function shareOnFacebook() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
}