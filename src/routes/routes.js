import { Router } from 'express';
import axios from 'axios'; // hace lo mismo que fetch, trae datos desde un enlace
export const router = Router();
import { connection } from '../databaseConnection.js';
import { Afiliado } from '../pruebaDBModels.js';
import { connect } from 'mongoose';
let products = [];
await connection();

const checkProduct = (products, req) => {
  let productFound = products.find((p) => p.id == req.params.id);
  return productFound;
};

router.get('/', (req, res) => {
  res.send('pagina principal');
});

router.get('/pruebaDB', async (req, res) => {
  try {
    const allProducts = await Afiliado.find({ price: 50 });
    res.json(allProducts);
  } catch (error) {
    res.send('no andaaaaaaa');
  }
});


router.get('/editarAfiliado/:id', async(req, res)=>{
  const id = req.params.id
  const afiliado = await Afiliado.findById(id).lean();
  res.render('editarAfiliado.ejs', {afiliado})
  
})

router.post('/editarAfiliado/:id', async(req, res)=>{
  const id = req.params.id;
  await Afiliado.findByIdAndUpdate(id, req.body);
  res.redirect('/formDePrueba')
})

router.get('/eliminarAfiliado/:id', async (req, res)=>{
  await Afiliado.findByIdAndDelete(req.params.id)
  res.redirect('/formDePrueba')
})

router.get('/formDePrueba', async (req, res) => {
  try {
    const afiliados = await Afiliado.find().lean(); // el lean hace que en vez de devolver documentos de mongodb devuelve objetos de js para que funcionen mejor con funciones (en este caso igual anda si se lo sacas)
    res.render('formDePrueba.ejs', {afiliados});
    
  } catch (error) {
    console.log(error)
  }
});

router.post('/agregarAfiliado', async (req, res) => {
  const infoAfiliado = Afiliado(req.body);
  const afiliadoSave = await infoAfiliado.save();
  console.log(afiliadoSave);
  res.send('afiliado agregado');
});

router.get('/leerAfiliados', async (req, res) => {
  try {
    await connection();
    const afi = await Afiliado.find();
    res.json(afi);
  } catch (error) {
    console.log(error);
  }
});

router.get('/products', (req, res) => {
  res.json(products);
});

router.get('/users', (req, res) => {
  const users = [
    { name: 'lucas', age: 26 },
    { name: 'marcos', age: 41 }
  ];
  res.render('index.ejs', { users });
});

router.get('/posts', async (req, res) => {
  const datos = await axios.get('https://jsonplaceholder.typicode.com/posts'); // cuando lees algo de otro lugar siempre es async
  res.render('posts.ejs', { posteos: datos.data });
});

router.get('/productsdb', async (req, res) => {});

router.post('/products', (req, res) => {
  const newProduct = { ...req.body, id: products.length + 1 };
  products.push(newProduct);
  res.send(newProduct);
});

router.put('/products/:id', (req, res) => {
  // para el ejemplo, le pasaria el dato a actualizar mediante el body
  const newData = req.body;
  if (!checkProduct(products, req)) {
    return res.status(404).send('Producto no encontrado');
  }
  products = products.map((p) =>
    p.id == req.params.id ? { ...p, ...newData } : p
  );
  res.send(`Actualizando productos`);
});

router.delete('/products/:id', (req, res) => {
  if (!checkProduct(products, req)) {
    return res.status(404).send('Producto no encontrado');
  }
  products = products.filter((product) => product.id != req.params.id); // filtro dejando los que NO quiero borrar y reemplazo el array products por el array nuevo
  res.json(products);
});

router.get('/products/:id', (req, res) => {
  if (!checkProduct(products, req)) {
    return res.status(404).send('Producto no encontrado');
  }
  res.json(checkProduct(products, req));
});

router.patch('/products/:id', (req, res) => {
  res.send(`Actualizando un producto`);
});
