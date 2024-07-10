---
title: 'Membuat animasi tanpa menggunakan jquery'
description: 'Apa yang teman-teman pikirkan ketika ingin menggunakan animasi? Pasti menggunakan javascript nih kalau nggak menggunakan jquery. Lah apa bedanya javascript dengan jquery haha. Intinya jquery itu library yang diisi menggunakan javascript.'
coverImage: '/assets/blog/11.jquery/1.header.png'
dateFormatted: '2020-05-18T10:12:00.000Z'
author:
  name: 'Afif Alfiano'
  picture: '/assets/new-afif.jpeg'
ogImage:
  url: '/assets/blog/11.jquery/1.header.png'
wordCount: 496
layout: ../../layouts/post.astro
---

Apa yang teman-teman pikirkan ketika ingin menggunakan animasi? Pasti menggunakan javascript nih kalau nggak menggunakan jquery. Lah apa bedanya javascript dengan jquery haha. Intinya jquery itu library yang diisi menggunakan javascript

Oke, kali ini kita akan belajar menggunakan animasi tanpa javascript sedikit pun. Fitur ini ada pada CSS3 yaitu CSS Animation. Oke langsung saja kita buat css animation:

##### 1. Pertama — tama saya akan membuat sebuah lintasan seperti jalan raya dan lengkap dengan objeknya yaitu kotak dan lingkaran.

<img src="/assets/blog/11.jquery/2.index.png" alt="Index" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

##### 2. Kemudian memberikan sebuah styling biasa seperti berikut ini

<img src="/assets/blog/11.jquery/3.style.png" alt="Style" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Maka akan tampil lintasan seperti berikut ini

<img src="/assets/blog/11.jquery/4.tampilan.png" alt="Tampilan" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

##### 3. Kemudian tambahkan objek kotak dan lingkaran yang mana nantinya akan kita berikan sebuah styling animation.

Berikut ini styling untuk class circle

<img src="/assets/blog/11.jquery/5.code.png" alt="Tampilan" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

dan ini untuk styling class square

<img src="/assets/blog/11.jquery/6.suqare.png" alt="Tampilan" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Maka akan tampil objek seperti berikut ini :

<img src="/assets/blog/11.jquery/7.objek.png" alt="Tampilan" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

##### 4. Setelah itu mari kita buat sebuah css animation. Untuk membuat css animation kita memerlukan sebuah @keyframes animasi {} yang mana animasi itu nanti kita gunakan untuk sebuah objek bisa lingkaran atau kotak. Oke langsung saja buat seperti ini :

<img src="/assets/blog/11.jquery/8.animasi.png" alt="Tampilan" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

##### 5. Kemudian kita gunakan animasi drive itu disetiap objeknya. Seperti berikut ini

a. Circle

<img src="/assets/blog/11.jquery/9.circle-a.png" alt="Circle" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

b. Square

<img src="/assets/blog/11.jquery/10.square-b.png" alt="Circle" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Keterangan:

- Animation-name : digunakan untuk memanggil @keyframes yang telah kita buat
- Animation-duration: ini fungsinya hampir sama seperti transition atau waktu animasinya
- Animation-fill-mode: ini ada 3 kondisi yang pertama forwards, backwards dan both. Bedanya jika forwards dia akan berhenti didepan, jika backwards dia mulai dari dimana start keyframesnya dan jika both maka kedua duanya akan dipakai.
- Animation-delay: digunakan untuk penundaan waktu animasi
- Animation-iteration-count: digunakan untuk melakukan perulangan animasi.
- Animation-direction: digunakan untuk menentukan arah dari objek ketika menggunakan animasi tersebut
- Animation-timing-function: digunakan untuk menentukan bagaimana kecepatan dari objek tersebut.

##### 6. Maka akan menghasilkan outputan seperti berikut ini

Berikut ini full codenya untuk menggunakan css3 animation

<img src="/assets/blog/11.jquery/11.full.png" alt="Full Code" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Ada tips tambahan nih biar penulisan animation tidak sebanyak itu barisnya temen-temen bisa gunakan shorthand untuk css animation, berikut ini formatnya:

<img src="/assets/blog/11.jquery/12.use.png" alt="Uses" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Nah itu tinggal diisi aja dengan syntax yang digunakan, kalau ga digunakan tinggal dihapus aja.

Terimakasih, Semoga bermanfaat, oiya teman-teman bisa ngerubah listingnya supaya tau perbedaannya dan tentunya konsep dari css animation itu sendiri. Semangat :D
