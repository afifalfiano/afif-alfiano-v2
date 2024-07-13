---
title: 'My First Pull Request'
description: 'Gimana rasanya ketika pertama kali pull requestmu di setuju oleh pemilik project? pasti senang bukan. Pull request adalah sebuah metode dimana kita meminta pemilik kode master untuk mereview tambahan kode kita dan jika disetujui bisa dimerge atau digabung ke master kode tersebut.'
coverImage: '/assets/blog/5.first-pull-request/1.header.jpeg'
dateFormatted: '2020-06-18T10:12:00.000Z'
author:
  name: 'Afif Alfiano'
  picture: '/assets/new-afif.jpeg'
ogImage:
  url: '/assets/blog/5.first-pull-request/1.header.jpeg'
wordCount: 792
layout: ../../layouts/post.astro
status: published
---

Gimana rasanya ketika pertama kali pull requestmu di setuju oleh pemilik project? pasti senang bukan. Pull request adalah sebuah metode dimana kita meminta pemilik kode master untuk mereview tambahan kode kita dan jika disetujui bisa dimerge atau digabung ke master kode tersebut. Nah, inilah yang saya rasakan sekitar 2 minggu yang lalu dan pada artikel kali ini saya ingin berbagi cerita bagaimana pull request saya untuk berkontribusi di open source bisa disetujui yang pada akhirnya dimerge ke master.

Berawal dari saya mulai aktif di twitter dan kemudian mengikuti beberapa developer top baik yang ada di google, microsoft, amazon dan lain-lain. Singkat cerita ketika saya scroll timeline, tiba-tiba muncul postingan dari senior engineering microsoft yaitu Pak Jonh Papa. Kemudian saya baca dan inti dari postingannya adalah membuat project untuk mengoleksi contoh aplikasi hello world dari semua framework atau library javascript yang digunakan untuk testing static web apps dari azure. Wah, langsung kepikiran nih buat kontribusi, akhirnya saya coba akses link github yang ditautkan di tweetnya. Pertama kali buka repositorynya cuma ada 10 orang yang melakukan fork atau cloning dari master repositoy. Artinya peluang untuk kontribusi masih besar dan diawal itu sudah ada framework terkenal seperti Angular, Vuejs dan React. Nah, seperti ini bunyi tweetnya.

<div style="display: flex; justify-content: center;">

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="en" dir="ltr"></p><a href="https://twitter.com/John_Papa/status/1263606692723527681"></a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

</div>

Setelah itu, langsung saja saya coba fork repository master dan membuat branch. Awalnya saya bingung mau kontribusi apa ya, karena kalo mau angular sudah ada, mau react juga sudah ada, mau vuejs pun juga sudah ada, akhirnya dapat ide nih untuk membuat hello world dari meteor js. Langsung saja saya kunjungi websitenya meteor js dan baca dokumentasinya.

Setelah selesai baca dokumentasi langsung saya eksekusi dengan menginstall framework ini, kemudian membuat project baru. Ternyata tidak semudah itu, saya mengalami kegagalan membuat project baru. Saya coba cari kesana kemari masuk forum meteorjs tapi belum membuahkan hasil juga dan akhirnya permasalahan busa teratasi. Issue ini yang membuat gagal meteorjs create new project.

<p><div class="link-preview-widget"><a class="w-full" href="https://stackoverflow.com/questions/60333092/meteor-update-isopacket-giving-combined-error-sourcemapconsumer-destroy-is-n" rel="noopener" target="_blank"><div class="link-preview-widget-title">Meteor update isopacket giving `combined` error - sourcemapConsumer.destroy is not a function</div><div class="link-preview-widget-description">Every time I try to update a project or create a project with 1.9 and above in Meteor I get the following error: Errors prevented isopacket load: While loading isopacket `combined`:C:\Users\USER\</div><div class="link-preview-widget-url">https://stackoverflow.com/</div></a><a class="link-preview-widget-image" href="https://stackoverflow.com/questions/60333092/meteor-update-isopacket-giving-combined-error-sourcemapconsumer-destroy-is-n" rel="noopener" style="background-image: url('https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded');" target="_blank"></a></div></p>

Kemudian saya edit script default meteor js lalu saya coba jalankan dilocal dan ternyata berhasil. Seneng nih, langsung saja saya push ke branch saya dan menambahkan sedikit dokumentasi untuk meteor js.

