---
title: 'useEffect pada React Javascript'
description: 'Halo teman-teman, kembali lagi nih di blog pribadi saya dimana pada kesempatan kali ini kita akan mempelajari tentang use effect pada react javascript.'
coverImage: '/assets/blog/24.reactjs-efek/fix-header.png'
dateFormatted: '2021-11-09T10:12:00.000Z'
author:
  name: 'Afif Alfiano'
  picture: '/assets/new-afif.jpeg'
ogImage:
  url: '/assets/blog/24.reactjs-efek/fix-header.png'
wordCount: 889
layout: ../../layouts/post.astro
---

Halo teman-teman, kembali lagi nih di blog pribadi saya dimana pada kesempatan kali ini kita akan mempelajari tentang use effect pada react javascript. Nah sebenarnya apa sih kegunaan use effect itu?

Sebelum kita mengetahui jawaban itu kita coba dengan sebuah kasus seperti ini. Ketika kita memiliki komponen login yang mana terdapat aksi login dengan mengisikan  terlebih dahulu username dan password. Nah misalkan username dan password sesuai maka tampilan akan berubah menjadi tampilan untuk user yang sudah login dan jika gagal maka akan muncul pesan error. Bukannya ketika login berhasil ataupun gagal perlu render ulang supaya user mengetahu apakah berhasil atau tidak? Karena tidak mungkin jika kita harus reload setiap menjalankan aksi, bukankah prinsip single page appliocation itu tidak ada hard reload? Nah disinilah kita bisa menggunakan use effect untuk selalu update tampilan berdasarkan hasil dari sebuah aksi.

useEffect berjalan ketika seluruh fungsi disebuah komponen sudah terender. Kemudian setiap ada perubahan dependsi yang dimonitoring maka use effect akan render ulang sesuai dengan apa yang ada di dalam use effect tersebut. Masih membingungkan ya? Mari kita langsung praktik.

Simpelnya use effect memungkinkan kita untuk merender ulang sebuah komponen ketika ada perubahan yang terjadi.
Kita akan menggunakan project pembelajaran state yang sempat kita bahas disini https://afifalfiano.my.id/blog/usestate-pada-reactjs

Saya sarankan teman-teman membaca artikel mengenai state dulu supaya lebih mudah memahami mengenai useEffect ini. Untuk projectnya temen-temen bisa cloning dari sini https://github.com/afifalfiano/tutorial-reactjs/tree/learn/state

Kemudian coba jalankan dulu dan pastikan tidak ada error. Nanti tampilannya seperti ini

<img src="/assets/blog/24.reactjs-efek/1.review.png" alt="Review" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kemudian kita tambahkan code untuk komponen Counter menjadi seperti ini

```javascript

import { useState } from 'react';
import './Counter.css';
 
const Counter = () => {
   const [count, setCount] = useState(0);
   const [infoNumber, setInfoNumber] = useState(‘Genap’);
 
   const onDecrementHandler = () => {
       if (count > 0) {
           setCount(count - 1);
       }
   }
 
   const onIncrementHandler = () => {
       setCount(count + 1);
 
   }
 
   return (
       <div>
       <div className="counter">
               <button onClick={onDecrementHandler}>Kurang</button>
               {count}
               <button onClick={onIncrementHandler}>Tambah</button>
       </div>
       <div className="info">
           {infoNumber}
       </div>
       </div>
   )
}
 
export default Counter;

```

Kita tambahkan state infoNumber dan setInfoNumber. Tujuan saya menambahkan kode diatas adalah supaya ketika nilai count dibagi habis 2 maka akan memunculkan Genap dan jika tidak maka akan memunculkan Ganjil. Seperti ini tampilan awalnya

<img src="/assets/blog/24.reactjs-efek/2.first.png" alt="First" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kemudian sekarang kita tambahkan lagi kode counter.js seperti ini

```javascript
import { useState } from 'react';
import './Counter.css';
 
const Counter = () => {
   const [count, setCount] = useState(0);
   const [infoNumber, setInfoNumber] = useState('Genap');
 
   if (count % 2 === 0) {
       setInfoNumber('Genap');
   } else {
       setInfoNumber('Ganjil');
   }
 
   const onDecrementHandler = () => {
       if (count > 0) {
           setCount(count - 1);
       }
   }
 
   const onIncrementHandler = () => {
       setCount(count + 1);
 
   }
 
   return (
       <div>
       <div className="counter">
               <button onClick={onDecrementHandler}>Kurang</button>
               {count}
               <button onClick={onIncrementHandler}>Tambah</button>
       </div>
       <div className="info">
           {infoNumber}
       </div>
       </div>
   )
}
 
export default Counter;
```

Kita menambahkan jika count dibagi habis 2 yang hasilnya sama dengan 0 maka kita akan menjalankan setInfoNumber dengan nilai Genap dan otomatis nilai dari infoNumber adalah Genap. Kemudian ketika false maka akan menjalankan setInfoNumber dengan nilai Ganjil dan otomatis nilai dari infoNumber adalah Ganjil.

