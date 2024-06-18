import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import app from '../app'; // Assurez-vous que le chemin vers votre application Express est correct
import Product from '../models/product';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productAdminController';

chai.use(chaiHttp);
const { expect } = chai;

describe('Product Admin Controller', () => {
  beforeEach(() => {
    sinon.restore(); // Restaure les stubs et mocks après chaque test
  });

  it('should fetch all products', async () => {
    const products = [{ Id_Produit: 1, Titre: 'Product 1' }];
    sinon.stub(Product, 'findAll').resolves(products);

    const res = await chai.request(app).get('/api/admin/products');

    expect(res).to.have.status(200);
    expect(res.body).to.eql(products);
    expect(Product.findAll.calledOnce).to.be.true;
  });

  it('should create a new product', async () => {
    const newProduct = {
      Titre: 'New Product',
      Description: 'Description',
      Image: 'image.png',
      Prix: 100,
      old_price: 80,
      Id_CategorieProduit: 1,
      isNewCollection: false
    };
    sinon.stub(Product, 'create').resolves(newProduct);

    const res = await chai.request(app).post('/api/admin/products').send(newProduct);

    expect(res).to.have.status(201);
    expect(res.body).to.eql(newProduct);
    expect(Product.create.calledOnceWith(newProduct)).to.be.true;
  });

  it('should update an existing product', async () => {
    const updatedProduct = {
      Id_Produit: 1,
      Titre: 'Updated Product',
      Description: 'Updated Description',
      Image: 'updated_image.png',
      Prix: 150,
      old_price: 100,
      Id_CategorieProduit: 1,
      isNewCollection: false
    };
    sinon.stub(Product, 'update').resolves([1]);
    sinon.stub(Product, 'findByPk').resolves(updatedProduct);

    const res = await chai.request(app).put('/api/admin/products/1').send(updatedProduct);

    expect(res).to.have.status(200);
    expect(res.body).to.eql(updatedProduct);
    expect(Product.update.calledOnceWith(updatedProduct, { where: { Id_Produit: '1' } })).to.be.true;
    expect(Product.findByPk.calledOnceWith('1')).to.be.true;
  });

  it('should delete a product', async () => {
    sinon.stub(Product, 'destroy').resolves(1);

    const res = await chai.request(app).delete('/api/admin/products/1');

    expect(res).to.have.status(204);
    expect(Product.destroy.calledOnceWith({ where: { Id_Produit: '1' } })).to.be.true;
  });

  it('should return 404 if product to delete is not found', async () => {
    sinon.stub(Product, 'destroy').resolves(0);

    const res = await chai.request(app).delete('/api/admin/products/1');

    expect(res).to.have.status(404);
    expect(res.body).to.eql({ message: 'Produit non trouvé' });
  });

  it('should return 404 if product to update is not found', async () => {
    sinon.stub(Product, 'update').resolves([0]);

    const res = await chai.request(app).put('/api/admin/products/1').send({ Titre: 'Nonexistent Product' });

    expect(res).to.have.status(404);
    expect(res.body).to.eql({ message: 'Produit non trouvé' });
  });
});
