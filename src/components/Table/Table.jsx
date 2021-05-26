import React from 'react';
import './Table.scss'

const Table = ({ comments, sortData }) => {
    return (
        <table>
            <thead>
                <tr>
                    <td onClick={() => sortData('name')}>
                        Имя
                    </td>
                    <td onClick={() => sortData('email')}>
                        Почта
                    </td>
                    <td onClick={() => sortData('body')}>
                        Текст
                    </td>
                </tr>
            </thead>
            <tbody>
                {
                    comments.length > 0 && comments.map(comment => {
                        return (
                            <tr key={comment.id}>
                                <td>
                                    {comment.name}
                                </td>
                                <td>
                                    {comment.email}
                                </td>
                                <td>
                                    {comment.body}
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
}

export default Table;