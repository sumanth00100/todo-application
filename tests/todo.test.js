const request = require('supertest');
const express = require('express');
const todoRoutes = require('../src/routes/todoRoutes');

const app = express();
app.use(express.json());
app.use('/api/todos', todoRoutes);

describe('Todo API', () => {
  test('GET /api/todos should return empty array initially', async () => {
    const res = await request(app).get('/api/todos');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([]);
  });

  test('POST /api/todos should create a new todo', async () => {
    const todo = { task: 'Test task' };
    const res = await request(app).post('/api/todos').send(todo);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({ task: 'Test task', completed: false });
  });

  test('PUT /api/todos/:id should update a todo', async () => {
    const todo = { task: 'Updated task', completed: true };
    const res = await request(app).put('/api/todos/1').send(todo);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ task: 'Updated task', completed: true });
  });

  test('DELETE /api/todos/:id should delete a todo', async () => {
    const res = await request(app).delete('/api/todos/1');
    expect(res.status).toBe(204);
  });
});