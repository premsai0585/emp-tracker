import '../App.css';

export default function LoadingPage() {
    return (
        <div className="d-flex vh-100 align-items-center justify-content-center">
            <h5>Hold on a moment please... </h5>
            <div class="spinner-border text-danger" role="status"></div>
        </div>
    )
}