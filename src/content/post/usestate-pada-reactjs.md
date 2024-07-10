---
title: 'useState pada React Javascript'
description: 'Halooo, ketemu lagi kita pada artikel baru yang masih berkutat seputar react javascript. Nah pada kesempatan kali ini kita akan belajar bersama-sama mengenai state pada reactjs.'
coverImage: '/assets/blog/22.reactjs-state/1.header-fix.png'
dateFormatted: '2021-11-09T10:12:00.000Z'
author:
  name: 'Afif Alfiano'
  picture: '/assets/new-afif.jpeg'
ogImage:
  url: '/assets/blog/22.reactjs-state/1.header-fix.png'
wordCount: 953
layout: ../../layouts/post.astro
---

Halooo, ketemu lagi kita pada artikel baru yang masih berkutat seputar react javascript. Nah pada kesempatan kali ini kita akan belajar bersama-sama mengenai state pada reactjs. Sebelumnya apakah teman-teman tau apa itu state pada reactjs?

Sederhananya state adalah sebuah data object javascript yang dapat kita gunakan untuk menyimpan data. Nah di reactjs kita tahu bahwa state akan sering kita gunakan baik untuk project berskala kecil ataupun besar.

Ketika mendengar kata state maka kita bisa langsung mengarah pada fitur hook state yang telah disediakan pada reactjs versi 16.8 yang bernama useState(). Penggunaan useState ini juga cukup mudah, contohnya seperti ini

```javascript
const  [count, setCount] = useState(0);
```

useState sendiri sebenarnya bertipe array yang memiliki dua properti yaitu count dan setCount. Kita gunakan fitur es6 modern yang mana melakukan desctructuring array dari useState. Jadi count disini digunakan untuk menyimpan state yang akan kita gunakan di aplikasi, sedangkan setCount adalah kondisi untuk melakukan setState atau update state yang terkahir. Pada fitur useState kita juga bisa menggunakan default value, nah pada contoh diatas saya defaultnya dengan nilai 0. Kira-kira sudah kebayang belum fitur ini?

Kalau masih belum kebayang, mari kita coba secara bersama-sama.
Pertama kita buat project aplikasi react terlebih dahulu dengan menjalankan perintah

```javascript
npx create-react-app tutorial-reactjs
```

Opsi lain temen-temen bisa langsung saja cloning project baru dari repository saya disini
https://github.com/afifalfiano/tutorial-reactjs

Kemudian kita akan membuat aplikasi sederhana dengan menampilkan nilai countnya, jadi ketika klik button tambah, nilai count akan bertambah dan ketika klik button kurang, nilai count akan berkurang dengan menggunakan useState.

Kita buat file baru dengan nama Counter.js. Kemudian kita buat seperti ini terlebih dahulu

```javascript
 
import { useState } from 'react';
import './Counter.css';
 
const Counter = () => {
   const [count, setCount] = useState(0);
   return (
       <div className="counter">
               <button>Kurang</button>
               {count}
               <button>Tambah</button>
       </div>
   )
}
 
export default Counter;

```

Untuk menggunakan useState kita perlu mengimport dari react.

Kemudian berikut ini untuk style dari komponen Counter.

```css
.counter {
   width: 100%;
   display: flex;
   justify-content: center;
   gap: 20px;
}
```

Kemudian kita gunakan komponen Counter tersebut pada App.js menjadi seperti berikut ini

```javascript
import './App.css';
import Counter from './Counter';
 
function App() {
 return (
   <div className="App">
     <h1>Belajar State</h1>
     <Counter />
   </div>
 );
}
 
export default App;
```

Kemudian kita jalankan dulu aplikasi ini dengan menjalankan perintah

```javascript
npm run start
```

<img src="/assets/blog/22.reactjs-state/2.index.png" alt="Index" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Tentu saja tidak ada yang spesial karena hanya seperti itu, tapi disini kita mempelajari konsep dari useState itu sendiri. Pada tamplan diatas kita belum mengubah state dan belum memberikan event apapun pada kedua button tersebut.

Nah sebenarnya topik ini ada kaitannya dengan event handle. Jadi mending sekalian aja ya kita mempelajari event handle yang mana ketika kita klik kurang maka nilai count akan berkurang 1 dengan memberikan batasan jika nilai count 0 maka tidak bisa minus dan ketika button tambah diklik maka akan tambah 1 tanpa ada limitasi.

Kita akan coba memberikan event terlebih dahulu pada kedua button tersebut.

