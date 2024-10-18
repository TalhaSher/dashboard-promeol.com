import { Box, Button, Link, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

export function PostView() {
  const [title, setTitle] = useState('');
  const [htmlContent, setHtmlContent] = useState<string>('');

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }], // Headers
      ['bold', 'italic', 'underline', 'strike'], // Text styles
      [{ color: [] }, { background: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }], // Text alignment
      ['link', 'image', 'blockquote', 'code-block'],
      ['clean'],
    ],
  };

  const handleContentChange = (html: string) => {
    setHtmlContent(html);
    console.log('HTML Content from Editor:', html);
  };

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Blog
        </Typography>
        <Link href="/blog/new-post">
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mingcute:send-line" />}
          >
            Publish
          </Button>
        </Link>
      </Box>

      <Box alignItems="center" sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          sx={{ mb: 2 }} // Margin for spacing
        />

        {/* Use ReactQuill for the rich text editor */}
        <ReactQuill
          value={htmlContent}
          onChange={handleContentChange}
          modules={modules}
          style={{
            height: '300px', // Fixed height for consistency
            marginTop: '20px', // Margin for spacing
            borderRadius: '4px', // Rounded corners
          }}
        />
      </Box>

      {/* Preview section for HTML content */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Preview:</Typography>
        <Box
          sx={{
            border: '1px solid #ccc',
            borderRadius: 1,
            padding: 2,
            backgroundColor: '#f9f9f9',
            minHeight: '200px', // Adjust as needed
            overflowY: 'auto', // Allow scrolling if content exceeds height
          }}
          // Set the inner HTML of the preview with styles
          dangerouslySetInnerHTML={{ __html: htmlContent }} // Render HTML content
        />
      </Box>
    </DashboardContent>
  );
}
