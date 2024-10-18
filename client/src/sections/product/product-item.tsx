import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { fCurrency } from 'src/utils/format-number';
import { Label } from 'src/components/label';
import { ColorPreview } from 'src/components/color-utils';
import ProductModal from './product-modal';

export interface Product {
  productName: string; // Name of the product
  status: string; // Status of the product, restricted to specific values
  description1: string; // First description paragraph
  description2: string; // Second description paragraph
  technicalInfo: string; // Technical specifications of the product
  youtubeLink: string; // Link to a YouTube video related to the product
}

export function ProductItem({ product }: { product: Product }) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const renderStatus = (
    <Label
      variant="inverted"
      color={(product.status === 'sale' && 'error') || 'info'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {product.status}
    </Label>
  );

  const renderVideo = (
    
      <iframe
        src={product.youtubeLink.replace("watch?v=", "embed/")}
        title={product.productName}
        frameBorder="0"
        allowFullScreen
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      {/* Assuming price and priceSale are properties of Product, you can modify accordingly */}
      {/* <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {product.priceSale && fCurrency(product.priceSale)}
      </Typography>
      &nbsp; */}
    </Typography>
  );

  return (
    <>
      <Card onClick={handleOpen} sx={{ cursor: 'pointer' }}>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          {product.status && renderStatus}
          {renderVideo} {/* Display the embedded video here */}
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
            {product.productName}
          </Link>
          
        </Stack>
      </Card>

      <ProductModal open={modalOpen} onClose={handleClose} product={product} />
    </>
  );
}
