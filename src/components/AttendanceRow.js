import moment from "moment";
export default function AttendanceRow({date, atndObj}) {
    return (
        <>
        {atndObj.present && (
            <div className="row atnd-list-row py-3" data-bs-theme="dark">
                <div className="col-md-3 col-6 text-center">{date}</div>
                <button className="navbar-toggler d-md-none col-6" type="button" data-bs-toggle="collapse" data-bs-target={`#id-${date}`}
                    aria-controls={`id-${date}`} aria-expanded="true" aria-label="Toggle navigation" >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div id={`id-${date}`} className="collapse col-md-8 row d-md-none mx-4 text-muted">
                    <div className="col-12"><span className="text-success">In:</span> {moment(atndObj.inTime).format('HH:mm:ss')}</div>
                    <div className="col-12"><span className="text-danger">Out:</span> {moment(atndObj.endTime).format('HH:mm:ss')}</div>
                    <div className='col-12'><span className="fw-bold">Hours Worked:</span> {((moment(atndObj.endTime).diff(moment(atndObj.inTime), 'minutes'))/60).toFixed(2)}</div>
                    <div className={`col-12 ${atndObj.late?'text-danger':'text-primary'}`}>{atndObj.late?'':'Not '}Late</div>
                </div>
                <div className="d-none d-md-flex col-md-9 row text-center">
                    <div className="col-3"><span className="text-success">In:</span> {moment(atndObj.inTime).format('HH:mm:ss')}</div>
                    <div className="col-3"><span className="text-danger">Out:</span> {moment(atndObj.endTime).format('HH:mm:ss')}</div>
                    <div className='col-3'><span className="fw-bold">Hours Worked:</span> {((moment(atndObj.endTime).diff(moment(atndObj.inTime), 'minutes'))/60).toFixed(2)}</div>
                    <div className={`col-3 ${atndObj.late?'text-danger':'text-primary'}`}>{atndObj.late?'':'Not '}Late</div>
                </div>
            </div>
        )}
        {!atndObj.present && (
        <div className="row atnd-list-row py-3 bg-danger" data-bs-theme="dark">
            <div className="col-md-4 col-6 text-center">{date}</div>
            <div className="col-md-8 text-center col-6 fw-bold" >
                Did not come
            </div>
        </div>
        )}
        </>
    )
}