---
title: 'Reactive Forms on Angular'
description: 'Karena minggu kemarin saya tidak sempat membuat artikel, maka akan saya ganti dengan minggu ini. Apa yang teman-teman pikirkan ketika pertama kali mendengar forms? apakah mengisi sebuah kolom? atau harus manual dengan cara menulis? Nah, pada kesempatan kali ini saya akan membahas tentang form.'
coverImage: '/assets/blog/12.forms/1.header.jpeg'
dateFormatted: '2020-07-25T10:12:00.000Z'
author:
  name: 'Afif Alfiano'
  picture: '/assets/new-afif.jpeg'
ogImage:
  url: '/assets/blog/12.forms/1.header.jpeg'
wordCount: 950
layout: ../../layouts/post.astro
---

Karena minggu kemarin saya tidak sempat membuat artikel, maka akan saya ganti dengan minggu ini. Apa yang teman-teman pikirkan ketika pertama kali mendengar forms? apakah mengisi sebuah kolom? atau harus manual dengan cara menulis? Nah, pada kesempatan kali ini saya akan membahas tentang form.

<blockquote style="padding: 10px 0;"><strong><em>A form is a document with spaces (also named fields or placeholders) in which to write or select, for a series of documents with similar contents. The documents usually have the printed parts in common, except, possibly, for a serial number.</em></strong></blockquote>

Pengertian di atas saya ambil dari wikipedia. Pada dasarnya form digunakan untuk mengisi sebuah field yang fungsinya bermacam-macam. Ada yang berfungsi untuk membuat akun, mengadukan komplian, dan masih banyak lagi.

Angular sendiri memiliki fitur form bawaan. Terdapat dua jenis form di angular, yaitu template drive form dan reactive form. Khusus saat ini saya hanya akan membahas tentang reactive form.

Apa itu reactive form? jika di telusuri dari situs resmi angular berikut ini penjelasannya.

<blockquote style="padding: 10px 0;"><strong><em>Reactive forms provide a model-driven approach to handling form inputs whose values change over time. This guide shows you how to create and update a basic form control, progress to using multiple controls in a group, validate form values and create dynamic forms where you can add or remove controls at run time.</em></strong></blockquote>

Intinya reactive form menyediakan banyak fitur seperti mengontrol setiap field inputan, memvalidasi setiap field yang ada dan membuat dinamik form.

Oke langsung saja kita buat project khusus untuk reactive form. Pada project kali ini saya menggunakan styling bootstrap. Jadi teman-teman bisa install juga bootstrapnya.

```typescript
ng new reactiveFormAngular
```

Kemudian kita buat tampilannya seperti ini

<img src="/assets/blog/12.forms/2.field.png" alt="Field" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Berikut ini kode htmlnya dan pure hanya menggunakan html dan styling dari bootstrap.

```html
<div class="container">
<div class="row">
<div class="col-xs-12 mx-auto">
<h1 class="display-4 text-center">Reactive Form Angular</h1>
<form>
<div class="form-group">
<label for="nama">Nama</label>
<input type="text" class="form-control" id="nama">
</div>

<div class="form-group">

<label for="email">Email</label>
<input type="text" class="form-control" id="email">
</div>

<div class="form-group">
<label for="telepon">Telepon</label>
<input type="text" class="form-control" id="telepon">
</div>

<div class="form-group">

<label for="email">Keterangan</label>
<textarea name="keterangan" id="keterangan" class="form-control" rows="3"></textarea>
</div>

<button type="submit" class="btn btn-success" >Simpan</button>  
<button type="button" class="btn btn-danger">Reset</button>
</form>
</div>
</div>
</div>
```

Untuk mengunakan reactive forms kita memerlukan dependensi reactive forms module. Langsung saja tinggal import di app.module seperti berikut ini.

<img src="/assets/blog/12.forms/3.typescript.png" alt="TS" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kemudian kita buka file app.component.ts untuk mengkonfigurasi lebih lanjut supaya form dapat dinamis.

```typescript
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'reactiveFormAngular';
  myForm: FormGroup;
  nama;
  email;
  telepon;
  keterangan;
  submitted = false;

  ngOnInit() {
    this.myForm = new FormGroup({
      nama : new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      telepon: new FormControl(null, [Validators.required, Validators.pattern('^[0-9]*$')]),
      keterangan: new FormControl(null, [Validators.required])
    });
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.myForm);
    this.nama = this.myForm.controls.nama.value;
    this.email = this.myForm.controls.email.value;
    this.telepon = this.myForm.controls.telepon.value;
    this.keterangan = this.myForm.controls.keterangan.value;
  }
  onResetForm() {
    this.myForm.reset();
    this.nama = '';
    this.email = '';
    this.telepon = '';
    this.keterangan = '';
  }
}
```

Keterangan:

- FormGroup: digunakan untuk mengelompokkan satu from.
- FormControl: digunakan untuk mengontrol masing-masing inputan.
- Validators: digunakan untuk memvalidasi inputan.

Untuk properti key saya ambil dari formControlName dari setiap inputan. Apa masih bingung? coba cek langkah selanjutnya.

Kemudian kita perbarui tampilan di app.component.html menjadi seperti berikut ini.

