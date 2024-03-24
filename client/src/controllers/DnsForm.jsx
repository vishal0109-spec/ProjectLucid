import { styled } from "styled-components";
import { Box, Button } from "@mui/material";
import {  useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ServerApi from "../ServerApi/ServerApi";

const Container = styled.div`
  .main-dns {
    .dns-form {
      .main-items {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        gap: 3rem;
        row-gap: 5rem;
        .inputs {
          width: 30rem;
          height: 3rem;
          .input {
            width: 100%;
            height: 100%;
            font-size: 1.5rem;
            padding: 1rem 2rem;
            border: none;
            outline: none;
            text-decoration: none;
            display: block;
            border: 1px solid #34343460;
          }
          .label {
            font-size: 1.5rem;
            font-weight: 500;
          }
        }
      }
    }
  }
`;
const Item = styled.div``;
const Div = styled.div``;
const Input = styled.input``;
const Form = styled.form``;
const Label = styled.label``;
const DnsForm = () => {
  const [dnsFormData, setDnsFormData] = useState({
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
  const handleInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setDnsFormData({
      ...dnsFormData,
      [name]: value,
    });
  };

  const sendDnsData = async () => {
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
    } = dnsFormData;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${ServerApi}/api/auth/dns/create`, {
        method: "POST",
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
      console.log(data);
      if (data.success === false) {
        toast.error(data.message, {
          autoClose: 2000,
        });
      } else {
        toast.success(data.message, {
          autoClose: 2000,
        });
        setDnsFormData({
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
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container>
      <Box className="main-dns">
        <Form className="dns-form">
          <Div className="main-items">
            <Item className="inputs">
              <Label htmlFor="address" className="label">
                Address
              </Label>
              <Input
                className="input"
                type="text"
                id="address"
                placeholder="A(Address)"
                name="address"
                value={dnsFormData.address}
                onChange={handleInput}
              ></Input>
            </Item>
            <Item className="inputs">
              <Label htmlFor="ipAddress" className="label">
                IP Address
              </Label>
              <Input
                className="input"
                type="text"
                id="ipAddress"
                placeholder="AAAA (IPv6 Address) "
                name="ipAddress"
                value={dnsFormData.ipAddress}
                onChange={handleInput}
              ></Input>
            </Item>
            <Item className="inputs">
              <Label htmlFor="cname" className="label">
                CNAME
              </Label>
              <Input
                className="input"
                type="text"
                id="cname"
                placeholder="CNAME (Canonical Name)"
                name="cname"
                value={dnsFormData.cname}
                onChange={handleInput}
              ></Input>
            </Item>
            <Item className="inputs">
              <Label htmlFor="mailExchange" className="label">
                Mail Exchange
              </Label>
              <Input
                className="input"
                type="text"
                id="mailExchange"
                placeholder=" MX (Mail Exchange)"
                name="mailExchange"
                value={dnsFormData.mailExchange}
                onChange={handleInput}
              ></Input>
            </Item>
            <Item className="inputs">
              <Label htmlFor="serverName" className="label">
                Server Name
              </Label>
              <Input
                className="input"
                type="text"
                id="serverName"
                placeholder="NS (Name Server)"
                name="serverName"
                value={dnsFormData.serverName}
                onChange={handleInput}
              ></Input>
            </Item>
            <Item className="inputs">
              <Label htmlFor="pointer" className="label">
                Pointer
              </Label>
              <Input
                className="input"
                type="text"
                id="pointer"
                placeholder="PTR (Pointer)"
                name="pointer"
                value={dnsFormData.pointer}
                onChange={handleInput}
              ></Input>
            </Item>
            <Item className="inputs">
              <Label htmlFor="startOfAuthority" className="label">
                Start of Authority
              </Label>
              <Input
                className="input"
                type="text"
                id="startOfAuthority"
                placeholder=" SOA (Start of Authority)"
                name="startOfAuthority"
                value={dnsFormData.startOfAuthority}
                onChange={handleInput}
              ></Input>
            </Item>
            <Item className="inputs">
              <Label htmlFor="srv" className="label">
                Service
              </Label>
              <Input
                className="input"
                type="text"
                id="service"
                placeholder="SRV (Service)"
                name="service"
                value={dnsFormData.service}
                onChange={handleInput}
              ></Input>
            </Item>
            <Item className="inputs">
              <Label htmlFor="txt" className="label">
                TXT
              </Label>
              <Input
                className="input"
                type="text"
                id="txt"
                placeholder="TXT (Text)"
                name="txt"
                value={dnsFormData.txt}
                onChange={handleInput}
              ></Input>
            </Item>
            <Item className="inputs">
              <Label htmlFor="dnssec" className="label">
                DNSSEC
              </Label>
              <Input
                className="input"
                type="text"
                id="dnssec"
                placeholder="DNSSEC"
                name="dnssec"
                value={dnsFormData.dnssec}
                onChange={handleInput}
              ></Input>
            </Item>
            <Item className="btn">
              <Button
                variant="contained"
                color="secondary"
                sx={{ fontSize: "1.5rem", width: "100%", marginTop: "1.5rem" }}
                onClick={sendDnsData}
              >
                submit
              </Button>
            </Item>
          </Div>
        </Form>
      </Box>
    </Container>
  );
};

export default DnsForm;
