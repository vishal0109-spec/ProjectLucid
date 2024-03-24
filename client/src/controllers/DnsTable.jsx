import { styled } from "styled-components";
import { Box, Tooltip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ServerApi from "../ServerApi/ServerApi";
import { AppContext } from "./Context/Context";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div``;
const Item = styled.div``;
const Div = styled.div`
  .main-items {
    .tables {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      gap: 1rem;
      padding: 1rem 2rem;

      .table-data {
        font-size: 1.2rem;
      }
      .table-heading{
        font-size: 1.5rem;
        font-weight: 600;
      }
    }
  }
`;
const MainTable = styled.div``;
const TableData = styled.div``;

const DnsTable = () => {
  const { allDnsData, DispatchDns } = useContext(AppContext);
  const [change, setChange] = useState(false);
  const getAllDnsData = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${ServerApi}/api/auth/dns/getAllDnsData`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: `Barear ${token}`,
        },
        credentials: "include",
      });
      const data = await response.json();
      DispatchDns({ type: "GET_RECORD", data });
    } catch (err) {
      console.log(err);
    }
  };
  const deleteDnsData = async (deleteId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${ServerApi}/api/auth/dns/delete/${deleteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token: `Barear ${token}`,
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success === true) {
        toast.success(data.message, {
          autoClose: 2000,
        });
        setChange(!change);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getAllDnsData();
  }, [change]);
  return (
    <Container>
      <Div>
        <Item className="main-items">
          <hr />
          <MainTable className="tables">
            <TableData className="table-data table-heading">Address</TableData>
            <TableData className="table-data table-heading">IP Address</TableData>
            <TableData className="table-data table-heading">cname</TableData>
            <TableData className="table-data table-heading"> Mail Exchange</TableData>
            <TableData className="table-data table-heading">Server Name</TableData>
            <TableData className="table-data table-heading">Pointer</TableData>
            <TableData className="table-data table-heading">Start Of Authority</TableData>
            <TableData className="table-data table-heading">Service</TableData>
            <TableData className="table-data table-heading">Txt</TableData>
            <TableData className="table-data table-heading">Dnssec</TableData>
            <TableData className="table-data table-heading">Edit</TableData>
            <TableData className="table-data table-heading">Delete</TableData>
          </MainTable>
          <hr />
        </Item>

        <Box>
          {allDnsData
            ? allDnsData.map((Ele, index) => {
                return (
                  <Item className="main-items" key={index}>
                    <MainTable className="tables">
                      <TableData className="table-data">
                        {Ele.address}
                      </TableData>
                      <TableData className="table-data">
                        {Ele.ipAddress}
                      </TableData>
                      <TableData className="table-data">{Ele.cname}</TableData>
                      <TableData className="table-data">
                        {Ele.mailExchange}
                      </TableData>
                      <TableData className="table-data">
                        {Ele.serverName}
                      </TableData>
                      <TableData className="table-data">
                        {Ele.pointer}
                      </TableData>
                      <TableData className="table-data">
                        {Ele.startOfAuthority}
                      </TableData>
                      <TableData className="table-data">
                        {Ele.service}
                      </TableData>
                      <TableData className="table-data">{Ele.txt}</TableData>
                      <TableData className="table-data">{Ele.dnssec}</TableData>
                      <Link to={`/edit/${Ele._id}`}>
                        <Tooltip
                          title={
                            <p
                              style={{
                                padding: "0.6rem 1rem",
                                fontSize: "1.2rem",
                              }}
                            >
                              Edit Record
                            </p>
                          }
                        >
                          <TableData className="table-data">
                            <EditIcon
                              sx={{ fontSize: "2rem", cursor: "pointer" }}
                            />
                          </TableData>
                        </Tooltip>
                      </Link>
                      <TableData
                        className="table-data"
                        onClick={() => deleteDnsData(Ele._id)}
                      >
                        <Tooltip
                          title={
                            <p
                              style={{
                                padding: "0.6rem 1rem",
                                fontSize: "1.2rem",
                              }}
                            >
                              Delete Record
                            </p>
                          }
                        >
                          <DeleteIcon
                            sx={{
                              fontSize: "2rem",
                              cursor: "pointer",
                              color: "red",
                            }}
                          />
                        </Tooltip>
                      </TableData>
                    </MainTable>
                    <hr />
                  </Item>
                );
              })
            : ""}
        </Box>
      </Div>
    </Container>
  );
};

export default DnsTable;
