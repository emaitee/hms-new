//importing neccessary modules
import React, { Component } from 'react';
import { Card, Table } from 'reactstrap';
import FreeScrollBar from 'react-free-scrollbar';

/**
 * This component renders the table consisting of the
 * assigned for a particular date
 */
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };

    this.fetchData = this.fetchData.bind(this);
  }

  /**
   * create fetch method to fetch list of doctors with the corresponding total
   * number of patients from the database
   */

  fetchData() {
    let self = this;

    fetch('http://localhost:4000/patientrecords/patientAssignedToday', {
      method: 'GET',
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then(function(data) {
        //the returned data is saved in the state
        self.setState({ list: data });
      })
      .catch(err => {
        return err;
      });
  }

  /**
   * when component has been mounted, the list of patients assigned for
   * for a paticular doctor is fetched from the database
   */
  componentDidMount() {
    this.fetchData();
  }


  render() {
    const today = new Date();
    return (
      <div>
        <Card className="border-secondary">
          <h6 style={{ textAlign: 'center' }}>
            List of patients assigned today {today.toLocaleDateString()}
          </h6>
          <div
            style={{
              width: '100%',
              height: '50vh',
            }}>
            {/* 
                        rendering the daily list table of doctors with the corresponding total patients assigned to them
                    */}
            <FreeScrollBar>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th></th>
                    <th>Doctors</th>
                    <th className="moveToCenter">Patients</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.list.map((doctor, i) => (
                    <tr
                      style={{ cursor: 'pointer' }}
                      key={i} onClick={() => this.getNewListByDoctor(doctor.Doctors)}>
                      <td>{i+1}</td>
                      <td style={{ textAlign: 'left' }}>{doctor.Doctors}</td>
                      <td style={{ textAlign: 'center' }}>{doctor.Patients}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </FreeScrollBar>
          </div>
        </Card>
      </div>
    );
  }
}
