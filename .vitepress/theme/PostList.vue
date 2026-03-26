<script setup>
import { ref, computed } from 'vue'
import { withBase } from 'vitepress'
import { data as posts } from '../posts.data.ts'

const selectedTag = ref('')
const allTags = computed(() => {
  const tagSet = new Set()
  posts.forEach(p => {
    if (p.frontmatter.tags) {
      p.frontmatter.tags.forEach(t => tagSet.add(t))
    }
  })
  return Array.from(tagSet).sort()
})

const filteredPosts = computed(() => {
  const sorted = [...posts].sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  })
  if (!selectedTag.value) return sorted
  return sorted.filter(p =>
    p.frontmatter.tags && p.frontmatter.tags.includes(selectedTag.value)
  )
})

function toggleTag(tag) {
  selectedTag.value = selectedTag.value === tag ? '' : tag
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  return `${dateStr} 星期${weekdays[d.getDay()]}`
}

function getTagClass(tag) {
  const map = {
    'LLM': 'tag-llm', 'Agent': 'tag-agent', 'Multimodal': 'tag-multimodal',
    'Open Source': 'tag-opensource', 'Funding': 'tag-funding', 'Policy': 'tag-policy',
    'Infra': 'tag-infra', 'Safety': 'tag-safety', 'Application': 'tag-app',
    'Research': 'tag-research'
  }
  return map[tag] || 'tag-default'
}
</script>

<template>
  <div class="post-list">
    <div class="hero-section">
      <h1 class="hero-title">AI 每日资讯速递</h1>
      <p class="hero-desc">每天 AI 领域热点新闻、GitHub Trending 和 arXiv 前沿论文</p>
    </div>

    <div class="tag-filter">
      <span class="filter-label">按标签筛选：</span>
      <button
        v-for="tag in allTags"
        :key="tag"
        :class="['tag-btn', getTagClass(tag), { active: selectedTag === tag }]"
        @click="toggleTag(tag)"
      >
        {{ tag }}
      </button>
      <button v-if="selectedTag" class="tag-btn tag-clear" @click="selectedTag = ''">
        清除筛选
      </button>
    </div>

    <div class="posts-count">
      共 {{ filteredPosts.length }} 篇日报
      <span v-if="selectedTag"> · 标签「{{ selectedTag }}」</span>
    </div>

    <div class="posts-grid">
      <a
        v-for="post in filteredPosts"
        :key="post.url"
        :href="withBase(post.url)"
        class="post-card"
      >
        <div class="post-date">{{ formatDate(post.frontmatter.date) }}</div>
        <h2 class="post-title">{{ post.frontmatter.title || 'AI 每日资讯速递' }}</h2>
        <p v-if="post.frontmatter.summary" class="post-summary">{{ post.frontmatter.summary }}</p>
        <div class="post-tags">
          <span
            v-for="tag in (post.frontmatter.tags || [])"
            :key="tag"
            :class="['post-tag', getTagClass(tag)]"
          >
            {{ tag }}
          </span>
        </div>
      </a>
    </div>
  </div>
</template>

<style scoped>
.post-list {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.hero-section {
  text-align: center;
  padding: 2rem 0 2.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
  margin-bottom: 2rem;
}

.hero-title {
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
}

.hero-desc {
  color: var(--vp-c-text-2);
  font-size: 1.05rem;
}

.tag-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin-bottom: 1.5rem;
}

.filter-label {
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-right: 0.25rem;
}

.tag-btn {
  padding: 4px 12px;
  border-radius: 16px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  cursor: pointer;
  transition: all 0.2s;
}

.tag-btn:hover {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.tag-btn.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.tag-clear {
  color: var(--vp-c-text-3);
  font-style: italic;
}

.posts-count {
  color: var(--vp-c-text-3);
  font-size: 0.88rem;
  margin-bottom: 1rem;
}

.posts-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.post-card {
  display: block;
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  transition: all 0.25s;
  text-decoration: none;
  color: inherit;
}

.post-card:hover {
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.1);
  transform: translateY(-2px);
}

.post-date {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  margin-bottom: 0.4rem;
  font-family: 'Inter', monospace;
}

.post-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.5rem;
  line-height: 1.4;
}

.post-summary {
  font-size: 0.92rem;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  margin-bottom: 0.6rem;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.post-tag {
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* Tag color system */
.tag-llm { background: #ede9fe; color: #6d28d9; }
.tag-agent { background: #dbeafe; color: #2563eb; }
.tag-multimodal { background: #fce7f3; color: #db2777; }
.tag-opensource { background: #d1fae5; color: #059669; }
.tag-funding { background: #fef3c7; color: #d97706; }
.tag-policy { background: #fee2e2; color: #dc2626; }
.tag-infra { background: #e0e7ff; color: #4338ca; }
.tag-safety { background: #fce4ec; color: #c62828; }
.tag-app { background: #e0f2f1; color: #00897b; }
.tag-research { background: #f3e5f5; color: #7b1fa2; }
.tag-default { background: var(--vp-c-bg-soft); color: var(--vp-c-text-2); }

/* Dark mode tag colors */
.dark .tag-llm { background: #2e1065; color: #c4b5fd; }
.dark .tag-agent { background: #172554; color: #93c5fd; }
.dark .tag-multimodal { background: #500724; color: #f9a8d4; }
.dark .tag-opensource { background: #064e3b; color: #6ee7b7; }
.dark .tag-funding { background: #451a03; color: #fcd34d; }
.dark .tag-policy { background: #450a0a; color: #fca5a5; }
.dark .tag-infra { background: #1e1b4b; color: #a5b4fc; }
.dark .tag-safety { background: #4a1420; color: #f48fb1; }
.dark .tag-app { background: #004d40; color: #80cbc4; }
.dark .tag-research { background: #4a148c; color: #ce93d8; }

@media (max-width: 640px) {
  .hero-title { font-size: 1.6rem; }
  .post-card { padding: 1rem; }
  .post-list { padding: 1rem; }
}
</style>
