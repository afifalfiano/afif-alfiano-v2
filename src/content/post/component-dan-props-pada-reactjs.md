---
title: 'Component dan Props Pada React Javascript'
description: 'Selamat datang kembali teman-teman. Pada kesempatan kali ini kita masih belajar mengenai react khususnya tentang component dan props. Kalau teman-teman ingin bisa menggunakan react js maka sudah satu hal yang wajib tahu tentang hal ini.'
coverImage: '/assets/blog/21.reactjs-props/1.header.png'
dateFormatted: '2021-11-07T10:12:00.000Z'
author:
  name: 'Afif Alfiano'
  picture: '/assets/new-afif.jpeg'
ogImage:
  url: '/assets/blog/21.reactjs-props/1.header.png'
tag: reactjs
wordCount: 610
layout: ../../layouts/post.astro
status: published
---

Selamat datang kembali teman-teman. Pada kesempatan kali ini kita masih belajar mengenai react khususnya tentang component dan props. Kalau teman-teman ingin bisa menggunakan react js maka sudah satu hal yang wajib tahu tentang hal ini. Pada artikel ini dan seterusnya perlu teman-teman ketahui kita akan menggunakan function component bukan class component. Karena saya lebih nyaman menggunakan function component, hehe

Jika kita ambil referensi dari dokumentasi resminya maka penjelasan mengenai component dan props pada react seperti berikut ini. Components let you split the UI into independent, reusable pieces, and think about each piece in isolation. Conceptually, components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements describing what should appear on the screen.

Komponen memungkinkan kita untuk memisahkan UI menjadi satuan yang bisa digunakan berualang kali dan terisolasi. Sedangkan props sendiri adalah sebuah masukan arbitary dari komponen yang bisa kita gunakan untuk saling berkomunikasi data antar komponen.

Seperti yang tadi saya sampaikan bahwa untuk membuat komponen ada dua cara yaitu function komponen dan class komponen. Supaya teman-teman ada gambaran akan saya berikan sedikit contoh untuk kedua model tersebut.

Function Component

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

```

Class Component

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

Nah sudah terlihat perbedaannya bukan?

Selanjutnya kita akan membuat komponen yang memiliki props dan seperti apa pengaplikasiannya.

Pertama kita akan menghapus terlebih dahulu kode bawaan pada appjs supaya kosong dulu. Oh ya pastikan teman-teman sudah init project react ya, kalau belum bisa clone dari sini https://github.com/afifalfiano/tutorial-reactjs

Kita akan membuat komponen Belajar tapi sebelum itu kita ubah App.js menjadi seperti berikut ini

```javascript
import './App.css';
 
function App() {
 return (
   <div>
     <h1>Belajar Component & Props</h1>
   </div>
 );
}
 
export default App;
 
```

Kemudian selanjutnya membuat file baru Belajar.js dengan kode sederhana seperti berikut ini.

```javascript
const Belajar = props => {
   return (
       <div>
           <h3>Mari Belajar React</h3>
           <ul>
               <li>Tentang React</li>
               <li>Component and Props</li>
           </ul>
       </div>
   )
}
 
export default Belajar;
```

Setelah itu kita gunakan komponen Belajar tersebut di komponen App.js seperti ini

```javascript
import './App.css';
import Belajar from './Belajar';
 
function App() {
 return (
   <div>
     <h1>Belajar Component & Props</h1>
     <Belajar />
   </div>
 );
}
 
export default App;
```

Kemudian kita coba jalankan dulu aplikasinya dengan menjalanka perintah

```javascript
npm run start
```

<img src="/assets/blog/21.reactjs-props/2.belajar.png" alt="Belajar" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Jika kita lihat pada gambar diatas ada kotak merah. Nah konten atau elemen yang ada dialam kotak merah tersebut adalah komponen Belajar. Jadi cukup mudah ya untuk membuat komponen itu. Mungkin teman-teman bertanya kok di komponen Belajar ada keterangan props? Nah ini akan kita bahas.

Jadi kenapa kita perlu melakukan passing argument props secara standar. Karena seperti keterangan diatas bahwa props itu adalah sebuah atribut yang bisa kita gunakan untuk saling berkomunikasi data dari parent component ke child component.

Simpelnya seperti ini saya punya data array seperti ini ``[a,b,c]`` yang saya letakan pada parent component (App.js) dan saya ingin data itu bisa sampai ke child component (Belajar.js). Bagaimana caranya?

Caranya adalah dengan menggunakan props untuk kali ini. Kita bisa mengirimkan data dari app.js ke belajar.js lewat props itu. Seperti ini caranya

```javascript
import './App.css';
import Belajar from './Belajar';
 
function App() {
 const data = ["Belajar Component & State", "Belajar React Portal", "Belajar React Fragment"];
 
 return (
   <div>
     <h1>Belajar Component & Props</h1>
     <Belajar dataProps={data} />
   </div>
 );
}
 
export default App;
 

