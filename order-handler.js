// Order Form Handler
let selectedProduct = null;

function orderProduct(type, amount, price) {
    const username = document.getElementById('username')?.value;
    const whatsapp = document.getElementById('whatsapp')?.value;
    const email = document.getElementById('email')?.value || '-';
    
    if (!username || !whatsapp) {
        alert('⚠️ Mohon isi Username Roblox dan Nomor WhatsApp terlebih dahulu!');
        if (!username) {
            document.getElementById('username')?.focus();
        } else {
            document.getElementById('whatsapp')?.focus();
        }
        return;
    }
    
    // Simpan data order
    selectedProduct = {
        type: type,
        amount: amount,
        price: price,
        username: username,
        email: email,
        whatsapp: whatsapp
    };
    
    // Tampilkan modal pilihan contact
    showContactOptions();
}

// Show Contact Options Modal
function showContactOptions() {
    // Buat modal jika belum ada
    let modal = document.getElementById('contactModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'contactModal';
        modal.className = 'contact-modal';
        modal.innerHTML = `
            <div class="contact-modal-content">
                <h3>📞 PILIH CARA MENGHUBUNGI</h3>
                <p>Pilih salah satu untuk melanjutkan pesanan:</p>
                
                <div class="contact-options">
                    <button onclick="sendToWhatsApp()" class="contact-option-btn whatsapp-btn">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        <span>WhatsApp</span>
                    </button>
                    
                    <button onclick="sendToDiscord()" class="contact-option-btn discord-btn">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path fill="currentColor" d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                        </svg>
                        <span>Discord</span>
                    </button>
                    
                    <button onclick="sendToTikTok()" class="contact-option-btn tiktok-btn">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                            <path fill="currentColor" d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                        </svg>
                        <span>TikTok</span>
                    </button>
                </div>
                
                <button onclick="closeContactModal()" class="cancel-btn">Batal</button>
            </div>
        `;
        document.body.appendChild(modal);
    }
    modal.style.display = 'flex';
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function sendToWhatsApp() {
    if (!selectedProduct) return;
    
    const message = `Halo kak, saya mau order:

📦 *PESANAN BARU*
━━━━━━━━━━━━━━━━━━━━

🎮 Produk: *${selectedProduct.type} ${selectedProduct.amount} Robux*
💰 Harga: *Rp ${selectedProduct.price}*

👤 Username Roblox: *${selectedProduct.username}*
📧 Email: ${selectedProduct.email}
📱 WhatsApp: ${selectedProduct.whatsapp}

━━━━━━━━━━━━━━━━━━━━
Mohon diproses ya kak 🙏`;
    
    const waUrl = `https://wa.me/6288705836416?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    closeContactModal();
}

function sendToDiscord() {
    if (!selectedProduct) return;
    
    alert(`Silakan hubungi kami di Discord: Suryaajadeh\n\nInformasi Pesanan:\n📦 ${selectedProduct.type} ${selectedProduct.amount} Robux\n💰 Rp ${selectedProduct.price}\n👤 Username: ${selectedProduct.username}\n📱 WhatsApp: ${selectedProduct.whatsapp}`);
    
    window.open('https://discord.gg/Suryaajadeh', '_blank');
    closeContactModal();
}

function sendToTikTok() {
    if (!selectedProduct) return;
    
    alert(`Silakan hubungi kami di TikTok: @e_grazy322\n\nInformasi Pesanan:\n📦 ${selectedProduct.type} ${selectedProduct.amount} Robux\n💰 Rp ${selectedProduct.price}\n👤 Username: ${selectedProduct.username}\n📱 WhatsApp: ${selectedProduct.whatsapp}`);
    
    window.open('https://www.tiktok.com/@e_grazy322', '_blank');
    closeContactModal();
}

// Show Terms & Conditions
function showTerms() {
    let modal = document.getElementById('termsModal');
    if (!modal) {
        // Create modal jika belum ada
        modal = document.createElement('div');
        modal.id = 'termsModal';
        modal.className = 'terms-modal';
        modal.innerHTML = `
            <div class="terms-content">
                <h2>📋 SYARAT & KETENTUAN</h2>
                <h3>SURYA STORE</h3>
                
                <h3>1. Ketentuan Umum</h3>
                <ul>
                    <li>Pastikan data yang dimasukkan (Username/ID) sudah benar</li>
                    <li>Kesalahan input data menjadi tanggung jawab pembeli</li>
                    <li>Proses top up memakan waktu 1-15 menit setelah pembayaran diterima</li>
                    <li>Simpan bukti transaksi hingga proses selesai</li>
                </ul>

                <h3>2. Kebijakan Pembayaran</h3>
                <ul>
                    <li>Pembayaran dilakukan melalui metode yang tersedia</li>
                    <li>Konfirmasi pembayaran wajib dilakukan via WhatsApp</li>
                    <li>Sertakan username dan nomor invoice saat konfirmasi</li>
                    <li>Transfer harus sesuai dengan nominal yang tertera</li>
                </ul>

                <h3>3. Kebijakan Refund</h3>
                <ul>
                    <li>Tidak ada refund jika kesalahan dari pembeli</li>
                    <li>Refund hanya berlaku jika terjadi kesalahan dari pihak kami</li>
                    <li>Proses refund memakan waktu maksimal 3x24 jam</li>
                </ul>

                <h3>4. Layanan Customer Service</h3>
                <ul>
                    <li>CS aktif 24/7 via WhatsApp</li>
                    <li>Response time maksimal 5-10 menit</li>
                    <li>Hubungi CS jika ada kendala atau pertanyaan</li>
                </ul>

                <h3>5. Privasi & Keamanan</h3>
                <ul>
                    <li>Data pribadi Anda aman dan tidak akan disebarluaskan</li>
                    <li>Kami tidak meminta password akun game Anda</li>
                    <li>Transaksi dilakukan dengan sistem yang aman</li>
                </ul>

                <h3>6. Peraturan Penggunaan</h3>
                <ul>
                    <li>Dilarang melakukan penipuan atau kecurangan</li>
                    <li>Dilarang menggunakan data palsu</li>
                    <li>Pelanggaran akan dikenakan sanksi sesuai ketentuan</li>
                </ul>

                <p style="margin-top: 25px; padding: 15px; background: rgba(0, 217, 255, 0.1); border-radius: 10px; border-left: 4px solid var(--primary-color);">
                    <strong>📌 Catatan Penting:</strong><br>
                    Dengan melakukan pemesanan, Anda dianggap telah membaca, memahami, dan menyetujui semua syarat & ketentuan yang berlaku di Surya Store.
                </p>

                <button class="terms-close-btn" onclick="closeTerms()">SAYA MENGERTI</button>
            </div>
        `;
        document.body.appendChild(modal);
    }
    modal.style.display = 'flex';
}

function closeTerms() {
    const modal = document.getElementById('termsModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal ketika klik di luar
document.addEventListener('click', function(event) {
    const modal = document.getElementById('termsModal');
    if (event.target === modal) {
        closeTerms();
    }
});

// Validasi nomor WhatsApp
document.getElementById('whatsapp')?.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.startsWith('0')) {
        value = '62' + value.substring(1);
    }
    e.target.value = value;
});

// Auto-focus ke username saat halaman load
window.addEventListener('DOMContentLoaded', function() {
    document.getElementById('username')?.focus();
});
