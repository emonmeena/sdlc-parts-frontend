import "./App.css";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function App() {
  const [show, setShow] = useState(false);
  const [showModifyDetailsModal, setShowModifyDetailsModal] = useState(false);
  const [array, setArray] = useState([]);
  const [modalHeading, setModalHeading] = useState("");
  const handleClose = () => setShow(false);
  const handleCloseModifyButton = () => setShowModifyDetailsModal(false);
  const handleShow = (array, heading) => {
    setModalHeading(heading);
    setArray(array);
    setShow(true);
  };

  const [data, setData] = useState([]);

  const [SVC_UN_NO, setSVCUNNO] = useState("");
  const [SO_NO, setSONO] = useState("");
  const [SVC_PRT_NO, setSVCPRTNO] = useState("");
  const [Part_Name, setPartName] = useState("");

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (SVC_UN_NO && SVC_PRT_NO && SO_NO && Part_Name) {
      let data = {
        svc_un_no: SVC_UN_NO,
        svc_prt_no: SVC_PRT_NO,
        so_no: SO_NO,
        partName: Part_Name,
      };
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      };
      await fetch("http://localhost:8080/createneworder", requestOptions)
        .then((response) => {
          setSVCUNNO("");
          setSONO("");
          setSVCPRTNO("");
          setPartName("");
        })
        .then((res) => {
          getAllOrders();
        })
        .catch((error) => console.log(error));
    }
    // .then sab empty
  };

  const getAllOrders = async () => {
    let response = await fetch("http://localhost:8080/allorders");
    let fetchedData = await response.json();
    setData(fetchedData);
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <div className="App">
      <table className="table table-bordered">
        <thead className="thead-light">
          <tr>
            <th scope="col">SVC_UN_NO</th>
            <th scope="col">SO_NO</th>
            <th scope="col">SVC_PRT_NO</th>
            <th scope="col">Status</th>
            <th scope="col">PartName</th>
            <th scope="col">Events</th>
            <th scope="col">ChainOfCustody</th>
            <th scope="col">TimeStampPartOrdered</th>
            <th scope="col">EstimatedDeliveryDate</th>
            <th scope="col">Source</th>
            <th scope="col">Attempter</th>
            <th scope="col">AdditionalComments</th>
            <th scope="col">TrackID</th>
            <th scope="col">ContactCustodian</th>
            <th scope="col">ContactVendor</th>
            <th scope="col">Modify Details</th>
            {/* <th scope="col">Assign</th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((obj) => {
            return (
              <tr key={obj.Key}>
                <td>{obj.Key}</td>
                <td>{obj.Record.SO_NO}</td>
                <td>{obj.Record.SVC_PRT_NO}</td>
                <td>{obj.Record.Status}</td>
                <td>{obj.Record.PartName}</td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      handleShow(
                        obj.Record.Events,
                        `Series Of Events For Service Order ${obj.Record.SO_NO}`
                      )
                    }
                  >
                    Show
                  </Button>
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() =>
                      handleShow(
                        obj.Record.ChainOfCustody,
                        `Chain Of Custody For Part ${obj.Record.SVC_PRT_NO}`
                      )
                    }
                  >
                    View
                  </Button>
                </td>
                <td>{obj.Record.TimeStampPartOrdered}</td>
                <td>{obj.Record.EstimatedDeliveryDate}</td>
                <td>{obj.Record.Source}</td>
                <td>{obj.Record.Attempter}</td>
                <td>{obj.Record.AdditionalComments}</td>
                <td>{obj.Record.TrackID}</td>
                <td>{obj.Record.ContactCustodian}</td>
                <td>{obj.Record.ContactVendor}</td>
                <td>
                  <Button
                    variant="light"
                    onClick={() => setShowModifyDetailsModal(true)}
                  >
                    Update
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <br></br>
      <div className="container">
        <form className="form-inline">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="SVC_UN_NO"
              placeholder="SVC_UN_NO"
              required
              value={SVC_UN_NO}
              onChange={(e) => setSVCUNNO(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="SVC_UN_NO"
              placeholder="SO_NO"
              required
              value={SO_NO}
              onChange={(e) => setSONO(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="SVC_UN_NO"
              placeholder="SVC_PRT_NO"
              required
              value={SVC_PRT_NO}
              onChange={(e) => setSVCPRTNO(e.target.value)}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              id="SVC_UN_NO"
              placeholder="Part Name"
              required
              value={Part_Name}
              onChange={(e) => setPartName(e.target.value)}
            />
          </div>
          <br />
          <br />
          <br />
          <button
            type="submit"
            className="btn btn-success"
            onClick={(e) => onFormSubmit(e)}
          >
            Add
          </button>
        </form>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalHeading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ol>
            {array.map((ele) => {
              return <li>{ele}</li>;
            })}
          </ol>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModifyDetailsModal} onHide={handleCloseModifyButton}>
        <Modal.Header closeButton>
          <Modal.Title>Update Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>//code goes here</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModifyButton}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;

/*
ID: id,
      SVC_UN_NO: sv_un_no,
      SO_NO: so_no,
      SVC_PRT_NO: svc_prt_no,
      Status: `Order received to SDLC parts [${utcDate}]`,
      PartName: Part_Name,
      Events: ["Order received to SDLC parts [2005-10-30 T 10:45UTC]"],
      ChainOfCustody: [],
      TimeStampPartOrdered: `${utcDate}`,
      EstimatedDeliveryDate: "NA",
      Source: "NA",
      AdditionalComments: "NA",
      TrackID: "NA",
      ContactCustodian: "NA",
      ContactVendor: "NA",
*/
