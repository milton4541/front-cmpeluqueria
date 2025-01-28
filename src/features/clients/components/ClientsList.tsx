import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { FaUserPlus } from 'react-icons/fa';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useClients from '../hooks/useClients';

export default function ClientList() {

 const {clients} = useClients()
 
  const handleEdit = (id: number) => {
    console.log(`Editando el cliente con id: ${id}`);
    // Lógica para editar
  };

  const handleDelete = (id: number) => {
    console.log(`Eliminando el cliente con id: ${id}`);
    // Lógica para eliminar
  };

  const agregarCliente = () => {
    console.log('Agregando un cliente');
    // Lógica para agregar un cliente
  };

  return (
    

    <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Lista de Clientes</h2>
        <button
  onClick={agregarCliente}
  className="bg-gray-500 hover:bg-gray-700 text-black font-bold py-2 px-4 rounded flex items-center gap-2 mb-6"
>
  Agregar Cliente <FaUserPlus />
</button>

      <TableContainer component={Paper}>
        <Table>
        <TableHead className="text-center uppercase">
  <TableRow>
    <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Nombre</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Apellido</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Teléfono</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Editar</TableCell>
    <TableCell sx={{ fontWeight: 'bold' }}>Eliminar</TableCell>
  </TableRow>
</TableHead>
          <TableBody className='text-center'>
            {clients.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.last_name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>
                <IconButton 
                    onClick={() => handleEdit(row.id)} 
                    className="text-blue-500 hover:text-blue-700 transition-all"
                    >
                <FaEdit />
                </IconButton>

                </TableCell>

                <TableCell>

                <IconButton 
                onClick={() => handleDelete(row.id)} 
                className="text-red-500 hover:text-red-700 transition-all"
                >
                <FaTrash />
                </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
