# gulp-template

## Getting Started

[Install nodeJS from here](http://nodejs.org/)

Install npm module for global

```
% sudo npm install -g typescript
% sudo npm install -g bower
% sudo npm install -g tsd
% sudo npm install -g gulp
```

Install npm module

```shell
% npm install
```

Install definition files from tsd

```
% tsd query underscore -s -a install
% tsd query jquery -s -a install
% tsd query fastclick -s -a install
```

bower

```
% bower install
```

### Directory

#### Dev

```shell
src
├── scss
│   └── style.scss
├── slim
│   └── index.slim
└── ts
    └── app.ts
```

#### build

```shell
build
├── css
│   └── style.css
├── index.html
└── js
    ├── app.js
    ├── app.min.js
    ├── fastclick.js
    ├── jquery.min.js
    └── underscore-min.js
```

### runner task

#### compile build & watch & livereload

```shell
% gulp
```

#### build only

```shell
% gulp build
```
