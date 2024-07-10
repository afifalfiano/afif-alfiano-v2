---
title: 'Deploy Angular 9 and Bazel on Azure Static Web Apps(Preview) using Github Actions Part I'
description: 'Ketika kita mengembangkan suatu aplikasi tentunya kita membutuhkan tempat supaya aplikasi dapat digunakan orang banyak, tidak hanya localhost atau hanya ada dikomputer pribadi. Supaya aplikasi yang kita kembangkan dapat bermanfaat untuk banyak orang'
coverImage: '/assets/blog/14.bazel/1.header.jpeg'
dateFormatted: '2020-06-14T10:12:00.000Z'
author:
  name: 'Afif Alfiano'
  picture: '/assets/new-afif.jpeg'
ogImage:
  url: '/assets/blog/14.bazel/1.header.jpeg'
wordCount: 836
layout: ../../layouts/post.astro

---

Ketika kita mengembangkan suatu aplikasi tentunya kita membutuhkan tempat supaya aplikasi dapat digunakan orang banyak, tidak hanya localhost atau hanya ada dikomputer pribadi.

Supaya aplikasi yang kita kembangkan dapat bermanfaat untuk banyak orang, maka sudah sewajarnya kita mempublikasikan karya kita, selain harapannya bermanfaat untuk banyak orang tentu juga agar mendapatkan feedback supaya aplikasi dapat diperbarui menjadi lebih baik lagi.

Tidak perlu yang berbayar untuk bisa mempublikasikan aplikasi kita. Karena sudah banyak website yang menyediakan tempat untuk hosting aplikasi secara gratis. Tanpa perlu mengeluarkan sepeser biaya pun.

Nah, pada kesempatan kali ini izinkan saya untuk berbagi pengalaman bagaimana cara melakukan deployment aplikasi angular 9 yang sudah dilengkapi dengan bazel ke azure static web apps melalui perantara github workflow action.

Menarik bukan?

Kalau teman-teman bertanya apa keuntungan menggunakan bazel. Langsung saja kunjungi website resimnya disini

<hr/>

<p><div class="link-preview-widget"><a class="w-full" href="https://docs.bazel.build/versions/3.2.0/bazel-overview.html" rel="noopener" target="_blank"><div class="link-preview-widget-title">Bazel overview</div><div class="link-preview-widget-description">Bazel is an open-source build and test tool similar to Make, Maven, and Gradle. It uses a human-readable, high-level build language</div><div class="link-preview-widget-url">https://docs.bazel.build/</div></a><a class="link-preview-widget-image" href="https://docs.bazel.build/versions/3.2.0/bazel-overview.html" rel="noopener" style="background-image: url('https://opengraph.githubassets.com/082ce7f369c13c62feb1ef8a6bad7ab3f861c460061964cba7d5b64c87963bc1/afifalfiano/myProject');" target="_blank"></a></div></p>

Pastikan teman-teman sudah menginstall node js, angular 9, bazel dan kebutuhan lainnya. Jika belum ada mungkin bisa baca artikel terlebih dulu tentang membuat project angular 9 di sini. Oh iya di angular 9 ini kita sudah menggunakan ivy ya, jadi jangan heran kalo proses buildnya lebih cepat sekalipun menggunkan bazel.

<p><div class="link-preview-widget"><a class="w-full" href="https://afifalfiano.netlify.app/blog/membuat-aplikasi-todolist-menggunakan-angular-9" rel="noopener" target="_blank"><div class="link-preview-widget-title">Membuat aplikasi todolist menggunakan angular 9</div><div class="link-preview-widget-description">elamat sore teman-teman. Yap, kali ini saya ingin berbagi sedikit pengetahuan tentang salah satu framework javascript yang cukup popular, yaitu Angular</div><div class="link-preview-widget-url">https://afifalfiano.netlify.app/</div></a><a class="link-preview-widget-image" href="https://afifalfiano.netlify.app/blog/membuat-aplikasi-todolist-menggunakan-angular-9" rel="noopener" style="background-image: url('https://afifalfiano.netlify.app/assets/blog/13.todolist/1.header.png');" target="_blank"></a></div></p>

### 1. Inisiasi Project Angular

Ketika seluruh peralatan tempur sudah dipersiapkan kita bisa langsung jalankan perintah ng new ngBazel — collection=@angular/bazel. Project ini langsung menggunakan atribut bazel, jadi misalkan teman-teman ingin menambahkan bazel di existing project bisa jalankan perintah ng add @angular/bazel.