<p><div class="link-preview-widget"><a class="w-full" href="https://github.com/afifalfiano/hello-worlds" rel="noopener" target="_blank"><div class="link-preview-widget-title">afifalfiano/hello-worlds at meteor</div><div class="link-preview-widget-description">afifalfiano/hello-worlds at meteor</div><div class="link-preview-widget-url">https://github.com/</div></a><a class="link-preview-widget-image" href="https://github.com/afifalfiano/hello-worlds" rel="noopener" style="background-image: url('https://opengraph.githubassets.com/6bce4131124f0570a6467dde47e3f91b93d22317c6ef9ddda0b757d0a2a493b8/afifalfiano/hello-worlds');" target="_blank"></a></div></p>

Kemudian langsung saja saya coba pull request ke master repository milik Pak John Papa. Tentu saja tidak langsung disetujui karena masih ada beberapa issue yang harus saya perbaiki seperti menambahkan meteor di dokumentasi master dan menghapus file test dari metoer js. Oke, langsung saja saya update dan hasilnya seperti ini pull request saya disetujui dan dimerge ke master 😁

<p><div class="link-preview-widget"><a class="w-full" href="https://github.com/johnpapa/hello-worlds/pull/44" rel="noopener" target="_blank"><div class="link-preview-widget-title">Meteor by afifalfiano · Pull Request #44 · johnpapa/hello-worlds</div><div class="link-preview-widget-description">By making a PR you are agreeing to that contributing a hello world project allows the repo/project owner to use the hello world app in examples for their own use. only the most simple basic hello...</div><div class="link-preview-widget-url">https://github.com/</div></a><a class="link-preview-widget-image" href="https://github.com/johnpapa/hello-worlds/pull/44" rel="noopener" style="background-image: url('https://opengraph.githubassets.com/99aec1287af1db9e236c3e0b6948e341244a8c366c382486e56d6255f01e89a8/johnpapa/hello-worlds/pull/44');" target="_blank"></a></div></p>

Sampai sekarang sudah 32 orang yang melakukan fork master repository Pak John Papa dan sudah ada 27 contributor yang ikut serta dalam project open source ini. Foto profile saya sudah muncul lho, the one and only from Indonesia, haha 😂

<img src="/assets/blog/5.first-pull-request/2.contributor.png" alt="contirbutor" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Sebenarnya saya membuat dua branch yaitu meteor js dan scully dari angular. Akan tetapi karena sudah ada yang berkontribusi di scully, ya akhirnya branch saya tidak disetuju, tapi tidak apa yang penting sudah pernah merasakan bagaimana rasanya berkontribusi untuk open source.

Nah, mari teman-teman yang ingin memulai berkontribusi untuk open source bisa cari-cari issue diproject yang temen-temen pakai atau sukai dan tidak harus yang levelnya komplek, bahkan saya pernah baca ada top developer itu first pull requestnya adalah menghapus tanda titik koma sama whitespace, serius? iya benar. Nih kalo tidak percaya, saya kasih kesaksiannya hehe

<p><div class="link-preview-widget"><a class="w-full" href="https://www.linkedin.com/posts/elamoscicka_umbracoroadshow-opensource-github-activity-6523814996118503424-TEI3/" rel="noopener" target="_blank"><div class="link-preview-widget-title">Let’s talk about Open Source!</div><div class="link-preview-widget-description">Let’s talk about Open Source! Last Friday I took part in first #UmbracoRoadshow - part of it was a discussion panel about #OpenSource and below are some top takeaways I want to share with you:</div><div class="link-preview-widget-url">https://linkedin.com/</div></a><a class="link-preview-widget-image" href="https://www.linkedin.com/posts/elamoscicka_umbracoroadshow-opensource-github-activity-6523814996118503424-TEI3/" rel="noopener" style="background-image: url('https://media-exp1.licdn.com/dms/image/C5622AQHGaRxEwjUA5w/feedshare-shrink_800/0/1555398698747?e=1632960000&v=beta&t=jLI7QgJaVaLR9ShAGsS2x1Ff0iDZ1Rcar1KOqoW_plU');" target="_blank"></a></div></p>

Jadi tidak perlu takut untuk mencoba suatu hal yang baru. Kesalahan diawal itu wajar, karena dari kesalahan itu kita belajar banyak hal. Ketakutan itu tidak perlu dibesar-besarkan karena semakin kita takut, semakin lama kita tidak akan pernah mencoba 😀

Semoga bermanfaat dan tetap semangat!

#opensource #helloworld
