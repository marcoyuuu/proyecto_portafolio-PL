class CV {
  constructor(data) {
    this.data = data;
  }

  setNombre() {
    document.getElementById("nombre").textContent = this.data.nombre;
  }

  setCorreo() {
    document.getElementById("correo").textContent = this.data.correo;
  }

  setExperiencia() {
    const experienciaContainer = document.querySelector(".cv-experiencia");
    experienciaContainer.innerHTML = '';
    this.data.experiencia.forEach((experiencia) => {
      const experienciaElement = document.createElement("div");
      experienciaElement.classList.add("cv-section");

      const empresaElement = document.createElement("h3");
      empresaElement.textContent = experiencia.empresa;
      experienciaElement.appendChild(empresaElement);

      const puestoElement = document.createElement("p");
      puestoElement.textContent = experiencia.puesto;
      experienciaElement.appendChild(puestoElement);

      const periodoElement = document.createElement("p");
      periodoElement.textContent = experiencia.periodo;
      experienciaElement.appendChild(periodoElement);

      const descripcionElement = document.createElement("p");
      descripcionElement.innerHTML = experiencia.descripcion.replace(/\n/g, "<br>");
      experienciaElement.appendChild(descripcionElement);

      experienciaContainer.appendChild(experienciaElement);
    });
  }

  setEducacion() {
    const educacionContainer = document.querySelector(".cv-educacion");
    educacionContainer.innerHTML = '';
    this.data.educacion.forEach((educacion) => {
      const educacionElement = document.createElement("div");
      educacionElement.classList.add("cv-section");

      const institucionElement = document.createElement("h3");
      institucionElement.textContent = educacion.institucion;
      educacionElement.appendChild(institucionElement);

      const tituloElement = document.createElement("p");
      tituloElement.textContent = educacion.titulo;
      educacionElement.appendChild(tituloElement);

      const periodoElement = document.createElement("p");
      periodoElement.textContent = educacion.periodo;
      educacionElement.appendChild(periodoElement);

      const gpaElement = document.createElement("p");
      gpaElement.textContent = `GPA: ${educacion.GPA}`;
      educacionElement.appendChild(gpaElement);

      const cursosElement = document.createElement("p");
      cursosElement.innerHTML = `Cursos relevantes: ${educacion["Cursos relevantes"].replace(/\n/g, "<br>")}`;
      educacionElement.appendChild(cursosElement);

      const clubesElement = document.createElement("p");
      clubesElement.innerHTML = `Clubes y Asociaciones: ${educacion["Clubes y Asociaciones"].replace(/\n/g, "<br>")}`;
      educacionElement.appendChild(clubesElement);


      educacionContainer.appendChild(educacionElement);
    });
  }

  setHabilidades() {
    const habilidadesList = document.querySelector(".cv-habilidades");

    // Clear habilidadesList
    while (habilidadesList.firstChild) {
      habilidadesList.removeChild(habilidadesList.firstChild);
    }

    const uniqueHabilidades = [...new Set(this.data.habilidades)]; // Create a set to remove duplicates, then convert back to array
    uniqueHabilidades.forEach((habilidad) => {
      const habilidadElement = document.createElement("li");
      habilidadElement.textContent = habilidad;
      habilidadesList.appendChild(habilidadElement);
    });
  }

  imprimirHTML() {
    this.setNombre();
    this.setCorreo();
    this.setExperiencia();
    this.setEducacion();
    this.setHabilidades();
  }

  generarPDF() {
    const element = document.getElementById('cv-container');
    const opt = {
      margin:       0.09,
      filename:     'Marco_Yu_Cordero_CV.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 2 },
      jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
  
    html2pdf().set(opt).from(element).save();
  }
  
}

fetch("cv/cv.json")
  .then((response) => response.json())
  .then((data) => {
    const miCV = new CV(data);
    miCV.imprimirHTML();
  })
  .catch((error) => {
    console.error("Error al cargar el CV:", error);
  });  