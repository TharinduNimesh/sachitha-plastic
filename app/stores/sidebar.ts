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
      return state.isCollapsed ? 'w-24' : 'w-64'
    },
  },

  actions: {
    toggleCollapse() {
      if (process.client && window.innerWidth >= 768) {
        this.isCollapsed = !this.isCollapsed
        // Store the state in localStorage
        localStorage.setItem('sidebarCollapsed', String(this.isCollapsed))
      }
    },
    
    setCollapsed(value: boolean) {
      this.isCollapsed = value
      if (process.client) {
        localStorage.setItem('sidebarCollapsed', String(value))
      }
    },

    toggleMobileMenu() {
      this.isMobileOpen = !this.isMobileOpen
    },

    closeMobileMenu() {
      this.isMobileOpen = false
    },

    initializeState() {
      if (process.client) {
        // Restore collapsed state from localStorage
        const savedState = localStorage.getItem('sidebarCollapsed')
        if (savedState !== null) {
          this.isCollapsed = savedState === 'true'
        }

        // Set initial mobile state
        this.isMobileOpen = false
      }
    }
  }
})
