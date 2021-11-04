import { MongoClient } from 'mongodb';
import sinon from 'sinon';
import chai, { expect, request } from 'chai';
import chaiHttp from 'chai-http';
import getConnection from './mocks/connectionMock';
import server from '../api';

chai.use(chaiHttp);

interface ReturnBodyCreate {
  body: {
    id: string,
    task: string,
    userId: string,
  }
}

interface ReturnMessageError {
  body: {
    message: string
  }
}

interface ReturnAllUsers {
  body: Array<{
    _id: string,
    task: string,
    userId: string,
  }>;
}

describe('1 - endpoint api/tasks', () => {
  before(async () => {
    const connectionMock = await getConnection();

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });

  after(async () => {
    (MongoClient as any).connect.restore();
  });

  describe('Criação de Task', () => {
    let response: ReturnBodyCreate;
    let userId: string;

    before(async () => {
      const request = await chai.request(server)
        .post('/api/users')
        .send({
          name: 'Chaves',
          email: 'chaves@gmail.com',
          password: '123456',
        });
      
      const { body: { id } } = request;
      userId = id;

      const { body } = await chai.request(server)
        .post('/api/login')
        .send({
          email: 'chaves@gmail.com',
          password: '123456',
        });

      const { token } = body;

      response = await chai.request(server)
        .post('/api/tasks')
        .set({ 'Authorization': token })
        .send({
          task: 'Correr em circulo ate cair',
        });;
    });

    it('Propriedade "id"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body.id).to.be.an('string');
      expect(response).to.have.status(201);
    });
    it('Propriedade "task"', () => {
      expect(response.body.task).to.be.equal('Correr em circulo ate cair');
    });
    it('Propriedade "userId"', () => {
      expect(response.body.userId).to.be.equal(userId);
    });
  });

  describe('Busca por todos as tasks de um usuario', () => {
    let response: ReturnAllUsers;
    let userId: string;

    before(async () => {
      const request = await chai.request(server)
        .post('/api/users')
        .send({
          name: 'Kiko',
          email: 'kiko@gmail.com',
          password: '123456',
        });
      
      const { body: { id } } = request;
      userId = id;

      const { body } = await chai.request(server)
        .post('/api/login')
        .send({
          email: 'kiko@gmail.com',
          password: '123456',
        });

      const { token } = body;

      await chai.request(server)
        .post('/api/tasks')
        .set({ 'Authorization': token })
        .send({
          task: 'Correr em circulo ate cair',
        });

      await chai.request(server)
        .post('/api/tasks')
        .set({ 'Authorization': token })
        .send({
          task: 'Plantar bananeira',
        });;

      response = await chai.request(server)
        .get('/api/tasks/userId')
        .set({ 'Authorization': token });
    });

    it('Propriedade "id"', () => {
      expect(response.body).to.be.an('array');
      expect(response.body[1]).to.be.an('object');
      expect(response.body[1]._id).to.be.an('string');
      expect(response).to.have.status(200);
    });
    it('Propriedade "name"', () => {
      expect(response.body[0].task).to.be.equal('Correr em circulo ate cair');
      expect(response.body[1].task).to.be.equal('Plantar bananeira');
    });
    it('Propriedade "email"', () => {
      expect(response.body[0].userId).to.be.equal(userId);
      expect(response.body[1].userId).to.be.equal(userId);
    });
  });

  describe('Erro ao cadastrar sem estar logado', () => {
    let response: ReturnMessageError;

    before(async () => {
      response = await chai.request(server)
        .post('/api/tasks')
        .send({
          task: 'correr',
        });
    });

    it('Nao cadastrar um Usuario com mesmo "email"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body.message).to.be.equal('Token invalid!');
      expect(response).to.have.status(401);
    });
  });

  describe('Erro ao cadastrar sem passar campo "task"', () => {
    let response: ReturnMessageError;

    before(async () => {
      await chai.request(server)
        .post('/api/users')
        .send({
          name: 'Senhor Madruga',
          email: 'madruga@gmail.com',
          password: '123456'
        });
      
      const { body: { token } } = await chai.request(server)
        .post('/api/login')
        .send({
          email: 'madruga@gmail.com',
          password: '123456'
        })

      response = await chai.request(server)
        .post('/api/tasks')
        .set({ 'Authorization': token })
        .send({});
    });

    it('Nao cadastrar um Usuario com campos incorretor/incompletos', () => {
      expect(response.body).to.be.an('object');
      expect(response.body.message).to.be.equal('Invalid entries!');
      expect(response).to.have.status(400);
    });
  });
});