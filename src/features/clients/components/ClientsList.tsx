import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { FaUserPlus } from 'react-icons/fa';
import { FaEdit, FaTrash } from 'react-icons/fa';
import useClients from '../hooks/useClients';
import Modal from '../../../components/modal';
import { useState } from 'react';
import ClientForm from './modalAddClient';
import { Client, ClientWithId } from '../types/client';
import ConfirmAction from '../../../components/confirmAction';
import ClientEditForm from './modalEditClient';


export default function ClientList() {

 const {clients, addClient, deleteClient,editClient} = useClients()
 const [isOpen, setIsOpen] = useState(false);  //para abrir modal de agregar cliente
 const [isOpenDelete, setIsOpenDelete] = useState(false); //para abrir modal de eliminar cliente
 const [isOpenEdit, setIsOpenEdit] = useState(false); //para abrir modal de editar cliente
 
  const handleEdit = (client: ClientWithId) => {
    console.log(`Editando el cliente con id: ${client.id}`);
    editClient(client);
    setIsOpenEdit(false);
  };

  const handleDelete = (id: number) => {
    console.log(`Eliminando el cliente con id: ${id}`);
    deleteClient(id);    
    setIsOpenDelete(false); 

  };

  const handleAddClient =  (client: Client) => {
      addClient(client); // Llama a tu API o slice de Redux
      setIsOpen(false); // Cierra el modal
};


  return (
    

    <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Lista de Clientes</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gray-500 hover:bg-gray-700 text-black font-bold py-2 px-4 rounded flex items-center gap-2 mb-6"
        >
          Agregar Cliente <FaUserPlus />
        </button>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <ClientForm onSubmit={handleAddClient} />
            </Modal>

      <TableContainer component={Paper}>
        <Table> 
        <TableHead className="text-center uppercase">
  <TableRow>
    <TableCell sx={{ fontWeight: 'bold' }}>Codigo</TableCell>
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
                      onClick={() => setIsOpenEdit(true)} 
                      className="text-blue-500 hover:text-blue-700 transition-all"
                      >
                  <FaEdit />
                  </IconButton>
                  <Modal isOpen={isOpenEdit} onClose={() => setIsOpenEdit(false)}>
                  |   <ClientEditForm                                
                                onSubmit={(updatedClient) => {
                                    handleEdit(updatedClient);
                                }}
                                client={row}/>
                  </Modal>
                </TableCell>

                <TableCell>
                <IconButton 
                      onClick={() => setIsOpenDelete(true)} 
                      className="text-red-500 hover:text-red-700 transition-all"
                >
                <FaTrash />
                </IconButton>
                <Modal isOpen={isOpenDelete} onClose={() => setIsOpenDelete(false)}>
                  |<ConfirmAction
                        onConfirm={() => {
                            handleDelete(row.id);
                        }}
                        onCancel={() => setIsOpenDelete(false)} // Cierra el modal al cancelar
                    />                
                  </Modal>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
