import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/Context";
import ServerApi from "../../ServerApi/ServerApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = styled.div`
  .main-item {
    padding: 5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    row-gap: 2rem;
    .inputs {
      width: 30rem;
      height: 3rem;
      margin-top: 1rem;
      .label {
        font-size: 1.5rem;
        font-weight: 600;
      }

      .input {
        width: 100%;
        height: 100%;
        display: block;
        border: none;
        outline: none;
        padding: 1rem 2rem;
        border: 1px solid #34343486;
      }
    }
  }
`;
const Item = styled.div``;
const Div = styled.div``;
const Input = styled.input``;
const Label = styled.label``;

export default function EditDialog() {
  const { allDnsData } = React.useContext(AppContext);
  const [tableData, setTableData] = React.useState({
    address: "",
    ipAddress: "",
    cname: "",
    mailExchange: "",
    serverName: "",
    pointer: "",
    startOfAuthority: "",
    service: "",
    txt: "",
    dnssec: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  console.log(id);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    navigate("/dnsTableData");
  };

  const getUserFilterData = () => {
    const [filter] = allDnsData.filter((Ele) => {
      return Ele._id === id;
    });
    setTableData(filter);
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setTableData({
      ...tableData,
      [name]: value,
    });
  };

  const updateDnsData = async (id) => {
    const token = localStorage.getItem("token");
    const {
      address,
      ipAddress,
      cname,
      mailExchange,
      serverName,
      pointer,
      startOfAuthority,
      service,
      txt,
      dnssec,
    } = tableData;
    try {
      const response = await fetch(`${ServerApi}/api/auth/dns/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: `Barear ${token}`,
        },
        body: JSON.stringify({
          address,
          ipAddress,
          cname,
          mailExchange,
          serverName,
          pointer,
          startOfAuthority,
          service,
          txt,
          dnssec,
        }),
        credentials: "include",
      });
      const data = await response.json();
      if(data.success===true){
        toast.success(data.message,{
          autoClose:2000,
        })
      }
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    handleClickOpen();
    getUserFilterData();
  }, []);
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth
      >
        <Container>
          {tableData.length !== 0 ? (
            <>
              {" "}
              <Typography
                variant="h3"
                color="initial"
                sx={{ textAlign: "center", marginTop: "1rem" }}
              >
                Edit Data
              </Typography>
              <hr />
              <Div className="main-item">
                <Item className="inputs">
                  <Label htmlFor="address" className="label">
                    {" "}
                    Address
                  </Label>
                  <Input
                    className="input"
                    placeholder="Address"
                    value={tableData ? tableData.address : ""}
                    onChange={handleUpdate}
                    name="address"
                    id="address"
                  ></Input>
                </Item>
                <Item className="inputs">
                  <Label htmlFor="ipAddress" className="label">
                    IP Address
                  </Label>
                  <Input
                    className="input"
                    placeholder="IP Address"
                    value={tableData ? tableData.ipAddress : ""}
                    onChange={handleUpdate}
                    name="ipAddress"
                    id="ipAddress"
                  ></Input>
                </Item>
                <Item className="inputs">
                  <Label htmlFor="cname" className="label">
                    CNAME
                  </Label>
                  <Input
                    className="input"
                    placeholder="cname"
                    value={tableData ? tableData.cname : ""}
                    onChange={handleUpdate}
                    name="cname"
                    id="cname"
                  ></Input>
                </Item>
                <Item className="inputs">
                  <Label htmlFor="mailExchange" className="label">
                    MAIL Exchange
                  </Label>
                  <Input
                    className="input"
                    placeholder="Mail Exchange"
                    value={tableData ? tableData.mailExchange : ""}
                    onChange={handleUpdate}
                    name="mailExchange"
                    id="mailExchange"
                  ></Input>
                </Item>
                <Item className="inputs">
                  <Label htmlFor="serverName" className="label">
                    Server Name
                  </Label>
                  <Input
                    className="input"
                    placeholder="Server Name"
                    value={tableData ? tableData.serverName : ""}
                    onChange={handleUpdate}
                    name="serverName"
                    id="serverName"
                  ></Input>
                </Item>
                <Item className="inputs">
                  <Label htmlFor="pointer" className="label">
                    Pointer
                  </Label>
                  <Input
                    className="input"
                    placeholder="Pointer"
                    value={tableData ? tableData.pointer : ""}
                    onChange={handleUpdate}
                    name="pointer"
                    id="pointer"
                  ></Input>
                </Item>
                <Item className="inputs">
                  <Label htmlFor="startOfAuthority" className="label">
                    Start Of Authority
                  </Label>
                  <Input
                    className="input"
                    placeholder="Start Of Authority"
                    value={tableData ? tableData.startOfAuthority : ""}
                    onChange={handleUpdate}
                    name="startOfAuthority"
                    id="startOfAuthority"
                  ></Input>
                </Item>
                <Item className="inputs">
                  <Label htmlFor="service" className="label">
                    Service
                  </Label>
                  <Input
                    className="input"
                    placeholder="Service"
                    value={tableData ? tableData.service : ""}
                    onChange={handleUpdate}
                    name="service"
                    id="service"
                  ></Input>
                </Item>
                <Item className="inputs">
                  <Label htmlFor="txt" className="label">
                    TXT
                  </Label>
                  <Input
                    className="input"
                    placeholder="Txt"
                    value={tableData ? tableData.txt : ""}
                    onChange={handleUpdate}
                    name="txt"
                    id="txt"
                  ></Input>
                </Item>
                <Item className="inputs">
                  <Label htmlFor="dnssec" className="label">
                    Dnssec
                  </Label>
                  <Input
                    className="input"
                    placeholder="Dnssec"
                    value={tableData ? tableData.dnssec : ""}
                    onChange={handleUpdate}
                    name="dnssec"
                    id="dnssec"
                  ></Input>
                </Item>
                <Box sx={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                  <Button
                    variant="outlined"
                    color="primary"
                    sx={{ display: "inline-block", fontSize: "1.2rem" }}
                    onClick={() => handleClose()}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ display: "inline-block", fontSize: "1.2rem" }}
                    onClick={() => updateDnsData(id)}
                  >
                    Save
                  </Button>
                </Box>
              </Div>
            </>
          ) : (
            ""
          )}
        </Container>
      </Dialog>
    </>
  );
}
