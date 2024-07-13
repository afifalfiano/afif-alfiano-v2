---
title: 'Deploy Angular 9 and Bazel on Azure Static Web Apps(Preview) using Github Actions Part II'
description: 'Setelah proses panjang menginstall bazel di angular, maka kita lanjut ke proses mengunggah source code ke github dan menghubungkan ke azure untuk dilakukan proses deployment.'
coverImage: '/assets/blog/14.bazel/1.header.jpeg'
dateFormatted: '2020-06-14T10:12:00.000Z'
author:
  name: 'Afif Alfiano'
  picture: '/assets/new-afif.jpeg'
ogImage:
  url: '/assets/blog/14.bazel/1.header.jpeg'
wordCount: 836
status: published
---

Setelah proses panjang menginstall bazel di angular, maka kita lanjut ke proses mengunggah source code ke github dan menghubungkan ke azure untuk dilakukan proses deployment.

### 2. Mengungggah source code ke github

Pastikan teman-teman sudah memilki akun github untuk mengunggah source code yang kita buat. Kemudian membuat repository baru dan di sini saya membuat repository yang namanya sesuai dengan project saya yaitu ngBazel.

<img src="/assets/blog/14.bazel/13.remote.png" alt="Remote" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kemudian kita remote repository itu dengan cara `<strong>`git remote add origin https://github.com/afifalfiano/ngBazel.git .`</strong>`

<img src="/assets/blog/14.bazel/14.init.png" alt="Init" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Setelah itu kita lakukan git add . untuk memindahkan seluruh source code ke staging dan selanjutnya git commit. Jika sudah tinggal lakukan proses git push origin master -u. Jika ssh kita belum terdaftar ke github maka akan dimintai username dan password untuk login ke akun github. Isikan degan benar dan tunggu proses upload sampai selesai.

Cek pada repository akun github yang tadi kita buat apakah sudah diperbarui apa belum.

<img src="/assets/blog/14.bazel/15.push.png" alt="Push" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Jika sudah, maka selamat tahapan unggah source code berhasil. Selanjutnya kita masuk ke proses deployment menggunakan azure dengan bantuan github workflow action.

### 3. Deployment ke Azure

Oke masuk ke tahap terakhir dan pastikan teman-teman sudah memiliki akun azure microsoft. Jika belum bisa daftar terlebih dahulu dan ini gratis kok, hanya saja memerlukan kartu kredit untuk bisa menggunakan layanan ini. Teman-teman bisa membuat kartu je*ius dan menggunakan virtual account kartu kredit.

<img src="/assets/blog/14.bazel/16.azure.png" alt="Push" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Selanjutnya kita login ke azure dan setelah berhasil langsung saja pilih portal.

<img src="/assets/blog/14.bazel/17.dashbord.png" alt="Dashbord" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kemudian pilih Static Web Apps(preview) karena kita akan menggunakan layanan tersebut.

<img src="/assets/blog/14.bazel/18.static.png" alt="Static" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Setelah itu kita klik Add untuk menambahkan project baru.

<img src="/assets/blog/14.bazel/19.site.png" alt="Static" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Isikan sesuai dengan ketentuan dan pada research group bisa create new jika teman-teman belum pernah mengguakan layanan ini. Nah, pada source code detail ini terdapat github account. Hubungkan azure dengan github teman-teman dan pilih repository yang akan dideploy ke azure. Kemudian klik next: build.

<img src="/assets/blog/14.bazel/20.deploy.png" alt="Deploy" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Untuk app location kita isi dengan dist, apinya dikosongkan saja dan artifact kita isi dengan /. Kemudian next: Tags>.

<img src="/assets/blog/14.bazel/21.name.png" alt="Deploy" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Jika kita belum membutuhkan versioning aplikasi maka bisa skip saja pada bagian ini. Selanjutya review + create.

<img src="/assets/blog/14.bazel/22.finish.png" alt="Finish" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Langsung saja klik create dan tunggu sampai proses berhasil.

<img src="/assets/blog/14.bazel/23.nice.png" alt="Nice" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Yap, kita berhasil mendelpoy ke azure. Apakah selesai? tentu belum, mari kita lanjutkan perjalanan ,hehe. Setelah proses selesai maka akan secara otomatis akan membuat file di repository kita untuk menjalankan proses deployment dari github ke azure. Filenya seperti berikut ini.

<img src="/assets/blog/14.bazel/24.chck.png" alt="Check" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kemudian kita cek di menu action, dimenu itu kita bisa melihat proses deployment yang sedang terjadi dan ternyata masih terdapat error.

