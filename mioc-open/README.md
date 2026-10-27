<div align="center">

# ⚽ MIOC Open

### Najbolji turnir na cilome svitu!

Službena web stranica nogometnog turnira **MIOC Open** — školskog turnira III. gimnazije (MIOC) u Splitu.

🔗 **[vitodrnjevic.github.io/Mioc-Open--nogometni-turnir](https://vitodrnjevic.github.io/Mioc-Open--nogometni-turnir/)**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-222222?style=for-the-badge&logo=githubpages&logoColor=white)

</div>

---

## 📖 Sadržaj

- [O turniru](#-o-turniru)
- [Značajke stranice](#-značajke-stranice)
- [Tehnologije](#️-tehnologije)
- [Struktura projekta](#-struktura-projekta)
- [Pokretanje lokalno](#-pokretanje-lokalno)
- [Objava na GitHub Pages](#-objava-na-github-pages)
- [Kako urediti sadržaj](#️-kako-urediti-sadržaj)
- [Kolačići i privatnost](#-kolačići-i-privatnost)
- [404 stranica](#-404-stranica)
- [Pristupačnost i performanse](#-pristupačnost-i-performanse)
- [Podrška za preglednike](#-podrška-za-preglednike)
- [Autori](#-autori)

---

## 🏆 O turniru

**MIOC Open** je turnir koji okuplja najbolje igrače III. gimnazije i traje otprilike tri mjeseca. Za sudjelovanje se plaća simbolična kotizacija organizatoru — a organizator je uvijek neka ekscentrična osoba kojoj je organiziranje turnira sve u životu.

Format turnira:

1. **Grupna faza** — 22 ekipe raspoređene u 4 grupe (A, B, C, D)
2. **Ždrijeb** — prvoplasirane ekipe idu direktno u četvrtfinale
3. **Nokaut faza** — osmina finala, četvrtfinale, polufinale i finale
4. **Nagrade** — trofej za pobjednika i pojedinačne nagrade za najbolje Miočiće

| 🥇 Prvak | 🥈 Finalist | 🥉 Treće mjesto |
|:---:|:---:|:---:|
| **4.D** | **3.B** | **4.F** |

### Individualne nagrade

| Nagrada | Dobitnik |
|---|---|
| ⭐ Miočki nogometaš | Tonći Kraljević (4.F) |
| ⚽ Strijelac MIOC-a | Toma Pivčević (2.C) |
| 🧤 Zlatna rukavica | Luka Jugov (4.C) |
| 🕳️ Šuplja rukavica | Kuzma Krstinić (4.F) |
| 🤝 Fair Play | Bruno Perković i njegova cura |
| 🐺 Underdog ekipa | 3.B |

---

## ✨ Značajke stranice

### Početna (`index.html`)
- **Hero sekcija** s logom turnira i odbrojavanjem do otvaranja sljedećeg izdanja
- **Pokretna traka** s pobjednicima i nagradama
- **O turniru** — opis, statistike i zanimljivosti
- **Galerija** — slider sa slikama turnira, opisima i sličicama; podržava swipe na mobitelu i strelice na tipkovnici
- **Himne turnira** — dva audio playera s trakom napretka i prikazom vremena (pušta se samo jedna pjesma odjednom)
- **Grupe** — sve četiri grupe s poretkom; klik na ekipu otvara prozor s njezinom pričom s turnira
- **Nagrade** — kartice sa slikama dobitnika; klik otvara fotografiju preko cijelog ekrana
- **Lokacija** — Google karta terena na Krempijevu (učitava se tek uz pristanak na kolačiće)
- **Poziv na prijavu** i podnožje s poveznicama

### Prijava (`prijava.html`)
- Obrazac s imenom i e-mailom
- Provjera unosa prije slanja
- Slanje preko **EmailJS** servisa (bez vlastitog servera)
- Poruka o uspjehu ili grešci izravno na stranici

### Općenito
- 📱 **Potpuno prilagođeno mobitelima** — izbornik s tri crtice, veliki gumbi za prst, bez pomicanja postrance
- 🍪 **Cookie consent banner** s odabirom kategorija
- 🚩 **Vlastita 404 stranica** s mini igrom penala
- 🌙 Tamni dizajn u bojama loga (crna i zlatna)
- 🎞️ Animacije pri pomicanju stranice (isključuju se ako korisnik u sustavu ima uključeno smanjenje animacija)

---

## 🛠️ Tehnologije

| Tehnologija | Namjena |
|---|---|
| **HTML5** | struktura stranica |
| **CSS3** | dizajn, responzivni raspored (Grid, Flexbox), animacije |
| **Vanilla JavaScript** | interaktivnost — bez frameworka i biblioteka |
| **[EmailJS](https://www.emailjs.com/)** | slanje prijava na e-mail |
| **[Google Fonts](https://fonts.google.com/)** | fontovi *Anton* (naslovi) i *Inter* (tekst) |
| **Google Maps Embed** | karta lokacije terena |
| **GitHub Pages** | hosting |

Nema build koraka, `npm install` ni ovisnosti — stranica je potpuno statična.

---

## 📁 Struktura projekta

```
Mioc-Open--nogometni-turnir/
│
├── index.html              # početna stranica
├── prijava.html            # prijava na sljedeće izdanje
├── 404.html                # stranica za nepostojeće adrese
├── README.md               # ovaj dokument
├── .nojekyll               # GitHub Pages: preskoči Jekyll obradu
├── .htaccess               # Apache: koristi 404.html za greške
│
├── assets/
│   ├── css/
│   │   └── style.css       # sav dizajn (varijable boja na vrhu)
│   └── js/
│       ├── main.js         # izbornik, odbrojavanje, galerija, ekipe, playeri, karta
│       ├── cookies.js      # cookie consent banner
│       └── prijava.js      # slanje obrasca preko EmailJS-a
│
├── img/                    # slike (*-sm.jpg su smanjene sličice)
│   ├── logoopena.jpg
│   ├── stadion.jpg
│   ├── grupe.jpg
│   └── ...
│
└── audio/                  # himne turnira
    ├── kisa.ogg
    └── roly.ogg
```

---

## 💻 Pokretanje lokalno

**Najjednostavnije:** preuzmi repozitorij i dvaput klikni na `index.html`.

**Preko lokalnog servera** (preporučeno, jer se tako ponaša isto kao online):

```bash
# kloniraj repozitorij
git clone https://github.com/vitodrnjevic/Mioc-Open--nogometni-turnir.git
cd Mioc-Open--nogometni-turnir

# pokreni server (treba Python)
python -m http.server 8000
```

Zatim otvori **http://localhost:8000** u pregledniku.

> Ako koristiš VS Code, može i ekstenzija **Live Server** → desni klik na `index.html` → *Open with Live Server*.

---

## 🚀 Objava na GitHub Pages

1. U repozitoriju otvori **Settings → Pages**
2. Pod **Source** odaberi **Deploy from a branch**
3. Pod **Branch** odaberi `main` i mapu `/ (root)` → **Save**
4. Nakon 1–2 minute stranica je dostupna na:
   **https://vitodrnjevic.github.io/Mioc-Open--nogometni-turnir/**

Svaka nova promjena koju pošalješ na `main` automatski se objavi za minutu-dvije.

---

## ✏️ Kako urediti sadržaj

### Datum odbrojavanja
Na vrhu datoteke `assets/js/main.js`:

```js
var TOURNAMENT_START = new Date("2025-09-01T00:00:00");
```

Kad datum prođe, umjesto odbrojavanja piše **„Turnir je počeo!”**.

### Dodavanje ili mijenjanje ekipe
U `index.html`, unutar odgovarajuće grupe, svaka ekipa izgleda ovako:

```html
<li><button class="team-btn" type="button"><span class="pos">1</span><span class="name">4.D<span class="badge badge-gold">Prvak</span></span><span class="arrow">→</span></button>
  <p class="team-info" hidden>Ovdje ide priča o ekipi...</p></li>
```

- `pos` — mjesto u grupi
- `name` — naziv ekipe
- `badge` — neobavezno: `badge-gold` (prvak), `badge-silver` (finale), `badge-bronze` (3. mjesto)
- `team-info` — tekst koji se prikaže u prozoru kad se klikne na ekipu

### Slike u galeriji
U `index.html` u sekciji `#galerija`:

```html
<figure class="slide" data-caption="Opis slike"><img src="img/slika.jpg" alt="Kratki opis za čitače ekrana" loading="lazy"></figure>
```

Za svaku sliku stavi i smanjenu verziju `slika-sm.jpg` u mapu `img/` — ona se koristi za sličice ispod opisa.

### Nagrade
Svaka nagrada je kartica `<button class="award">` u sekciji `#nagrade`. `data-full` je slika koja se otvara preko cijelog ekrana, a `<img>` unutra je sličica na kartici.

### Boje
Sve boje su na vrhu `assets/css/style.css`:

```css
:root {
  --bg: #0a0a0b;      /* pozadina */
  --gold: #f5b81c;    /* glavna zlatna */
  --pitch: #1fa55a;   /* zelena (playeri, prekidači) */
  ...
}
```

### EmailJS (prijava)
Ključevi su na vrhu `assets/js/prijava.js`:

```js
var EMAILJS_PUBLIC_KEY = "...";
var EMAILJS_SERVICE = "...";
var EMAILJS_TEMPLATE = "...";
```

Predložak na EmailJS-u prima varijable `{{name}}` i `{{email}}`.

---

## 🍪 Kolačići i privatnost

Pri prvom posjetu prikazuje se banner s tri opcije: **Prihvati sve**, **Samo nužni** i **Postavke**.

| Kategorija | Što uključuje | Može se isključiti? |
|---|---|---|
| **Nužni** | pamćenje izbora kolačića, slanje prijave | ❌ ne |
| **Vanjski sadržaj** | ugrađena Google karta (Google postavlja svoje kolačiće) | ✅ da |

- Google karta se **ne učitava** dok korisnik ne dopusti vanjski sadržaj — do tada se prikazuje gumb *„Prikaži kartu”*.
- Izbor se sprema u `localStorage` preglednika pod ključem `mioc-consent`.
- Izbor se može promijeniti bilo kada preko poveznice **„Postavke kolačića”** u podnožju.
- Stranica ne koristi analitiku ni oglase.

---

## 🚩 404 stranica

Kad netko otvori adresu koja ne postoji, prikaže se `404.html` s temom **„Zaleđe!”**:

- semafor **4⚽4** s poskakujućom loptom
- sudačka zastavica i oznaka *VAR provjera*
- **mini igra penala** — klikni ili dodirni mjesto u golu, golman se baca na stranu, a rezultat se broji

Gdje radi automatski:

| Hosting | Postavka |
|---|---|
| GitHub Pages, Netlify, Vercel, Cloudflare Pages | radi samo od sebe |
| Apache | uključen `.htaccess` |
| Nginx | dodaj `error_page 404 /404.html;` |

> Kad se stranica otvara lokalno dvoklikom, 404 se ne prikazuje sama — otvori `404.html` ručno da je vidiš.

---

## ♿ Pristupačnost i performanse

- semantički HTML (`header`, `main`, `section`, `footer`, `dialog`)
- poveznica *„Preskoči na sadržaj”* za korisnike tipkovnice
- vidljiv fokus na svim gumbima i poveznicama
- `alt` opisi na slikama, `aria` oznake na gumbima i slideru
- galerija i playeri rade i tipkovnicom (strelice)
- poštuje postavku sustava *smanji animacije*
- slike su smanjene i komprimirane, a one niže na stranici učitavaju se tek kad zatrebaju (`loading="lazy"`)

---

## 🌐 Podrška za preglednike

Testirano i radi u novijim verzijama:

- Google Chrome / Microsoft Edge
- Mozilla Firefox
- Safari (macOS i iOS)
- Chrome za Android

---

## 👥 Autori

Izradili učenici **4.F** razreda III. gimnazije Split:

- **Tonći Kraljević**
- **Vito Drnjević**

📸 Instagram turnira: [@miocklozed25](https://www.instagram.com/miocklozed25)

---

<div align="center">

**MIOC Open** · Najbolji turnir na cilome svitu ⚽

</div>
