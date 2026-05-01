# HepsiVarmi - Nuxt 3 Demo Project

Bu projede yalnizca Nuxt 3 / Vue 3 kullanilmistir.
Ayri bir backend servisi yoktur. Bunun yerine Nuxt'un kendi icinde kucuk bir backend katmani olusturulmus ve kayit/okuma islemleri bu katman uzerinden yonetilmistir.

Bu yaklasimin amaci:

- Projeyi kolay kurulur hale getirmek
- Ek servis bagimliligi olmadan calistirabilmek
- Odak noktasini Nuxt/Vue gelistirme yaklasimi uzerinde tutmak

## Mimari Yaklasim

Proje, domain odakli moduler bir yapi ile organize edilmistir.

- Moduler monolit yaklasimi kullanilir
- Her domain kendi sorumluluk alanini tasir (`auth`, `cart`, `product` vb.)
- UI, is mantigi ve veri erisimi katmanlari domain icinde ayristirilir
- Nuxt `server/api` klasorleri ile proje icinde hafif bir backend katmani saglanir
- Veri kaliciligi icin bu demoda JSON tabanli repository yapisi kullanilir

Bu sayede proje hem ogrenme hem de demo amacli kullanimda hizli ve anlasilir kalir.

## Dosya Yapisi (Ozet)

```bash
domains/
  app/                # Ortak layout, component, util, composable
  auth/               # Kimlik dogrulama domaini
    server/api/       # Nuxt server endpointleri (embedded backend)
    infrastructure/   # Veri erisim katmani (json/repo)
    stores/           # Pinia store
  cart/
    server/api/
    infrastructure/
    composables/
  product/
  category/
  brand/
  property/
  wishlist/
  compare/
  comment/
  ...
server/               # Nuxt server tarafi konfig/yardimci yapi
nuxt.config.ts        # Ana Nuxt konfigurasyonu
```

## Katmanlar ve Sorumluluklar

Genel olarak domainlerde asagidaki ayrim hedeflenmistir:

- `pages` / `components`: Sunum katmani
- `composables` / `services`: Is akisi ve kullanim senaryosu
- `repositories` / `infrastructure`: Veri erisim katmani
- `server/api`: HTTP endpoint katmani
- `stores`: Uygulama durumu (Pinia)

## SOLID ve Tasarim Prensipleri

Bu proje tam anlamiyla kurumsal backend mimarisi hedeflemese de, yapilandirma sirasinda asagidaki prensipler gozetilmistir:

- **Single Responsibility (SRP):**
  UI, state, data access ve API handler sorumluluklarinin ayrilmasi
- **Open/Closed (OCP):**
  Domain bazli moduler yapi ile yeni ozelliklerin mevcut alanlari bozmadan eklenebilmesi
- **Dependency Inversion (DIP) yaklasimi:**
  Bilesenlerin dogrudan ham veri kaynagi yerine repository/composable katmanlari uzerinden calistirilmasi
- **Separation of Concerns:**
  Her klasorun ve katmanin net bir amaci olmasi

Not: Bu proje bir demo/portfolyo odakli Nuxt uygulamasidir; uretim ortaminda gercek veritabani, guvenlik ve olcekleme stratejileri ayrica ele alinmalidir.

## Teknolojiler

- Nuxt 3
- Vue 3
- Pinia
- Axios
- PrimeVue
- TailwindCSS

## Kurulum

Gereksinimler:

- Node.js 18+ (onerilir)
- npm (veya pnpm/yarn/bun)

### 1) Bagimliliklari yukle

```bash
npm install
```

### 2) Gelistirme ortamini baslat

```bash
npm run dev
```

Uygulama varsayilan olarak `http://localhost:3000` adresinde calisir.

### 3) Production build

```bash
npm run build
```

### 4) Production preview

```bash
npm run preview
```

## Neden Ayri Backend Yok?

Bu projede hedef:

- Hizli kurulum
- Tek repo ile calistirma
- Nuxt/Vue tarafini net gosterme

Bu yuzden Nuxt'un `server/api` yetenekleri ile proje icinde kucuk bir backend katmani kurulmustur.

## Not

Bu yapi, demo ve ogrenme icin pratiktir.
Gercek production senaryolarinda ihtiyaclara gore ayri backend servisi, veritabani, auth stratejileri ve gozlemlenebilirlik katmanlari eklenmelidir.
