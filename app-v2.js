document.addEventListener("DOMContentLoaded", () => {
    // --- Soal ---
    const soal = [
        { tanya: "Siapa pencipta bahasa pemrograman JavaScript?", jawab: "brendan eich" },
        { tanya: "Apa kepanjangan DOM?", jawab: "document object model" },
        { tanya: "Tahun rilis awal JavaScript? (angka)", jawab: "1995" }
    ];

    let idx = 0, skor = 0;
    let rekor = Number(localStorage.getItem("rekorKuis") || 0);

    const statusEl = document.getElementById("status");
    const rekorEl = document.getElementById("rekor");
    const tanyaEl = document.getElementById("tanya");
    const input = document.getElementById("jawaban");
    const hasilEl = document.getElementById("hasil");
    const btnUlang = document.getElementById("btnUlang");

    const norm = (s) => (s || "").toLowerCase().trim().replace(/\s+/g, " ");

    function tampilkanStatus() {
        statusEl.textContent = idx < soal.length
            ? `Soal ${idx + 1}/${soal.length} | Skor: ${skor}`
            : `Selesai! Skor akhir: ${skor}/${soal.length}`;
        rekorEl.textContent = `Rekor: ${rekor}`;
    }

    function render() {
        tampilkanStatus();
        if (idx < soal.length) {
            tanyaEl.textContent = soal[idx].tanya;
            input.value = "";
            hasilEl.textContent = "";
            input.disabled = false;
            input.style.display = "inline-block";
            btnUlang.style.display = "none";
            input.focus();
        } else {
            if (skor > rekor) {
                rekor = skor;
                localStorage.setItem("rekorKuis", rekor);
            }
            tanyaEl.textContent = "Terima kasih sudah mengikuti kuis 🙌";
            input.style.display = "none";
            btnUlang.style.display = "inline-block";
            hasilEl.textContent = skor === soal.length ? "Sempurna! 🎯" : "Bagus! Coba lagi untuk skor lebih tinggi.";
            tampilkanStatus();
        }
    }

    function periksa() {
        const jaw = norm(input.value);
        if (!jaw) { hasilEl.textContent = "⚠️ Kolom jawaban masih kosong."; return; }

        const benar = norm(soal[idx].jawab);
        if (jaw === benar) { skor += 1; hasilEl.textContent = "✅ Benar!"; }
        else { hasilEl.textContent = `❌ Salah. Jawaban benar: ${soal[idx].jawab}`; }

        input.disabled = true;
        setTimeout(() => { idx += 1; render(); }, 800);
    }

    // Enter untuk submit
    input.addEventListener("keydown", (e) => { if (e.key === "Enter") periksa(); });

    // Mulai lagi
    btnUlang.addEventListener("click", () => {
        idx = 0; skor = 0;
        input.style.display = "inline-block";
        render();
    });

    render();
});
