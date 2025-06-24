const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// البورت من Heroku أو 3000 احتياطي
const PORT = process.env.PORT || 3000;

// نقطة فحص
app.get('/', (req, res) => res.send('Bot is alive!'));
app.get('/status', (req, res) => {
    res.json({
        status: 'running',
        username: bot?.username || 'bot not connected',
        connected: Boolean(bot?.entity),
        time: new Date().toISOString()
    });
});

// تشغيل السيرفر
app.listen(PORT, () => {
    console.log('🌐 Express server running on port', PORT);
});

// إنشاء البوت
let bot = mineflayer.createBot({
    host: '_Survivors_.aternos.me', // ← غيره إذا أردت
    port: 45848,                    // ← تأكد أنه صحيح
    username: 'blackbot' + Math.floor(Math.random() * 1000),
    version: '1.21.6'
});

bot.on('spawn', () => {
    console.log('✅ Bot connected as', bot.username);

    // تنفيذ حركة بسيطة
    setInterval(() => {
        bot.setControlState('jump', true);
        setTimeout(() => bot.setControlState('jump', false), 1000);
    }, 60000); // كل 60 ثانية
});

bot.on('end', () => {
    console.log('❌ Bot disconnected. Waiting before reconnect...');
    // بدل ما نغلق التطبيق، ممكن نحاول إعادة الاتصال لاحقًا (اختياري)
    // أو نتركه فقط مفتوح
});
