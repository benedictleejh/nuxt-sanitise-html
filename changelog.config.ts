import type { ChangelogConfig } from 'changelogen'

export default {
  templates: {
    // Prevent push of release commits from triggering a release
    commitMessage: 'chore(release): v{{newVersion}} [skip ci]'
  }
} satisfies Partial<ChangelogConfig>
