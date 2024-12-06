import { defineStore } from 'pinia'

interface SidebarState {
  isCollapsed: boolean
  isMobileOpen: boolean
}

export const useSidebarStore = defineStore('sidebar', {
  state: (): SidebarState => ({
    isCollapsed: false,
    isMobileOpen: false
  }),

  getters: {
    sidebarWidth: (state): string => {
      if (state.isMobileOpen) return 'w-64'
      return state.isCollapsed ? 'w-20' : 'w-64'
    },
    mainContentMargin: (state): string => {
      // SSR check
      if (import.meta.server) return 'ml-64' // Default to desktop expanded view
      
      // Mobile: no margin
      if (window.innerWidth < 768) {
        console.log("Inner width:" + window.innerWidth)
        return 'ml-0'
      }
      
      // Desktop: margin based on collapsed state
      return state.isCollapsed ? 'ml-20' : 'ml-64'
    }
  },

  actions: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed
    },
    
    setCollapsed(value: boolean) {
      this.isCollapsed = value
    },

    toggleMobileMenu() {
      this.isMobileOpen = !this.isMobileOpen
    },

    closeMobileMenu() {
      this.isMobileOpen = false
    }
  }
})
