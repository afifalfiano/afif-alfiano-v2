---
title: 'Reusable Component'
description: 'Haloooo! Gimana kabar teman-teman? Maaf ya sudah 3 minggu lebih tidak ada artikel sama sekali. Oke, jadi pada kesempatan kali ini saya ingin berbagi ilmu tentang web component. Apakah kamu sudah tau apa itu web komponen? dilansir dari MDN berikut ini penjelasannya.'
coverImage: '/assets/blog/8.reusable/1.header.jpeg'
dateFormatted: '2020-08-22T10:12:00.000Z'
author:
  name: 'Afif Alfiano'
  picture: '/assets/new-afif.jpeg'
ogImage:
  url: '/assets/blog/8.reusable/1.header.jpeg'
wordCount: 738
layout: ../../layouts/post.astro
status: published
---

Haloooo! Gimana kabar teman-teman? Maaf ya sudah 3 minggu lebih tidak ada artikel sama sekali. Oke, jadi pada kesempatan kali ini saya ingin berbagi ilmu tentang web component.

Apakah kamu sudah tau apa itu web komponen? dilansir dari MDN berikut ini penjelasannya.

<blockquote style="padding-top: 10px; padding-bottom: 10px;"><strong><em>“Web Components is a suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.”</em></strong></blockquote>

Keuntungan utama dari web komponen ini adalah kita bisa menggunakan komponen lebih dari satu kali atau sering disebut dengan reusable. Nah, kalau teman-teman pernah menggunakan framework semacam angular, react ataupun vue pasti sudah mengenal apa itu komponen.

Untuk fitur lebih lanjutnya ada juga shadow DOM yang ringkasnya adalah kita membuat sebuah dom yang terenkapsulasi dari DOM biasa, jadi kita tidak bisa mengedit atau menambahkan style dari luar karena komponen tersebut sudah terenkapsulasi.

Jadi pada artikel ini saya menggunakan vanilla javascript atau javascript biasa tanpa framework sama sekali. Tujuan utama dari artikel ini adalah supaya kita bisa membuat web komponen dan menerapkan shadow dom.

Okee, pertama kita buat sebuah project sederhana seperti berikut ini.

<img src="/assets/blog/8.reusable/2.started.png" alt="Project" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Selanjutnya kita coba buat terlebih dahulu tanpa menggunakan web komponen. Jadi masih murni html dan css saja.

<img src="/assets/blog/8.reusable/3.non-component.png" alt="Project" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Berikut ini kode tampilan menggunakan html dan css pada kode commit di bawah ini.

<p><div class="link-preview-widget"><a class="w-full" href="https://github.com/afifalfiano/WebComponentCovid" rel="noopener" target="_blank"><div class="link-preview-widget-title">afifalfiano/WebComponentCovid at 6aad0237dcbe2735b7e116457bf5082c05a1c235</div><div class="link-preview-widget-description">Contribute to afifalfiano/WebComponentCovid development by creating an account on GitHub.</div><div class="link-preview-widget-url">https://github.com/</div></a><a class="link-preview-widget-image" href="https://github.com/afifalfiano/WebComponentCovid" rel="noopener" style="background-image: url('https://opengraph.githubassets.com/d5550356014ec01f1e2bc0ae58506973e74bd8640cc58022025ad3600b6234cb/afifalfiano/WebComponentCovid');" target="_blank"></a></div></p>

Selanjutnya kita coba membuat web komponen dimulai dari menu navbar terlebih dahulu.

