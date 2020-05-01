import React from 'react';
import TableEntry from "./TableEntry";
import '../styles/Database.scss';

const DatabaseTable = props => {

    function removeEntry(id) {
        let trimmedTable;
        if (props.filtered !== null) {
            trimmedTable = props.filtered;
        } else {
            trimmedTable = props.data.Entries;
        }

        let index = trimmedTable.findIndex(element => element.id === id);
        trimmedTable.splice(index, 1);
        
        if (props.filtered === null) {
            props.setFiltered(trimmedTable);
        } else {
            props.setFiltered([...trimmedTable]);
        }
    }

    return (
        <div className="container-fluid p-0 pb-5" id="table" style={{marginTop: `${props.margin}px`}}>
            <table className="table table-striped table-bordered table-hover ">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Group</th>
                        <th>Measurement Technique</th>
                        <th>Major Elements (wt%)</th>
                        <th>Minor Elements (ppm)</th>
                        <th>Trace Elements (ppb)</th>
                        <th>Title</th>
                        <th>Authors</th>
                        <th>Pg.#</th> 
                        <th>Journal</th> 
                        <th>Volume</th>
                        <th>Year Published</th> 
                    </tr>
                </thead>
                <tbody>
                    {props.filtered !== null ? props.filtered.map(entry => {
                        return <TableEntry key={entry.id} id={entry.id} isExporting={props.isExporting} removeEntry={removeEntry} object={entry} />
                    }) : props.data.Entries.map(entry => {
                        return <TableEntry key={entry.id} id={entry.id} isExporting={props.isExporting} removeEntry={removeEntry} object={entry} />
                    })}
                </tbody>
            </table>
        </div>   
    );
}

export default DatabaseTable;