```html
<div class="container">
  <div class="row">
    <div class="col-xs-12 mx-auto">
      <h1 class="display-4 text-center">Reactive Form Angular</h1>
      <form [formGroup]="myForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="nama">Nama</label>
          <input type="text" class="form-control" id="nama" formControlName="nama">
          <span class="text-danger" *ngIf="!myForm.get('nama').valid && myForm.get('nama').touched">Nama wajib diisi!</span>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="text" class="form-control" id="email" formControlName="email">
          <span class="text-danger" *ngIf="!myForm.get('email').valid && myForm.get('email').touched">Email belum valid!</span>
        </div>
        <div class="form-group">
          <label for="telepon">Telepon</label>
          <input type="text" class="form-control" id="telepon" formControlName="telepon">
          <span class="text-danger" *ngIf="!myForm.get('telepon').valid && myForm.get('telepon').touched">Nomer Telpon harus angka!</span>
        </div>
        <div class="form-group">
          <label for="email">Keterangan</label>
          <textarea formControlName="keterangan" name="keterangan" id="keterangan" class="form-control" rows="3"></textarea>
          <span class="text-danger" *ngIf="!myForm.get('keterangan').valid && myForm.get('keterangan').touched">Keterangan harus diisi!</span>
        </div>
        <button type="submit" class="btn btn-success" [disabled]="!myForm.valid">Simpan</button>  
        <button type="button" class="btn btn-danger" (click)="onResetForm()">Reset</button> 
      </form>
        <div class="col-xs-12 mt-4" *ngIf="submitted">
              <h3 class="h3">Tampilan Data</h3>
              <p>Nama: {{ nama }}</p>
              <p>Email: {{ email }}</p>
              <p>Telepon: {{ telepon }}</p>
              <p>Keterangan: {{ keterangan  }}</p>
        </div>    
    </div>
  </div>
</div>
```

Keterangan:

- [formGroup]: digunakan untuk melakukan binding data dari form group.
- (ngSubmit): digunkan untuk mensubmit form yang ada.
- formControlName: digunakan untuk mengontrol setiap inputan/
- [disabled]: digunakan untuk mengecek jika belum valid maka tombol disable.
- (click): digunakan ketika user melakukan aksi click.
- *ngIf: digunakan untuk mengecek suatu kondisi.
- {{ variabel }} : interpolasi digunakan untuk mengakses data disuatu variabel.
- myForm.get(‘nama’) : digunakan untuk mengontrol formNameControl yang ada.

Setelah itu tinggal di save dan jalankan project angular. Jika di local tidak terjadi error, maka teman-teman bisa langsung mengunggah projectnya ke github. Berikut ini video singkat dari project yang telah kita buat.

Untuk yang sudah terdeploy, teman-teman bisa cek link berikut ini untuk mencoba menggunakannya.

<p><div class="link-preview-widget"><a class="w-full" href="https://afifalfiano.github.io/reactiveFormAngular/" rel="noopener" target="_blank"><div class="link-preview-widget-title">Reactive Forms Angular</div><div class="link-preview-widget-description">Demo</div><div class="link-preview-widget-url">https://github.com/</div></a><a class="link-preview-widget-image" href="https://afifalfiano.github.io/reactiveFormAngular/" rel="noopener" style="background-image: url('');" target="_blank"></a></div></p>

Berikut ini kode fullnya yang ada di github saya.

<p><div class="link-preview-widget"><a class="w-full" href="https://github.com/afifalfiano/reactiveFormAngular" rel="noopener" target="_blank"><div class="link-preview-widget-title">afifalfiano/reactiveFormAngular: Reactive Form Angular</div><div class="link-preview-widget-description">Reactive Form Angular. Contribute to afifalfiano/reactiveFormAngular development by creating an account on GitHub.</div><div class="link-preview-widget-url">https://github.com/</div></a><a class="link-preview-widget-image" href="https://github.com/afifalfiano/reactiveFormAngular" rel="noopener" style="background-image: url('https://opengraph.githubassets.com/91c4d54d9dd47b644ff45575e1ad02563ecad10bed94c59b4d3614572d5d7705/afifalfiano/reactiveFormAngular');" target="_blank"></a></div></p>

Selamat mencoba dan semoga bermanfaat. 😁

<hr/>

### Referensi

<p><div class="link-preview-widget"><a class="w-full" href="https://angular.io/guide/reactive-forms" rel="noopener" target="_blank"><div class="link-preview-widget-title">Angular</div><div class="link-preview-widget-description">Reactive forms provide a model-driven approach to handling form inputs whose values change over time. This guide shows you how to create and update a basic form control...</div><div class="link-preview-widget-url">https://angular.io/</div></a><a class="link-preview-widget-image" href="https://angular.io/guide/reactive-forms" rel="noopener" style="background-image: url('');" target="_blank"></a></div></p>

<p><div class="link-preview-widget"><a class="w-full" href="https://www.tektutorialshub.com/angular/angular-reactive-forms-validation/" rel="noopener" target="_blank"><div class="link-preview-widget-title">Angular Reactive Forms Validation - TekTutorialsHub</div><div class="link-preview-widget-description">learn how to validate the Angular Reactive Forms. Reactive Forms has several Built-in validators out of the box. You can also create custom validators.</div><div class="link-preview-widget-url">https://tektutorialshub.com/</div></a><a class="link-preview-widget-image" href="https://www.tektutorialshub.com/angular/angular-reactive-forms-validation/" rel="noopener" style="background-image: url('https://www.tektutorialshub.com/wp-content/uploads/2019/09/Angular-Reactive-Forms-Validation.png');" target="_blank"></a></div></p>

#reactiveforms #angular
