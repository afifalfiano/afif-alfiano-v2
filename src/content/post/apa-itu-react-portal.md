---
title: 'Apa itu React Portal?'
description: 'Selamat datang kembali teman-teman, pada kesempatan kali ini kita akan mempelajari salah satu fitur dari react yang bernama react portal. '
coverImage: '/assets/blog/19.reactjs-portal/1.header.png'
dateFormatted: '2021-11-06T10:12:00.000Z'
author:
  name: 'Afif Alfiano'
  picture: '/assets/new-afif.jpeg'
ogImage:
  url: '/assets/blog/19.reactjs-portal/1.header.png'
wordCount: 610
layout: ../../layouts/post.astro
status: published
---
Selamat datang kembali teman-teman, pada kesempatan kali ini kita akan mempelajari salah satu fitur dari react yang bernama react portal. Jika kita lihat dari dokumentasinya (https://reactjs.org/docs/portals.html) maka pengertian react portal adalah Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

Pada intinya, react portal befungsi untuk merender sebuah child komponen diluar hirarki DOM dari parent komponen. Contohnya seperti ini, bisanya untuk merender komponen app.js kita mengambil element id root, nah dengan react portal kita dapat keluar dari hirarki id root tersebut. Mari kita langsung mencoba.

Pastikan teman-teman sudah membuat project baru atau kalau tidak ingin ribet tinggal clone saja init project saya berikut ini https://github.com/afifalfiano/tutorial-reactjs

Kemudian kita coba jalankan dan langsung buka tab element, maka tampilannya seperti ini.

<img src="/assets/blog/19.reactjs-portal/1.header.png" alt="Header" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kita melihat bahwa komponen app ada didalam elemen div dengan id root. Kemudian coba kita tambahkan komponen lainnya.

Saya membuat komponen portal untuk saya taruh di komponen app.js

```javascript
const Portal = () => {
   return (
       <div>
           <h2>Hello Guys, I'm a children component</h2>
       </div>
   )
}
 
export default Portal;
```

Kemudian pada app.js saya gunakan seperti ini

```javascript
import logo from './logo.svg';
import './App.css';
import Portal from './Portal';
 
function App() {
 return (
   <div className="App">
     <header className="App-header">
       <img src={logo} className="App-logo" alt="logo" />
       <p>
         Edit <code>src/App.js</code> and save to reload.
       </p>
       <a
         className="App-link"
         href="https://reactjs.org"
         target="_blank"
         rel="noopener noreferrer"
       >
         Learn React
       </a>
     </header>
     <Portal/>
   </div>
 );
}
 
export default App;
```

Maka tampilannya seperti ini

<img src="/assets/blog/19.reactjs-portal/2.portal.png" alt="Portal" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kita lihat bahwa komponen Portal yang berisi element div dan h2 dengan teks Hello Guys, I’m a children component tetap berada di satu root element.
Nah sekarang pertanyaan bagaimana cara membuat komponen portal berada diluar elemen div dengan id root?

Inilah fungsi dari react portal. Kita tambahkan dulu pada index.html seperti berikut ini.

<img src="/assets/blog/19.reactjs-portal/3.index.png" alt="Index" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Karena kita perlu merender diluar elemen div dengan id root maka perlu membuat satu elemen baru lagi yaitu div dengan id portal-root.

Kemudian pada app.js tinggal kita ubah seperti ini.

<img src="/assets/blog/19.reactjs-portal/4.appjs.png" alt="App" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kita import ReactDOM kemudian panggil fungsi createPortal. Nah create portal sendiri memiliki 2 parameter yaitu parameter pertama untuk komponen yang akan kita gunakan pada kasus ini adalah komponen portal, kemudian parameter kedua adalah dimana komponen tersebut akan kita render. Pada kasus ini karena tadi kita telah menambahkan div dengan id portal-root maka kita panggil element tersebut berdasarkan idnya.

Maka ketika kita kembali ke browser tampilannya seperti berikut ini.

<img src="/assets/blog/19.reactjs-portal/5.finish.png" alt="Finish" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kita lihat bahwa komponen portal sudah tidak ada didalam elemen div dengan id root tapi sekarang berada di elemen div dengan id portal-root.
Best practice penggunaan portal ini biasanya untuk membuat sebuah modal informasi. Karena pada dasarnya sebuah komponen modal itu harus berada diluar komponen parentnya karena kita perlu semacam backdrop dan modal itu sendiri.

Berikut ini kode yang tadi kita pelajari secara bersama-sama.

<p><div class="link-preview-widget"><a href="https://github.com/afifalfiano/tutorial-reactjs"  class="w-full" rel="noopener" target="_blank"><div class="link-preview-widget-title">afifalfiano/tutorial-reactjs at learn/portal</div><div class="link-preview-widget-description">Tutorial reactjs. Contribute to afifalfiano/tutorial-reactjs development by creating an account on GitHub.</div><div class="link-preview-widget-url">https://github.com/</div></a><a class="link-preview-widget-image" href="https://github.com/afifalfiano/tutorial-reactjs" rel="noopener" style="background-image: url('https://opengraph.githubassets.com/0eb64a9764c3a7eab4f277ae1b1aa4103a04f4b6246252a0bf3f178e5a1dee1e/afifalfiano/tutorial-reactjs');" target="_blank"></a></div></p>

Oke mungkin itu dulu untuk tutorial menggunakan portal pada react dan semoga bermanfaat.

### References

<p><div class="link-preview-widget"><a href="https://github.com/afifalfiano/tutorial-reactjs" class="w-full" rel="noopener" target="_blank"><div class="link-preview-widget-title">afifalfiano/tutorial-reactjs at learn/portal</div><div class="link-preview-widget-description">Tutorial reactjs. Contribute to afifalfiano/tutorial-reactjs development by creating an account on GitHub.</div><div class="link-preview-widget-url">https://github.com/</div></a><a class="link-preview-widget-image" href="https://github.com/afifalfiano/tutorial-reactjs" rel="noopener" style="background-image: url('https://opengraph.githubassets.com/0eb64a9764c3a7eab4f277ae1b1aa4103a04f4b6246252a0bf3f178e5a1dee1e/afifalfiano/tutorial-reactjs');" target="_blank"></a></div></p>

<p><div class="link-preview-widget"><a href="https://reactjs.org/docs/portals.html" class="w-full" rel="noopener" target="_blank"><div class="link-preview-widget-title">Portals – React</div><div class="link-preview-widget-description">A JavaScript library for building user interfaces</div><div class="link-preview-widget-url">https://reactjs.org/docs/portals.html/</div></a><a class="link-preview-widget-image" href="https://reactjs.org/docs/portals.html" rel="noopener" style="background-image: url('https://reactjs.org/logo-og.png');" target="_blank"></a></div></p>

#Tutorial #Reactjs #Todolist #ReactPortal
