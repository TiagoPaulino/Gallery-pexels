class PhotoGalery {
  constructor() {
    (this.API_KEY = "563492ad6f917000010000018865178676e842e481efec462438d628"),
      (this.galleryDiv = document.querySelector(".importado")),
      this.eventHandle();
  }
  eventHandle() {
    document.addEventListener("DOMContentLoaded", () => {
      let page = 1;
      this.getImg();
      document.addEventListener("scroll", () => {
        let porcentagem = Math.round(
          (window.scrollY * 100) /
            (document.body.offsetHeight - window.innerHeight)
        );

        if (porcentagem === 100) {
          let pesquisa =
            document.querySelector("#pesquisa").value != ""
              ? document.querySelector("#pesquisa").value
              : "curated";
          page++;
          setTimeout(()=>{
            this.getMoreImg(pesquisa, page);
          },)

          
        }
      });
      document.querySelector("#pesquisar");
      buttom.addEventListener("click", () => {
        seachImg();
      });
    });
  }
  async fechImages(baseURL) {
    const response = await fetch(baseURL, {
      method: "GET",
      headers: {
        Accept: "aplication/json",
        Authorization: this.API_KEY,
      },
    });
    const data = await response.json();


    return data;
  }
  async getImg(
    baseURL = "https://api.pexels.com/v1/",
    pesquisa = "curated",
    page = ""
  ) {
    const data = await this.fechImages(baseURL + pesquisa + page);
    this.GenerateHTML(data.photos);

  }
  async getMoreImg(pesquisa, page) {
    this.getImg(
      "https://api.pexels.com/v1/",
      `search?query=${pesquisa}&`,
      `page=${page}`
    );
  }
  async GenerateHTML(photos) {
    photos.forEach((photo) => {
      const picture = document.createElement("div");
      picture.classList.add("picture");
      picture.innerHTML = `
                <a href=${photo.url} target="_blank" rel="noopener noreferrer">
                <img src=${photo.src.medium} alt="Alt da imagem">
                <div class="picture_althor">
                    <span>De:${photo.photographer}</span>
                </div>
                </a>
            `;
      this.galleryDiv.appendChild(picture);
    });
  }

  addBoxExemplo() {
    for (let index = 0; index < 15; index++) {
      const importados = document.querySelector(".importado");
      let boxExemplo = document.createElement("div");
      boxExemplo.classList.add("boxExemplo");
      importados.appendChild(boxExemplo);
    }
  }
}
buttom = document.querySelector("#pesquisar");
buttom.addEventListener("click", () => {
  seachImg();
});
inPesquisa = document.querySelector("#pesquisa")
inPesquisa.addEventListener('keypress', (e)=>{
    if(e.key == 'Enter'){
        seachImg()
    }
})
async function seachImg() {
  galleryDiv = document.querySelector(".importado");
  galleryDiv.innerHTML = "";
  let palavra = document.querySelector("#pesquisa").value;
  let pesquisa = "https://api.pexels.com/v1/search?query=" + palavra;
  iniciar = new PhotoGalery();
  data = await iniciar.fechImages(pesquisa);
  iniciar.GenerateHTML(data.photos);
}
let photos = new PhotoGalery();
