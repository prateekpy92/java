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
    rejectFun,
}) {
    let headerdata = <></>;

    if (data.length > 0) {
        let key = Object.keys(data[0]);
        if (isUpdateButton) key.push('Update');
        if (isDeleteButton) key.push('Status');
        if (isDoc) key.push('Document');
        if (isPayment) key.push('Payment');
        if (showMoreButton) key.push('Details');
        if (isNominee) key.push('Nominee');
        if (isPay) key.push('Pay');
        if (isClaim) key.push('Claim');
        if (isAproov) key.push('Approve');
        if (isReject) key.push('Reject');

        headerdata = key.map((d) => <th key={d}>{String(d).toUpperCase()}</th>);
    }

    let rowofusers = <></>;
    if (data.length > 0) {
        rowofusers = data.map((value, ind) => (
            <tr key={value.policyNo || ind}>
                {Object.values(value).map((t, idx) => (
                    <td key={idx}>{String(t).toUpperCase()}</td>
                ))}
                {isUpdateButton && (
                    <td>
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => UpdateFun(value)}
                        >
                            Update
                        </button>
                    </td>
                )}
                {isDeleteButton && (
                    <td>
                        <button
                            type="button"
                            className={`btn ${value.isActive ? 'btn-outline-danger' : 'btn-outline-success'}`}
                            onClick={() => deleteFun(value)}
                        >
                            {value.isActive ? 'Deactivate' : 'Activate'}
                        </button>
                    </td>
                )}
                {isDoc && (
                    <td>
                        <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={() => docFun(value)}
                        >
                            Documents
                        </button>
                    </td>
                )}
                {isPayment && (
                    <td>
                        <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={() => paymentFun(value)}
                        >
                            Payments
                        </button>
                    </td>
                )}
                {showMoreButton && (
                    <td>
                        <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={() => detailFun(value)}
                        >
                            Details
                        </button>
                    </td>
                )}
                {isNominee && (
                    <td>
                        <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={() => nomineeFun(value)}
                        >
                            Nominee
                        </button>
                    </td>
                )}
                {isPay && (
                    <td>
                        <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={() => payFun(value)}
                        >
                            Pay
                        </button>
                    </td>
                )}
                {isClaim && (
                    <td>
                        <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={() => claimFun(value)}
                        >
                            Claim
                        </button>
                    </td>
                )}
                {isAproov && (
                    <td>
                        <button
                            type="button"
                            className="btn btn-outline-success"
                            onClick={() => aproovFun(value)}
                        >
                            Approve
                        </button>
                    </td>
                )}
                {isReject && (
                    <td>
                        <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => rejectFun(value)}
                        >
                            Reject
                        </button>
                    </td>
                )}
            </tr>
        ));
    }

    return (
        <table className="table table-bordered shadow-lg table-info">
            <thead>
                <tr className="text-center">{headerdata}</tr>
            </thead>
            <tbody className="text-center">{rowofusers}</tbody>
        </table>
    );
}

export default Tab;
