
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { borderRadius } from '@mui/system';



export default function UserDonationsTable({ donations }) {
    return (
        <ThemeProvider theme={tableTheme}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Category</TableCell>
                            <TableCell>Condition</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {donations.map((donObj) => {
                            return (
                                <TableRow key={donObj.id}>
                                    <TableCell>{donObj.title}</TableCell>
                                    <TableCell>{donObj.category}</TableCell>
                                    <TableCell>{donObj.condition}</TableCell>
                                    <TableCell>{donObj.description}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Edit">
                                            <IconButton className="text-sky-400 hover:text-orange-300">
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton className="text-sky-400 hover:text-rose-400 text-xs md:text-base">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </ThemeProvider>
    )
}


const tableTheme = createTheme({
    palette: {
        primary: {
            main: '#10B981',
        },
        secondary: {
            main: '#065F46',
        },
    },
    components: {
        MuiTableContainer: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fafafa !important',
                    borderRadius: '10px !important',
                    border: '1px solid #ddd !important',
                    padding: '16px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
                    marginTop: '20px',
                },
            },
        },
        MuiTable: {
            styleOverrides: {
                root: {
                    borderCollapse: 'separate',
                    borderSpacing: '0 10px',
                },
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    backgroundColor: '#fafafa',
                },
            },
        },
        MuiTableRow: {
            styleOverrides: {
                root: {
                    // '&:hover': {
                    //     backgroundColor: '#fff', // lighter slate tone for hover
                    //     transition: 'background-color 0.3s ease',
                    // },
                },
                head: {
                    backgroundColor: '#fafafa',
                },
                body: {
                    '&:hover': {
                        backgroundColor: '#353f4f',
                        color: '1e293b',
                        transition: 'background-color 0.3s ease',
                        cursor: 'pointer',
                    },
                }
            },
        },
        MuiTableCell: {
            styleOverrides: {
                head: {
                    fontWeight: 'bold',
                    color: '#022c23',
                    fontSize: '1rem',
                    '&:hover': {
                        backgroundColor: '#353f4f',
                        borderRadius: '10px !important',
                        color: '#33d399',
                        transition: 'background-color 0.3s ease',
                        cursor: 'pointer',
                    },
                },
                body: {
                    fontSize: '0.9rem',
                    color: '#111827',
                    padding: '1px 16px',

                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#353f4f',
                    },
                },
            },
        },
    },
});