//Que fique claro eu não sei mexer muito bem com javascript, peguei esses códigos do ChatGPT.

const draggables = document.querySelectorAll('.obj');
const container = document.querySelector('#obj_limite'); // área delimitadora

const botao = document.querySelectorAll(".ampliar");
const som = document.getElementById("Ef_Folha");

draggables.forEach((el) => {
    let isDragging = false;
    let offsetX = 0;
    let offsetY = 0;

    el.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - el.offsetLeft;
        offsetY = e.clientY - el.offsetTop;

        function onMouseMove(e) {
            if (isDragging) {
                const containerRect = container.getBoundingClientRect();
                const elRect = el.getBoundingClientRect();

                // Calcula as novas posições desejadas
                let newLeft = e.clientX - offsetX;
                let newTop = e.clientY - offsetY;

                // Limites horizontais
                if (newLeft < 0) newLeft = 0;
                if (newLeft + el.offsetWidth > container.clientWidth) {
                    newLeft = container.clientWidth - el.offsetWidth;
                }

                // Limites verticais
                if (newTop < 0) newTop = 0;
                if (newTop + el.offsetHeight > container.clientHeight) {
                    newTop = container.clientHeight - el.offsetHeight;
                }

                el.style.left = `${newLeft}px`;
                el.style.top = `${newTop}px`;
            }
        }

        function onMouseUp() {
            isDragging = false;
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });
});

function abrirModal(imagemId) {
    const imagens = {
        img1: "url('/Arquivos/Papeis/Folha\ 1.png')",
        img2: "url('/Arquivos/Papeis/Folha\ 2.png')",
        img3: "url('/Arquivos/Papeis/Folha\ 3.png')",
        img4: "url('/Arquivos/Papeis/Folha\ 4.png')"
    };

    const carta = {
        carta: "url('/Arquivos/Papeis/Carta\ de\ Explicação.png')"
    }

    const divImagem = document.getElementById("areatexto");

    if (imagemId.startsWith("img")) {
        divImagem.style.backgroundImage = imagens[imagemId] || "none";
        divImagem.style.width = "510px";   // ajuste conforme o tamanho real da carta
        divImagem.style.height = "716px";
    } else if (imagemId === "carta") {
        divImagem.style.backgroundImage = carta[imagemId] || "none";
        divImagem.style.width = "735px";   // ajuste conforme o tamanho real da carta
        divImagem.style.height = "566px";
    }

    document.getElementById("modal").style.display = "flex";

    som.currentTime = 0; // Recomeça o som do início
    som.play();
}

function fecharModal() {
    document.getElementById('modal').style.display = 'none';
}