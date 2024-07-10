---
title: 'How to hosting angular on github pages'
description: 'Selamat Pagi, Gimana kabar teman-teman? semoga selalu dalam keadaan baik-baik saja. Pada kesempatan kali ini saya ingin membahas bagaimana cara hosting di github pages secara otomatisasi. Jadi kita tidak perlu susah-susah mengupload file hasil build project kita ke github pages.'
coverImage: '/assets/blog/9.hosting-gh/1.header.jpeg'
dateFormatted: '2020-07-25T10:12:00.000Z'
author:
  name: 'Afif Alfiano'
  picture: '/assets/new-afif.jpeg'
ogImage:
  url: '/assets/blog/9.hosting-gh/1.header.jpeg'
wordCount: 836
layout: ../../layouts/post.astro
---

Selamat Pagi, Gimana kabar teman-teman? semoga selalu dalam keadaan baik-baik saja. Pada kesempatan kali ini saya ingin membahas bagaimana cara hosting di github pages secara otomatisasi. Jadi kita tidak perlu susah-susah mengupload file hasil build project kita ke github pages.

Artikel ini juga bisa diterapkan di beberapa framework javascript, tapi kali ini saya hanya akan membahas menggunakan angular saja. Pastikan teman-teman sudah memiliki akun github dan repository yang ingin di deploy menggunakan github action.

Langkah awalnya kita buat project baru dan terserah teman-teman ingin mendesain projectnya seperti apa.

```typescript
ng new myProject
```

Kemudian kita coba jalankan di local terlebih dahulu. Pastikan tidak terdapat error.

<img src="/assets/blog/9.hosting-gh/2.init.png" alt="Init" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Langkah selanjutnya adalah mengunggah project kita ke repository yang telah kita buat di github.

```typescript
git remote add origin https://github.com/username/your_repository.git
```

Kemudian jika sudah jangan lupa untuk mengunggah project kita ke github dengan menjalankan kombinasi perintah berikut ini.

```typescript
git add . && git commit -m "myProject" && git push origin master -u
```

Kita cek repository yang telah kita sediakan untuk project yang kita unggah.

<img src="/assets/blog/9.hosting-gh/3.repo.png" alt="Repo" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Jika sudah berhasil langkah selanjutnya adalah mengkonfigurasi github action. Jadi fungsi dari github action ini adalah supaya menerapkan continue deployment dan ke trigger ketika push ke branch master. Masih bingung? Langsung praktik saja yuk.

Selanjutnya menyediakan branch khusus untuk menampung file hasil build dari github action ini. Pastikan branch kita berasal dari master dan melalui github kita (bukan dari local kita).

<img src="/assets/blog/9.hosting-gh/4.repo-gh.png" alt="Repo" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kemudian jalankan perintah berikut ini untuk mengambil branch terbaru supaya di local kita branch sudah terupdate.

```typescript
git fetch origin gh-pages
```

Jika sudah terdapat branch gh-pages langsung saja jalankan perintah berikut ini untuk berpindah branch.

```typescript
git checkout gh-pages
```

Kita perlu mengosongkan branch ini supaya benar-benar bersih ketika pertama kali deploy dan tidak ada file yang tidak diperlukan. Pastikan folder node_modules juga ikut terhapus ya, karena jika sampai terunggah, folder tersebut sangat besar ukurannya. Untuk menghapus jalankan perintah berikut ini.

```typescript
git rm -rf .
```

Jika semua file dan folder sudah terhapus maka tinggal kita unggah branch gh-pages ke repository kita. Jalankan perintah berikut ini.

```typescript
git add . && git commit -m "deleted" && git push origin gh-pages -u
```

Kemudian kita cek lagi di repository apakah branch gh-pages sudah terunggah.

Jika sudah terunggah, tinggal konfigurasi file github_action.yml untuk menjalankan fitur continue deployment menggunakan github action. Langsung saja kembali ke branch master.

Buat file github_action.yml di dalam folder .github/workflows/

```yaml
name: Build and Deploy

on:
  push:
    branches:
    - master

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v1
    - uses: actions/setup-node@v1 #this installs node and npm for us
      with:
        node-version: '12'
    - uses: actions/cache@v1 # this allows for re-using node_modules caching, making builds a bit faster.
      with:
        path: ~/.npm
        key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
        restore-keys: |
          ${{ runner.os }}-node-    
    - name: Build
      run: |
        npm install
        npm run-script deploy
    - name: Deploy
      uses: JamesIves/github-pages-deploy-action@releases/v3
      with:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        BRANCH: gh-pages
        FOLDER: dist/myProject
```

Jika sudah tahap selanjutnya adalah menambahkan script di file package.json

```bash
"deploy": "ng build --prod --base-href=/myProject/"
```

Jika sudah tinggal lakukan push untuk perubahan terbaru di branch master. Kemudian kita cek di tab actions pada repository kita. Maka akan terdapat proses workflow yang sedang berjalan.

<img src="/assets/blog/9.hosting-gh/5.progress.png" alt="Progress" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Untuk melihat proses deployment tinggal klik judul dari proses yang berjalan. Misalnya untuk kasus ini deployment yang berjalan dengan nama commit edit. Tinggal klik nama edit tersebut.

<img src="/assets/blog/9.hosting-gh/6.build.png" alt="Build" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Jika sudah berhasil. Kita cek branch gh-pages yang ada di repository kita.

<img src="/assets/blog/9.hosting-gh/7.done.png" alt="Done" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Seperti itulah hasil compile dan build dari angular. Selanjutnya kita tinggal setting supaya bisa diakses lewat github pages.

Langsung saja klik tab settings kemudian cek pada bagian berikut ini. Pastikan sourcenya kita ganti menjadi gh-pages

<img src="/assets/blog/9.hosting-gh/8.temp.png" alt="Template" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kemudian kita coba buka link yang muncul tersebut. Misalnya untuk kasus ini linknya adalah https://afifalfiano.github.io/myProject/

<img src="/assets/blog/9.hosting-gh/9.finish.png" alt="Finish" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Selamat! Kamu sudah berhasil melakukan deploy project angular ke github pages menggunakan github action untuk continue deployment. Berarti setiap teman-teman melakukan perubahan dan di push ke branch master maka otomatis proses deployment berjalan.

Berikut ini kode lengkapnya yang bisa diakses di repository akun github saya.


<p><div class="link-preview-widget"><a  class="w-full"href="https://github.com/afifalfiano/myProject" rel="noopener" target="_blank"><div class="link-preview-widget-title">afifalfiano/myProject: Hosting project angular on github pages using github action.</div><div class="link-preview-widget-description">Hosting project angular on github pages using github action. - afifalfiano/myProject: Hosting project angular on github pages using github action.</div><div class="link-preview-widget-url">https://github.com/</div></a><a class="link-preview-widget-image" href="https://github.com/afifalfiano/myProject" rel="noopener" style="background-image: url('https://opengraph.githubassets.com/082ce7f369c13c62feb1ef8a6bad7ab3f861c460061964cba7d5b64c87963bc1/afifalfiano/myProject');" target="_blank"></a></div></p>


Selamat mencoba dan jika ada pertanyaan bisa langsung ditanyakan. Semangat!

#github #angular #githubaction #ci