<img src="/assets/blog/14.bazel/25.git-action.png" alt="Git Action" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Nah, kita perlu konfigurasi lebih lanjut.

Kita masuk ke source code kita yang ada di local, selanjutnya kita pull code terbaru yang ada direpository tadi. Kita edit file azure-static…yml menjadi seperti berikut ini.

<img src="/assets/blog/14.bazel/26.code.png" alt="Code" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kemudian kita edit juga file .bazelrc. Kita edit perintah build — symlink_prefix=dist/ menjadi build — symlink_prefix=dist-bazel/ .

Tambahkan juga pada package.json proses build menjadi ng build — leaveBazelFilesOnDisk

Jika sudah semua, kita git add , git commit dan git push kembali. Kita tunggu proses deployment ke azure.

<img src="/assets/blog/14.bazel/27.build.png" alt="Build" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Sembari menunggu proses kita bisa cek website kita yang disediakan oleh azure, seperti ini jika belum ada isinya.

<img src="/assets/blog/14.bazel/28.azure.png" alt="Build" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Yap, akhirnya proses deployment selesai dan membutuhkan waktu sekitar 3 menit lebih.

<img src="/assets/blog/14.bazel/29.build-2.png" alt="Build" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Dan kita refresh website tadi dan selamat kamu berhasil deploy ke azure.

<img src="/assets/blog/14.bazel/30.done.png" alt="Build" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Nah pada tahap ini teman-teman sudah berhasil mendeploy aplikasi angular ke azure menggunakan perantara github actions.

Selanjutnya ada sedikit tambahan, di azure ini kita juga bisa menggunakan environment staging, jadi untuk mencoba fitur ini tinggal buat branch baru dari master bernama staging.

Kemudian edit sedikit supaya tau perbedaanya dari master, setelah itu git add, git commit dan git push tapi bukan dimaster melainkan distaging.

Setelah proses upload ke staging berhasil, kita lakukan pull request ke master. Seperti ini tampilannya.

<img src="/assets/blog/14.bazel/31.pull.png" alt="Build" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Tinggal klik create pull request dan secara otomatis github actions akan ke trigger kembali untuk melakukan proses deployment. Proses deployment bukan dilakukan dimaster atau production, melainkan di staging.

<img src="/assets/blog/14.bazel/32.staging.png" alt="Env" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Tunggu proses deployment ke staging sampai selesai.

<img src="/assets/blog/14.bazel/33.build-stag.png" alt="Build" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Yap dan berhasil, untuk mengecek kita bisa langsung menuju ke mintoring azure untuk melihat link yang ada.

<img src="/assets/blog/14.bazel/34.selesai.png" alt="Done" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Oke untuk mengecek website yang ada distaging, langsung saja klik browse pada staging.

<img src="/assets/blog/14.bazel/35.prev.png" alt="Prev" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Oke selamat proses deployment ke staging berhasil. Mari kita bandingkan perbedaan yang di master dan di staging.

<img src="/assets/blog/14.bazel/36.compare.png" alt="Compare" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Untuk memastikan apakah ini menggunakan bazel, teman-teman bisa klik kanan dan view page source dan jika tampilannya seperti berikut ini maka dapat dipastikan buildnya menggunakan bazel.

<img src="/assets/blog/14.bazel/37.npm.png" alt="Bazel" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Berikut ini source code lengkapnya untuk latihan panjang untuk deploy angular dan bazel ke azure menggunakan perantara github actions.

<p><div class="link-preview-widget"><a class="w-full" href="https://github.com/afifalfiano/ngBazel" rel="noopener" target="_blank"><div class="link-preview-widget-title">afifalfiano/ngBazel</div><div class="link-preview-widget-description">Contribute to afifalfiano/ngBazel development by creating an account on GitHub.</div><div class="link-preview-widget-url">https://github.com/</div></a><a class="link-preview-widget-image" href="https://github.com/afifalfiano/ngBazel" rel="noopener" style="background-image: url('https://opengraph.githubassets.com/afe82f0432403159303a82c55e85dd56d6236b49d411fe377d0237149fe92c6e/afifalfiano/ngBazel');" target="_blank"></a></div></p>

Oke, mungkin itu saya yang dapat saya bagikan tentang angular, bazel, azure dan github actions. Semoga bermanfaat dan tetap semangat ya! 😁

#github #azure #angular #bazel
