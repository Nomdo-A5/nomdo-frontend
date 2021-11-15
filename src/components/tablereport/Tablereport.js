import React , { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';

import "./Tablereport.css";

export const Tablereport = () =>{
    return (<Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th bgcolor="green">ID</th>
            <th>Report Title</th>
            <th>Income</th>
            <th>Outcome</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Dummy</td>
            <td>Dummy</td>
            <td>Dummy</td>
            <td>Dummy</td>
          </tr>
        </tbody>
      </Table>
    )
}