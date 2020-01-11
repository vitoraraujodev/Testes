import request from 'supertest';
import app from '../../src/app';

import truncate from '../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Vitor Araujo',
        email: 'diego@rocketseat.com.br',
        password: '123456',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to duplicate email', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Vitor Araujo',
        email: 'diego@rocketseat.com.br',
        password: '123456',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Vitor Araujo',
        email: 'diego@rocketseat.com.br',
        password: '123456',
      });

    expect(response.body).toEqual({ error: 'Duplicated email' });
  });
});
