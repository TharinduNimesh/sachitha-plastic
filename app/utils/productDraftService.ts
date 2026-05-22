import type { ProductDraft } from '@/types/product.types'

const STORAGE_KEY = 'product-draft'

type DraftPayload = Omit<ProductDraft, 'lastSaved'>

type DebouncedSaveFn = ((draft: DraftPayload) => void) & {
  cancel: () => void
}

const saveDraftToStorage = (draft: DraftPayload): boolean => {
  const draftWithTimestamp: ProductDraft = {
    ...draft,
    lastSaved: new Date().toISOString(),
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(draftWithTimestamp))
  return true
}

const debounce = (fn: (draft: DraftPayload) => void, delay: number): DebouncedSaveFn => {
  let timeoutId: ReturnType<typeof setTimeout> | undefined

  const debounced = ((draft: DraftPayload) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => fn(draft), delay)
  }) as DebouncedSaveFn

  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
      timeoutId = undefined
    }
  }

  return debounced
}

const debouncedSaveDraft = debounce((draft: DraftPayload) => {
  try {
    saveDraftToStorage(draft)
  } catch (error) {
    console.error('Error saving draft:', error)
  }
}, 500)

export const productDraftService = {
  saveDraft: debouncedSaveDraft,

  saveDraftNow(draft: DraftPayload): boolean {
    try {
      return saveDraftToStorage(draft)
    } catch (error) {
      console.error('Error saving draft:', error)
      return false
    }
  },

  cancelPendingSave() {
    debouncedSaveDraft.cancel()
  },

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

  clearDraft(): boolean {
    try {
      localStorage.removeItem(STORAGE_KEY)
      return true
    } catch (error) {
      console.error('Error clearing draft:', error)
      return false
    }
  },
}
