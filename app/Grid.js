import React, { Component } from 'react';
import table_config from './config/table-config';

class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            members: [],
            agentCode: ''
        }

        this.createTableHeader = this.createTableHeader.bind(this);
    }

    componentDidMount(){


        fetch('/users')
            .then(res => {
                return res.text()
            })
            .then(members => {
                this.setState({
                    members: JSON.parse(members),
                    agentCode: this.props.location.state.agentCode
                })
            })
    }

    createTableHeader() {
        let columnNames = table_config.users.columnName;
        console.log(columnNames);
        return columnNames.map((columnName, idx) => {
            return <th key={idx}>{columnName}</th>
        })
    }

    render() {
        return (
            <div>
                <h2>{this.state.agentCode}</h2>
            <table>
                <thead>
                <tr>
                    {this.createTableHeader()}
                </tr>
                </thead>
                <tbody>

                    {this.state.members.map((member, idx) => {
                        return (
                            <tr key={idx}>
                                <td>{member.AgentCode}</td>
                                <td>{member.AgentSeqNo}</td>
                                <td>{member.CustomerName}</td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>
            </div>
        )
    }
};

export default Grid;