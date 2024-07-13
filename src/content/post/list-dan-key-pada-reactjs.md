---
title: 'List dan Key pada React Javascript'
description: 'Selamat datang kembali teman-teman, pada kesempatan kali ini kita akan mempelajari list pada react javascript. Nah seperti teman-teman ketahui bahwa list bukan...'
coverImage: '/assets/blog/23.reactjs-list/header-fix.png'
dateFormatted: '2021-11-13T10:12:00.000Z'
author:
  name: 'Afif Alfiano'
  picture: '/assets/new-afif.jpeg'
ogImage:
  url: '/assets/blog/23.reactjs-list/header-fix.png'
wordCount: 667
layout: ../../layouts/post.astro
status: published
---

Selamat datang kembali teman-teman, pada kesempatan kali ini kita akan mempelajari list pada react javascript. Nah seperti teman-teman ketahui bahwa list bukan tipe data melainkan lebih ke sebuah data yang memerlukan perulangan untuk menjadi sebuah element html misalkan berupa list atau yang lainnya. Contohnya kita mempunyai data sepert ini ``[1,2,3,4,5]`` , Nah kita dapat merender data array tersebut menjadi list seperti ini

```html
1
2
3
4
5
```

Oke mungkin kita bisa saja menggunakan syntax html biasa cukup dengan ul dan li. Tapi karena kita menggunakan reactjs, maka kita perlu menyesuaikan list dengan reactjs itu sendiri.

Ketika menggunakan list pada react js kita dianjurkan untuk menggunakan key. Apa itu key? Key adalah sebuah identitast unik yang tidak akan ada duplikat pada list yang lain. Jadi sifatnya hampir mirip seperti id pada setiap element html. Kenapa perlu ini? Karena hal ini akan membantu react mengidentifikasi item mana yang berubah, ditambahkan dan dihapus, jadi diharapkan tidak ada kesalahan dalam melakukan aksi terhadap sebuah item/list.

Untuk menghemat waktu teman-teman dalam membaca tulisan ini maka langsung saja kita praktikkan. Pastikan teman-teman sudah menginstall reactjs dan memiliki project baru atau teman-teman bisa melakukan cloning dari repository berikut ini https://github.com/afifalfiano/tutorial-reactjs

Selanjutnya kita buat komponen baru dengan nama DaftarBelajar.js dengan kode seperti ini

```javascript
 
const DaftarBelajar = (props) => {
   return (
       <ul>
           {
               props.data.map(item => {
                   return (
                   <li key={item.id}>{item.topic}</li>
                   )
               })
           }
       </ul>
   )
}
 
export default DaftarBelajar;
 
```

Pada kode diatas kita melakukan map data dari array data yang kita ambil dari props.data. Kemudian didalam map tersebut kita return jsx dengan model ul yang berisi key dari data id dan li yang berisi data topik.

Kemudian kita gunakan komponen tersebut di App.js

```javascript
import DaftarBelajar from './DaftarBelajar';
 
function App() {
 const data = [
   {
     id: 1,
     topic: 'React Javascript'
   },
   {
     id: 2,
     topic: 'Next Javascript'
   },
   {
     id: 3,
     topic: 'Nest Javascript'
   }
 ]
 return (
   <div>
     <h1>List Pada ReactJs</h1>
     <DaftarBelajar data={data}/>
   </div>
 );
}
 
export default App;
```

Nah karena tadi pada komponen DaftarBelajar kita mengambil data props.data, maka kita perlu passing props dari app.js seperti kode diatas. Kita buat data dummy dengan variabel array of object dan kita passing data dummy tersebut ke dalam komponen DaftarBelajar.

Maka tampilannya seperti berikut ini.

<img src="/assets/blog/23.reactjs-list/1.header.png" alt="Header" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Walaupun pada tampilan element atribut key tidak ada tapi sebenarnya direact sudah mengetahui kalau list itu sudah memiliki nilai unik.

Sekarang kita coba kondisi untuk tidak menggunakan key dan kita akan melihat seperti apa pesan errornya. Ubah komponen DaftarBelajar menjadi seperti ini

```javascript
 
const DaftarBelajar = (props) => {
   return (
       <ul>
           {
               props.data.map(item => {
                   return (
                   <li>{item.topic}</li>
                   )
               })
           }
       </ul>
   )
}
 
export default DaftarBelajar;

```

Cukup hilangkan atribut key pada tag li.

Maka tampilannya seperti ini.

<img src="/assets/blog/23.reactjs-list/2.error.png" alt="Error" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Yap, kita disarankan untuk menggunakan atribut key pada list tersebut.

Nah kalau kita lihat kode diatas khususnya komponen DaftarBelajar bahwa maping data array dan ul masih dicampur jadi satu. Biasanya saya gunakan sebuah variabel untuk menampung hasil maping dan pada return jsxnya tinggal saya panggil variabel tersebut.

Lebih tepatnya seperti ini

```javascript
 
const DaftarBelajar = (props) => {
   const list = props.data.map(item => {
       return (
       <li key={item.id}>{item.topic}</li>
       )
   });
   return (
       <ul>{list}</ul>
   )
}
 
export default DaftarBelajar;
```

Ya sedikit lebih ringkas dan rapi, hehe.

Oke mungkin itu dulu yang dapat saya sampaikan mengenai topik list pada react javascript ini. Semoga bermanfaat buat temen-temen dan jika ada masukan ataupun saran langsung saja tulis komentar dibawah ini yaa. Terimakasih telah meluangkan waktu untuk membaca artikel ini.

Oh yaa untuk kode lengkapnya ada direpository ini ya https://github.com/afifalfiano/tutorial-reactjs/tree/learn/list

### References

<p><div class="link-preview-widget"><a class="w-full" href="https://github.com/afifalfiano/tutorial-reactjs" rel="noopener" target="_blank"><div class="link-preview-widget-title">afifalfiano/tutorial-reactjs at learn/list</div><div class="link-preview-widget-description">Tutorial reactjs. Contribute to afifalfiano/tutorial-reactjs development by creating an account on GitHub.</div><div class="link-preview-widget-url">https://github.com/</div></a><a class="link-preview-widget-image" href="https://github.com/afifalfiano/tutorial-reactjs" rel="noopener" style="background-image: url('https://opengraph.githubassets.com/0eb64a9764c3a7eab4f277ae1b1aa4103a04f4b6246252a0bf3f178e5a1dee1e/afifalfiano/tutorial-reactjs');" target="_blank"></a></div></p>

<p><div class="link-preview-widget"><a class="w-full" href="https://reactjs.org/docs/lists-and-keys.html" rel="noopener" target="_blank"><div class="link-preview-widget-title">Lists and Keys – React</div><div class="link-preview-widget-description">A JavaScript library for building user interfaces</div><div class="link-preview-widget-url">https://reactjs.org/docs/lists-and-keys.html</div></a><a class="link-preview-widget-image" href="https://reactjs.org/docs/lists-and-keys.html" rel="noopener" style="background-image: url('https://reactjs.org/logo-og.png');" target="_blank"></a></div></p>

#Tutorial #Reactjs #ListKey