<img src="/assets/blog/14.bazel/2.process.png" alt="Process" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Tunggu proses sampai selesai dan pastikan tidak ada eror yang muncul.

Secara sekilas sekilas tidak ada perbedaan dari angular yang menggunakan bazel atau yang tidak menggunakan. Nah, disini ketika kita jalankan perintah ng serve maka secara otomatis akan running menggunakan bazel dan disini kita menggunakan nol cofiguration bazel.

<img src="/assets/blog/14.bazel/3.preview.png" alt="Preview" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Supaya dapat mengetahui perbedaannya, jalankan perintah ng build — leaveBazelFilesOnDisk. Maka secara otomatis file-file dari bazel pun akan muncul dan pastikan tidak terjadi eror.

<img src="/assets/blog/14.bazel/4.install.png" alt="Install" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Maka akan terdapat beberapa file, mari kita bahas satu persatu.

Terdapat file WORKSPACE dimana file ini berfungsi untuk mengunduh rules atau plugin yang digunakan bazel untuk mengoptimalkan proses build. Di file ini akan terjadi proses unduh, load dan setup. Berikut ini file lengkap dari WORKSPACE.

```typescript
# WARNING: This file is generated and it's not meant to be edited.
# Before making any changes, please read Bazel documentation.
# https://docs.bazel.build/versions/master/be/workspace.html
# The WORKSPACE file tells Bazel that this directory is a "workspace", which is like a project root.
# The content of this file specifies all the external dependencies Bazel needs to perform a build.

####################################
# ESModule imports (and TypeScript imports) can be absolute starting with the workspace name.
# The name of the workspace should match the npm package where we publish, so that these
# imports also make sense when referencing the published package.
workspace(
    name = "project",
    managed_directories = {"@npm": ["node_modules"]},
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

RULES_NODEJS_VERSION = "1.6.0"
RULES_NODEJS_SHA256 = "f9e7b9f42ae202cc2d2ce6d698ccb49a9f7f7ea572a78fd451696d03ef2ee116"
http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = RULES_NODEJS_SHA256,
    url = "https://github.com/bazelbuild/rules_nodejs/releases/download/%s/rules_nodejs-%s.tar.gz" % (RULES_NODEJS_VERSION, RULES_NODEJS_VERSION),
)

# Rules for compiling sass
RULES_SASS_VERSION = "1.24.0"
RULES_SASS_SHA256 = "77e241148f26d5dbb98f96fe0029d8f221c6cb75edbb83e781e08ac7f5322c5f"
http_archive(
    name = "io_bazel_rules_sass",
    sha256 = RULES_SASS_SHA256,
    strip_prefix = "rules_sass-%s" % RULES_SASS_VERSION,
    urls = [
        "https://github.com/bazelbuild/rules_sass/archive/%s.zip" % RULES_SASS_VERSION,
        "https://mirror.bazel.build/github.com/bazelbuild/rules_sass/archive/%s.zip" % RULES_SASS_VERSION,
    ],
)

####################################
# Load and install our dependencies downloaded above.

load("@build_bazel_rules_nodejs//:index.bzl", "check_bazel_version", "node_repositories",
    "npm_install")
check_bazel_version(
    message = """
You no longer need to install Bazel on your machine.
Your project should have a dependency on the @bazel/bazel package which supplies it.
Try running `yarn bazel` instead.
    (If you did run that, check that you've got a fresh `yarn install`)
""",
    minimum_bazel_version = "0.27.0",
)

# Setup the Node repositories. We need a NodeJS version that is more recent than v10.15.0
# because "selenium-webdriver" which is required for "ng e2e" cannot be installed.
# TODO: remove the custom repositories once "rules_nodejs" supports v12.14.1 by default.
node_repositories(
    node_repositories = {
        "12.14.1-darwin_amd64": ("node-v12.14.1-darwin-x64.tar.gz", "node-v12.14.1-darwin-x64", "0be10a28737527a1e5e3784d3ad844d742fe8b0718acd701fd48f718fd3af78f"),
        "12.14.1-linux_amd64": ("node-v12.14.1-linux-x64.tar.xz", "node-v12.14.1-linux-x64", "07cfcaa0aa9d0fcb6e99725408d9e0b07be03b844701588e3ab5dbc395b98e1b"),
        "12.14.1-windows_amd64": ("node-v12.14.1-win-x64.zip", "node-v12.14.1-win-x64", "1f96ccce3ba045ecea3f458e189500adb90b8bc1a34de5d82fc10a5bf66ce7e3"),
    },
    node_version = "12.14.1",
)

npm_install(
    name = "npm",
    package_json = "//:package.json",
    package_lock_json = "//:package-lock.json",
)

load("@npm//:install_bazel_dependencies.bzl", "install_bazel_dependencies")
install_bazel_dependencies()

load("@npm_bazel_protractor//:package.bzl", "npm_bazel_protractor_dependencies")
npm_bazel_protractor_dependencies()

load("@npm_bazel_karma//:package.bzl", "npm_bazel_karma_dependencies")
npm_bazel_karma_dependencies()

load("@io_bazel_rules_webtesting//web:repositories.bzl", "web_test_repositories")
web_test_repositories()

load("@io_bazel_rules_webtesting//web/versioned:browsers-0.3.2.bzl", "browser_repositories")
browser_repositories(chromium = True, firefox = True)

load("@npm_bazel_typescript//:index.bzl", "ts_setup_workspace")
ts_setup_workspace()

load("@io_bazel_rules_sass//sass:sass_repositories.bzl", "sass_repositories")
sass_repositories()
```

