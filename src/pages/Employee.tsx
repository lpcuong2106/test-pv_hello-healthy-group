import axios from "axios";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import Pagination from "../components/Pagination";

interface IEmployee {
  name: string;
  gmail: string;
  position: string;
}

const Employee = () => {
  const [data, setData] = useState<IEmployee[]>([]);
  const history = useHistory();
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: 0,
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
      const { data: result } = await axios({
        url: "https://609be9c42b549f00176e4ae6.mockapi.io/api/employee",
      });

      if (result.data.length > 0) {
        setPagination({
          ...pagination,
          total: result.pagination.total,
        });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
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
            {data.map((employee, index) => (
              <tr key={index}>
                <td>{employee.name}</td>
                <td>{employee.gmail}</td>
                <td>{employee.position}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>+ New</td>
            </tr>
          </tfoot>
        </table>
      </div>
      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </div>
  );
};
export default Employee;
