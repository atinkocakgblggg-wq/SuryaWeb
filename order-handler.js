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
    
    // Format message untuk WhatsApp
    const message = `Halo kak, saya mau order:

📦 *PESANAN BARU*
━━━━━━━━━━━━━━━━━━━━

🎮 Produk: *${type} ${amount} Robux*
💰 Harga: *Rp ${price}*

👤 Username Roblox: *${username}*
📧 Email: ${email}
📱 WhatsApp: ${whatsapp}

━━━━━━━━━━━━━━━━━━━━
Mohon diproses ya kak 🙏`;
    
    const waUrl = `https://wa.me/6288705836416?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
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