Kemudian kita lihat lagi tampilannya dan ternyata muncul error seperti ini

<img src="/assets/blog/24.reactjs-efek/3.error.png" alt="Error" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Error diatas terjadi karena ketika pertama kali komponen Counter dirender maka komponen itu juga melakukan pengecekan kondisi tadi dan akan terjadi infinite looping yang akhirnya muncul pesan error diatas.

Untuk menangani error diatas kita dapat menggunakan useEffect seperti berikut ini.

```javascript
import { useState, useEffect } from 'react';
import './Counter.css';
 
const Counter = () => {
   const [count, setCount] = useState(0);
   const [infoNumber, setInfoNumber] = useState(Genap);
 
   useEffect(() => {
   if (count % 2 === 0) {
       setInfoNumber('Genap');
   } else {
       setInfoNumber('Ganjil');
   }
   }, [count]);
 
   const onDecrementHandler = () => {
       if (count > 0) {
           setCount(count - 1);
       }
   }
 
   const onIncrementHandler = () => {
       setCount(count + 1);
 
   }
 
   return (
       <div>
       <div className="counter">
               <button onClick={onDecrementHandler}>Kurang</button>
               {count}
               <button onClick={onIncrementHandler}>Tambah</button>
       </div>
       <div className="info">
           {infoNumber}
       </div>
       </div>
   )
}
 
export default Counter;
```

Pastikan kita import useEffect terlebih dahulu dari react. Kemudian kita cukup gunakan seperti ini

```javascript
useEffect(() => {code}, [dependensi])
```

Pada blocking code diatas kita isikan pengecekan tadi, jika nilai count habis dibagi 2 maka Genap, jika tidak maka Ganjil. Selanjutnya blocking dependensi diatas berfungsi untuk memonitoring setiap perubahan yang terjadi, pada kasus ini kita letakan variabel count.

Perlu teman-teman ketahui juga bahwa useEffect ini untuk pertama kali berjalan seperti pada umumnya render yang lain, tapi setelah ada perubahan atau side effect pada sebuah variabel yang dimonitoring, maka useEffect akan berjalan kembali dan akan merender ulang komponen.

Maka tampilannya menjadi seperti ini ketika infoNumber bernilai Ganjil

<img src="/assets/blog/24.reactjs-efek/4.useefek.png" alt="UseEffect" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kemudian ketika infoNumber bernilai Genap

<img src="/assets/blog/24.reactjs-efek/5.useefek-1.png" alt="UseEffect-1" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Teman-teman juga bisa menjalankan useEffect sekali saja ketika render komponen pertama kali. Caranya cukup kosongkan menjadi ``[]`` saja pada bagian dependensi useEffectnya.

```javascript
useEffect(() => {some code},[]);
```

Oh ya saya lupa mengganti judul dari project ini, harusnya bukan Belajar State tapi Belajar UseEffect.

<img src="/assets/blog/24.reactjs-efek/6.finish.png" alt="Finish" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Oke mungkin itu dulu ya teman-teman yang dapat saya sampaikan mengenai topik use effect ini dan semoga bermanfaat. Untuk kode lengkapnya ada disini yap https://github.com/afifalfiano/tutorial-reactjs/tree/learn/useeffect

Jika ada kritik ataupun saran langsung saja tulis dikolom komentar dibawah ini ya, terimakasih.

### References

<p><div class="link-preview-widget"><a class="w-full" href="https://github.com/afifalfiano/tutorial-reactjs/tree/learn/useeffect" class="w-full" rel="noopener" target="_blank"><div class="link-preview-widget-title">afifalfiano/tutorial-reactjs at learn/useeffect</div><div class="link-preview-widget-description">Tutorial reactjs. Contribute to afifalfiano/tutorial-reactjs development by creating an account on GitHub.</div><div class="link-preview-widget-url">https://github.com/</div></a><a class="link-preview-widget-image" href="https://github.com/afifalfiano/tutorial-reactjs/tree/learn/useeffect" rel="noopener" style="background-image: url('https://opengraph.githubassets.com/0eb64a9764c3a7eab4f277ae1b1aa4103a04f4b6246252a0bf3f178e5a1dee1e/afifalfiano/tutorial-reactjs');" target="_blank"></a></div></p>

<p><div class="link-preview-widget"><a class="w-full" href="https://reactjs.org/docs/hooks-effect.html" rel="noopener" class="w-full" target="_blank"><div class="link-preview-widget-title">Using the Effect Hook – React</div><div class="link-preview-widget-description">A JavaScript library for building user interfaces</div><div class="link-preview-widget-url">https://reactjs.org/docs/hooks-effect.html/</div></a><a class="link-preview-widget-image" href="https://reactjs.org/docs/hooks-effect.html" rel="noopener" style="background-image: url('https://reactjs.org/logo-og.png');" target="_blank"></a></div></p>

#Tutorial #Reactjs #UseEffect
