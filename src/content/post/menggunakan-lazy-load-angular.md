---
title: 'Menggunakan Lazy Load di Angular'
description: 'Haloo teman-teman. Bagaiamana akhir pekannya? Pergi refreshing apa tetap di depan laptop atau komputer 😅. Apapun itu selagi kegiatannya positif maka tidak perlu diperdebatkan, oke.Pada kesempatan kali ini saya ingin share tentang salah satu fitur angular yang bisa mempercepat waktu load website.'
coverImage: '/assets/blog/7.lazy-load-angular/1.header.jpeg'
dateFormatted: '2020-07-04T10:12:00.000Z'
author:
  name: 'Afif Alfiano'
  picture: '/assets/new-afif.jpeg'
ogImage:
  url: '/assets/blog/7.lazy-load-angular/1.header.jpeg'
wordCount: 1171
layout: ../../layouts/post.astro
---

Haloo teman-teman. Bagaiamana akhir pekannya? Pergi refreshing apa tetap di depan laptop atau komputer 😅. Apapun itu selagi kegiatannya positif maka tidak perlu diperdebatkan, oke.

Pada kesempatan kali ini saya ingin share tentang salah satu fitur angular yang bisa mempercepat waktu load website. Fitur ini bernama lazy loading. Apa itu lazy loading? Lazy loading adalah fitur yang digunakan untuk mempercepat proses load website. Karena defaultnya angular itu akan akan meload semua yang ada di NgModules maka membutuhkan waktu yang lama untuk meload semuanya. Maka dari itu disediakanlah fitur lazy loading. Kelebihan lazy loading adalah dapat mengurangi ukuran bundling yang artinya juga mengurangi waktu load. Fitur ini digunakan untuk routing komponen atua library. Jadi ketika pertama kali project angular di load maka library atau komponen yang menggunakan lazy loading tidak akan ikut di load dan hanya akan terpanggil ketika user mengakses komponen atau library tersebut. Oke mungkin itu saja penjelasan singkat, sekarang mari kita praktikkan bagaimana membuat lazy loading.

Terdapat 2 cara untuk menggunakan fitur lazy loading ini. Pertama dengan cara generate routing lazy loading dan kedua dengan cara generate komponen biasa tapi kita tambahkan fitur lazy loading secara manual. Nanti kita coba satu per satu.

Pastikan teman-teman sudah membuat project baru. Disini saya sudah membuat project baru dengan nama lazyLoadingAngular. Kemudian juga menggunakan sedikit styling dari bootstrap supaya lebih enak dilihat (opsional).

<img src="/assets/blog/7.lazy-load-angular/2.started.png" alt="Started" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Selanjutnya kita edit default tampilan dari angular dan tambahkan sedikit styling menggunkaan bootstrap. Simpel saja menjadi seperti ini.

<img src="/assets/blog/7.lazy-load-angular/3.next.png" alt="Started" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

File html seperti berikut ini.

```html
<div class="container-fluid">
<nav class="navbar navbar-white">
<ul class="nav nav-pills mt-2" id="pills-tab" role="tablist">
<li class="nav-item" role="presentation">
<a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Home</a>
</li>
<li class="nav-item" role="presentation">
<a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">Profile</a>
</li>
<li class="nav-item" role="presentation">
<a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</a>
</li>
</ul>
</nav>
<hr class="hr">
<div class="row">
<div class="col-xs-12 col-sm-12 ml-2">
<p>Test</p>
</div>
</div>
</div>
```

Kita coba dengan cara langsung generate config menggunkaan lazy loading untuk menu profile. Jalankan perintah dibawah ini.

```typescript
ng generate module profile --route profile --module app.module
```

Maka akan secara otomatis generate komponen lengkap dengan konfigurasi lazy loading.

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [{ path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) }];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
```

Nah, kita cek dikomponen profile ternyata ada file routing juga. File inilah yang akan diload ketika user merequest atau membuaka libary atau komponen ini. Seperti berikut ini.

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
const routes: Routes = [{ path: '', component: ProfileComponent }];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class ProfileRoutingModule { }
```

Tinggal kita edit file html supaya bisa merouting komponen yang barusan kita tambahkan. Tambahkan juga untuk komponen home dengan cara generate seperti biasa. Untuk generate komponen tanpa lazy loading bisa jalankan perintah berikut ini.

```typescript
ng g c home
```

Nah, berikut ini file app.component.html yang telah saya edit.

```html
<div class="container-fluid">
<nav class="navbar navbar-white">
<ul class="nav nav-pills mt-2" id="pills-tab" role="tablist">
<li class="nav-item" role="presentation">
<a class="nav-link" id="pills-home-tab" data-toggle="pill" role="tab" aria-controls="pills-home" aria-selected="true" routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
</li>
<li class="nav-item" role="presentation">
<a routerLinkActive="active" class="nav-link" id="pills-profile-tab" data-toggle="pill" role="tab" aria-controls="pills-profile" aria-selected="false" routerLink="profile">Profile</a>
</li>
<li class="nav-item" role="presentation">
<a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</a>
</li>
</ul>
</nav>
<hr class="hr" />
<div class="row">
<div class="col-xs-12 col-sm-12 ml-2">
<router-outlet></router-outlet>
</div>
</div>
</div>
```

