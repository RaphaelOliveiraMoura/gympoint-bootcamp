import React, { useState, useEffect } from 'react';
import { Form } from '@rocketseat/unform';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  Container,
  ContentHeader,
  AddButton,
  FilterInput,
  Table,
  EditButton,
  DeleteButton,
  EmptyContainer,
} from './styles';

import ConfirmDialog from '~/components/ConfirmDialog';
import Pagination from '~/components/Pagination';

import api from '~/services/api';
import history from '~/services/history';

export default function Students() {
  const [students, setStudents] = useState([]);

  const [filter, setFilter] = useState('');
  const [pages, setPages] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogParams, setDialogParams] = useState({});

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('/students', {
        params: {
          page: currentPage,
          per_page: 7,
          q: filter,
        },
      });
      setStudents(response.data);
      setPages(Number(response.headers.total_pages));
    }

    loadStudents();
  }, [currentPage, filter]);

  async function handleFilterSubmit({ filter: filterForm }) {
    setFilter(filterForm);
  }

  async function deleteUser({ id }) {
    try {
      await api.delete(`/students/${id}`);
      setStudents(students.filter(student => student.id !== id));
      toast.success('Aluno deletado com sucesso');
    } catch (error) {
      toast.error('Erro ao deletar aluno');
    }
  }

  async function handleDelete(student) {
    setDialogOpen(true);
    setDialogParams({
      student,
      description: `Tem certeza que deseja apagar o aluno ${student.name} ?`,
    });
  }

  return (
    <Container>
      <ContentHeader>
        <h1>Gerenciando alunos</h1>
        <div className="options">
          <Link to="/students/create">
            <AddButton>CADASTRAR</AddButton>
          </Link>
          <Form onSubmit={handleFilterSubmit}>
            <FilterInput name="filter" placeholder="Buscar aluno" />
          </Form>
        </div>
      </ContentHeader>
      {students.length > 0 ? (
        <>
          <Table>
            <thead>
              <tr>
                <th>NOME</th>
                <th>EMAIL</th>
                <th>IDADE</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {students.map(student => (
                <tr key={String(student.id)}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>
                    <div className="options">
                      <EditButton
                        type="button"
                        onClick={() => history.push(`/students/${student.id}`)}
                      >
                        editar
                      </EditButton>
                      <DeleteButton
                        type="button"
                        onClick={() => handleDelete(student)}
                      >
                        apagar
                      </DeleteButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <ConfirmDialog
            opened={dialogOpen}
            title="Apagar aluno"
            onConfirm={deleteUser}
            onConfirmParams={dialogParams}
          />
          <Pagination
            pages={pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </>
      ) : (
        <EmptyContainer>Nenhum aluno encontrado</EmptyContainer>
      )}
    </Container>
  );
}