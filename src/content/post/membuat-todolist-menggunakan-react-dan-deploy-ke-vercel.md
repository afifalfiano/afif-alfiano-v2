---
title: 'Membuat TodoList Menggunakan Reactjs & Deploy ke Vercel'
description: 'Selamat datang kembali teman-teman di blog saya. Pada kesempatan kali ini kita akan belajar hal baru yaitu belajar reactjs. Dimana jika pada artikel-artikel sebelumnya saya selalu menggunakan angular...'
coverImage: '/assets/blog/18.reactjs/5.default-view.png'
dateFormatted: '2021-11-01T10:12:00.000Z'
author:
  name: 'Afif Alfiano'
  picture: '/assets/new-afif.jpeg'
ogImage:
  url: '/assets/blog/18.reactjs/5.default-view.png'
wordCount: 2817
layout: ../../layouts/post.astro
---

Selamat datang kembali teman-teman di blog saya. Pada kesempatan kali ini kita akan belajar hal baru yaitu belajar reactjs. Dimana jika pada artikel-artikel sebelumnya saya selalu menggunakan angular, kali ini kita akan menggunakan reactjs dengan membuat aplikasi todolist yang tidak hanya sekedar crud aplikasi saja. Karena tidak sah rasanya ketika kita belajar suatu hal tidak dimulai dengan todolist. Hehe
Nah diakhir artikel ini teman-teman bisa copy paste code dari repository yang saya letakkan di github. Jadi kalau mau mengetik dari 0 sesuai capture boleh ataupun mau copy paste juga boleh, yang penting temen-temen nanti bisa paham alur data atau state menggunakan reactjs ini. Oke langsung saja kita mulai praktiknya.

Pertama, pastikan teman-teman sudah menginstall nodejs dan npm karena untuk menggunakan reactjs kita memerlukan hal tersebut. Jika belum install bisa mengikuti panduan dari dokumentasi nodejs https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Kemudian kita inisiasi project reactjs dengan menjalankan perintah npx create-react-app todolist

```javascript
npx create-react-js
```

<img src="/assets/blog/18.reactjs/2.create-project.png" alt="Init" style="width: 100%; border-radius: 5px">

Tunggu sampai proses inisiasi project tersebut selesai.

Setelah selesai inisiasi project selanutnya kita buka project tersebut menggunakan IDE, bebas mau vscode, sublime, atom ataupun yang lain, yang penting senyamannya teman-teman.

<img src="/assets/blog/18.reactjs/3.first-code.png" alt="First-Code" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Secara default strukur filenya seperti diatas.

Kemudian kita coba untuk menjalankan aplikasi reactjs tersebut dilocal kita dengan menjalankan perintah npm run start

<img src="/assets/blog/18.reactjs/4.run-apps.png" alt="Run-Apps" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kemudian kita buka menggunakan browser dengan mengetikan pada url localhost:3000. Yap react secara default menggunakan port 3000, tapi jika angular selalu menggunakan port 4200. Walaupun kedua framework ataupun library tersebut bisa custom port juga.

<img src="/assets/blog/18.reactjs/5.default-view.png" alt="Default-Apps" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Jadi goal kita pada tutorial ini adalah membuat aplikasi simpel todolist dengan filter dan style yang lumayan bagus. Kurang lebih seperti ini goalnya.

<img src="/assets/blog/18.reactjs/6.goal.png" alt="Goal-Apps" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Jadi kita bisa memilih filter berdasarkan status, kemudian ketika klik data listnya dia secara otomatis berubah statusnya dengan tahapan todo, in progress, completed. Kemudian kita bisa menambahkan dan mengedit todo yang kita buat. Setelah membuat aplikasi tersebut kita juga akan mendeploynya ke serverless https://vercel.com/. Jadi nanti temen-temen bisa langsung menggunakan secara live.

Oke, langkah selanjutnya adalah dengan membuat file seperti ini terlebih dulu.

<img src="/assets/blog/18.reactjs/7.file.png" alt="File" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Buat folder baru dengan nama component kemudian tambahkan file UserInput(js,css), TodoList(js,css), dan FilterTodo(js,css).

