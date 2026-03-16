const API_URL =
  "https://script.google.com/macros/s/AKfycbxCNAfGQaTnm6jKNtSFEruEWSxYGjdXAoLLIAPg0LRS8PLFBfMojn0q5F1gD-e5N9W1/exec";
const perHalaman = 3;
let waktu = 3600;

let halaman = 0;
let timer;
let waktuHabis = false;
let sudahSubmit = false;
let jawaban = {};

const soal = [
  {
    t: "Pancasila sebagai ideologi terbuka memiliki makna bahwa Pancasila …",
    p: [
      "Dapat diubah sesuai kepentingan penguasa",
      "Memiliki nilai dasar tetap namun mampu menyesuaikan perkembangan zaman",
      "Mengikuti ideologi negara lain",
      "Bersifat fleksibel tanpa nilai dasar",
    ],
    j: 1,
  },
  {
    t: "Hubungan antara Pancasila dan UUD 1945 adalah bahwa Pancasila berfungsi sebagai …",
    p: [
      "Sumber dari segala sumber hukum negara",
      "Pedoman kebijakan pemerintah",
      "Dasar kebudayaan nasional",
      "Landasan ekonomi negara",
    ],
    j: 0,
  },
  {
    t: "Rumusan Pancasila yang sah secara konstitusional tercantum dalam …",
    p: [
      "Batang tubuh UUD 1945",
      "Pembukaan UUD 1945 alinea ke-4",
      "Piagam Jakarta",
      "Tap MPR",
    ],
    j: 1,
  },
  {
    t: "Salah satu ciri negara hukum adalah …",
    p: [
      "Kekuasaan tertinggi di tangan presiden",
      "Pemerintah dapat bertindak tanpa hukum",
      "Segala tindakan pemerintah harus berdasarkan hukum",
      "Rakyat tunduk sepenuhnya kepada negara",
    ],
    j: 2,
  },
  {
    t: "Dalam sistem presidensial Indonesia, presiden berfungsi sebagai …",
    p: [
      "Kepala negara saja",
      "Kepala pemerintahan saja",
      "Kepala negara dan kepala pemerintahan",
      "Pemimpin legislatif",
    ],
    j: 2,
  },
  {
    t: "Perubahan UUD 1945 hanya dapat dilakukan oleh …",
    p: ["DPR", "MPR", "Presiden", "Mahkamah Konstitusi"],
    j: 1,
  },
  {
    t: "Makna persatuan Indonesia dalam kehidupan berbangsa adalah …",
    p: [
      "Menghilangkan perbedaan budaya",
      "Menyatukan keberagaman dalam satu identitas bangsa",
      "Menyamakan seluruh tradisi",
      "Mengutamakan kepentingan daerah",
    ],
    j: 1,
  },
  {
    t: "Bhinneka Tunggal Ika mengajarkan bahwa keberagaman harus …",
    p: [
      "Dihapuskan",
      "Dibiarkan tanpa aturan",
      "Dijadikan kekuatan persatuan",
      "Dibatasi oleh pemerintah",
    ],
    j: 2,
  },
  {
    t: "Kitab Sutasoma yang memuat semboyan Bhinneka Tunggal Ika ditulis oleh …",
    p: ["Mpu Prapanca", "Mpu Tantular", "Mpu Sedah", "Mpu Panuluh"],
    j: 1,
  },
  {
    t: "Tujuan utama negara Indonesia menurut Pembukaan UUD 1945 adalah …",
    p: [
      "Mewujudkan kekuatan militer",
      "Melindungi segenap bangsa dan memajukan kesejahteraan umum",
      "Menguasai perdagangan dunia",
      "Meningkatkan kekuasaan pemerintah",
    ],
    j: 1,
  },
  {
    t: "Makna nasionalisme bagi generasi muda adalah …",
    p: [
      "Menolak budaya luar sepenuhnya",
      "Mencintai bangsa dan berkontribusi bagi kemajuan negara",
      "Mengutamakan kepentingan kelompok",
      "Menolak globalisasi",
    ],
    j: 1,
  },
  {
    t: "Peristiwa Rengasdengklok memiliki arti penting karena …",
    p: [
      "Menjadi tempat penyusunan UUD",
      "Mendesak percepatan proklamasi kemerdekaan",
      "Membentuk pemerintahan baru",
      "Mengakhiri penjajahan Jepang",
    ],
    j: 1,
  },
  {
    t: "Tokoh yang mengetik naskah proklamasi kemerdekaan Indonesia adalah …",
    p: ["Sukarni", "Sayuti Melik", "Latif Hendraningrat", "Ahmad Soebardjo"],
    j: 1,
  },
  {
    t: "Jumlah bulu pada Garuda Pancasila melambangkan …",
    p: [
      "Struktur negara",
      "Tanggal kemerdekaan Indonesia",
      "Jumlah provinsi",
      "Kekuatan militer",
    ],
    j: 1,
  },
  {
    t: "Makna warna merah pada bendera Indonesia adalah …",
    p: ["Kemakmuran", "Keberanian", "Kesucian", "Persatuan"],
    j: 1,
  },
  {
    t: "Pasal 31 UUD 1945 mengatur tentang …",
    p: [
      "Hak pendidikan",
      "Pertahanan negara",
      "Sistem ekonomi",
      "Kewarganegaraan",
    ],
    j: 0,
  },
  {
    t: "Ancaman non-militer terhadap NKRI dapat berupa …",
    p: [
      "Serangan militer",
      "Perang terbuka",
      "Hoaks dan disinformasi",
      "Invasi negara lain",
    ],
    j: 2,
  },
  {
    t: "Integrasi nasional dapat tercapai apabila …",
    p: [
      "Setiap kelompok mengutamakan kepentingan sendiri",
      "Ada kesadaran untuk bersatu dalam keberagaman",
      "Perbedaan budaya dihapuskan",
      "Pemerintah mengatur seluruh budaya",
    ],
    j: 1,
  },
  {
    t: "Nilai musyawarah dalam Pancasila bertujuan untuk …",
    p: [
      "Menghindari konflik",
      "Mencapai keputusan bersama yang bijaksana",
      "Menghilangkan perbedaan pendapat",
      "Mengikuti pendapat mayoritas tanpa diskusi",
    ],
    j: 1,
  },
  {
    t: "Peran generasi muda dalam menjaga NKRI adalah …",
    p: [
      "Menolak modernisasi",
      "Berpartisipasi aktif dalam pembangunan",
      "Menghindari tanggung jawab sosial",
      "Mengabaikan sejarah bangsa",
    ],
    j: 1,
  },
  {
    t: "Paskibraka disebut sebagai Duta Pancasila karena …",
    p: [
      "Mengibarkan bendera",
      "Mewakili bangsa di luar negeri",
      "Menjadi teladan dalam pengamalan nilai Pancasila",
      "Memiliki seragam khusus",
    ],
    j: 2,
  },
  {
    t: "Nilai utama dalam pembinaan Paskibraka adalah …",
    p: [
      "Popularitas",
      "Disiplin dan kepemimpinan",
      "Kekuasaan",
      "Prestise sosial",
    ],
    j: 1,
  },
  {
    t: "Formasi 17-8-45 dalam Paskibraka melambangkan …",
    p: [
      "Struktur organisasi",
      "Tanggal Proklamasi",
      "Jumlah anggota",
      "Tingkatan pasukan",
    ],
    j: 1,
  },
  {
    t: "Sikap disiplin bagi anggota Paskibraka tercermin dalam …",
    p: [
      "Kebebasan bertindak",
      "Ketaatan pada aturan",
      "Persaingan antar anggota",
      "Kebanggaan pribadi",
    ],
    j: 1,
  },
  {
    t: "Makna patriotisme adalah …",
    p: [
      "Cinta tanah air dan rela berkorban",
      "Kebebasan individu",
      "Kekuatan militer",
      "Kekuasaan negara",
    ],
    j: 0,
  },
  {
    t: "Peran pelajar dalam menjaga persatuan bangsa dapat dilakukan dengan …",
    p: [
      "Menyebarkan isu SARA",
      "Menghargai perbedaan",
      "Menghindari diskusi",
      "Membentuk kelompok eksklusif",
    ],
    j: 1,
  },
  {
    t: "Salah satu faktor yang memperkuat integrasi nasional adalah …",
    p: [
      "Kesamaan budaya",
      "Kesadaran nasional",
      "Dominasi kelompok tertentu",
      "Penghapusan bahasa daerah",
    ],
    j: 1,
  },
  {
    t: "Hoaks dapat menjadi ancaman bagi bangsa karena …",
    p: [
      "Menyebabkan konflik sosial",
      "Meningkatkan informasi",
      "Memperkuat persatuan",
      "Meningkatkan pendidikan",
    ],
    j: 0,
  },
  {
    t: "Nilai gotong royong mencerminkan sila …",
    p: ["Kedua", "Ketiga", "Keempat", "Kelima"],
    j: 2,
  },
  {
    t: "Pembangunan nasional bertujuan untuk …",
    p: [
      "Meningkatkan kekuasaan pemerintah",
      "Mewujudkan masyarakat adil dan makmur",
      "Menguasai wilayah negara lain",
      "Menghapus budaya lokal",
    ],
    j: 1,
  },
  {
    t: "Sumpah Pemuda memiliki arti penting karena …",
    p: [
      "Menyatukan pemuda Indonesia",
      "Menghapus budaya daerah",
      "Membentuk pemerintahan",
      "Mengakhiri penjajahan",
    ],
    j: 0,
  },
  {
    t: "Isi Sumpah Pemuda yang ketiga adalah …",
    p: [
      "Satu tanah air Indonesia",
      "Satu bangsa Indonesia",
      "Satu bahasa Indonesia",
      "Satu negara Indonesia",
    ],
    j: 2,
  },
  {
    t: "Salah satu tantangan globalisasi bagi generasi muda adalah …",
    p: [
      "Hilangnya identitas budaya",
      "Peningkatan pendidikan",
      "Kemajuan teknologi",
      "Kemudahan komunikasi",
    ],
    j: 0,
  },
  {
    t: "Sikap selektif terhadap budaya asing berarti …",
    p: [
      "Menerima semua budaya asing",
      "Menolak seluruh budaya asing",
      "Menyaring budaya asing yang sesuai nilai bangsa",
      "Mengikuti tren global",
    ],
    j: 2,
  },
  {
    t: "Keberagaman budaya di Indonesia harus dipandang sebagai …",
    p: [
      "Ancaman",
      "Hambatan pembangunan",
      "Kekayaan bangsa",
      "Penghalang persatuan",
    ],
    j: 2,
  },
  {
    t: "Keadilan sosial berarti …",
    p: [
      "Semua orang memiliki kekayaan sama",
      "Setiap warga mendapat perlakuan adil",
      "Pemerintah menguasai semua ekonomi",
      "Tidak ada perbedaan sosial",
    ],
    j: 1,
  },
  {
    t: "Pengamalan sila pertama dapat dilakukan dengan …",
    p: [
      "Menghormati perbedaan agama",
      "Memaksakan keyakinan",
      "Menghindari ibadah",
      "Menolak toleransi",
    ],
    j: 0,
  },
  {
    t: "Sikap demokratis tercermin dalam …",
    p: [
      "Kebebasan tanpa aturan",
      "Musyawarah dan menghargai pendapat",
      "Ketaatan tanpa diskusi",
      "Dominasi mayoritas",
    ],
    j: 1,
  },
  {
    t: "Peran media sosial bagi generasi muda seharusnya …",
    p: [
      "Menyebarkan informasi tanpa verifikasi",
      "Menyebarkan nilai positif dan edukatif",
      "Mencari konflik",
      "Menghina kelompok lain",
    ],
    j: 1,
  },
  {
    t: "Persatuan bangsa harus dijaga agar …",
    p: [
      "Negara tetap stabil dan kuat",
      "Kekuasaan pemerintah meningkat",
      "Budaya daerah hilang",
      "Perbedaan dihapus",
    ],
    j: 0,
  },
  {
    t: "Tujuan pendidikan nasional adalah …",
    p: [
      "Menciptakan pekerja",
      "Mengembangkan potensi manusia Indonesia",
      "Meningkatkan ekonomi saja",
      "Menguasai teknologi",
    ],
    j: 1,
  },
  {
    t: "Peran pemuda dalam sejarah kemerdekaan Indonesia adalah …",
    p: [
      "Mendesak proklamasi",
      "Menghindari konflik",
      "Mengikuti keputusan penjajah",
      "Membentuk pemerintahan",
    ],
    j: 0,
  },
  {
    t: "Semangat kebangsaan harus diwujudkan dalam …",
    p: [
      "Tindakan nyata dalam kehidupan",
      "Pidato saja",
      "Simbol negara",
      "Perayaan tahunan",
    ],
    j: 0,
  },
  {
    t: "Sikap toleransi berarti …",
    p: [
      "Menghormati perbedaan",
      "Menghilangkan perbedaan",
      "Menolak budaya lain",
      "Menyamakan semua budaya",
    ],
    j: 0,
  },
  {
    t: "Perilaku yang mencerminkan nilai Pancasila adalah …",
    p: ["Gotong royong", "Individualisme", "Egoisme", "Diskriminasi"],
    j: 0,
  },
  {
    t: "Ancaman terhadap ideologi Pancasila dapat berasal dari …",
    p: ["Paham radikalisme", "Pendidikan", "Budaya lokal", "Tradisi daerah"],
    j: 0,
  },
  {
    t: "Paskibraka sebagai generasi muda harus memiliki sikap …",
    p: ["Egois", "Nasionalis dan disiplin", "Individualis", "Materialis"],
    j: 1,
  },
  {
    t: "Menjadi teladan bagi lingkungan adalah bentuk …",
    p: ["Kepemimpinan", "Popularitas", "Kekuasaan", "Prestise"],
    j: 0,
  },
  {
    t: "Dalam konsep ideologi terbuka, nilai dasar Pancasila bersifat tetap sedangkan nilai instrumental berarti …",
    p: [
      "Nilai yang dapat diubah sesuai perkembangan zaman tanpa menghilangkan nilai dasar",
      "Nilai yang tidak boleh berubah sama sekali",
      "Nilai yang hanya berlaku pada masa tertentu",
      "Nilai yang berasal dari ideologi negara lain",
    ],
    j: 0,
  },
  {
    t: "Salah satu indikator kuatnya integrasi nasional di Indonesia adalah …",
    p: [
      "Menghilangnya budaya daerah",
      "Adanya kesediaan masyarakat untuk bekerja sama meskipun berbeda latar belakang",
      "Dominasi budaya mayoritas",
      "Penghapusan perbedaan suku dan agama",
    ],
    j: 1,
  },
];

