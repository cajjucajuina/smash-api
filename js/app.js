const messageArea = document.getElementsById("messageArea");
const filelist= document.getElementById("filelist");
const MAX_SIZE_MB =5;

function showMessage(msg,type ="sucess"){
    messageArea.textContent = msg ;
    messageArea.style.color = type =="error" ?"#e63946":"#2a9d8f";

}

function upload(){
const input = document.getElementById ("uploadInput");
const files =[...input.files];

if (files.length === 0) {
    showMessage("Nenhum arquivo selecionado.", "error");
    return;
}

const oversized = files.find(file => file.size > MAX_SIZE_MB * 1024 * 1024);
if (oversized) {
    showMessage (`Arquivo ${oversized.name} excede 5MB.`, "error");
    return;
}

showMessage("Enviando...", "success")

const su = new SmashUploader ({
    region: "us-east-1",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdhMmI4YjQzLTBhOGEtNDA3NC1iMzc5LTc2Y2FhMDdjZmQzMS1ldSIsInVzZXJuYW1lIjoiNmI2MTAwY2UtZWMxZC00N2FjLTkxNzYtNWNiNTExZTQxNDU3IiwicmVnaW9uIjoidXMtZWFzdC0xIiwiaXAiOiIyMDEuNTkuMTA0Ljg5Iiwic2NvcGUiOiJOb25lIiwiYWNjb3VudCI6IjNmYzZhNjdhLTkwMGYtNDg2Yi05ODg4LWYyNzhmOTAwYTNkZS1lYSIsImlhdCI6MTc0NjQ2OTgxNSwiZXhwIjo0OTAyMjI5ODE1fQ.su6DRV32bokt6dpu3JmR9ecKjTeQLy-KqIh8NxG3gSQ",
});


su.upload({ files })
.then(result => {
    const link = result?.transfer?.transferUrl;

    if (link) {
        showMessage("Upload concluído!", "success");

       files.forEach(file=> {
        const li = document.createElement("li");
        li.innerHTML = `
        ${file.name} —
        <a href= "${link}" target="_blank"; ">Baixar</a>`; 
        fileList.appendChild(li);
       });
    } else {
        showMessage("Upload concluído, mas sem link.", "error");
    }
})
.catch(error=> {
    console.error("Error:", error);
    showMessage("Erro ao enviar o arquivo.", "error");
});

}