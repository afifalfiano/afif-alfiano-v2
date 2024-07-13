---
title: 'Membuat aplikasi todolist menggunakan angular 9'
description: 'Selamat sore teman-teman. Yap, kali ini saya ingin berbagi sedikit pengetahuan tentang salah satu framework javascript yang cukup popular, yaitu Angular. Sebelumnya apakah teman-teman sudah mengetahui apa itu angular?.'
coverImage: '/assets/blog/13.todolist/1.header.png'
dateFormatted: '2020-05-12T10:12:00.000Z'
author:
  name: 'Afif Alfiano'
  picture: '/assets/new-afif.jpeg'
ogImage:
  url: '/assets/blog/13.todolist/1.header.png'
wordCount: 847
layout: ../../layouts/post.astro
status: published
---

Selamat sore teman-teman. Yap, kali ini saya ingin berbagi sedikit pengetahuan tentang salah satu framework javascript yang cukup popular, yaitu Angular. Sebelumnya apakah teman-teman sudah mengetahui apa itu angular? kalau belum mengetahui izinkan saya membantu menjelaskan, singkatnya seperti ini Angular adalah framework javascript yang dibuat oleh google untuk memenuhi kebutuhan pasar terutama yang menangani aplikasi besar menggunakan bahasa typescript yang dibuat oleh microsoft. Jika masih penasaran mengenai angular bisa langsung kunjungi situs resimnya disini https://angular.io/

Oke, pada sharing kali ini kita berencana akan membuat sebuah aplikasi sederhana yaitu aplikasi todolist. Mungkin teman-teman sudah tidak asing dengan model aplikasi seperti ini, dimana kita bisa mengedit, menambah, melihat dan menghapus.

Oke langsung saja kita praktekkan. Pastikan teman-teman sudah menginstall node package manager supaya dapat menginstall angular. Jika belum bisa download dan install dari sini https://nodejs.org/en/

<img src="/assets/blog/13.todolist/2.node.png" alt="Node" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kemudian install sampai selesai. Karena disini saya menggunakan windows maka selain menggunakan command prompt saya juga menggunakan git bash untuk memudahkan dalam menggunakan cli karena sudah seperti linux. Jika ingin menginstall git bash bisa kunjungi laman berikut ini https://git-scm.com/downloads

Selanjutnya kita install angular-cli, karena syarat untuk membuat project angular harus menginstall angular-cli. Jalankan perintah

```javascript
npm i -g @angular/cli
```

<img src="/assets/blog/13.todolist/3.npm.png" alt="Node" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Tunggu proses sampai selesai dan kemudian cek versi angular yang teman-teman gunakan menggunakan perintah

```javascript
ng — version
```

<img src="/assets/blog/13.todolist/4.ng.png" alt="Node" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Nah, tampilannya seperti diatas dan kebetulan saya menggunakan angular versi 9.1.0.

Langkah selanjutnya membuat project baru menggunakan angular-cli, jalankan perintah berikut ini

```javascript
ng new todoList
```

Karena kita belum menggunakan routing maka pada pertanyaan add Angular routing pilih No saja, kemudian pada Styling kita gunakan yang sudah default yaitu CSS

<img src="/assets/blog/13.todolist/5.process.png" alt="Node" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Tunggu proses sampai selesai dan buka project yang telah kita buat. Berikut ini isi dari project yang telah kita buat.

<img src="/assets/blog/13.todolist/6.preview.png" alt="Node" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Setelah itu, kita coba untuk menjalakan project default angular yang barusan kita generate menggunakan angular-cli

<img src="/assets/blog/13.todolist/7.serve.png" alt="Node" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kemudian kita di browser dengan url http://localhost:4200 yang merupakan port bawaan angular itu sendiri. Berikut ini tampilan default dari angular.

<img src="/assets/blog/13.todolist/8.browse.png" alt="Node" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Setelah itu mari kita mulai untuk melakukan coding untuk membuat aplikasi sederhana todoList. Sebelumnya kita akan menggunakan bootstrap untuk styling component yang ada. Langsung saja install bootstrap dengan menjalankan perintah

```javascript
npm i bootstrap
```

<img src="/assets/blog/13.todolist/9.bs.png" alt="Node" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Setelah selesai proses install jangan lupa untuk melakukan konfigurasi supaya kita dapat menggunakan styling bootstrap. Buka file styles.css yang ada di folder src, kemudian tambahkan script berikut ini

```css
@import “~bootstrap/dist/css/bootstrap.css”
```

<img src="/assets/blog/13.todolist/10.style.png" alt="Node" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kemudian save perubahan yang ada. Sebenarnya ada beberapa cara untuk menggunakan bootstrap ini namun kita gunakan cara yang mudah ini saja.

Selanjutnya kita edit app.component.html yang berada pada folder src->app menjadi seperti berikut ini. Sebenarnya untuk tampilan teman-teman bisa bervariasi sesuka hatinya yang penting prosesnya sama.

<img src="/assets/blog/13.todolist/11.index.png" alt="Node" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Pada file tersebut kita edit seperti form biasa untuk default todolist, perbedaannya mungkin disini terdapat (ngSubmit)=”todoSubmit($event)” pada form. Yap, diangular terdapat fitur ngSubmit yang mana kita akan langsung mengirim isi form dengan menekan button bertipe submit. Karena fungsi tersebut akan ketrigger dengan button submit.

Selanjutnya ada [(ngModel)] = “addTodo” , nah ini fitur lainnya Angular, yaitu Double Data Binding, fitur ini berfungsi supaya apa yang kita tulis diinputan tersebut bisa langsung dilakukan pemroses secara realtime atau dinamakan data binding. Kenapa double? karena ketika kita mengisi inputan maka inputan langsung dikirim ke service untuk dilakukan pemrosesan.

Kemudian pada app.component.ts jangan lupa untuk kita edit terkait dengan penggunaan fungsi todoList. Berikut codenya.

<img src="/assets/blog/13.todolist/12.type.png" alt="Node" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kita perlu mendeklarasikan todos, addTodo dan todoList sebagai variabel untuk aplikasi todoList. Pada constructor kita inisasi addTodo dengan string kosong dan todos dengan array.

Selanjutnya kita buat fungsi todoSubmit(event). Nah, fungsi ini yang akan dijalankan ketika user mengeklik tombol button add pada user interface. Karena ini tipe Object maka kita perlu inisasi todoList dimana properti addTodo diisi dengan nilai this.addTodo atau nilai dari double data binding tadi. Setelah itu kita push nilai object dari todoList.

Kemudian terdapat fungsi deleteTodo(index), ini berfungsi untuk menghapus data yang ada. Langsung saja kita panggil todos kemudian menggunakan fungsi splice(index, 1) yang artinya menghapus data tertentu sebanyak 1.

Fungsi lainya yaitu deleteAll(index), ini berfungsi untuk menghapus semua data, perbendaanya terletak pada splice() jika yang deleteTodo menggunakan splice(index, 1) maka yang deleteAll ini menggunakan splice(index, todoLength) atau menghapus semua data yang ada.
Jika dirasa sudah langsung saja jalankan ng serve dan tampilannya seperti berikut ini.

<img src="/assets/blog/13.todolist/13.done.png" alt="Node" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Selamat aplikasi todoList pertama teman-teman sudah jadi. Aplikasi inim asih sangat-sangat simpel dan tujuan Saya hanya mengenalkan penggunaan framework angular kepada teman-teman.

Semoga bermanfaat 😁