Selanjutnya kita akan mengubah untuk TodoList(js,css) terlebih dahulu.

<img src="/assets/blog/18.reactjs/8.todolist.png" alt="Todolist" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kita menggunakan komponen function bukan class. Jadi seperti biasa kita buat variabel function dengan parameter props untuk komunikasi data antar komponen parent dan child.
Jangan lupa untuk import TodoList.css yang nanti akan kita buat.

Kita memiliki variabel changeStatus dengan parameter event. Kemudian didalam function tersebut terdapat props.changeStatus(event.target.id). Jika kita melihat pada baris 36 terdapat event onClick yang memanggil variabel changeStatus. Nah fungsi dari changeStatus adalah melempar data id dari sebuah list yang kita klik ke parent component. Melemparnya dengan menggunakan props.changeStatus(data).

Kemudian terdapat variabel list yang isinya adalah melakukan maping data dari props.data. Pada variabel tersebut kita memiliki let content yang berisi string kosong. Kemudian terdapat pengecekan jika status datanya Completed maka akan mengoverride content dengan syntax tersebut. Begitu juga ketika In Progress dan Todo. Nah setiap status itu memilki stylenya sendiri sendiri. Mungkin teman-teman bertanya apa fungsi dari <></>, dan kenapa harus ada () didalam content tersebut?

Oke, jadi begini fungsi dari () adalah untuk merender syntax kode html tersebut karena reactjs menggunakan jsx maka returnnya seperti ini walaupun kita bisa langsung saja tanpa menggunakan (). Kemudian untuk fungsi <></> apa artinya? Artinya adalah supaya kita bisa mempassing element tersebut tanpa harus menambahkan ``<div></div>`` ataupun tambahan elemen lainnya. Reactjs itu memiliki requirement harus mereturn satu root element ataupun komponen dan jika setiap komponen selalu mereturn ``<div>`` maka itu sangat tidak efektif. Nah disini lah element <></> muncul, element itu disebut dengan Fragment pada Reactjs. Jadi reactjs punya fitur untuk melengkapi requirement dari jsx itu sendiri dan jika temen-temen buka diconsole maka akan langsung ke element yang ada karena Fragment itu komponen kosong alias tidak ada.

Oke kita lanjutkan. Kemudian diluar kondisi status tadi kita return kembali dengan membuat `` <div>{content}</div>``, Yap kita render hasil styling tadi kedalam div tersebut. Kemudian pada baris 42 - 46 kita return kembali dengan `` <div>{list}</div>`` , lagi-lagi kita render variabel list tadi. Cukup menyenangkan bukan???

Berikut ini untuk styling komponen TodoList

<img src="/assets/blog/18.reactjs/9.todolist-css.png" alt="TodolistCSS" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Teman-teman bisa meniru saja ataupun bisa membuat kreasi yang lebih menarik juga bisa.

Selanjutnya kita akan menuju komponen UserInput.

<img src="/assets/blog/18.reactjs/10.user-input.png" alt="UserInput" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Pada komponen ini kita menggunakan beberapa fitur bawaan reactjs yaitu useState dan useEffect. Apa itu useState? useState adalah fitur dari reactjs yang memungkinkan kita untuk melisten data dan kita dapat merubah data atau state terakhir sesuai keinginan kita. Jadi pada useState terdiri dari [currentValue, setCurrentValue] nah ketika kita ingin mengubah currentValue cukup panggil setCurrentValue(data) maka otomatis currentValue akan terupdate tanpa harus reloading halaman.

Kemudian useEffect digunakan untuk menjalankan sebuah perintah setelah semua fungsi dan kondisi terender pada DOM komponen tersebut. Kemudian diakhir perintah useEffect terdapat array, maka kita bisa berikan sebuah nilai pada array tersebut yang akan selau kita  listen atau dengarkan perubahan. Mari kita bahas satu per satu untuk komponen userinput diatas.

