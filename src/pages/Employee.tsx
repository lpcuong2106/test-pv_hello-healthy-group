import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Pagination from "../components/Pagination";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import qs from "qs";
import "bootstrap/dist/css/bootstrap.min.css";

const EmployeeSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  position: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Required"),
});

interface IEmployee {
  id: number;
  name: string;
  email: string;
  position: string;
}

const Employee = () => {
  const [dataE, setData] = useState<IEmployee[]>([]);
  const history = useHistory();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: 0,
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      position: "",
    },
    onSubmit: async (values) => {
      handleClose();
      const { data: result }: { data: IEmployee } = await axios({
        method: "POST",
        url: "https://609be9c42b549f00176e4ae6.mockapi.io/api/employee",
        data: values,
      });
      if (result) {
        setData([...dataE, result]);
        alert(`Add successfully #${result.id}`);
      }
    },
    validationSchema: EmployeeSchema,
  });

  const handlePageChange = (newPage: number) => {
    setPagination({
      ...pagination,
      page: newPage,
    });
    history.push({
      search: `page=${newPage}`,
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const { data: result } = await axios({
          url: "https://609be9c42b549f00176e4ae6.mockapi.io/api/employee",
        });

        if (result.data.length > 0) {
          let pageCurrent: number =
            parseInt(
              //   @ts-ignore
              qs
                .parse(history.location.search.replace("?", ""))
                .page?.toString()
            ) || 1;

          setPagination({
            ...pagination,
            page: pageCurrent,
            total: result.pagination.total,
          });
        }
      } catch (e) {
        alert(`Error fetch data: ${e}`);
        return;
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data: result } = await axios({
          url: "https://609be9c42b549f00176e4ae6.mockapi.io/api/employee",
          params: {
            page: pagination.page,
            limit: pagination.limit,
          },
        });
        if (result.data.length > 0) {
          setData(result.data);
        }
      } catch (e) {
        alert(`Error fetch data: ${e}`);
        return;
      }
    })();
  }, [pagination]);

  return (
    <div className="App">
      <div>
        <h2>Employee</h2>
        <table className="tableEmployee">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            {dataE.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} onClick={handleShow}>
                + New
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Form onSubmit={formik.handleSubmit}>
          <Modal.Header closeButton={false}>
            <Modal.Title>Add Employee</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicName">
              <Form.Label>FullName</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter text"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.errors?.name && formik.touched.name ? (
                <div>{formik.errors.name}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.errors?.email && formik.touched.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicPosition">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                placeholder="Enter text"
                onChange={formik.handleChange}
                value={formik.values.position}
              />
              {formik.errors?.position && formik.touched.position ? (
                <div>{formik.errors.position}</div>
              ) : null}
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" disabled={!(formik.isValid && formik.dirty)}>
              Add New
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
};
export default Employee;
