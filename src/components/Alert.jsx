// Aqui vai ter vários tipos de alertas, os quais vão poder ser usados de várias formas.

class Alerts {
    constructor() {
        this.state = {
            showError: false,
            showInfo: false,
            showSuccess: false,
            showWarning: false,
            showButtonAlert: false,
            showTndAlert: false,
        };
    }

    setAlertText = (text) => {
        this.alertText = text;
    }

    setTndAlertText = (title, description, btnText1, btnText2) => {
        this.title = title;
        this.description = description;
        this.btnText2 = btnText1;
        this.btnText2 = btnText2;
    }

    setButtonAlertText = (text, btnText1, btnText2) => {
        this.alertText = text;
        this.btnText1 = btnText1;
        this.btnText2 = btnText2;
    }

    closeAlert = (alertType) => {
        this.state[alertType] = false;
    }

    openAlert = (alertType) => {
        this.state[alertType] = true;
    }

    ErrorAlert = () => {
        if (!this.state.showError) return null;

        return (
            <div role="alert" className="alert alert-error">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Error! Task failed successfully.</span>
                <button onClick={() => this.closeAlert('showError')} className="btn btn-sm btn-error">X</button>
            </div>
        );
    }

    InfoAlert = () => {
        if (!this.state.showInfo) return null;

        return (
            <div role="alert" className="alert alert-info">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="h-6 w-6 shrink-0 stroke-current">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{this.alertText}</span>
                <button onClick={() => this.closeAlert('showInfo')} className="btn btn-sm btn-info">X</button>
            </div>
        );
    }

    SuccessAlert = () => {
        if (!this.state.showSuccess) return null;

        return (
            <div role="alert" className="alert alert-success">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{this.alertText}</span>
                <button onClick={() => this.closeAlert('showSuccess')} className="btn btn-sm btn-success">X</button>
            </div>
        );
    }

    WarningAlert = () => {
        if (!this.state.showWarning) return null;

        return (
            <div role="alert" className="alert alert-warning">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>{this.alertText}</span>
                <button onClick={() => this.closeAlert('showWarning')} className="btn btn-sm btn-warning">X</button>
            </div>
        );
    }

    ButtonAlert = () => {
        if (!this.state.showButtonAlert) return null;

        return (
            <div role="alert" className="alert">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-info h-6 w-6 shrink-0">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>{this.alertText}</span>
                <div>
                    <button className="btn btn-sm">{this.btnText1}</button>
                    <button className="btn btn-sm btn-primary">{this.btnText2}</button>
                </div>
                <button onClick={() => this.closeAlert('showButtonAlert')} className="btn btn-sm btn-info">X</button>
            </div>
        );
    }

    tndAlert = () => { // tnd para Title n' Description
        if (!this.state.showTndAlert) return null;

        return (
            <div role="alert" className="alert shadow-lg">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="stroke-info h-6 w-6 shrink-0">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>
                    <h3 className="font-bold">{this.title}</h3>
                    <div className="text-xs">{this.description}</div>
                </div>
                <button className="btn btn-sm">{this.btnText1}</button>
                <button onClick={() => this.closeAlert('showTndAlert')} className="btn btn-sm btn-danger">X</button>
            </div>
        );
    }
}

export default Alerts;