Pada baris 6 dan 7 kita melakukan desctructuring pada useState. Pada variabel currentValue kita ambil default value adalah props.lastSelect.todo yang mana data ini kita kirimkan dari App.js. Kemudian isValid kita gunakan untuk untuk memvalidasi input form todo.

Kemudian variabel changeTodoHandler dengan parameter event berfungsi untuk mengupdate state currentValue setiap kali terjadi perubahan pada input todo. Nah variabel changeTodoHandler kita gunakan pada input dengan atribut onChange yang ada pada baris 44.

Kemudian terdapat useEffect yang mana didalamnya terdapat fungsi setCurrentValue untuk update currentValue yang nanti muncul pada input todo. Karena untuk valuenya kita listen dari currentValue seperti pada baris 43. Nah useEffect ini nanti berfungsi ketika user melakukan klik salah satu data, maka secara otomatis useEffect akan berjalan dengan melakukan set nama todo kedalam form input. Juga pada akhir useEffect terdapat array props.lastSelect.todo yang artinya kita akan selalu memonitor perubahan variabel tersebut.

Selanjutnuya kita memilki variabel fungsi submitHandler dengan parameter event. Pertama kita gunakan event.PreventDefault() suapay ketika klik submit halaman tidak reload, karena by default sebuah form ketika user klik submit maka akan otomatis melakukan reload halaman. Setelah itu kita cek atau berikan validasi ketika input todo tidak sama dengan string kosong atau undefined maka kita setIsValid menjadi true dan jika tidak kita setIsValid false. Ketika true kita buat sebuah variabel data yang berisi object todo dan status. Nilai todo kita ambil dari currentValue sedangkan status langsung kita set Todo. Nah selanjutnya kita berikan kondisi jika props.lastSelect terdapat id maka kita override variabel data dengan menambahkan id yang kita ambil dari props.lastSelect.id. Kondisi ini berfungsi untuk melakukan update data todo. Kemudian kita panggil props.saveNewData(data) dan juga props.handlerUpdate true. Fungsi handlerUpdate berfungsi ketika update data, maka element input todo akan langsung kosong.

Selanjutnya kita masuk ke kondisi ketika tidak ada id pada props.lastSelect yang artinya membuat data todo baru. Maka tinggal kita panggil props.saveNewData(data) dan diluar kondisi tersebut kita serCurrentValue dengan mengosongkan input todo yang berisi string kosong.

Kemudian tinggal kita render UserInput tersebut seperti pada baris 35-49. Sedikit tambahan pada baris 39 kita bisa membuat dinamis style dengan cara menggunakan single interpolation yang berisi kondisi thernary isValid, jika false kita gunakan invalid jika true kita tidak berikan sebuah class, begitu juga pada baris 41.

Kemudian berikut ini untuk style UserInput.

<img src="/assets/blog/18.reactjs/11.user-input-css.png" alt="UserInputCSS" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Selanjutnya kita akan pindah ke komponen FilterTodo

<img src="/assets/blog/18.reactjs/12.filter-todo.png" alt="FilterTodo" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kalau untuk filter ini sedikit ringkas. Kita buat sebuah select lengkap dengan optionnya. Kemudian pada element select kita tambahkan atribut onChange yang mengacu ke fungsi handlerFilter. Pada handlerFilter kita mengirimkan nilai yang kita select ke parent komponen atau ke App.js, Nah selanjutnya terdapat value yang kita arahkan ke props.selected. Tujuannya adalah supaya antara yang terakhir kita select bisa sesuai dengan yang ada pada parent komponen yaitu App.js

Kemudian berikut ini untuk stylenya.

<img src="/assets/blog/18.reactjs/13.filter-todo-css.png" alt="FilterTodoCSS" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Selanjutnya kita masuk ke komponen utama yaitu App.js. Nah di App.js ini kita akan import komponen TodoList, UserInput dan FilterTodo. Seperti ini untuk lebih lengkapnya. Saya notice diawal kodenya cukup panjang, hehe

