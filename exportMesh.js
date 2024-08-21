// exportMesh.js

function exportMeshToObj(mesh) {
    let objData = '';

    // Vertexler (köşeler)
    let vertices = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    for (let i = 0; i < vertices.length; i += 3) {
        objData += `v ${vertices[i]} ${vertices[i+1]} ${vertices[i+2]}\n`;
    }

    // Face'ler (yüzler)
    let indices = mesh.getIndices();
    for (let i = 0; i < indices.length; i += 3) {
        objData += `f ${indices[i]+1} ${indices[i+1]+1} ${indices[i+2]+1}\n`;
    }

    return objData;
}

function downloadObjFile(objData, filename) {
    let blob = new Blob([objData], { type: 'text/plain' });
    let link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function exportMesh(meshName, savePath) {
    var mesh = scene.getMeshByName(meshName);
    if (mesh) {
        var objData = exportMeshToObj(mesh);
        downloadObjFile(objData, savePath);
        console.log("OBJ export successful: " + savePath);
        return true;
    } else {
        console.error("Mesh not found: " + meshName);
        return false;
    }
}
