---
title: 10 perintah git yang harus kamu ketahui
description: Selamat Sore. Bagaimana kabarmu hari ini? Semoga selalu diberikan kesehatan dan semangat yang tak pernah padam. Pernahkah kamu berkolaborasi dengan orang lain? Bagaimana cara memanajemen project yang dikerjakan? 
coverImage: /assets/blog/preview/cover.jpg
dateFormatted: '2020-07-11T10:12:00.000Z'
wordCount: 1449
author:
  name: Afif Alfiano
  picture: /assets/new-afif.jpeg
ogImage:
  url: /assets/blog/10.git/1.header.jpeg
layout: ../../layouts/post.astro
---

Selamat Sore. Bagaimana kabarmu hari ini? Semoga selalu diberikan kesehatan dan semangat yang tak pernah padam. Pernahkah kamu berkolaborasi dengan orang lain? Bagaimana cara memanajemen project yang dikerjakan? Apakah setiap ada perubahan file harus melakukan save as? atau lebih parahnya harus saling kirim file setiap ada perubahan? Tentu hal ini sangat tidak efisien.

Maka, pada kesempatan kali ini saya ingin berbagi pengetahuan tentang git. Apa itu git? git adalah sebuah version control system di mana kita mendapatkan kemudahan dalam memanjamen sebuah project atau file. Jadi tidak perlu pusing-pusing mikirin bagaimana membedakan antara file yang lama dengan yang baru. Karena ada riwayat perubahan dan kita bisa selalu mendapatkan file yang paling update. Saya sarankan teman-teman untuk membaca manual booknya yang tentu lebih lengkap.

Pastika teman-teman sudah menginstall command line git ya, kalau di windows bisa pakai gitbash kalau di linux atau mac bisa tinggal install gitnya lewat terminal.


<p><div class="link-preview-widget"><a href="https://git-scm.com/" rel="noopener" target="_blank" class="w-full" ><div class="link-preview-widget-title">GIT </div><div class="link-preview-widget-description">Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.</div><div class="link-preview-widget-url">https://git-scm.com/</div></a><a class="link-preview-widget-image" href="https://git-scm.com/" rel="noopener" style="background-image: url('https://git-scm.com/branching-illustration@2x.png');" target="_blank"></a></div></p>


Sebelumnya saya telah membuat repository di github ya, jadi biar keliatan perubahannya seperti apa. Tapi repositorynya masih kosong dan tidak ada file readme dari github.


<p><div class="link-preview-widget"><a href="https://github.com/afifalfiano/learn-git" rel="noopener" target="_blank" class="w-full"><div class="link-preview-widget-title">afifalfiano/learn-git: Learning How to implements git on github.</div><div class="link-preview-widget-description">Learning How to implements git on github. Contribute to afifalfiano/learn-git development by creating an account on GitHub.</div><div class="link-preview-widget-url">https://github.com/</div></a><a class="link-preview-widget-image" href="https://github.com/afifalfiano/learn-git" rel="noopener" style="background-image: url('https://opengraph.githubassets.com/d3ba7ae1354c210e30850b0d89f39012ec58b01b1f09b5a9f4ff79be45d45950/afifalfiano/learn-git');" target="_blank"></a></div></p>


Berikut ini 10 perintah git yang wajib teman-teman ketahui untuk memudahkan proses development suatu project.

### 1. Git Init

Supaya suatu project dapat menjalankan versioning control system maka kita perlu menginisasi suatu repository atau folder local dengan cara menjalankan perintah git init.

<img src="/assets/blog/10.git/2.init.png" alt="Init" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

### 2. Git Add

Ketika terdapat suatu perubahan di dalam project maka file tersebut akan masuk ke dalam unstaging area. Kita perlu memindahkan file dari unstage area ke stage area. Tujuannya agar perubahan sudah tersimpan di staging area. Kita bisa menjalankan perintah git add namafiles atau git add . , kalau saya cenderung biasa menggunakan git add . supaya tidak ada yang terlewat untuk masuk ke staging area.

<img src="/assets/blog/10.git/3.add.png" alt="Add" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

### 3. Git Commit

