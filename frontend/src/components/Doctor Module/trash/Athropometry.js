import React, {Component} from 'react';
import {Container, Collapse, Button } from 'reactstrap';
import CreateAthropometry from './CreateAthropometry';
import 'bootstrap/dist/css/bootstrap.css';
import AthropometryForm from './AthropometryForm';

class Athropometry extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        //getting the initially saved data        
        let records = JSON.parse(localStorage.getItem('Athropometry')) || '{}';

        // setting the initial state        
        this.state = { 
           collapse: false ,   
           records: records,     
        };
    }
      
    // toggles the modal to edit the form to edit the details                  
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    //recieves data from the child
    recieveData(data) {
        this.setState({ records: data})
    }

    render(){
        return(
            <Container className="Container">
                <Button block color="secondary" className="btn btn-glass"  onClick={this.toggle} style={{ marginBottom: '1rem' }}>Athropometry</Button>
                <Collapse id="patientdetail-collapse" isOpen={this.state.collapse}>               
                    <div className="offset-md-5">
                        {/* The Component that enables editing the current form in a modal */}
                        <CreateAthropometry recieveData={this.recieveData.bind(this)}/>
                    </div>
                    {/* The Component that displays the form */}
                    <AthropometryForm records={this.state.records}/>
                </Collapse>
            </Container>   
        )
    }
}

export default Athropometry;