<img src="/assets/blog/18.reactjs/14.app.png" alt="App" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kita impor terlebih dahulu untuk komponen TodoList, UserInput dan FilterTodo. Oiya, jangan lupa untuk import juga style App.css. Pertama kita buat const STATUS untuk mendefinisikan setiap statusnya untuk mengurangi atau meminimalisir Typo yang ada. Jadi nanti kita tinggal panggil saja objek tersebut.

Kemudian kita juga membuat initialData atau data awal aplikasi todolist ini. Dimana setiap data terdapat id, todo dan status.

Kita masuk ke variabel fungsi App dimana kita membuat 3 useState, state pertama untuk enteredData, kemudian state kedua untuk lastSelectTodo yang akan kita gunakan di UserInput tadi, kemudian currentFilter yang akan kita gunakan pada komponen FilterTodo.

Nah masing-masing state memilki variabel untuk melalukan update state yaitu setEnteredData, setLastSelectTodo dan setCurrentFilter.

Kemudian terdapat fungsi userInputHandler dengan parameter props. Nah jika kita lihat pada baris 88 pada komponen UserInput kita melihat props saveNewData dengan memanggil fungsi userInputHandler. Artinya userInputHandler ini akan menerima data dari child komponen yang bernama UserInput. Ketika data dari child ke parent sudah sampai kemudian kita lakukan maping untuk enteredData atau data awal tadi untuk mengecek jika item.id dari enteredData sama dengan id dari props tadi (berarti ini mode update) maka kita cukup override item dengan props dan mereturn item diluar kondisi tadi. Kemudian tinggal kita panggil setEnteredData([...data]). Eits kenapa harus seperti itu? Yap karena kita harus melakukan copy data init tadi supaya selalu terupdate atau istilahnya spread data dari array awal yaitu enteredData yang sudah dimodifikasi ke dalam variabel data.

Tapi jika ternyata item.id tidak sama dengan props.id maka itu masuk ke mode create data. Tinggal kita buatkan id sembarang dengan Math.random dengan membuat dari props.id dan tinggal kita panggil setEnteredData([...enteredData, props]). Eh? Tapi kok yang pertama tadi cukup spread dari data tapi yang kedua spread dari entereData dan props.

Jadi begini untuk kasus update tadi kita sudah jalankan fungsi .map yang mana dari map itu membuat array baru, makanya kita tidak perlu menambahkan props ketika setEnteredData, tapi berbeda dengan create karena kita perlu copy data lama kita spread enteredData kemudian kita panggil props untuk menambahkan data baru tersebut diakhir data array.

Selanjutnya terdapat variabel fungsi changeStatusHandler dengan parameter props. Nah ini konsepnya juga sama, kita lakukan maping lagi dari enteredData kemudian kita cek lagi apakah item.id sama dengan props, nah tapi pada kasus ini yang kita terima hanya idnya saja. Kemudian kita cek setiap kondisinya jika data yang diklik statusnya todo maka akan berubah in progress. Jika statusnya in progress maka berubah completed dan jika statusnya completed berubah menjadi todo. Jadi setiap klik akan mengubah statusnya. Kemudian kita panggil setLastSelectTodo yang nantinya kita gunakan untuk mengecek apakah update atau input pada komponen UserInput. Kemudian diluar maping data tersebut kita panggil setEnteredData dengan melakukan spread data dari variabel data. Kenapa begitu? Ya supaya setiap statusnya berubah dan otomatis state data dari properti status iku berubah.

Selanjutnya terdapat fungsi variabel userUpdateHandler dengan parmeter props. Nah ini berfungsi untuk menerima data dari child jika true maka akan kita setLastSelecTodo nya dengan object string kosong pada todo dan status. Ini supaya setiap kali klik salah satu data, statenya kembali ke awal. Supaya tidak ada state yang tertinggal sebelum akan klik ke data selanjutnya.

Kemudian pada variabel fungsi filterHandler kita lakuakn setCurrentFilter dengan item yang mana item ini berasal dari onChange komponen FilterTodo tadi. Kemudian pada fungsi dataFilter kita lakuakn filter data dari variabel enteredData ketika nilai dari currentFilter adalah All maka akan memunculkan semua data dengan status yang berbeda. Tapi jika status itemnya sama dengan currentFilter seperti Todo, In Progress, dan Completed maka hanya muncul data sesuai filter selectnya. dataFilter kita gunakan pada komponen TodoList dengan props data.

