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

export type ProductItemProps = {
  id: string;
  name: string;
  price: number;
  status: string;
  coverUrl: string;
  colors: string[];
  priceSale: number | null;
};
const dummy = {
  productName: 'Super Widget',
  status: 'prod',
  description1:
    'The Super Widget is a revolutionary product that streamlines your workflow and increases productivity.',
  description2:
    'Designed with user experience in mind, the Super Widget integrates seamlessly with existing systems.',
  technicalInfo:
    'Specifications: \n - Weight: 1.2 kg \n - Dimensions: 15x10x5 cm \n - Compatible with: Windows, Mac, Linux',
  youtubeLink: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
};

export function ProductItem({ product }: { product: ProductItemProps }) {
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

  const renderImg = (
    <Box
      component="img"
      alt={product.name}
      src={product.coverUrl}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {product.priceSale && fCurrency(product.priceSale)}
      </Typography>
      &nbsp;
      {fCurrency(product.price)}
    </Typography>
  );

  return (
    <>
      <Card onClick={handleOpen} sx={{ cursor: 'pointer' }}>
        <Box sx={{ pt: '100%', position: 'relative' }}>
          {product.status && renderStatus}
          {renderImg}
        </Box>

        <Stack spacing={2} sx={{ p: 3 }}>
          <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
            {product.name}
          </Link>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <ColorPreview colors={product.colors} />
            {renderPrice}
          </Box>
        </Stack>
      </Card>

      <ProductModal open={modalOpen} onClose={handleClose} product={dummy} />
    </>
  );
}
