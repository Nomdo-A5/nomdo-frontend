import React , { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

import "./Tablereport.css";

export const Tablereport = (props) =>{
    return (<Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th bgcolor="green">ID</th>
            <th>Description</th>
            <th>Nominal</th>
            <th>Income</th>
            <th>Outcome</th>            
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{props.key}</td>
            <td>{props.balance_description}</td>
            <td>Dummy</td>
            <td>Dummy</td>
            <td>Dummy</td>
          </tr>
        </tbody>
      </Table>
    )
}