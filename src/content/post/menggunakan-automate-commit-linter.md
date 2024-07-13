---
title: 'Menggunakan automate commit conventional linter di angular'
description: 'Pernahkan teman-teman mendengar istilah commit conventional? Jika belum mari kita pelajari bersama - sama apa itu commit convetinoal dan bagaimana mengautomate commit menggunakan husky untuk automate commit linter, baik untuk javascript, typescript, css ataupun scss.'
coverImage: '/assets/blog/15.husky/1.header.png'
dateFormatted: '2021-08-29T10:12:00.000Z'
author:
  name: 'Afif Alfiano'
  picture: '/assets/new-afif.jpeg'
ogImage:
  url: '/assets/blog/15.husky/1.header.png'
wordCount: 496
layout: ../../layouts/post.astro
status: published
---

Pernahkan teman-teman mendengar istilah commit conventional? Jika belum mari kita pelajari bersama - sama apa itu commit convetinoal dan bagaimana mengautomate commit menggunakan husky untuk automate commit linter, baik untuk javascript, typescript, css ataupun scss.

Menggunakan pre-commit manfaatnya sangatlah banyak. Kita dapat menerapkan sebuah aksi sebelum sebuah message commit disetujui. Contoh kasusnya seperti ini, kita ingin code kita menjadi lebih readable atau rapi baik dari typescript, html ataupun scssnya. Nah pada kondisi ini kita dapat menerapkan pre-commit dimana sebelum message commit disetujui maka akan menjalankan linter untuk typescript dan scss/css.

Beberapa dependensi yang diperlukan untuk menjalankan fitur ini dan pastikan menggunakan --save-dev karena kita hanya memerlukan untuk development.

- [@commitlint/cli](https://www.npmjs.com/package/@commitlint/cli)
- [@commitlint/config-angular](https://www.npmjs.com/package/@commitlint/config-angular)
- [husky](https://www.npmjs.com/package/husky)
- [lint-staged](https://www.npmjs.com/package/lint-staged)
- [stylelint](https://www.npmjs.com/package/stylelint)
- [stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard)
- [stylelint-scss](https://www.npmjs.com/package/stylelint-scss)

<img src="/assets/blog/15.husky/2.install.png" alt="Install" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Pastikan semua dependensi sudah terinstall di project yang dikerjakan.

Kemudian jalankan perintah husky install dan dan kita buat sebuah bash untuk husky bisa menjalankan perintah yang kita definisikan di package.json

- husky install
- npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
- npx husky add .husky/pre-commit 'npm run pre-commit'

<img src="/assets/blog/15.husky/3.husky-init.png" alt="Husky Init" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Maka akan tampil folder dan file baru seperti berikut ini

<img src="/assets/blog/15.husky/4.folder.png" alt="Folder" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kemudian tambahkan script berikut ini pada package.json

```javascript
"pre-commit": "lint-staged"
```

Setelah itu kita definisikan lint-staged dibawah sendiri pada package.json untuk aksi apa saja yang dapat dijalankan sebelum message commit disetujui.

```javascript
"lint-staged": {
    "*.ts": [
      "npx tslint src/**/*.ts --fix"
    ],
    "*.scss": [
      "npx stylelint src/**/*.scss --fix"
    ]
  }
```

Kemudian buat file baru yaitu commitlint.config.js untuk mengkonfigurasi commit conventional apa saja yang disetujui, isikan script berikut ini pada file tersebut

```javascript
const types = [
    'build',
	'ci',
	'docs',
	"chore",
	'feat',
	'fix',
	'perf',
	'refactor',
	'revert',
	'style',
	'test',
    'ui',
    'deps'
];
module.exports = {
    extends: ['@commitlint/config-angular'],
    rules: {
        'type-enum': [2, 'always', types],
		'header-max-length': [2, 'always', 100],
    }
};
```

Pada konfigurasi diatas sebenarnya kita hanya meng-override konfigurasi bawaan commitlint dengan menambahkan types dan header-max-length, jadi nanti kita bisa memodifikasi konfig tersebut.

Setelah itu kita buat file .stylelintrc untuk mengkonfigurasi linter pada file scss ataupun css. Tambahkan script berikut ini pada file tersebut.

```javascript
{
	"extends": "stylelint-config-standard",
	"plugins": [
		"stylelint-scss"
	],
	"rules": {
		"declaration-block-trailing-semicolon": null,
		"no-descending-specificity": null,
		"no-empty-source": null,
		"selector-type-no-unknown": null,
		"selector-pseudo-element-no-unknown": null
	}
}
```

###Berikut ini demonya.

Misalnya terdapat file typescript dan scss yang berubah.

<img src="/assets/blog/15.husky/5.edit.png" alt="Edit File" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kemudian kita coba git add dan git commit untuk mencoba fitur dari commitlint

a. Kondisi ketika salah commit atau tidak sesuai aturan dengan commit (aturan penamaan commit sesuai yang telah di definisikan di commitlint.config.js, berdasarkan aturan dari https://www.conventionalcommits.org/en/v1.0.0/#specification)

<img src="/assets/blog/15.husky/6.error.png" alt="Error" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

a. Kondisi ketika commit panjang dan header tidak sesuai dengan aturan conventional commit

<img src="/assets/blog/15.husky/7.commit.png" alt="Commit" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Maka hasilnya seperti gambar berikut ini

<img src="/assets/blog/15.husky/8.still-error.png" alt="Still Error" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kemudian berikut ini kondisi ketika benar melakukan commit baik commit cepat ataupun panjang dengan deskripsi

a. Commit singkat

<img src="/assets/blog/15.husky/9.success.png" alt="Success" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

b. Commit dengan deskripsi

<img src="/assets/blog/15.husky/10.long-commit.png" alt="Install" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Maka hasilnya seperti gambar berikut ini

<img src="/assets/blog/15.husky/11.fix.png" alt="Fix" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

### Referensi

- https://commitlint.js.org/#/guides-local-setup
- https://github.com/typicode/husky
- https://www.conventionalcommits.org/en/v1.0.0/#specification