```

Kode diatas adalah  saya mengirimkan data array dari app.js ke belajar.js melalui props dengan nama dataProps. Masih bingung?

Langsung saja kita cek pada komponen belajar dengan melakukan console.log propsnya.

```javascript
const Belajar = props => {
   console.log(props, 'cek props');
   return (
       <div>
           <h3>Mari Belajar React</h3>
           <ul>
               <li>Tentang React</li>
               <li>Component and Props</li>
           </ul>
       </div>
   )
}
 
export default Belajar;
```

Maka hasilnya seperti ini.

<img src="/assets/blog/21.reactjs-props/3.console.png" alt="Console" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kalau kita lihat console tersebut muncul pada file Belajar.js yang berarti data dari app.js berhasil kita kirimkan ke belajar.js. Bagaimana apakah sudah kebayang?

Nah dataProps tersebutlah yang dinamakan props. Jadi kita bisa saja mengirimkan lebih dari satu props, contohnya seperti ini

```javascript
import './App.css';
import Belajar from './Belajar';
 
function App() {
 const data = ["Belajar Component & State", "Belajar React Portal", "Belajar React Fragment"];
 
 return (
   <div>
     <h1>Belajar Component & Props</h1>
     <Belajar dataProps={data} title={"Belajar React"} description={"Manfaat mempelajari react adalah"} />
   </div>
 );
}
 
export default App;
```

Maka hasilnya seperti ini

<img src="/assets/blog/21.reactjs-props/4.console-1.png" alt="Console-1" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Terdapat 3 props pada komponen belajar karena kita barusan menambahkannya.

Kemudian kita bisa mengambil data tersebut dari komponen belajar dengan cara seperti ini.

```javascript
const Belajar = props => {
   const {title, dataProps, description} = props
 
   console.log(title, 'ini title');
   console.log(description, 'ini description');
   console.log(dataProps, 'ini data props');
 
   return (
       <div>
           <h3>Mari Belajar React</h3>
           <ul>
               <li>Tentang React</li>
               <li>Component and Props</li>
           </ul>
       </div>
   )
}
 
export default Belajar;
```

Dengan cara melakukan desctructuring object props. Maka hasilnya seperti ini.

<img src="/assets/blog/21.reactjs-props/5.get-one.png" alt="GetOne" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Sebenarnya kita juga bisa memanggil props tersebut dengan seperti ini props.title atau props.description atau props.dataProps tapi itu tidak clean dan singkat. Karena pada es6 sudah ada fitur desctructuring, kenapa tidak kita gunakan? Hehe

Oke saya ingin merender data props tadi di komponen belajar.

```javascript
const Belajar = props => {
   const {title, dataProps, description} = props
 
   return (
       <div>
           <h3>Mari Belajar React</h3>
           <ul>
               <li>Tentang React</li>
               <li>Component and Props</li>
               <li>{dataProps[0]}</li>
               <li>{dataProps[1]}</li>
               <li>{dataProps[2]}</li>
           </ul>
       </div>
   )
}
 
export default Belajar;
```

Maka hasilnya seperti ini

<img src="/assets/blog/21.reactjs-props/6.state.png" alt="State" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Yap, list pada komponen belajar yang awalnya cuma ada 2 sekarang ada 5 dengan tambahan 3 data dari app.js.

Untuk cara render datanya cukup mudah ya cukup gunakan single interpolation seperti ini {} dan tinggal mainkan saja syntax syntax javascript didalamnya.

Berikut ini untuk kode lengkap pembelajaran mengenai komponen dan props
https://github.com/afifalfiano/tutorial-reactjs/tree/learn/comp-props

Mungkin itu dulu terkait pembahasan komponen dan props. Semoga bermanfaat dan jika ada pertanyaan atau saran langsung saja komen dibawah ini yap. Terimakasih

### References

<p><div class="link-preview-widget"><a href="https://github.com/afifalfiano/tutorial-reactjs" class="w-full" rel="noopener" target="_blank"><div class="link-preview-widget-title">afifalfiano/tutorial-reactjs at learn/comp-props</div><div class="link-preview-widget-description">Tutorial reactjs. Contribute to afifalfiano/tutorial-reactjs development by creating an account on GitHub.</div><div class="link-preview-widget-url">https://github.com/</div></a><a class="link-preview-widget-image" href="https://github.com/afifalfiano/tutorial-reactjs" rel="noopener" style="background-image: url('https://opengraph.githubassets.com/0eb64a9764c3a7eab4f277ae1b1aa4103a04f4b6246252a0bf3f178e5a1dee1e/afifalfiano/tutorial-reactjs');" target="_blank"></a></div></p>

<p><div class="link-preview-widget"><a href="https://reactjs.org/docs/components-and-props.html" class="w-full" rel="noopener" target="_blank"><div class="link-preview-widget-title">Components and Props – React</div><div class="link-preview-widget-description">A JavaScript library for building user interfaces</div><div class="link-preview-widget-url">https://reactjs.org/docs/components-and-props.html"</div></a><a class="link-preview-widget-image" href="https://reactjs.org/docs/components-and-props.html" rel="noopener" style="background-image: url('https://reactjs.org/logo-og.png');" target="_blank"></a></div></p>

#Tutorial #Reactjs #Props #Component
