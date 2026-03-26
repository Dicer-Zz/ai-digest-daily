<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { data as posts } from '../posts.data.ts'

const groupedByMonth = computed(() => {
  const sorted = [...posts].sort((a, b) =>
    new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  )
  const groups = new Map()
  sorted.forEach(post => {
    const d = new Date(post.frontmatter.date)
    const key = `${d.getFullYear()} 年 ${d.getMonth() + 1} 月`
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(post)
  })
  return Array.from(groups.entries())
})

function formatDate(dateStr) {
  const d = new Date(dateStr)
  const weekdays = ['日', '一', '二', '三', '四', '五', '六']
  return `${dateStr} 星期${weekdays[d.getDay()]}`
}
</script>

<template>
  <div class="archive-page">
    <h1 class="page-title">归档</h1>
    <p class="page-desc">共 {{ posts.length }} 篇日报</p>

    <div v-for="[month, items] in groupedByMonth" :key="month" class="month-group">
      <h2 class="month-title">{{ month }} <span class="month-count">({{ items.length }})</span></h2>
      <div class="month-list">
        <a v-for="post in items" :key="post.url" :href="withBase(post.url)" class="archive-item">
          <span class="archive-date">{{ formatDate(post.frontmatter.date) }}</span>
          <span class="archive-title">{{ post.frontmatter.title || 'AI 每日资讯速递' }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.archive-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
}

.page-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
}

.page-desc {
  color: var(--vp-c-text-2);
  margin-bottom: 2rem;
}

.month-group {
  margin-bottom: 2rem;
}

.month-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.month-count {
  font-weight: 400;
  color: var(--vp-c-text-3);
  font-size: 0.9rem;
}

.month-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.archive-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.6rem 0.75rem;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.2s;
}

.archive-item:hover {
  background: var(--vp-c-bg-soft);
}

.archive-date {
  font-family: 'Inter', monospace;
  font-size: 0.88rem;
  color: var(--vp-c-text-3);
  white-space: nowrap;
  min-width: 180px;
}

.archive-title {
  font-weight: 500;
  color: var(--vp-c-text-1);
}
</style>
