const typingSfx = new Audio('typing.mp3');
const startupSfx = document.getElementById('bgMusic');

// Set volume
if (startupSfx) startupSfx.volume = 0.5;
typingSfx.volume = 0.8;

let isStarted = false;

// Fungsi untuk menyalakan semua suara
function activateAudio() {
    if (!isStarted) {
        if (startupSfx) {
            startupSfx.play().then(() => {
                isStarted = true;
                console.log("Startup Berhasil!");
            }).catch(err => console.log("Gagal: ", err));
        }
    }
}

// Pas ngetik, jalankan startup kalau belum jalan
document.addEventListener('keydown', () => {
    typingSfx.currentTime = 0;
    typingSfx.play().catch(() => {});
    activateAudio();
});

// Pas klik, jalankan startup kalau belum jalan
document.addEventListener('click', activateAudio);
// Memastikan semua interaksi user bisa memicu musik bg.mp3
const events = ['click', 'keydown', 'touchstart', 'mousemove'];

events.forEach(evt => {
    window.addEventListener(evt, () => {
        // Kita pakai variabel startupSfx yang tadi sudah kita arahkan ke bg.mp3
        if (startupSfx && startupSfx.paused) {
            startupSfx.play()
                .then(() => {
                    console.log("GitHub Audio Activated: bg.mp3 is playing!");
                })
                .catch(err => {
                    // Ini buat jaga-jaga kalau browser masih nge-blok
                    console.log("Audio play blocked by browser policies.");
                });
        }
    }, { once: true }); // Penting: Biar kodenya cuma jalan sekali pas interaksi pertama
});
// List pemicu: Gerak mouse, klik, sentuh layar, atau pencet tombol
const triggers = ['mousemove', 'click', 'keydown', 'touchstart'];

triggers.forEach(event => {
    window.addEventListener(event, () => {
        if (startupSfx && startupSfx.paused) {
            startupSfx.play().catch(e => console.log("Menunggu interaksi..."));
        }
    }, { once: true }); // Begitu nyala, kodingan ini langsung berhenti biar ringan
});