function mulaiUjian() {
  if (!nama.value || !sekolah.value || !daerah.value)
    return alert("Lengkapi data!");

  localStorage.setItem("nama", nama.value);
  localStorage.setItem("gender", gender.value);
  localStorage.setItem("sekolah", sekolah.value);
  localStorage.setItem("tinggibadan", tinggibadan.value);
  localStorage.setItem("beratbadan", beratbadan.value);
  localStorage.setItem("daerah", daerah.value);

  document.querySelector(".info").classList.add("hidden");
  document.querySelector(".timer").classList.remove("hidden");
  document.querySelector(".progress-box").classList.remove("hidden");
  navSoal.classList.remove("hidden");
  quizForm.classList.remove("hidden");

  mulaiTimer();
  tampilkan();
}

function mulaiTimer() {
  timer = setInterval(() => {
    waktu--;
    time.textContent = `${Math.floor(waktu / 60)}:${String(waktu % 60).padStart(2, "0")}`;
    if (waktu <= 0) {
      waktuHabis = true;
      clearInterval(timer);
      alert("Waktu habis, jawaban dikirim otomatis.");
      kirim();
    }
  }, 1000);
}

function tampilkan() {
  window.scrollTo(0, 0);
  soalContainer.innerHTML = "";
  const start = halaman * perHalaman;

  soal.slice(start, start + perHalaman).forEach((x, i) => {
    const idx = start + i;
    soalContainer.innerHTML += `
    <div class="question">
      <p>${idx + 1}. ${x.t}</p>
      ${x.p
        .map(
          (a, j) => `
        <label>
          <input type="radio" name="q${idx}" value="${j}"
            ${jawaban[idx] === j ? "checked" : ""}>
          ${a}
        </label>`,
        )
        .join("")}
    </div>`;
  });

  nextBtn.textContent =
    start + perHalaman >= soal.length ? "Selesai" : "Berikutnya ➡";

  autoSave();
  updateProgress();
  buatNavigasi();
}

