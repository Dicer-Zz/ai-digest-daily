<script setup>
import { ref, computed } from 'vue'
import { data as posts } from '../posts.data.ts'

const allTags = computed(() => {
  const tagMap = new Map()
  posts.forEach(p => {
    if (p.frontmatter.tags) {
      p.frontmatter.tags.forEach(t => {
        tagMap.set(t, (tagMap.get(t) || 0) + 1)
      })
    }
  })
  return Array.from(tagMap.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }))
})

const selectedTag = ref('')

const filteredPosts = computed(() => {
  if (!selectedTag.value) return []
  return [...posts]
    .filter(p => p.frontmatter.tags && p.frontmatter.tags.includes(selectedTag.value))
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
})

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
  <div class="tag-page">
    <h1 class="page-title">标签</h1>
    <p class="page-desc">点击标签查看相关日报</p>

    <div class="tag-cloud">
      <button
        v-for="item in allTags"
        :key="item.tag"
        :class="['cloud-tag', getTagClass(item.tag), { active: selectedTag === item.tag }]"
        @click="selectedTag = selectedTag === item.tag ? '' : item.tag"
      >
        {{ item.tag }}
        <span class="tag-count">{{ item.count }}</span>
      </button>
    </div>

    <div v-if="selectedTag" class="tag-results">
      <h2 class="results-title">
        「{{ selectedTag }}」相关日报
        <span class="results-count">{{ filteredPosts.length }} 篇</span>
      </h2>
      <div class="results-list">
        <a v-for="post in filteredPosts" :key="post.url" :href="post.url" class="result-item">
          <span class="result-date">{{ post.frontmatter.date }}</span>
          <span class="result-title">{{ post.frontmatter.title || 'AI 每日资讯速递' }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tag-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.page-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.page-desc {
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
}

.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
}

.cloud-tag {
  padding: 8px 18px;
  border-radius: 20px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  cursor: pointer;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.cloud-tag:hover {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-1px);
}

.cloud-tag.active {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

.cloud-tag.active .tag-count {
  background: rgba(255,255,255,0.25);
  color: #fff;
}

.tag-count {
  background: var(--vp-c-bg);
  padding: 1px 7px;
  border-radius: 10px;
  font-size: 0.78rem;
  color: var(--vp-c-text-3);
}

.results-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.results-count {
  font-size: 0.85rem;
  color: var(--vp-c-text-3);
  font-weight: 400;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.result-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  text-decoration: none;
  transition: all 0.2s;
}

.result-item:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

.result-date {
  font-family: 'Inter', monospace;
  font-size: 0.88rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
}

.result-title {
  font-weight: 500;
  color: var(--vp-c-text-1);
}

/* Reuse tag colors from PostList */
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
</style>
