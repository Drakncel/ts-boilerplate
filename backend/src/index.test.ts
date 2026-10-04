import { describe, it, expect } from 'vitest'
import { app } from './index.js'

describe('API tests', () => {
  
  it('GET /api/links', async () => {
    const res = await app.request('/api/links?page=1')
    
    expect(res.status).toBe(200)
    
    const data = await res.json()
    expect(data).toEqual([])
  })

  it('POST /api/links ', async () => {
    const res = await app.request('/api/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key: 'test', value: 'http://localhost:3000' }),
    })

    expect(res.status).toBe(201)
    
    const data = await res.json()
    expect(data.key).toBe('test')
    expect(data.value).toBe('http://localhost:3000')
  })

  it('POST /api/links error', async () => {
    const res = await app.request('/api/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key: 'test', value: 'localhost' }),
    })

    expect(res.status).toBe(400)
  })
})