Kemudian terdapat BUILD.bazel pada project tersebut. File ini akan dijalankan ketika terjadi proses build dari bazel. Jadi setiap bazel dijalankan maka akan mengexport files tsconfig.json dan juga pada baris pertama untuk visibilitynya bersifat public.

```typescript
package(default_visibility = ["//visibility:public"])
# This export allows targets in other packages to reference files that live# in this package.
exports_files([
    "tsconfig.json",
])
```

Selanjutnya terdapat file .bazelrc, Nah pada file ini akan dijalankan beberapa fungsi yang menghasilkan output dari hasil build angular menggunakan bazel. Berikut file lengkap dari .bazelrc.

```ts
# Make TypeScript and Angular compilation fast, by keeping a few copies of the
# compiler running as daemons, and cache SourceFile AST's to reduce parse time.
build --strategy=TypeScriptCompile=worker
build --strategy=AngularTemplateCompile=worker

# Don't create bazel-* symlinks in the WORKSPACE directory, except `bazel-out`,
# which is mandatory.
# These require .gitignore and may scare users.
# Also, it's a workaround for https://github.com/bazelbuild/rules_typescript/issues/12
# which affects the common case of having `tsconfig.json` in the WORKSPACE directory.
#
# Instead, the output will appear in `dist/bin`. You'll need to ignore the
# `bazel-out` directory that is created in the workspace root.
build --symlink_prefix=dist-bazel/

# Turn on --incompatible_strict_action_env which was on by default
# in Bazel 0.21.0 but turned off again in 0.22.0. Follow
# https://github.com/bazelbuild/bazel/issues/7026 for more details.
# This flag is needed to so that the bazel cache is not invalidated
# when running bazel via `yarn bazel`.
# See https://github.com/angular/angular/issues/27514.
build --incompatible_strict_action_env
run --incompatible_strict_action_env
test --incompatible_strict_action_env

# build --incompatible_bzl_disallow_load_after_statement=false

test --test_output=errors

# Use the Angular Ivy compiler
# See https://github.com/angular/angular/blob/master/docs/BAZEL.md#various-flags-used-for-tests
build --define=angular_ivy_enabled=True

# Temporary define while angular depends on the legacy rollup_bundle rule.
# TODO: remove this setting after https://github.com/angular/angular/pull/33201 lands.
build --define=enable_legacy_rollup_rule=1

# Turn on managed directories feature in Bazel
# This allows us to avoid installing a second copy of node_modules
common --experimental_allow_incremental_repository_updates
```

Kemudian terdapat juga file angular.json.bak. Jadi ketika kita menggunakan bazel maka secara otomatis akan generate file angular.json dengan untuk versi yang menggunakan bazel. Kemudian file angular.json yang belum menggunakan mengguakan bazel akan dibackup dan menjadi angular.json.bak.

Berikut ini isi dari file angular.json.bak.

