const request = require('supertest');
import app from "../server" // Import the Express app

describe('Request Validation Tests', () => {
  test('POST /v1/api/user/login with valid data should return success message', async () => {
    const response = await request(app)
      .post('/v1/api/user/login')
      .send({ email: 'ayush@gmail.com', password: "123457" })
      .expect(200);

    expect(response.body.message).toBe('Log-In successfully');
  });

  test('POST /v1/api/user/login with invalid data should return a 400 error', async () => {
    const response = await request(app)
      .post('/v1/api/user/login')
      .send({ email: 'ayush@gmail.com', password: "123456" }) // Invalid password
      .expect(400);

    expect(response.body.error).toBe('invalid password');
  });
});