function autoSave() {
  document.querySelectorAll("input[type=radio]").forEach((r) => {
    r.onchange = () => (jawaban[+r.name.replace("q", "")] = +r.value);
  });
}

function berikutnya() {
  if ((halaman + 1) * perHalaman >= soal.length) kirim();
  else {
    halaman++;
    tampilkan();
  }
}

function sebelumnya() {
  if (halaman > 0) {
    halaman--;
    tampilkan();
  }
}

function semuaTerjawab() {
  for (let i = 0; i < soal.length; i++) if (jawaban[i] === undefined) return i;
  return -1;
}

function kirim() {
  if (sudahSubmit) return;

  if (!waktuHabis) {
    const kosong = semuaTerjawab();
    if (kosong !== -1) {
      alert(`Soal ${kosong + 1} belum dijawab`);
      halaman = Math.floor(kosong / perHalaman);
      tampilkan();
      return;
    }

    if (!confirm("Yakin ingin mengakhiri ujian dan mengirim jawaban?")) return;
  }

  sudahSubmit = true;
  clearInterval(timer);
  nextBtn.disabled = true;
  nextBtn.textContent = "Mengirim...";

  let benar = 0;
  soal.forEach((s, i) => jawaban[i] === s.j && benar++);
  const nilai = Math.round((benar / soal.length) * 100);

  localStorage.setItem("nilai", nilai);
  localStorage.setItem("jawabanUser", JSON.stringify(jawaban));
  localStorage.setItem("bankSoal", JSON.stringify(soal));

  const fd = new FormData();
  fd.append("nama", localStorage.getItem("nama"));
  fd.append("gender", localStorage.getItem("gender"));
  fd.append("sekolah", localStorage.getItem("sekolah"));
  fd.append("tinggibadan", localStorage.getItem("tinggibadan"));
  fd.append("beratbadan", localStorage.getItem("beratbadan"));
  fd.append("daerah", localStorage.getItem("daerah"));
  fd.append("nilai", nilai);

  fetch(API_URL, { method: "POST", body: fd }).finally(
    () => (location.href = "hasil.html"),
  );
}

function updateProgress() {
  const j = Object.keys(jawaban).length;
  progressBar.style.width = `${(j / soal.length) * 100}%`;
  progressText.textContent = `${j} / ${soal.length}`;
}

function buatNavigasi() {
  navSoal.innerHTML = "";
  soal.forEach((_, i) => {
    const b = document.createElement("button");
    b.textContent = i + 1;
    if (jawaban[i] !== undefined) b.classList.add("answered");
    if (Math.floor(i / perHalaman) === halaman) b.classList.add("active");
    b.onclick = () => {
      halaman = Math.floor(i / perHalaman);
      tampilkan();
    };
    navSoal.appendChild(b);
  });
}
