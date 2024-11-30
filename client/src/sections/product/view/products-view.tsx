import { useState, useCallback, useEffect } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { _products } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';
import { Iconify } from 'src/components/iconify';
import { ProductItem } from '../product-item';
import { CartIcon } from '../product-cart-widget';
import { ProductFilters } from '../product-filters';
import NewProductForm from '../new-product-form';
import axios from 'axios';
import toast from 'react-hot-toast';

const defaultFilters = {
  price: '',
  gender: ['men'],
  colors: ['#FF4842'],
  rating: 'up4Star',
  category: 'all',
};

export function ProductsView() {
  const [openModal, setOpenModal] = useState(false);

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/getProducts');
      setProducts(response.data.products);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = (newProduct: any) => {
    axios
      .post('/addProduct', newProduct)
      .then((res) => {
        console.log(res.data.message);
        toast.success('Product added successfully!');
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        toast.error('Failed to add product. Please try again.');
      });

    setOpenModal(false); // Close the modal after adding
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Products
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={() => setOpenModal(true)}
        >
          Add product
        </Button>
      </Box>

      <Grid container spacing={3}>
        {products.map((product) => (
          <Grid key={product.productName} xs={12} sm={6} md={3}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>

      <Pagination count={10} color="primary" sx={{ mt: 8, mx: 'auto' }} />

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            p: 3,
            bgcolor: 'background.paper',
            borderRadius: 2,
            maxWidth: 800,
            margin: 'auto',
            mt: '5%',
            boxShadow: 24,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Add New Product
          </Typography>
          <NewProductForm onAddProduct={handleAddProduct} />
        </Box>
      </Modal>
    </DashboardContent>
  );
}
