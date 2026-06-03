function customRendrer(element, container){
    const domElement = document.createElement(element.type);
    domElement.innerHTML = element.children;
    for (const prop in element.props){
        if (prop === 'children') continue;
        domElement.setAttribute(prop, element.props[prop]);
    }
    container.appendChild(domElement);
}

const reactElement = {
    type : "a",
    props : {
        href : "https://github.com/RayAashish",
        target : "_blank"
    },
    children : "CLICK TO VISIT GITHUB"
}

const container = document.getElementById("custom_root")

customRendrer(reactElement, container);