# Samarasinghe Trade Center - Website Development Rules

## Project Overview
- Modern eco-friendly website for plastic and recycling machine company
- Built with Nuxt.js (Experimental v4) and Tailwind CSS
- Backend powered by Supabase
- Source code located in @/app directory

## Design Guidelines
1. Color Scheme
   - Use light, eco-friendly colors
   - Primary colors should reflect nature and sustainability
   - Maintain high contrast for accessibility
   - Use green accents to emphasize eco-friendly nature

2. UI/UX Principles
   - Modern, clean interface
   - Intuitive navigation
   - Responsive design for all devices
   - Smooth animations and transitions
   - Focus on user experience
   - Clear call-to-actions

## Component Structure
1. Component Organization (/app/components)
   - Web/
     - Header/
     - Footer/
     - Navigation/
   - Common/
     - Buttons/
     - Cards/
     - Forms/
   - Products/
   - Recycling/
   - Features/
   - Contact/

2. Component Naming
   - Use nested folder names as component names
   - Example: Web/Header/Logo.vue -> <WebHeaderLogo />
   - Keep names descriptive and consistent

## Development Guidelines
1. Package Management
   - Use Bun as the primary package manager
   - Run all package installations and scripts with Bun
   - Keep package.json and bun.lockb in sync

## Development Rules
1. Nuxt.js Specific
   - No need for explicit import statements
   - Use auto-imports feature
   - Utilize Nuxt modules when available
   - Follow Nuxt.js directory structure

2. Icon Usage
   - Use Nuxt Icon component for all icons
   - Follow the i- prefix pattern (e.g., i-uil-github)
   - Install required icon collections using bun add @iconify-json/{collection}
   - Current icon collections:
     * @iconify-json/uil (Unicons Line)
   - Icon component usage:
     ```vue
     <Icon name="i-uil-github" class="w-5 h-5" />
     ```
   - Keep icon sizes consistent within similar contexts
   - Use appropriate icon colors through text-{color} utility classes

3. Code Style
   - Use composition API
   - Implement TypeScript for type safety
   - don't use any type
   - write reusable types/ interfaces inside the /app/types directory 
   - Follow best practices
   - Write clean, documented code
   - Use meaningful variable names

4. Tailwind CSS
   - Use utility classes
   - Create custom components for repeated styles
   - Maintain consistent spacing
   - Follow mobile-first approach

5. Performance
   - Optimize images
   - Implement lazy loading
   - Use efficient Supabase queries
   - Monitor and optimize bundle size

6. SEO
   - Implement meta tags
   - Use semantic HTML
   - Optimize for search engines
   - Include sitemap

## Git Workflow
- Use meaningful commit messages
- Create feature branches
- Review code before merging
- Keep main branch stable

## Backend (Supabase)
- Secure API endpoints
- Efficient database structure
- Regular backups
- Monitor performance

## Deployment
- Regular testing before deployment
- Maintain staging environment
- Monitor production logs
- Regular updates and maintenance