```javascript

import { useState } from 'react';
import './Counter.css';
 
const Counter = () => {
   const [count, setCount] = useState(0);
 
   const onDecrementHandler = (event) => {
       console.log(event);
   }
 
   const onIncrementHandler = (event) => {
       console.log(event);
   }
 
   return (
       <div className="counter">
               <button onClick={onDecrementHandler}>Kurang</button>
               {count}
               <button onClick={onIncrementHandler}>Tambah</button>
       </div>
   )
}
 
export default Counter;

```

Dengan menambahkan atribut onClick kemudian kita panggil arrow function onDecrementHandler dan onIncrementHandler maka kita sudah berhasil menambahkan event handler. Nah kita tidak perlu memanggil fungsi dengan eksekusi misalkan fungsi(), tidak perlu seperti itu. Cukup panggil nama fungsinya saja. Nah ketika kita tambahkan parameter event pada fungsi tersebut maka kita kan menerima hasil seperti ini

<img src="/assets/blog/22.reactjs-state/3.console.png" alt="Console-Event" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kemudian kita akan ubah funsi handler tersebut menjadi seperti ini.

```javascript

import { useState } from 'react';
import './Counter.css';
 
const Counter = () => {
   const [count, setCount] = useState(0);
 
   const onDecrementHandler = () => {
       if (count > 0) {
           setCount(count - 1);
       }
   }
 
   const onIncrementHandler = () => {
       setCount(count + 1);
 
   }
 
   return (
       <div className="counter">
               <button onClick={onDecrementHandler}>Kurang</button>
               {count}
               <button onClick={onIncrementHandler}>Tambah</button>
       </div>
   )
}
 
export default Counter;
```

Jadi kita gunakan setter Count untuk mengupdate nilai state dari count. Karena kita belum memerlukan parameter event maka kita kosongkan saja pada kedua fungsi tersebut. Pada fungsi onDecrementHandler kita jalankan sebuah perintah ketika nilai count lebih dari 0 maka baru kita jalankan perintah setCount(count - 1) supaya menjadi decrement karena kita tidak ingin nanti nilainya menjadi minus.

Kemudian untuk fungsi onIncrementHandler langsung saja kita jalankan perintah setCount(count + 1) karean tidak ada batasan dan validasi jadi bebas sampai nilai berapa pun.

Maka hasilnya akan menjadi seperti ini ketika saya klik tombol tambah

<img src="/assets/blog/22.reactjs-state/4.increment.png" alt="Increment" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Dan nilai count akan terus bertambah ketika klik tombol tambah.

Kemudian untuk tampilan ketika saya klik tombol kurang maka akan melakukan decrement seperti berikut ini

<img src="/assets/blog/22.reactjs-state/1.header.png" alt="Decrement" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Jadi nilai itu akan terus berkurang sampai 0, ketika sudah 0 ya akan berhenti pada nilai tersebut karena tadi kita sudah memberikan kondisi yang mana hanya menjalankan aksi decrement ketika nilai count lebih dari 0.

Mungkin itu dulu yang dapat saya sampaikan terkait topik state khususnya menggunakan hook useState pada reactjs dan semoga bermanfaat untuk temen-temen. Untuk kode lengkapnya ada di repository berikut ini https://github.com/afifalfiano/tutorial-reactjs/tree/learn/state

Jika ada pertanyaan ataupun saran langsung saja tulis komen dibawah sini yap. Terimakasih

### References

<p><div class="link-preview-widget"><a class="w-full" href="https://github.com/afifalfiano/tutorial-reactjs" rel="noopener" target="_blank"><div class="link-preview-widget-title">afifalfiano/tutorial-reactjs at learn/state</div><div class="link-preview-widget-description">Tutorial reactjs. Contribute to afifalfiano/tutorial-reactjs development by creating an account on GitHub.</div><div class="link-preview-widget-url">https://github.com/</div></a><a class="link-preview-widget-image" href="https://github.com/afifalfiano/tutorial-reactjs" rel="noopener" style="background-image: url('https://opengraph.githubassets.com/0eb64a9764c3a7eab4f277ae1b1aa4103a04f4b6246252a0bf3f178e5a1dee1e/afifalfiano/tutorial-reactjs');" target="_blank"></a></div></p>

<p><div class="link-preview-widget"><a class="w-full" href="https://reactjs.org/docs/hooks-state.html" rel="noopener" target="_blank"><div class="link-preview-widget-title">Using the State Hook – React</div><div class="link-preview-widget-description">A JavaScript library for building user interfaces</div><div class="link-preview-widget-url">https://reactjs.org/docs/hooks-state.html/</div></a><a class="link-preview-widget-image" href="https://reactjs.org/docs/hooks-state.html" rel="noopener" style="background-image: url('https://reactjs.org/logo-og.png');" target="_blank"></a></div></p>

#Tutorial #Reactjs #ReactState