Kemudian coba jalankan dengan perintah ng serve. Berikut ini tampilan awalnya.

<img src="/assets/blog/7.lazy-load-angular/4.demo.png" alt="Demo" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Jadi header ini tidak menggunakan lazy loading. Maka kita coba akses komponen profile yang menggunakan lazy loading.

<img src="/assets/blog/7.lazy-load-angular/5.lazy.png" alt="Lazy" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Yap, kompnen profile yang telah terbundle muncul ketka user mengakses menu profile. Coba bayangkan ketika sudah menjadi aplikasi besar, tentu fitur ini sangat bermanfaat dan bisa mengurangi waktu load pertama kali. `<strong>`Ini juga berpengaruh ke experience user pertama kali mengakses website kita.`</strong>`

Oke, selanjutnya kita coba secara manual membuat fitur lazy load ini dari komponen biasa. Saya contohkan menggunakan komponen contact, jadi nanti teman-teman coba generate dulu komponen contact dengan perintah.

Setelah itu, langsung saja saya coba fork repository master dan membuat branch. Awalnya saya bingung mau kontribusi apa ya, karena kalo mau angular sudah ada, mau react juga sudah ada, mau vuejs pun juga sudah ada, akhirnya dapat ide nih untuk membuat hello world dari meteor js. Langsung saja saya kunjungi websitenya meteor js dan baca dokumentasinya.

```typescript
ng generate component contact
```

Kemudian kita buat file contact.module.ts seperti berikut ini.

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';
@NgModule({
declarations: [ContactComponent],
imports: [CommonModule,ContactRoutingModule]
})
export class ContactModule { }
```

Kemudian tambahkan juga file contact-routing.module.ts juga.

```typescript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './contact.component';
const routes: Routes = [{ path: '', component: ContactComponent }];
@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class ContactRoutingModule { }
```

Jika sudah, tinggal kita edit file app.component.html untuk menu contact dan app-routing.module.ts supaya bisa routing contact menggunkan lazy loading.

```html
<li class="nav-item" role="presentation">
<a class="nav-link" id="pills-contact-tab" data-toggle="pill" routerLink="contact" routerLinkActive="active" role="tab" aria-controls="pills-contact" aria-selected="false">Contact</a>
</li>
```

Kemudian untuk file app-routing.module.ts kita edit menjadi seperti berikut ini.

```typescript
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
{ path: '', component: HomeComponent},
{ path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
{ path: 'contact', loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) }
];
@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
```

Jangan lupa untuk menghapus component contact di app.module.ts karena ketika kita generate menggunakan ng g c contact, maka secara otomatis komponen contact ditambahkan di app.module.ts untuk dideklarasikan. Jika sudah langsung saja ng serve dan seperti berikut ini tampilannya.

Sebelum mengakses menu contact.

<img src="/assets/blog/7.lazy-load-angular/6.contact.png" alt="Contact" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Setelah mengakses menu contact.

<img src="/assets/blog/7.lazy-load-angular/7.after.png" alt="After Contact" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Yap, kita berhasil mengkonfigurasi lazy loading angular baik secara otomatis ataupun manual.

Berikut ini kode lengkapnya saya letakan di akun github saya.

<p><div class="link-preview-widget"><a class="w-full" href="https://github.com/afifalfiano/lazy-loading-angular" rel="noopener" target="_blank"><div class="link-preview-widget-title">afifalfiano/lazy-loading-angular: Lazy Loading on Angular</div><div class="link-preview-widget-description">Lazy Loading on Angular. Contribute to afifalfiano/lazy-loading-angular development by creating an account on GitHub.</div><div class="link-preview-widget-url">https://github.com/</div></a><a class="link-preview-widget-image" href="https://github.com/afifalfiano/lazy-loading-angular" rel="noopener" style="background-image: url('https://opengraph.githubassets.com/dd2b265af6d47e0e8f38a49d485d106722d480847f83f6feb67a86b8b6ec6dad/afifalfiano/lazy-loading-angular');" target="_blank"></a></div></p>

Semoga teman-teman dapat mempraktikan fitur lazy loading dari angular dan semoga bermanfaat. Tetap Semangat! .

<blockquote style="padding-top:10px;padding-bottom:10px;"><strong><em>“Pikirkanlah kebaikan apa yang dapat kita tinggalkan di dunia ini.”</em></strong></blockquote>

### References

<p><div class="link-preview-widget"><a  class="w-full" href="https://angular.io/guide/lazy-loading-ngmodules" rel="noopener" target="_blank"><div class="link-preview-widget-title">Angular</div><div class="link-preview-widget-description">By default, NgModules are eagerly loaded, which means that as soon as the application loads, so do all the NgModules, whether or not they are immediately necessary</div><div class="link-preview-widget-url">https://angular.io/</div></a><a class="link-preview-widget-image" href="https://angular.io/guide/lazy-loading-ngmodules" rel="noopener" style="background-image: url('');" target="_blank"></a></div></p>

#Angular #LazyLoading