```json
// This is a backup file of the original angular.json. This file is needed in case you want to revert to the workflow without Bazel.

{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "ngBazel": {
      "projectType": "application",
      "schematics": {},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/ngBazel",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.app.json",
            "aot": true,
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.css"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "fileReplacements": [
                {
                  "replace": "src/environments/environment.ts",
                  "with": "src/environments/environment.prod.ts"
                }
              ],
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "extractCss": true,
              "namedChunks": false,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true,
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "2mb",
                  "maximumError": "5mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "6kb",
                  "maximumError": "10kb"
                }
              ]
            }
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "browserTarget": "ngBazel:build"
          },
          "configurations": {
            "production": {
              "browserTarget": "ngBazel:build:production"
            }
          }
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "ngBazel:build"
          }
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "main": "src/test.ts",
            "polyfills": "src/polyfills.ts",
            "tsConfig": "tsconfig.spec.json",
            "karmaConfig": "karma.conf.js",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.css"
            ],
            "scripts": []
          }
        },
        "lint": {
          "builder": "@angular-devkit/build-angular:tslint",
          "options": {
            "tsConfig": [
              "tsconfig.app.json",
              "tsconfig.spec.json",
              "e2e/tsconfig.json"
            ],
            "exclude": [
              "**/node_modules/**"
            ]
          }
        },
        "e2e": {
          "builder": "@angular-devkit/build-angular:protractor",
          "options": {
            "protractorConfig": "e2e/protractor.conf.js",
            "devServerTarget": "ngBazel:serve"
          },
          "configurations": {
            "production": {
              "devServerTarget": "ngBazel:serve:production"
            }
          }
        }
      }
    }},
  "defaultProject": "ngBazel"
}
```

Dan ini file angular.json ketika sudah menggunakan bazel.

```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "ngBazel": {
      "projectType": "application",
      "schematics": {},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular/bazel:build",
          "options": {
            "targetLabel": "//src:prodapp",
            "bazelCommand": "build"
          },
          "configurations": {
            "production": {
              "targetLabel": "//src:prodapp"
            }
          }
        },
        "serve": {
          "builder": "@angular/bazel:build",
          "options": {
            "targetLabel": "//src:devserver",
            "bazelCommand": "run",
            "watch": true
          },
          "configurations": {
            "production": {
              "targetLabel": "//src:prodserver"
            }
          }
        },
        "extract-i18n": {
          "builder": "@angular-devkit/build-angular:extract-i18n",
          "options": {
            "browserTarget": "ngBazel:build"
          }
        },
        "test": {
          "builder": "@angular/bazel:build",
          "options": {
            "bazelCommand": "test",
            "targetLabel": "//src:test"
          }
        },
        "lint": {
          "builder": "@angular-devkit/build-angular:tslint",
          "options": {
            "tsConfig": [
              "tsconfig.app.json",
              "tsconfig.spec.json",
              "e2e/tsconfig.json"
            ],
            "exclude": [
              "**/node_modules/**"
            ]
          }
        },
        "e2e": {
          "builder": "@angular/bazel:build",
          "options": {
            "bazelCommand": "test",
            "targetLabel": "//e2e:devserver_test"
          },
          "configurations": {
            "production": {
              "targetLabel": "//e2e:prodserver_test"
            }
          }
        }
      }
    }
  },
  "defaultProject": "ngBazel",
  "cli": {
    "analytics": false
  }
}
```

Kemudian kita masuk ke folder src dan disitu ada lagi file BUILD.bazel, loh kenapa ada banyak file BUILD.bazel. Jadi begini bazel ini sifatnya bisa saling memanggil dan ada satu file khusus yang memanggil seluruh file bazel. Nah, biasanya file BUILD.bazel yang ada difolder src itu yang utama.

Disini fungsinya lebih komplek karena mendeklarasikan seluruh dependensi, aset dan file configurasi yang digunakan oleh angular. Berikut ini isi dari filenya.

