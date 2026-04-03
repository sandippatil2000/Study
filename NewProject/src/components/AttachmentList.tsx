import React from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export interface AttachmentListProps {
  label: string;
  files?: string[];
}

const AttachmentList: React.FC<AttachmentListProps> = ({ label, files }) => (
  <Box>
    <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ mb: 1 }}>
      {label}
    </Typography>

    {!files || files.length === 0 ? (
      <Box
        sx={{
          border: '1px dashed',
          borderColor: 'divider',
          borderRadius: 2,
          p: 2,
          textAlign: 'center',
          bgcolor: 'action.hover',
        }}
      >
        <Typography variant="caption" color="text.disabled">
          No file attached
        </Typography>
      </Box>
    ) : (
      <List dense sx={{ mt: 0.5 }}>
        {files.map((name, i) => (
          <ListItem
            key={i}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1.5,
              mb: 0.5,
              bgcolor: 'action.hover',
            }}
          >
            <ListItemIcon sx={{ minWidth: 32 }}>
              <InsertDriveFileIcon fontSize="small" color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" fontWeight={600} noWrap sx={{ maxWidth: 260 }}>
                  {name}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    )}
  </Box>
);

export default AttachmentList;
