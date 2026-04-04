import {
    Box, Typography, List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
    IconButton,
} from "@mui/material";
import { useRef, useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';

// ---- File Upload Zone Component ----
interface FileUploadZoneProps {
    label: string;
    multiple?: boolean;
    files: File[];
    onFilesChange: (files: File[]) => void;
    accept?: string;
    error?: boolean;
    helperText?: string;
}

const FileUpload: React.FC<FileUploadZoneProps> = ({
    label,
    multiple = false,
    files,
    onFilesChange,
    accept = '*',
    error = false,
    helperText = '',
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragging, setDragging] = useState(false);

    const addFiles = (incoming: FileList | null) => {
        if (!incoming) return;
        const newFiles = Array.from(incoming);
        onFilesChange(multiple ? [...files, ...newFiles] : [newFiles[0]]);
    };

    const removeFile = (index: number) => {
        onFilesChange(files.filter((_, i) => i !== index));
    };

    const formatSize = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    return (
        <Box>
            <Typography variant="body2" fontWeight={600} color="text.secondary" sx={{ mb: 0.5, fontSize: 12 }}>
                {label}
            </Typography>

            {/* Drop Zone */}
            <Box
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragging(false);
                    addFiles(e.dataTransfer.files);
                }}
                sx={{
                    border: '2px dashed',
                    borderColor: error ? 'error.main' : (dragging ? 'primary.main' : 'divider'),
                    borderRadius: 1.5,
                    p: 1,
                    textAlign: 'center',
                    cursor: 'pointer',
                    bgcolor: dragging ? 'action.hover' : 'background.default',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                        borderColor: error ? 'error.main' : 'primary.main',
                        bgcolor: 'action.hover',
                    },
                }}
            >
                <CloudUploadIcon sx={{ fontSize: 20, color: 'primary.main', mb: 0.25 }} />
                <Typography variant="body2" fontWeight={600} sx={{ fontSize: 12 }}>
                    Click to browse or drag & drop
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10 }}>
                    {multiple ? 'Multiple files supported' : 'Single file only'}
                </Typography>
                <input
                    ref={inputRef}
                    type="file"
                    multiple={multiple}
                    accept={accept}
                    style={{ display: 'none' }}
                    onChange={(e) => addFiles(e.target.files)}
                />
            </Box>

            {error && helperText && (
                <Typography variant="caption" color="error" sx={{ display: 'block', mt: 0.5, px: 0.5 }}>
                    {helperText}
                </Typography>
            )}

            {/* File List */}
            {files.length > 0 && (
                <List dense sx={{ mt: 0.5 }}>
                    {files.map((file, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                border: '1px solid',
                                borderColor: 'divider',
                                borderRadius: 1,
                                mb: 0.5,
                                py: 0.25,
                                bgcolor: 'background.paper',
                                pr: 1,
                            }}
                            secondaryAction={
                                <Tooltip title="Remove">
                                    <IconButton edge="end" size="small" onClick={() => removeFile(index)} color="error" sx={{ padding: 0.25 }}>
                                        <DeleteIcon sx={{ fontSize: 16 }} />
                                    </IconButton>
                                </Tooltip>
                            }
                        >
                            <ListItemIcon sx={{ minWidth: 28 }}>
                                <InsertDriveFileIcon color="primary" sx={{ fontSize: 16 }} />
                            </ListItemIcon>
                            <ListItemText
                                primary={
                                    <Typography variant="body2" fontWeight={600} noWrap sx={{ maxWidth: 260, fontSize: 12, lineHeight: 1.2 }}>
                                        {file.name}
                                    </Typography>
                                }
                                secondary={
                                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: 10, lineHeight: 1.2 }}>
                                        {formatSize(file.size)}
                                    </Typography>
                                }
                                sx={{ my: 0 }}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default FileUpload;