Git commit berfungsi untuk menyimpan segala perubahan kita di dalam local. Jadi misalkan kita ingin berpindah branch atau pull atau merge suatu repository, kita tidak perlu takut akan hilangnya file perubahan kita. Tinggal jalankan git commit atau git commit -m “name commit”. Nah bedanya apa dengan git commit biasa? Jadi kalau git commit saja kita bisa menambahkan banyak deskripsi sedangkan git commit -m “name commit” itu hanya sebuah shortcut supaya lebih cepat dalam melakukan commit.

<img src="/assets/blog/10.git/4.commit.png" alt="Commit" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

### 4. Git Remote

Selanjutnya kita tinggal mengunggah project kita ke github. Nah di sini ketika pertama kali kita buat repository di github maka akan terdapat tampilan seperti berikut ini. Dengan syarat tidak memilih untuk inisasi file README.md

<img src="/assets/blog/10.git/5.remote.png" alt="Remote" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Karena kita sudah punya folder learn-git di local maka kita pilih metode untuk push an existing repository from the command line. Tinggal copy paste perintah tersebut dan jalankan di project kita. Kemudian kita cek dengan git remote -v. Untuk nama remotenya ini bisa bebas ya, bisa dengan origin, projectSaya atau yang lainnya. Tapi umumnya menggunakan origin.

<img src="/assets/blog/10.git/6.remote-check.png" alt="Remote Check" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

### 5. Git Push

Kemudian setelah repository github sudah kita remote, langkah selanjutnya adalah melakukan git push yang artinya mengungah project atau file kita ke dalam github. Karena baru pertama kali mengunggah project ini maka jalankan perintah git push origin master -u.

<img src="/assets/blog/10.git/7.push.png" alt="Push" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kemudian kita cek repository yang kita remote di github.

<img src="/assets/blog/10.git/8.push-check.png" alt="Push Check" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Oke berhasil ya…

### 6. Git Branch

Misalkan nih, kita tidak ingin merubah file di branch master karena mungkin takut terjadi error atau lainnya. Oh iya jadi inget, tolong ya jangan pernah melakukan perubahan file di branch master, karena itu sangat membahayakan dan bisa mengakibatkan kegagalan di production. Kembali ke topik awal, ketika ingin ganti branch tinggal jalankan git branch namabranch atau bisa dengan cara cepat yaitu membuat branch baru dan langsung berpindah. Bisa menggunakan perintah git checkout -b namabranch

<img src="/assets/blog/10.git/9.branch.png" alt="Branch" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Oke, keliatan ya perbedaannya. Terutama pada branch yang awalnya master menjadi revisi1.

Saya membuat perubahan file Todolist.md seperti ini di branch revisi1

<img src="/assets/blog/10.git/10.mk.png" alt="Branch" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Jangan lupa untuk melakukan git add, git commit dan git push ke branch terbaru ya.

<img src="/assets/blog/10.git/11.mk-check.png" alt="Branch" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

### 7. Git Checkout

Kalau saya mau kembali ke branch master bagaimana? Oke, simple aja tinggal jalankan perintah git checkout namabranch. Perlu teman-teman ingat ya, bisa jadi perubahan file yang ada di branch misal revisi1 tidak akan ada di branch master. Karena memang rumahnya sudah berbeda. Mari kita cek bersama-sama.

<img src="/assets/blog/10.git/12.checkout.png" alt="Checkout" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Yap, sudah berubah dan mari kita cek file Todolist.md

<img src="/assets/blog/10.git/13.checkout-check.png" alt="Checkout" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Ternyata perubahan file terbaru tidak ada. Tenang, tidak perlu panik karena perubahan file ada di branch revisi1. Saya ingin menggabungkan file yang ada di branch revisi1 dengan master supaya file terbaru bisa terupdate di master. Bagaimana caranya? Langsung saja ke pembahasan selanjutnya

### 8. Git Merge

Git merge adalah menggabungkan satu branch dengan branch lainnya. Artinya setiap perubahan yang ada di branch yang dipilih (misalkan revisi1) akan masuk ke branch utama(misalkan master). Langsung saja jalankan git merge namabranch

