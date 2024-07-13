---
title: 'Kenapa Perlu Menggunakan React Fragments?'
description: 'Selamat sore teman-teman. Pada kesempatan kali ini kita akan bersama-sama mempelajari tentang fragments. Nah sebelum kita masuk ke topik tentang fragment kita cari dulu permasalahannya.'
coverImage: '/assets/blog/20.reactjs-fragments/1.header.png'
dateFormatted: '2021-11-07T10:12:00.000Z'
author:
  name: 'Afif Alfiano'
  picture: '/assets/new-afif.jpeg'
ogImage:
  url: '/assets/blog/20.reactjs-fragments/1.header.png'
wordCount: 641
layout: ../../layouts/post.astro
status: published
---

Selamat sore teman-teman. Pada kesempatan kali ini kita akan bersama-sama mempelajari tentang fragments. Nah sebelum kita masuk ke topik tentang fragment kita cari dulu permasalahannya. Kalau teman-teman sadari setiap komponen pada react pasti mereturn sebuah elemen baik yang murni elemen atau sudah berbentuk komponen. Karena salah satu requirement reactjs untuk membuat komponen adalah return satu root komponen bisa dibungkus dengan div, wrapper atau komponen lainnya. Contohnya seperti ini

```javascript
const Header = () => {
	return (
	<div>
		<h1>Hello World</h1>
	</div>
)
}

export default Header
```

Kita lihat kode diatas mereturn div dan h1. Tapi tetap hanya dibungkus satu root elemen atau komponen. Kemudian kita gunakan komponen header tersebut didalam file app.js.

```javascript
import logo from './logo.svg';
import './App.css';
import Header from './Header';
 
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
     <Header />
   </div>
 );
}
 
export default App;
```

Maka tampilannya seperti berikut ini

<img src="/assets/blog/20.reactjs-fragments/1.header.png" alt="Header" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Misalkan kita modifikasi seperti ini atau return lebih dari satu root komponen.

```javascript
const Header = () => {
	return (
	<div>
		<h1>Hello World</h1>
	</div>
	<div>
		<h2>Stay health yaa</h2>
	</div>
)
}
export default Header;
```

Jika kita jalankan kode diatas maka akan muncul error seperti berikut ini

<img src="/assets/blog/20.reactjs-fragments/2.error.png" alt="Error" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Error diatas bahkan kita sudah disarankan untuk menggunakan fitur fragment. Menarik bukan?

Kemudian ada kasus lain pernahkan teman-teman membayangkan jika setiap komponen harus mereturn sebuah elemen yang dibungkus dengan div? Oke untuk project yang skalanya kecil mungkin belum terasa tapi ketika sudah besar maka bisa jadi nanti akan menjadi nested div seperti ini (ini hanya kemungkinan terburuk):

```html
<div>
  <div>
    <div>
        <div>
          <h1>Hello World</h1>
        </div>
      </div>
    </div>
</div>
```

Gimana? Sangat tidak efektif dan semantic bukan? Maka dari itu munculkah fitur Fragment dari react dimana kita bisa mereturn sebuah komponen tanpa harus menggunakan div. Jika kita ambil definisi react fragment dari situs resminya (https://reactjs.org/docs/fragments.html) maka pengertiannya adalah A common pattern in React is for a component to return multiple elements. Fragments let you group a list of children without adding extra nodes to the DOM. Intinya adalah sebuah pola dari react yang memungkinkan untuk mengembalikan multiple element pada sebuah komponen dan dapat mengelompokan komponen children tanpa menambahkan nodes ke dalam DOM. Jadi react fragments disini berperan untuk melengkapi requirement dari react untuk mereturn jsx dan fragment disini bisa dikatakan element kosong.

Ada dua cara menggunakan react fragment. Cara pertama dengan memanggil library react kemudian memanggil opsi fragment seperti ini.

```javascript
const Header = () => {
	return (
	<React.Fragment>
		<h1>Hello World</h1>
	</React.Fragment>
)
}
export default Header;
```

Maka ketika kita lihat pada inspect element tampilannya seperti berikut ini.

<img src="/assets/blog/20.reactjs-fragments/3.fragment-1.png" alt="Fragment-1" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kita lihat bahwa komponen header cuma mereturn h1 saja karena kita sudah menggunakan fragment alias element kosong.

Kemudian cara kedua adalah dengan mereturn tag kosong seperti berikut ini

```javascript
const Header = () => {
	Return (
	<>
		<h1>Hello World</h1>
	</>
)
}
export default Header;
```

Maka tampilannya seperti berikut ini.

<img src="/assets/blog/20.reactjs-fragments/3.fragment-1.png" alt="Fragment-1" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Hasilnya pun sama

Mungkin itu dulu pembahasan mengenai react fragments dan semoga bermanfaat. Jika ada pertanyaan atau saran langsung saja komen dibawah ini ya. Terimakasih

### References

<p><div class="link-preview-widget"><a class="w-full" href="https://github.com/afifalfiano/tutorial-reactjs" rel="noopener" target="_blank"><div class="link-preview-widget-title">"afifalfiano/tutorial-reactjs: Tutorial reactjs"</div><div class="link-preview-widget-description">Tutorial reactjs. Contribute to afifalfiano/tutorial-reactjs development by creating an account on GitHub.</div><div class="link-preview-widget-url">https://github.com/</div></a><a class="link-preview-widget-image" href="https://github.com/afifalfiano/tutorial-reactjs" rel="noopener" style="background-image: url('https://opengraph.githubassets.com/0eb64a9764c3a7eab4f277ae1b1aa4103a04f4b6246252a0bf3f178e5a1dee1e/afifalfiano/tutorial-reactjs');" target="_blank"></a></div></p>

<p><div class="link-preview-widget"><a class="w-full" href="https://reactjs.org/docs/fragments.html" rel="noopener" target="_blank"><div class="link-preview-widget-title">Fragments – React</div><div class="link-preview-widget-description">A JavaScript library for building user interfaces</div><div class="link-preview-widget-url">https://reactjs.org/docs/fragments.html/</div></a><a class="link-preview-widget-image" href="https://reactjs.org/docs/fragments.html" rel="noopener" style="background-image: url('https://reactjs.org/logo-og.png');" target="_blank"></a></div></p>

#Tutorial #Reactjs #ReactFragments