```ts
package(default_visibility = ["//visibility:public"])

load("@build_bazel_rules_nodejs//:index.bzl", "pkg_web")
load("@npm//history-server:index.bzl", "history_server")
load("@npm//html-insert-assets:index.bzl", "html_insert_assets")
load("@npm_angular_bazel//:index.bzl", "ng_module")
load("@npm_bazel_karma//:index.bzl", "karma_web_test_suite")
load("@npm_bazel_rollup//:index.bzl", "rollup_bundle")
load("@npm_bazel_terser//:index.bzl", "terser_minified")
load("@npm_bazel_typescript//:index.bzl", "ts_devserver", "ts_library")
load("@io_bazel_rules_sass//:defs.bzl", "multi_sass_binary", "sass_binary")

sass_binary(
  name = "global_stylesheet",
  src = glob(["styles.css", "styles.scss"])[0],
  output_name = "global_stylesheet.css",
)

multi_sass_binary(
    name = "styles",
    srcs = glob(
      include = ["**/*.scss"],
      exclude = ["styles.scss"],
    ),
)

ng_module(
    name = "src",
    srcs = glob(
        include = ["**/*.ts"],
        exclude = [
            "**/*.spec.ts",
            "main.ts",
            "test.ts",
            "initialize_testbed.ts",
        ],
    ),
    assets = glob([
      "**/*.css",
      "**/*.html",
    ]) + ([":styles"] if len(glob(["**/*.scss"])) else []),
    generate_ve_shims = True,
    deps = [
        "@npm//@angular/core",
        "@npm//@angular/platform-browser",
        "@npm//@angular/router",
        "@npm//@types",
        "@npm//rxjs",
    ],
)

rollup_bundle(
    name = "bundle",
    config_file = "rollup.config.js",
    entry_point = ":main.prod.ts",
    deps = [
        "//src",
        "@npm//rollup-plugin-commonjs",
        "@npm//rollup-plugin-node-resolve",
    ],
)

terser_minified(
    name = "bundle.min",
    src = ":bundle",
)

html_insert_assets(
    name = "asset_injected_index_html",
    outs = ["_/index.html"],
    args = [
        "--html",
        "$(execpath :index.html)",
        "--out",
        "$@",
        "--roots",
        "$(RULEDIR)",
        "--assets",
        "$(execpath :global_stylesheet.css)",
        "$(execpath @npm//:node_modules/zone.js/dist/zone.min.js)",
        "bundle.min.js",
    ],
    data = [
        ":index.html",
        ":global_stylesheet.css",
        "@npm//:node_modules/zone.js/dist/zone.min.js",
    ],
)

pkg_web(
    name = "prodapp",
    additional_root_paths = ["src/_"],
    srcs = [
        "@npm//:node_modules/zone.js/dist/zone.min.js",
        ":bundle.min",
        ":global_stylesheet",
        ":asset_injected_index_html",
        "favicon.ico",
    ],
)

history_server(
    name = "prodserver",
    data = [":prodapp"],
    args = [
        "--port",
        "4200",
    ],
    templated_args = ["$(rlocation project/src/prodapp)"],
)

filegroup(
    name = "rxjs_umd_modules",
    srcs = [
        # do not sort
        "@npm//:node_modules/rxjs/bundles/rxjs.umd.js",
        ":rxjs_shims.js",
    ],
)

ts_devserver(
    name = "devserver",
    additional_root_paths = ["project/src/_"],
    port = 4200,
    entry_module = "project/src/main.dev",
    serving_path = "/bundle.min.js",
    scripts = [
        "@npm//:node_modules/tslib/tslib.js",
        ":rxjs_umd_modules",
    ],
    static_files = [
        "@npm//:node_modules/zone.js/dist/zone.min.js",
        ":global_stylesheet",
        ":asset_injected_index_html",
        "favicon.ico",
    ],
    deps = [":src"],
)

ts_library(
    name = "test_lib",
    testonly = 1,
    srcs = glob(["**/*.spec.ts"]),
    deps = [
        ":src",
        "@npm//@angular/core",
        "@npm//@angular/router",
        "@npm//@types",
    ],
)

ts_library(
    name = "initialize_testbed",
    testonly = 1,
    srcs = [
        "initialize_testbed.ts",
    ],
    deps = [
        "@npm//@angular/core",
        "@npm//@angular/platform-browser-dynamic",
        "@npm//@types",
    ],
)

karma_web_test_suite(
    name = "test",
    srcs = [
        "@npm//:node_modules/tslib/tslib.js",
    ],
    runtime_deps = [
        ":initialize_testbed",
    ],
    # do not sort
    bootstrap = [
        "@npm//:node_modules/zone.js/dist/zone-testing-bundle.js",
        "@npm//:node_modules/reflect-metadata/Reflect.js",
    ],
    browsers = [
        "@io_bazel_rules_webtesting//browsers:chromium-local",
    ],
    tags = ["native"],
    deps = [
        ":rxjs_umd_modules",
        ":test_lib",
    ],
)
```

Oke langsung saja kita coba jalankan anglar 9 mengguakan bazel ini. Jika biasanya menggunakan ng serve, kali ini kita menggunakan bazel run //src:devserver yang artinya kita menjalankan bazel khusus untuk environment dev.

