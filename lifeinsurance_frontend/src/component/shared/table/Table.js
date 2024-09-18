import React from 'react';

function Tab({
    data,
    isUpdateButton,
    isDeleteButton,
    showMoreButton,
    isPayment,
    isDoc,
    isNominee,
    isClaim,
    isPay,
    isAproov,
    isReject,
    nomineeFun,
    claimFun,
    paymentFun,
    docFun,
    deleteFun,
    UpdateFun,
    detailFun,
    payFun,
    aproovFun,
    rejectFun
}) {
    let headerdata = <></>;

    console.log("data in table is 888 ", data);

    if (data != 0) {
        console.log("data==", data);
        console.log("key==", Object.keys(data[0]));

        let key = Object.keys(data[0]);
        if (isUpdateButton) key.push('Update');
        if (isDeleteButton) key.push('Delete');
        if (isDoc) key.push('Document');
        if (isPayment) key.push('Payment');
        if (showMoreButton) key.push('Details');
        if (isNominee) key.push('Nominee');
        if (isPay) key.push('Pay');
        if (isClaim) key.push('Claim');
        if (isAproov) key.push('Approve');
        if (isReject) key.push('Reject');

        headerdata = key.map((d, index) => {
            return <th key={`header-${index}`}>{String(d).toUpperCase()}</th>;
        });
    }

    let rowofusers = <></>;
    if (data.length > 0) {
        rowofusers = data.map((value, ind) => {
            return (
                <tr key={`row-${ind}`}>
                    {
                        Object.values(value).map((t, idx) => {
                            return (
                                <td key={`cell-${ind}-${idx}`}>{String(t).toUpperCase()}</td>
                            );
                        })
                    }
                    {isUpdateButton && (
                        <td key={`update-${ind}`}>
                            <button type="button" className='btn btn-outline-primary' onClick={() => UpdateFun(value)}>Update</button>
                        </td>
                    )}
                    {isDeleteButton && (
                        <td key={`delete-${ind}`}>
                            <button type="button" className='btn btn-outline-danger' onClick={() => deleteFun(value)}>Delete</button>
                        </td>
                    )}
                    {isDoc && (
                        <td key={`doc-${ind}`}>
                            <button type="button" className='btn btn-outline-success' onClick={() => docFun(value)}>Documents</button>
                        </td>
                    )}
                    {isPayment && (
                        <td key={`payment-${ind}`}>
                            <button type="button" className='btn btn-outline-success' onClick={() => paymentFun(value)}>Payments</button>
                        </td>
                    )}
                    {showMoreButton && (
                        <td key={`details-${ind}`}>
                            <button type="button" className='btn btn-outline-success' onClick={() => detailFun(value)}>Details</button>
                        </td>
                    )}
                    {isNominee && (
                        <td key={`nominee-${ind}`}>
                            <button type="button" className='btn btn-outline-success' onClick={() => nomineeFun(value)}>Nominee</button>
                        </td>
                    )}
                    {isPay && (
                        <td key={`pay-${ind}`}>
                            <button type="button" className='btn btn-outline-success' onClick={() => payFun(value)}>Pay</button>
                        </td>
                    )}
                    {isClaim && (
                        <td key={`claim-${ind}`}>
                            <button type="button" className='btn btn-outline-success' onClick={() => claimFun(value)}>Claim</button>
                        </td>
                    )}
                    {isAproov && (
                        <td key={`approve-${ind}`}>
                            <button type="button" className='btn btn-outline-success' onClick={() => aproovFun(value)}>Approve</button>
                        </td>
                    )}
                    {isReject && (
                        <td key={`reject-${ind}`}>
                            <button type="button" className='btn btn-outline-danger' onClick={() => rejectFun(value)}>Reject</button>
                        </td>
                    )}
                </tr>
            );
        });
    }

    return (
        <>
            <table className="table table-bordered shadow-lg table-info">
                <thead>
                    <tr className='text-center'>
                        {headerdata}
                    </tr>
                </thead>
                <tbody className='text-center'>
                    {rowofusers}
                </tbody>
            </table>
        </>
    );
}

export default Tab;
