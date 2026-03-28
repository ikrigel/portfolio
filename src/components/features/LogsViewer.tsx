import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Stack,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Container,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import GetAppIcon from '@mui/icons-material/GetApp';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import type { LogLevel, LogEntry } from '@/types';
import { useLogger } from '@/hooks/useLogger';

const LOG_LEVELS: LogLevel[] = ['verbose', 'info', 'error'];
const LEVEL_COLORS: Record<Exclude<LogLevel, 'none'>, 'default' | 'warning' | 'error'> = {
  verbose: 'default',
  info: 'default',
  error: 'error',
};

export function LogsViewer() {
  const { getLogs, clearLogs, exportLogs, deleteLog, exportLog } = useLogger();
  const [filter, setFilter] = useState<LogLevel | 'all'>('all');
  const [search, setSearch] = useState('');
  const [clearDialogOpen, setClearDialogOpen] = useState(false);
  const [deleteLogId, setDeleteLogId] = useState<string | null>(null);

  const allLogs = getLogs();

  const filteredLogs = useMemo(() => {
    return allLogs.filter((log) => {
      const matchesLevel = filter === 'all' || log.level === filter;
      const matchesSearch =
        search === '' ||
        log.action.toLowerCase().includes(search.toLowerCase()) ||
        (log.details && log.details.toLowerCase().includes(search.toLowerCase()));

      return matchesLevel && matchesSearch;
    });
  }, [allLogs, filter, search]);

  const handleClearConfirm = () => {
    clearLogs();
    setClearDialogOpen(false);
  };

  const handleDeleteLog = () => {
    if (deleteLogId) {
      deleteLog(deleteLogId);
      setDeleteLogId(null);
    }
  };

  const handleExportLog = (log: LogEntry) => {
    exportLog(log.id);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        Event Logs
      </Typography>

      <Paper
        sx={{
          p: 2,
          mb: 2,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          alignItems: { xs: 'stretch', md: 'center' },
          justifyContent: 'space-between',
        }}
      >
        <Stack direction="row" spacing={1} sx={{ flex: 1 }}>
          <Chip
            label="All"
            onClick={() => setFilter('all')}
            color={filter === 'all' ? 'primary' : 'default'}
            variant={filter === 'all' ? 'filled' : 'outlined'}
          />
          {LOG_LEVELS.map((level) => (
            <Chip
              key={level}
              label={level.charAt(0).toUpperCase() + level.slice(1)}
              onClick={() => setFilter(level)}
              color={filter === level ? 'primary' : 'default'}
              variant={filter === level ? 'filled' : 'outlined'}
            />
          ))}
        </Stack>

        <Stack direction="row" spacing={1}>
          <Button
            startIcon={<GetAppIcon />}
            onClick={exportLogs}
            variant="outlined"
            size="small"
          >
            Export
          </Button>
          <Button
            startIcon={<DeleteIcon />}
            onClick={() => setClearDialogOpen(true)}
            variant="outlined"
            color="error"
            size="small"
          >
            Clear
          </Button>
        </Stack>
      </Paper>

      <TextField
        label="Search logs..."
        variant="outlined"
        fullWidth
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'action.hover' }}>
              <TableCell>Time</TableCell>
              <TableCell>Level</TableCell>
              <TableCell>Action</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Page</TableCell>
              <TableCell align="right" sx={{ width: 100 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <TableRow key={log.id} hover>
                  <TableCell sx={{ fontSize: '0.85rem' }}>
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={log.level}
                      size="small"
                      color={LEVEL_COLORS[log.level] as any}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.9rem', fontWeight: 500 }}>
                    {log.action}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.85rem', color: 'text.secondary' }}>
                    {log.details || '-'}
                  </TableCell>
                  <TableCell sx={{ fontSize: '0.85rem' }}>{log.page}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} sx={{ justifyContent: 'flex-end' }}>
                      <Tooltip title="Export">
                        <IconButton
                          size="small"
                          onClick={() => handleExportLog(log)}
                          sx={{ color: 'primary.main' }}
                        >
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          size="small"
                          onClick={() => setDeleteLogId(log.id)}
                          sx={{ color: 'error.main' }}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                  No logs found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={clearDialogOpen}
        onClose={() => setClearDialogOpen(false)}
      >
        <DialogTitle>Clear all logs?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. All logs will be permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClearDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleClearConfirm} color="error" variant="contained">
            Clear All
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteLogId !== null}
        onClose={() => setDeleteLogId(null)}
      >
        <DialogTitle>Delete log entry?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This action cannot be undone. The log entry will be permanently deleted.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteLogId(null)}>Cancel</Button>
          <Button onClick={handleDeleteLog} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