Kemudian berikut ini untuk styling App.js

<img src="/assets/blog/18.reactjs/15.app-css.png" alt="AppCSS" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kemudian kita coba dilocal terlebih dahulu dan pastikan sudah aman tidak ada error. Setelah aman kita push terlebih dahulu project tersebut ke github kita.

<img src="/assets/blog/18.reactjs/16.github.png" alt="Github" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Setelah sudah dipush ke repository kita, kita masuk ke vercel.com. Jika teman-temen belum memiliki akun bisa daftar dulu dan kemudian login. Seperti ini tampilan awal vercel ketika berhasil login.

<img src="/assets/blog/18.reactjs/17.vercel.png" alt="Vercel" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Pastikan vercel akun kita sudah terhubung dengan akun github kita supaya lebih mudah melakukan intergrasi project. Tinggal kita klik new project

<img src="/assets/blog/18.reactjs/18.import.png" alt="Import" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kemudian tinggal kita klik import pada repository todolist-react (ini tergantung dari temen-temen memberikan nama repository ya).

<img src="/assets/blog/18.reactjs/19.done.png" alt="Done" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Untuk bagian create team klik skip saja.

Kemudian scroll kebawah dan pada bagian environtment tambahkan properti ini CI dengan nilainya false.

<img src="/assets/blog/18.reactjs/20.process.png" alt="Process" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Karena saya sudah deploy ke vercel jadi saya berikan capturenya saja seperti gambar diatas. Nah kenapa CI kita false, karena kemarin saya sempet menemukan error terkait yarn dan dibeberapa forum disarankan untuk menonaktifkan continue integration(CI) pada environment. Setelah itu tinggal klik deploy saja dan tunggu sampai selesai.

Setelah selesai nanti akan muncul tampilan seperti berikut ini

<img src="/assets/blog/18.reactjs/21.deploy.png" alt="Deploy" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Klik visit untuk melihat hasil deployan aplikasi reactjs kita tadi.

<img src="/assets/blog/18.reactjs/22.review.png" alt="Review" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Selamat, temen-temen sudah berhasil mendeploy aplikasi reactjs ke vercel.

Mungkin itu dulu untuk tutorial todolist menggunakan todolist. Jika ada saran, masukan atau pertanyaan langsung saja bisa disampaikan dikolom komentar atau bisa juga dengan email saja.

Oiya kalau temen-temen pengen liat versi livenya dari tutorial ini bisa klik link ini ya https://todolist-react-tutor.vercel.app/.

Terimakasih dan semoga bermanfaat.

### References

<p><div class="link-preview-widget"><a class="w-full" href="https://github.com/afifalfiano/todolist-react" rel="noopener" target="_blank"><div class="link-preview-widget-title">afifalfiano/todolist-react: Todolist App</div><div class="link-preview-widget-description">Todolist App. Contribute to afifalfiano/todolist-react development by creating an account on GitHub.</div><div class="link-preview-widget-url">https://github.com/</div></a><a class="link-preview-widget-image" href="https://github.com/afifalfiano/todolist-react" rel="noopener" style="background-image: url('https://opengraph.githubassets.com/85ed76dbc46eabd00990440d5b834215a6aad17d9cf2b742191ab7b8cf527e1c/afifalfiano/todolist-react');" target="_blank"></a></div></p>

<p><div class="link-preview-widget"><a class="w-full" href="https://beta.reactjs.org" rel="noopener" target="_blank"><div class="link-preview-widget-title">React Docs Beta</div><div class="link-preview-widget-description">A JavaScript library for building user interfaces</div><div class="link-preview-widget-url">https://beta.reactjs.org/</div></a><a class="link-preview-widget-image" href="https://beta.reactjs.org" rel="noopener" style="background-image: url('https://beta.reactjs.org/logo-og.png');" target="_blank"></a></div></p>

#Tutorial #Reactjs #Todolist
