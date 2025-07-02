const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Bot is alive!'));
app.listen(PORT, () => {
    console.log('🌐 Express server running on port', PORT);
});

let bot;

function startBot() {
    bot = mineflayer.createBot({
        host: '_Survivors_.aternos.me', // ← تأكد من أن السيرفر شغال
        port: 45848,                    // ← تحقق من البورت
        username: 'blackbot' + Math.floor(Math.random() * 1000),
        version: '1.19.2'
    });

    bot.on('spawn', () => {
        console.log('✅ Bot connected as', bot.username);
        setInterval(() => {
            bot.setControlState('jump', true);
            setTimeout(() => bot.setControlState('jump', false), 1000);
        }, 60000);
    });

    bot.on('end', () => {
        console.log('❌ Bot disconnected. Waiting before reconnect...');
        setTimeout(startBot, 10000); // إعادة الاتصال بعد 10 ثوانٍ
    });

    bot.on('error', (err) => {
        console.log('⚠️ Bot error:', err.message);
    });
}

startBot(); // تشغيل البوت أول مرة
