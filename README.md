# AI 每日资讯速递

每天自动收集 AI / 人工智能领域的最新信息，生成一份高质量日报，涵盖行业热点新闻、GitHub Trending 项目和 arXiv 前沿论文。

**在线阅读** &rarr; [https://dicer-zz.github.io/ai-digest-daily/](https://dicer-zz.github.io/ai-digest-daily/)

## 日报内容

每篇日报包含三个板块：

- **行业热点** — 当天 5-8 条最重要的 AI 行业新闻，附带来源链接和多视角锐评
- **GitHub Trending** — 5-8 个当天最热门的 AI/ML/LLM/Agent 相关开源项目
- **arXiv 前沿论文** — 5-8 篇最新 AI 论文，包含中文摘要和学术点评

每条内容按重要性降序排列，并支持事件连续跟踪和去重。

## 技术栈

- [VitePress](https://vitepress.dev/) — 静态站点生成
- [GitHub Actions](https://github.com/features/actions) — 自动构建部署到 GitHub Pages
- [QoderWork](https://qoder.com) — AI 驱动的内容收集与生成

## 项目结构

```
ai-digest-daily/
├── posts/                # 日报 Markdown 文件（VitePress 内容源）
│   ├── 2026-03-18.md
│   ├── 2026-03-19.md
│   └── ...
├── .vitepress/
│   ├── config.ts         # VitePress 配置
│   ├── posts.data.ts     # 文章数据加载器
│   └── theme/            # 自定义主题组件
│       ├── index.ts
│       ├── style.css
│       ├── PostList.vue   # 首页文章列表
│       ├── ArchivePage.vue# 归档页
│       └── TagPage.vue    # 标签页
├── .github/workflows/
│   └── deploy.yml        # GitHub Pages 自动部署
├── archive/              # 归档的旧版静态 HTML 页面
├── public/               # 静态资源
├── index.md              # 首页
├── archive.md            # 归档页
├── tags.md               # 标签页
└── package.json
```

## 文章格式

每篇日报为标准 Markdown 文件，包含 YAML frontmatter：

```yaml
---
title: "当天内容的高度概括性标题"
date: "2026-03-27"
tags:
  - LLM
  - Agent
  - Policy
summary: "一句话概括当天所有核心内容"
---
```

支持的标签：`LLM` `Agent` `Multimodal` `Robotics` `Research` `Open Source` `Startup` `Policy` `Infra` `Safety`

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 发布新日报

将日报文件保存到 `posts/` 目录后，提交并推送即可自动触发部署：

```bash
git add posts/2026-03-27.md
git commit -m "📰 文章标题"
git push
```

GitHub Actions 会自动构建 VitePress 并部署到 GitHub Pages。

## License

MIT
