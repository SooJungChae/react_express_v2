import React, { Component } from 'react';
import table_config from './config/table-config';

class Grid extends Component {
    constructor(props) {
        super(props);

        this.createTableHeader = this.createTableHeader.bind(this);
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
            <table>
                <thead>
                <tr>
                    {this.createTableHeader()}
                </tr>
                </thead>
                <tbody>

                    {this.props.members.map((member, idx) => {

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
        )
    }
};

export default Grid;