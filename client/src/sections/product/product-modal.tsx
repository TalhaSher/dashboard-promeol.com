import React from 'react';
import { Modal, Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Iconify } from 'src/components/iconify';

interface ProductModalProps {
  open: boolean;
  onClose: () => void;
  product: {
    productName: string;
    status: string;
    description1: string;
    description2: string;
    technicalInfo: string;
    youtubeLink: string;
  };
}

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, product }) => (
  <Modal open={open} onClose={onClose}>
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '80%',
        maxWidth: 800,
        bgcolor: 'background.paper',
        boxShadow: 24,
        borderRadius: 2,
        overflow: 'hidden', // Hide overflow for rounded corners
      }}
    >
      <Box
        sx={{
          height: '80vh', // Fixed height
          overflowY: 'auto', // Enable vertical scrolling
          p: 2,
        }}
      >
        {/* Product Information Section */}
        <Typography variant="h6" component="h2" gutterBottom>
          {product.productName}
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Status:</strong> {product.status}
        </Typography>
        {/* Video Section */}

        <Box
          sx={{
            width: '100%',
            height: 0,
            paddingBottom: '56.25%', // 16:9 aspect ratio
            position: 'relative',
            mb: 2, // Margin below the video
          }}
        >
          <iframe
            src={product.youtubeLink.replace('watch?v=', 'embed/')}
            title="YouTube video"
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
        </Box>

        <List>
          <ListItem>
            <ListItemIcon>
              <Iconify icon="ic:outline-description" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Description" secondary={product.description1} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Iconify icon="ic:baseline-info" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Additional Info" secondary={product.description2} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <Iconify icon="ic:baseline-settings" width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Technical Info" secondary={product.technicalInfo} />
          </ListItem>
        </List>
      </Box>
    </Box>
  </Modal>
);

export default ProductModal;