<img src="/assets/blog/8.reusable/4.component.png" alt="Project" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Ringkasnya seperti gambar diatas. Jadi kita buat class NavBar dengan extends dari HTMLElement. Kemudian kita panggil constructor dari HTMLElement dengan memangil parentnya yaitu super(). Setelah itu kita buat fungsi render(), kita pindahkan style css dan element html pada fungsi ini. Setelah itu kita panggil fungsi render() ini pada fungsi connectedCallback() { //code }, nah untuk connectedCallback ini emang sudah bawaan dari sana jadi tinggal kita gunakan saja.

Langkah terakhir kita definisikan web komponen navbar tersebut dengan menginisiasi namanya nav-bar dari class NavBar.

Kemudian kita tinggal memanggil komponen yang telah kita buat di index.html seperti berikut ini. Jangan lupa untuk menambahkan script dari komponen yang telah kita buat.

<img src="/assets/blog/8.reusable/5.index.png" alt="Index" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Tinggal kita buat komponen untuk lainnya supaya lebih ringkas dan reusable.

Berikut ini kode untuk komponen section.

<img src="/assets/blog/8.reusable/6.section.png" alt="Index" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Jangan lupa untuk mengupdate index.html

<img src="/assets/blog/8.reusable/7.index-update.png" alt="Index" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Lebih ringkas bukan? yap tentu sekali. Untuk mengetest apakah komponen berhasil kita buat coba jalankan live server.

<img src="/assets/blog/8.reusable/9.new.png" alt="Index" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Oke, sampai tahap ini sudah berhasil membuat komponen. Trus gimana caranya supaya komponen tersebut stylenya tidak bisa diubah dari luar? Hmmm, kita bisa menerapkan shadow DOM. Jadi ketika komponen yang kita buat sudah terenkapsulasi maka komponen tersebut tidak bisa dirubah dari luar.

Langsung saja buka file komponen yang telah kamu buat. Pada construstur tambahkan kode berikut ini.

```javascript
constructor() {
super();
this._shadowDom = this.attachShadow({mode: 'open'});
}
```

Tujuannya adalah kita menginisasi shadow DOM pada variabel _shadowDom. Selanjutnya edit kode pada fungsi render() yang awalnya this.innerHTML menjadi this._shadowDom.innerHTML.

Untuk mengecek apakah sudah berhasil apa belum dalam menerapkan shadow dom bisa cek menggunakan inspect element komponen yang dipilih.

<img src="/assets/blog/8.reusable/10.console.png" alt="Index" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Nah jika sudah ada shadow-root berarti kita sudah berhasil menggunakan shadow dom untuk komponen kita.

Berikut ini full codenya untuk topik web komponen.

<p><div class="link-preview-widget"><a class="w-full" href="https://github.com/afifalfiano/WebComponentCovid" rel="noopener" target="_blank"><div class="link-preview-widget-title">afifalfiano/WebComponentCovid at 6aad0237dcbe2735b7e116457bf5082c05a1c235</div><div class="link-preview-widget-description">Contribute to afifalfiano/WebComponentCovid development by creating an account on GitHub.</div><div class="link-preview-widget-url">https://github.com/</div></a><a class="link-preview-widget-image" href="https://github.com/afifalfiano/WebComponentCovid" rel="noopener" style="background-image: url('https://opengraph.githubassets.com/d5550356014ec01f1e2bc0ae58506973e74bd8640cc58022025ad3600b6234cb/afifalfiano/WebComponentCovid');" target="_blank"></a></div></p>

Oke, mungkin itu saja yang dapat saya sampaikan pada artikel kali ini. Jika ada masukan atau saran bisa langsung kirim email ke afifalfiano2@gmail.com atau komen dibawah ini.

Terimakasih, Semoga bermanfaat 😊

### Referensi

<p><div class="link-preview-widget"><a class="w-full" href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" rel="noopener" target="_blank"><div class="link-preview-widget-title">Web Components | MDN</div><div class="link-preview-widget-description">Web Components is a suite of different technologies allowing you to create reusable custom elements — with their functionality encapsulated away from the rest of your code — and utilize them in your web apps.</div><div class="link-preview-widget-url">https://developer.mozilla.org/</div></a><a class="link-preview-widget-image" href="https://developer.mozilla.org/en-US/docs/Web/Web_Components" rel="noopener" style="background-image: url('https://developer.mozilla.org/mdn-social-share.0ca9dbda.png');" target="_blank"></a></div></p>

#WebComponent #HTML #CSS #Javascript
