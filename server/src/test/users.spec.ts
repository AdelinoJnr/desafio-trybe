import { MongoClient } from 'mongodb';
import sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import getConnection from './mocks/connectionMock';
import server from '../api';

chai.use(chaiHttp);

interface ReturnBodyCreate {
  body: {
    id: string,
    name: string,
    email: string,
  }
}

interface ReturnById {
  body: {
    _id: string,
    name: string,
    email: string,
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
    name: string,
    email: string,
    password: string
  }>;
}

describe('2 - endpoint api/users', () => {
  before(async () => {
    const connectionMock = await getConnection();

    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });
  after(async () => {
    (MongoClient as any).connect.restore();
  });

  describe('Criação de Usuario', () => {
    let response: ReturnBodyCreate;

    before(async () => {
      response = await chai.request(server)
        .post('/api/users')
        .send({
          name: 'Adelino Junior',
          email: 'adelinojunior@gmail.com',
          password: '123456',
        });
    });

    it('Propriedade "id"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body.id).to.be.an('string');
      expect(response).to.have.status(201);
    });
    it('Propriedade "name"', () => {
      expect(response.body.name).to.be.equal('Adelino Junior');
    });
    it('Propriedade "email"', () => {
      expect(response.body.email).to.be.equal('adelinojunior@gmail.com');
    });
  });

  describe('Busca por todos Usuarios', () => {
    let response: ReturnAllUsers;

    before(async () => {
      await chai.request(server)
        .post('/api/users')
        .send({
          name: 'Irineu',
          email: 'irineu@gmail.com',
          password: '123456',
        });

      response = await chai.request(server)
        .get('/api/users');
    });

    it('Propriedade "id"', () => {
      expect(response.body).to.be.an('array');
      expect(response.body[1]).to.be.an('object');
      expect(response.body[1]._id).to.be.an('string');
      expect(response).to.have.status(200);
    });
    it('Propriedade "name"', () => {
      expect(response.body[0].name).to.be.equal('Chaves');
      expect(response.body[1].name).to.be.equal('Kiko');
      expect(response.body[2].name).to.be.equal('Senhor Madruga');
      expect(response.body[3].name).to.be.equal('Adelino Junior');
      expect(response.body[4].name).to.be.equal('Irineu');
    });
    it('Propriedade "email"', () => {
      expect(response.body[0].email).to.be.equal('chaves@gmail.com');
      expect(response.body[1].email).to.be.equal('kiko@gmail.com');
      expect(response.body[2].email).to.be.equal('madruga@gmail.com');
      expect(response.body[3].email).to.be.equal('adelinojunior@gmail.com');
      expect(response.body[4].email).to.be.equal('irineu@gmail.com');
    });
  });
  describe('Busca por Usuarios pelo "id"', () => {
    let response: ReturnById;

    before(async () => {
      const request = await chai.request(server)
        .post('/api/users')
        .send({
          name: 'Selena Gomez',
          email: 'selenagomez@gmail.com',
          password: '123456',
        });
        

      const { body: { id } } = request;
      response = await chai.request(server)
        .get(`/api/users/${id}`);
    });

    it('Propriedade "id"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body._id).to.be.an('string');
      expect(response).to.have.status(200);
    });
    it('Propriedade "name"', () => {
      expect(response.body.name).to.be.equal('Selena Gomez');
    });
    it('Propriedade "email"', () => {
      expect(response.body.email).to.be.equal('selenagomez@gmail.com');
    });
  });
  describe('Erro ao cadastrar com mesmo email', () => {
    let response: ReturnMessageError;

    before(async () => {
      response = await chai.request(server)
        .post('/api/users')
        .send({
          name: 'Selena Gomez',
          email: 'selenagomez@gmail.com',
          password: '123456',
        });
    });

    it('Nao cadastrar um Usuario com mesmo "email"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body.message).to.be.equal('User alrealy exist!');
      expect(response).to.have.status(400);
    });
  });

  describe('Erro ao cadastrar sem campos necessario', () => {
    let response: ReturnMessageError;

    before(async () => {
      response = await chai.request(server)
        .post('/api/users')
        .send({
          names: 'Selena Gomez',
          email: 'selenagomez@gmail.com',
        });
    });

    it('Nao cadastrar um Usuario com campos incorretor/incompletos', () => {
      expect(response.body).to.be.an('object');
      expect(response.body.message).to.be.equal('Invalid entries!');
      expect(response).to.have.status(400);
    });
  });

  describe('Erro ao cadastrar sem passar o "body"', () => {
    let response: ReturnMessageError;

    before(async () => {
      response = await chai.request(server)
        .post('/api/users')
        .send({});
    });

    it('Nao cadastrar um Usuario sem o "Body"', () => {
      expect(response.body).to.be.an('object');
      expect(response.body.message).to.be.equal('Invalid entries!');
      expect(response).to.have.status(400);
    });
  });

  describe('Erro em buscar um usuario', () => {
    let response: ReturnMessageError;

    before(async () => {
      response = await chai.request(server)
        .get('/api/users/9999');
    });

    it('Nao é possivel encontrar com um id invalido ou inexistente', () => {
      expect(response.body).to.be.an('object');
      expect(response.body.message).to.be.equal('User not found!');
      expect(response).to.have.status(404);
    });
  });
});
