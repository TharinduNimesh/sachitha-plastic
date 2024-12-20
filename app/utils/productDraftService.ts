export interface ProductDraft {
  name: string
  description: string
  category: string
  status: string
  images: Array<{ url: string; id: string }>
  lastSaved: string | null
}

const STORAGE_KEY = 'product-draft'

// Debounce function to limit save operations
const debounce = <T extends (...args: any[]) => void>(fn: T, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

export const productDraftService = {
  saveDraft: debounce((draft: Omit<ProductDraft, 'lastSaved'>) => {
    try {
      const draftWithTimestamp = {
        ...draft,
        lastSaved: new Date().toISOString()
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draftWithTimestamp))
      return true
    } catch (error) {
      console.error('Error saving draft:', error)
      return false
    }
  }, 500), // Debounce for 500ms

  getDraft(): ProductDraft | null {
    try {
      const draft = localStorage.getItem(STORAGE_KEY)
      return draft ? JSON.parse(draft) : null
    } catch (error) {
      console.error('Error getting draft:', error)
      return null
    }
  },

  hasDraft(): boolean {
    return localStorage.getItem(STORAGE_KEY) !== null
  },

  clearDraft() {
    try {
      localStorage.removeItem(STORAGE_KEY)
      return true
    } catch (error) {
      console.error('Error clearing draft:', error)
      return false
    }
  }
}