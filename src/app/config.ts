// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
console.log('API Base URL:', API_BASE_URL)

export const config = {
  api: {
    baseUrl: API_BASE_URL,
    endpoints: {
      models: `${API_BASE_URL}/api/models`,
    },
  },
}

// Log the configuration for debugging
console.log('API Configuration:', config) 