Jangan bingung ya ketika proses pertama kali build memakan waktu yang lama, untuk gambar dibawah ini hanya membutuhkan waktu 2 detik saja, karena sebelumnya saya sudah melakukan bazel run //src:test dan perlu saya sampaikan proses itu memakan waktu kurang lebih 800 detik, hehe. Lama ya? ya memang sepeti itu jadi diawal bazel akan ngebuild seluruh input output dari angular dan setelah itu akan direbuild jika ada perubahan, jika tidak ada perubahan? ya pakai cache yang lama dan inilah yang disebut dengan konsep incremental dan trust cache.

<img src="/assets/blog/14.bazel/5.load.png" alt="Process" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Oke maka tampilannya seperti berikut ini dan tidak ada yang spesial ya, ini hanya prosesnya saja, nanti teman-teman bisa kembangkan sendiri.

<img src="/assets/blog/14.bazel/6.index.png" alt="Process" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Secara sekilas tidak ada perbedaan, maka dari itu mari kita cari perbedaannya. Yap coba klik kanan dan view page source maka akan terlihat jelas perbedaannya. Pada halaman tersebut terlihat dengan jelas bahwa file bundling yang digunakan oleh angular adalah file cache yang ada dimesin kita.

<img src="/assets/blog/14.bazel/7.code.png" alt="Process" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Kita juga bisa menjalankan perintah supaya bisa memonitoring setiap perubahan file yang ada menggunakan ibazel, sebelumnya jalankan perintah npm i — save-dev @bazel/bazelisk. Karena untuk menjalankan ibazel memerlukan library bazelisk yang mana bazelisk sudah deprecated dari @bazel itu sendiri. Setelah terintstall coba jalankan perintah ibazel run //src:devserver.

<img src="/assets/blog/14.bazel/8.bazel.png" alt="Process" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Oh, ternyta terdapat error bahwa tidak mengenali perintah — incompatible_bzl_disallow_load_after_statement=false. Nah solusinya nonaktifkan perintah tersebut yang berada di file .bazelsrc. Kemudian coba jalankan lagi dan seperti berikut ini tampilannya

<img src="/assets/blog/14.bazel/9.bazel-load.png" alt="Process" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Nah, jadi setiap ada perubahan file maka ibazel akan memberitahukan dan akan melakukan rebuild. Perlu teman-teman ketahui bahwa bazel itu selalu AOT, jadi misalkan teman-teman buat component, directive, service dan sejenisnya, tolong dilakukan build terlebih dahulu karena bazel membutuhkan file ngFactory dan ngSummary supaya bisa menjalankan component yang baru dibuat.

Nah, ini coba kita tambahkan component baru. Bisa dengan menjalankan perintah ng g c header dan selanjutnya build kembali. Kemudian jalankan ibazel kembali maka hasilnya seperti berikut ini.

<img src="/assets/blog/14.bazel/10.host.png" alt="Process" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Okee berhasil, selanjutnya kita ingin melihat bagaimana ibazel itu bekerja. Disini saya akan mengedit file title yang awalnya cuma ngBazel app is running, saya ubah menjadi Awesome ngBazel app is running dan kemudian save file app.component.html.

<img src="/assets/blog/14.bazel/11.build.png" alt="Process" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Nah, terdapat keterangan bahwa terjadi perubahan file pada app.component.html jam 9.50 dan sedang dilakukan proses rebuilding. Keren bukan? hehe. Seperti ini tampilan setelah dilakukan proses edit.

<img src="/assets/blog/14.bazel/12.load-bzl.png" alt="Preview" class="img img-responsive mb-3" style="width: 100%; border-radius: 5px;" >

Oke tahap installasi angular dengan bazel sudah selesai. Selanjutnya kita masuk ke tahap deployment ke github dan azure.

<p><div class="link-preview-widget"><a class="w-full" href="https://afifalfiano.netlify.app/blog/deploy-angular-bazel-azure-github-action-part2" rel="noopener" target="_blank"><div class="link-preview-widget-title">Deploy Angular 9 and Bazel on Azure Static Web Apps(Preview) using Github Actions Part II</div><div class="link-preview-widget-description">Setelah proses panjang menginstall bazel di angular, maka kita lanjut ke proses mengunggah source code ke github dan menghubungkan ke azure untuk dilakukan proses deployment.</div><div class="link-preview-widget-url">https://afifalfiano.netlify.app/</div></a><a class="link-preview-widget-image" href="https://afifalfiano.netlify.app/blog/deploy-angular-bazel-azure-github-action-part2" rel="noopener" style="background-image: url('https://afifalfiano.netlify.app/assets/blog/14.bazel/1.header.jpeg');" target="_blank"></a></div></p>

#github #anguar #bazel #azure
