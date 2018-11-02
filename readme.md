## start

```bash
npm install
npm start
```

## 简介
dna 定位为： **一个数据驱动生成企业级应用的解决方案**。目前仅实现了form相关的功能。

## 目录结构

```
.
├── cmps
│   ├── dsl-form-pannel  ====== 设计态组件
│   │   ├── elements-avatar
│   │   │   ├── avatars
│   │   │   │   ├── base-cmp.js
│   │   │   │   └── text-input.js
│   │   │   └── index.js
│   │   ├── index.js
│   │   ├── index.scss
│   │   └── sub-pannel
│   │       ├── element-pannel.js
│   │       └── stage-pannel.js
│   └── form            ======= 渲染态组件
│       ├── core
│       │   └── x-actions.js
│       ├── fields
│       │   ├── abstract-field.js  ===== 抽象field,通用能力
│       │   ├── checkbox
│       │   │   ├── checkbox.js
│       │   │   ├── group.js
│       │   │   └── index.js
│       │   ├── common-detail-field
│       │   │   └── index.js
│       │   ├── group-tree
│       │   │   ├── index.js
│       │   │   └── index.scss
│       │   ├── index.js
│       │   ├── input
│       │   │   └── index.js
│       │   ├── radio-group
│       │   │   └── index.js
│       │   ├── sugest
│       │   │   └── index.js
│       │   └── validator.js
│       ├── index.js
│       ├── readme.md
│       └── utils.js
├── demos
│   ├── dsl-form-generator
│   │   ├── index.js
│   │   └── index.scss
│   └── form
│       └── index.js
├── index.scss
├── main.js
├── mock
│   └── index.js
└── utils
    └── request.js
```

## TODO LIST

- [ ] 属性编辑面板
- [ ] avatar组件开发模板
- [ ] form DSL编辑导出功能
- [ ] 设计态，渲染态集成
