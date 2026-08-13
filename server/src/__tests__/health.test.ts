import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../app';

describe('Health Check', () => {
  it('should return 200 with healthy status', async () => {
    const response = await request(app).get('/api/v1/health');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'success',
      message: 'API is healthy',
    });
  });
});