<img src="/assets/blog/10.git/14.merge.png" alt="Merge" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Yap, sudah dimerge dan coba kita cek di file Todolist.md

<img src="/assets/blog/10.git/15.merge-check.png" alt="Merge" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Mantappp, ternyata perubahan terbaru sudah ada di master. Jangan lupa untuk git add, git commit dan git push ya jika sudah tidak ada perubahan.

### 9. Git Pull dan Git Fetch

Dua perintah ini sebenarnya fungsinya berbeda tapi saya coba rangkum jadi satu saja biar lebih simpel. Git fetch ini berfungsi untuk mengambil branch terbaru dari github atau gitlab. Misalkan kita menambah branch baru revisi2 lewat github. Otomatis di local kita belum mendapatkan branch terbaru, maka kita bisa jalankan perintah git fetch

<img src="/assets/blog/10.git/16.pull.png" alt="Pull" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Maka hasilnya di local kita seperti ini

<img src="/assets/blog/10.git/17.pull-ps.png" alt="Pull" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Untuk mengeceknya tinggal kita jalankan git branch atau langsung saja git checkout ke branch terbaru.

<img src="/assets/blog/10.git/18.pull-check.png" alt="Pull" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Oke, sudah berhasil ya…

<hr/>

Kemudian git pull berfungsi untuk mengambil seluruh merubahan yang ada di suatu branch tertentu sekaligus melakukan merge. Misalkan saya mengedit di branch revisi1 melalui github seperti berikut ini.

<img src="/assets/blog/10.git/19.pull-a.png" alt="Pull A" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Setelah selesai langsung saja commit. Seperti ini hasil perubahannya.

<img src="/assets/blog/10.git/20.pull-b.png" alt="Pull A" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Nah, kita cek di local ternyata perubahan terbaru di branch revisi1 belum ada. Maka kita bisa jalankan perintah git pull origin revisi1. Berikut ini hasilnya

<img src="/assets/blog/10.git/21.pull-c.png" alt="Pull A" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Yap, perubahan terbaru sudah ada di local branch revisi1 kita.

### 10. Git Log

Ini sangat penting mana kala kita bingung ada di branch mana dan perubahan terakhir apa. Maka kita bisa guakan git log ini untuk melihat seluruh history commit yang ada. Langsung saja jalanakan perintah git log.

<img src="/assets/blog/10.git/22.git-log.png" alt="Log" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Sangat lengkap bukan? Mohon maaf itu tadi ada penambah secara manual melalui github, jadi mungkin ada beberapa log di tempat saya yang tidak ada di tempat teman-teman.

Okee, mungkin itu saja yang dapat saya share tentang git ini dan tetap <strong>saya sarankan teman-teman untuk membaca dokumentasi resmi dari git itu sendiri.</strong>


<p><div class="link-preview-widget"><a href="https://github.com/afifalfiano/learn-git" class="w-full" rel="noopener" target="_blank"><div class="link-preview-widget-title">afifalfiano/learn-git: Learning How to implements git on github.</div><div class="link-preview-widget-description">Learning How to implements git on github. Contribute to afifalfiano/learn-git development by creating an account on GitHub.</div><div class="link-preview-widget-url">https://github.com/</div></a><a class="link-preview-widget-image" href="https://github.com/afifalfiano/learn-git" rel="noopener" style="background-image: url('https://opengraph.githubassets.com/d3ba7ae1354c210e30850b0d89f39012ec58b01b1f09b5a9f4ff79be45d45950/afifalfiano/learn-git');" target="_blank"></a></div></p>


Kritik dan saran bisa langsung disampaikan lewat email afifalfiano2@gmail.com atau komen di sini ya. Terimkasih 😁


### Referensi


<p><div class="link-preview-widget"><a href="https://git-scm.com/" class="w-full" rel="noopener" target="_blank"><div class="link-preview-widget-title">GIT </div><div class="link-preview-widget-description">Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency.</div><div class="link-preview-widget-url">https://git-scm.com/</div></a><a class="link-preview-widget-image" href="https://git-scm.com/" rel="noopener" style="background-image: url('https://git-scm.com/branching-illustration@2x.png');" target="_blank"></a></div></p>


#Git #Github


