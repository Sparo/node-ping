const app = document.getElementById('app');
const react_app = document.getElementById('react_app');

const render = () => {

    // render js app
    app.innerHTML = `
        <div class="demo">
            WEB API <input class="input">
            <p class="date">${new Date().toString()}</p>
        </div>
    `;

    const ReactElement = window.React.createElement('div', {
        className: 'demo'
    }, 'React API', window.React.createElement('input', {
        className: 'input'
    }), window.React.createElement('p', {
        className: 'date'
    }, new Date().toString()));

    // Render React app
    window.ReactDOM.render(ReactElement, react_app);
};

setInterval(render, 1000);
